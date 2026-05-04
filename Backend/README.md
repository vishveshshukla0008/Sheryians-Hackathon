# Smart Incident Response Platform — Backend API

Production-oriented REST API for **MayDayOps**: multi-tenant incident management, timeline collaboration, AI postmortems (Mistral), email notifications, public status pages, and B2B contact / sales enquiries.

---

## Contents

1. [Stack & conventions](#stack--conventions)
2. [Configuration](#configuration)
3. [Run locally](#run-locally)
4. [Authentication](#authentication)
5. [Standard responses & errors](#standard-responses--errors)
6. [Rate limiting](#rate-limiting)
7. [REST API reference](#rest-api-reference)
8. [WebSocket (Socket.IO)](#websocket-socketio)
9. [Production checklist](#production-checklist)

---

## Stack & conventions

| Layer     | Technology                            |
| --------- | ------------------------------------- |
| Runtime   | Node.js (ES modules)                  |
| Framework | Express 4                             |
| Database  | MongoDB + Mongoose 8                  |
| Auth      | JWT (`Authorization: Bearer <token>`) |
| Email     | Nodemailer (e.g. Brevo SMTP)          |
| AI        | Mistral (OpenAI-compatible chat API)  |
| Realtime  | Socket.IO                             |

- **Base path:** all HTTP routes below are prefixed with `/api`.
- **`Content-Type`:** `application/json` for bodies unless noted (e.g. `verify-email` uses query params).
- **IDs:** MongoDB ObjectId strings (`24` hex chars) unless stated otherwise.

---

## Configuration

Copy `.env.example` to `.env` and fill values.

| Variable                             | Purpose                                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `PORT`                               | HTTP port (default `5000`)                                                                |
| `NODE_ENV`                           | `development` \| `production`                                                             |
| `TRUST_PROXY`                        | Optional Express proxy trust override (e.g. `1` on Render)                                |
| `MONGO_URI`                          | MongoDB connection string                                                                 |
| `JWT_SECRET`                         | Secret for JWT signing                                                                    |
| `JWT_EXPIRES_IN`                     | Token lifetime (e.g. `7d`)                                                                |
| `BREVO_SMTP_USER`, `BREVO_SMTP_PASS` | SMTP credentials                                                                          |
| `BREVO_SMTP_HOST`                    | Optional SMTP host (default `smtp-relay.brevo.com`)                                       |
| `BREVO_SMTP_PORT`                    | Optional SMTP port (default `587`; use `465` for SSL)                                     |
| `BREVO_SMTP_SECURE`                  | Optional `true/false` SSL toggle (auto true on port `465`)                                |
| `MAIL_FROM`                          | From address for transactional mail                                                       |
| `FRONTEND_URL`                       | Allowed CORS origin + invite / incident links                                             |
| `MISTRAL_API_KEY`                    | Required for AI postmortem generation                                                     |
| `MISTRAL_MODEL`                      | Optional; default `mistral-small-latest`                                                  |
| `CONTACT_TEAM_EMAIL`                 | Inbox for B2B contact form notifications (optional; enquiries still persisted in MongoDB) |

---

## Run locally

```bash
npm install
npm run dev
```

- Entry: `src/server.js`
- Validates SMTP on startup via `verifyTransporter()`.

---

## Authentication

Protected routes expect:

```http
Authorization: Bearer <jwt>
```

JWT payload includes (at minimum) `userId`, `role`, `companyId`. Obtain tokens via **register → verify email → login**, **invite accept**, or **GET /api/auth/verify-email**.

**Roles:** `ADMIN`, `CEO`, `DEVELOPER`, `MEMBER`. Some routes restrict to `ADMIN` and `CEO` only.

---

## Standard responses & errors

### Success (typical shape)

Controllers return JSON with `success: true` and a `data` object (and sometimes `message`).

### Error envelope

Operational and validation failures use:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Human-readable message",
  "errors": []
}
```

- **`errors`:** populated for validation failures (array of `{ "type", "value", "msg", "path", "location", ... }` style objects from express-validator).
- **`statusCode`:** mirrors HTTP status.
- **`stack`:** included only when `NODE_ENV=development`.

Common HTTP statuses: **400** validation, **401** auth, **403** forbidden (role / unverified email), **404** not found, **409** conflict, **429** rate limit.

---

## Rate limiting

Configured in `src/app.js`:

| Scope            | Limit                            |
| ---------------- | -------------------------------- |
| `*` under `/api` | 100 requests / 15 minutes per IP |
| `/api/auth`      | 20 requests / 15 minutes per IP  |

---

## REST API reference

Unless noted, **`success: true`** in successful responses.

### Auth — `/api/auth`

#### `POST /api/auth/register`

Create company + owner user; sends verification email (no JWT until email verified).

**Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "password": "minimum8chars",
  "companyName": "Acme Inc",
  "role": "ADMIN"
}
```

- **`role`** (optional): `ADMIN` \| `CEO` for owner signup (defaults to `ADMIN` in controller).

**Response `201`:**

```json
{
  "success": true,
  "message": "Account created. Please verify your email to continue.",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "role": "ADMIN",
      "isEmailVerified": false,
      "companyId": {
        "id": "507f191e810c19729de860ea",
        "name": "Acme Inc",
        "slug": "acme-inc-xyz"
      }
    }
  }
}
```

---

#### `GET /api/auth/verify-email?token=<verification_token>`

Completes email verification; returns JWT.

**Query:** `token` (required).

**Response `200`:**

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": { "token": "<jwt>" }
}
```

---

#### `POST /api/auth/login`

**Body:**

```json
{
  "email": "jane@company.com",
  "password": "minimum8chars"
}
```

**Response `200`:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "role": "ADMIN",
      "companyId": {
        "id": "507f191e810c19729de860ea",
        "name": "Acme Inc",
        "slug": "acme-inc-xyz"
      }
    }
  }
}
```

- **403** if email not verified; **401** invalid credentials.

---

#### `POST /api/auth/resend-verification`

**Body:**

```json
{ "email": "jane@company.com" }
```

**Response `200` (already verified):**

```json
{
  "success": true,
  "message": "Email is already verified",
  "data": {}
}
```

**Response `200` (email sent):**

```json
{
  "success": true,
  "message": "Verification email sent",
  "data": {}
}
```

---

#### `GET /api/auth/me`

**Auth:** required.

**Response `200`:**

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "role": "ADMIN",
      "lastLogin": "2026-05-02T10:00:00.000Z",
      "company": {
        "id": "507f191e810c19729de860ea",
        "name": "Acme Inc",
        "slug": "acme-inc-xyz",
        "plan": "FREE",
        "memberCount": 5
      }
    }
  }
}
```

---

#### `POST /api/auth/logout`

**Auth:** required. Stateless JWT — client discards token; server acknowledges.

**Response `200`:**

```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": {}
}
```

---

#### `POST /api/auth/forgot-password`

Public. Sends password-reset email **only if** an active user exists for that email (response text is identical either way).

**Body:**

```json
{ "email": "person@company.com" }
```

**Response `200`:**

```json
{
  "success": true,
  "message": "If an account exists for that email with an active workspace, we've sent reset instructions",
  "data": {}
}
```

Email contains a link: `{FRONTEND_URL}/reset-password?token=<one_time_token>` (valid approximately **1 hour**).

---

#### `POST /api/auth/reset-password`

Public. Completes flow started from forgot-password email.

**Body:**

```json
{
  "token": "<token_from_email_query_string>",
  "password": "newpassword8chars",
  "confirmPassword": "newpassword8chars"
}
```

**Response `200`:**

```json
{
  "success": true,
  "message": "Password updated. You can sign in with your email and new password.",
  "data": {}
}
```

---

### Company — `/api/company`

#### `POST /api/company/invite`

**Auth:** required. **Roles:** `ADMIN`, `CEO`.

**Body:**

```json
{
  "email": "newmember@company.com",
  "role": "MEMBER"
}
```

- **`role`** (optional): `CEO` \| `DEVELOPER` \| `MEMBER` (per route validator).

**Response `200`:**

```json
{
  "success": true,
  "message": "Invitation sent to newmember@company.com",
  "data": {}
}
```

---

#### `GET /api/company/invite/setup`

Public. Returns invite payload for the first-time onboarding form (requires a valid, unused, unexpired `token`). Invite emails link to **`{FRONTEND_URL}/?token=…`** (home page); the SPA reads the token from the URL and calls this endpoint to pre-fill email.

**Query:** `token` (required).

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "email": "newmember@company.com",
    "companyName": "Acme Inc",
    "role": "MEMBER"
  }
}
```

**400** for invalid / used / expired token.

---

#### `POST /api/company/invite/accept`

Public (no Bearer). Creates the invited user account after they open the home link with `?token=` and submit name, invited email, and a new password.

**Body:**

```json
{
  "token": "<invite_token_from_query_string>",
  "name": "New User",
  "email": "newmember@company.com",
  "password": "minimum8chars"
}
```

- **`email`:** must match the address the invite was sent to (same as `GET /invite/setup` returns).

**Response `201`:**

```json
{
  "success": true,
  "message": "Welcome to Acme Inc! Your account has been created.",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "New User",
      "email": "newmember@company.com",
      "role": "MEMBER",
      "companyId": {
        "id": "507f191e810c19729de860ea",
        "name": "Acme Inc",
        "slug": "acme-inc-xyz"
      }
    }
  }
}
```

---

#### `GET /api/company/members`

**Auth:** required. **Roles:** `ADMIN`, `CEO`.

**Response `200`:**

```json
{
  "success": true,
  "message": "Members fetched successfully",
  "data": {
    "count": 5,
    "members": []
  }
}
```

`members` is an array of user documents (**password** excluded).

---

#### `GET /api/company/me`

**Auth:** required.

**Response `200`:**

```json
{
  "success": true,
  "message": "Company fetched successfully",
  "data": {
    "company": {}
  }
}
```

`company` includes populated `members` and `ownerId` fields as returned by Mongoose.

---

#### `GET /api/company/invites/pending`

**Auth:** required. **Roles:** `ADMIN`, `CEO`.

**Response `200`:**

```json
{
  "success": true,
  "message": "Pending invites fetched successfully",
  "data": { "invites": [] }
}
```

---

### Incidents — `/api/incidents`

All routes **require authentication**. Company scope is inferred from JWT.

Incident resource fields (Mongoose) include:

- `title`, `description`, `severity` (`P1` \| `P2` \| `P3`), `status` (`OPEN` \| `INVESTIGATING` \| `RESOLVED`)
- `createdBy`, `assignedUsers` (populated users with `name`, `email`)
- `companyId`, `resolvedAt`, `createdAt`, `updatedAt`
- Optional `postmortem`: `{ summary, rootCause, actionItems, generatedAt, aiGenerated }`

---

#### `POST /api/incidents/`

**Roles:** `ADMIN`, `CEO`.

**Body:**

```json
{
  "title": "API latency spike",
  "description": "P99 doubled in us-east.",
  "severity": "P2"
}
```

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "incident": {}
  }
}
```

---

#### `GET /api/incidents/`

**Query (optional):**

| Param      | Values                              |
| ---------- | ----------------------------------- |
| `status`   | `OPEN`, `INVESTIGATING`, `RESOLVED` |
| `severity` | `P1`, `P2`, `P3`                    |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "incidents": []
  }
}
```

---

#### `GET /api/incidents/:id`

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "incident": {},
    "timelineCount": 12
  }
}
```

---

#### `PATCH /api/incidents/:id/status`

**Roles:** `ADMIN`, `CEO`.

**Body:**

```json
{ "status": "INVESTIGATING" }
```

Sets `resolvedAt` automatically when `status` is `RESOLVED`.

**Response `200`:**

```json
{
  "success": true,
  "data": { "incident": {} }
}
```

---

#### `POST /api/incidents/:id/assign`

**Roles:** `ADMIN`, `CEO`.

**Body:**

```json
{
  "userIds": ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
}
```

All IDs must belong to the same active company or **400**.

**Response `200`:**

```json
{
  "success": true,
  "data": { "incident": {} }
}
```

Side effect: assignment emails to affected users via configured SMTP.

---

### Postmortem (AI) — `/api/incidents/:id/postmortem`

**Auth:** required.

#### `POST /api/incidents/:id/postmortem`

**Roles:** `ADMIN`, `CEO`.

Generates postmortem via **Mistral** using incident + timeline (`MISTRAL_API_KEY` required).

**Body:** none.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "postmortem": {
      "summary": "...",
      "rootCause": "...",
      "actionItems": "...",
      "generatedAt": "2026-05-02T10:00:00.000Z",
      "aiGenerated": true
    }
  }
}
```

---

#### `GET /api/incidents/:id/postmortem`

**Roles:** any authenticated member of company.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "incidentId": "507f1f77bcf86cd799439011",
    "title": "API latency spike",
    "severity": "P2",
    "status": "RESOLVED",
    "postmortem": {}
  }
}
```

**404** if postmortem was never generated.

---

### Timeline — `/api/timeline`

All routes **require authentication**.

#### `GET /api/timeline/:incidentId`

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "timeline": []
  }
}
```

Each timeline event: `incidentId`, `message`, `postedBy` (populated `name`, `email`), `companyId`, `createdAt`, `updatedAt`.

---

#### `POST /api/timeline/:incidentId`

**Body:**

```json
{ "message": "Restarted degraded pods in cluster B." }
```

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "timeline": {}
  }
}
```

Returns the single created event (populated `postedBy`).

---

### Public status — `/api/status`

No authentication.

#### `GET /api/status/public`

Returns **non-resolved** incidents **across all tenants** (each item includes `companyId`).

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "incidents": [],
    "groupedBySeverity": {
      "P1": [],
      "P2": [],
      "P3": []
    }
  }
}
```

Incident fields in list: `title`, `severity`, `status`, `createdAt`, `updatedAt`, and `companyId` where applicable.

---

#### `GET /api/status/public/:companySlug`

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "company": {
      "_id": "507f191e810c19729de860ea",
      "name": "Acme Inc",
      "slug": "acme-inc-xyz"
    },
    "incidents": [],
    "groupedBySeverity": {
      "P1": [],
      "P2": [],
      "P3": []
    }
  }
}
```

**404** if slug unknown.

---

### Contact / sales — `/api/contact`

Public B2B enquiry; stored in **`ContactInquiry`** plus optional email to `CONTACT_TEAM_EMAIL`.

#### `POST /api/contact`

**Body:**

```json
{
  "name": "Rahul Verma",
  "companyName": "Acme Logistics",
  "email": "rahul@acme.com",
  "message": "We want MayDayOps for our ops team (~50 seats). Please share onboarding steps.",
  "phone": "+91 98765 43210",
  "subject": "Enterprise purchase",
  "intent": "purchase_company"
}
```

| Field         | Required | Notes                                                      |
| ------------- | -------- | ---------------------------------------------------------- |
| `name`        | yes      | Contact person                                             |
| `companyName` | yes      | Company interested in product                              |
| `email`       | yes      | Valid email                                                |
| `message`     | yes      | Min length 10                                              |
| `subject`     | no       | Max 200 chars; defaults server-side                        |
| `phone`       | no       | Max 40 chars                                               |
| `intent`      | no       | `purchase_company` (default), `demo`, `pricing`, `general` |

**Response `201`:**

```json
{
  "success": true,
  "message": "Thanks — we've received your request. Our team will reach out about using MayDayOps for your company.",
  "data": { "id": "507f1f77bcf86cd799439011" }
}
```

`id` is the saved inquiry `_id`.

---

## WebSocket (Socket.IO)

Server attaches Socket.IO alongside HTTP (`FRONTEND_URL` CORS).

**Client auth:** handshake `auth: { token: "<jwt>" }`.

**Rooms:**

- Automatic: `company-<companyId>`
- On demand: emit `join:incident` / `leave:incident` with `incidentId`

**Server events (subset):**

| Event               | When                              |
| ------------------- | --------------------------------- |
| `incident:created`  | New incident created              |
| `incident:updated`  | Status (or other) update          |
| `incident:assigned` | Assignees changed                 |
| `timeline:new`      | New timeline entry on an incident |

---

## Production checklist

- Set strong `JWT_SECRET`; use HTTPS and correct `FRONTEND_URL`.
- Restrict MongoDB network access; use managed Atlas with TLS.
- Configure SMTP SPF/DKIM; verify `MAIL_FROM` and recipient policies (e.g. Brevo).
- Set `MISTRAL_API_KEY` for postmortem feature in production only if AI is enabled.
- Set `CONTACT_TEAM_EMAIL` for sales inbox delivery alongside DB persistence.
- Review global public status endpoint (`GET /api/status/public`) exposure — it aggregates cross-tenant non-resolved incidents; restrict or gate in production if that is undesirable.
- Tune `express-rate-limit` and body size limits for your traffic (`app.js`).
- Monitor logs (`morgan`) and structured logger output.

---

## License

See project `package.json` (`ISC` unless changed).
