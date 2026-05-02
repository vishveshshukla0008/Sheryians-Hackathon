const APIReference = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>

        <p className="text-text-muted max-w-3xl leading-relaxed">
          The MayDayOps API allows developers to programmatically manage incidents,
          automate workflows, and integrate monitoring systems. It follows REST principles,
          uses JSON for request/response bodies, and standard HTTP status codes.
        </p>

        <p className="text-text-muted max-w-3xl leading-relaxed mt-4">
          Typical use cases include triggering incidents from monitoring tools,
          fetching real-time incident status, updating timelines, and generating
          automated reports using AI.
        </p>
      </section>

      {/* BASE URL */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Base URL</h2>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
          https://api.maydayops.com/v1
        </div>

        <p className="text-text-muted mt-3 text-sm">
          All endpoints are relative to this base URL. All requests must be made over HTTPS.
        </p>
      </section>

      {/* CREATE INCIDENT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Create Incident</h2>

        <p className="text-text-muted mb-4 leading-relaxed">
          This endpoint is used to create a new incident. It is usually triggered
          automatically by monitoring systems when an anomaly is detected, or manually
          by engineers during outages.
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border mb-4">
{`POST /incidents`}
        </div>

        <h3 className="font-semibold mb-2">Request Body</h3>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`{
  "title": "Database Connection Failure",
  "severity": "critical",
  "service": "payments",
  "description": "Users unable to complete transactions"
}`}
        </div>

        <h3 className="font-semibold mt-6 mb-2">Response</h3>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`{
  "id": "inc_12345",
  "status": "active",
  "createdAt": "2026-05-02T10:45:00Z"
}`}
        </div>

        <p className="text-text-muted mt-4 text-sm">
          The response returns a unique incident ID which should be used for further updates.
        </p>
      </section>

      {/* UPDATE INCIDENT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Update Incident</h2>

        <p className="text-text-muted mb-4">
          Update an existing incident by adding logs, changing status, or updating severity.
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`POST /incidents/:id/update

{
  "message": "Fix deployed",
  "status": "resolved"
}`}
        </div>
      </section>

      {/* FETCH INCIDENT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Fetch Incidents</h2>

        <p className="text-text-muted mb-4">
          Retrieve incidents with optional filters such as status, severity, or service.
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
GET /incidents?status=active&severity=critical
        </div>

        <p className="text-text-muted mt-3 text-sm">
          Useful for dashboards and monitoring integrations.
        </p>
      </section>

      {/* BEST PRACTICE */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl">
        <h3 className="text-primary font-semibold mb-2">Best Practice</h3>

        <p className="text-text-muted text-sm leading-relaxed">
          Always include meaningful descriptions and correct severity levels.
          This ensures faster response time and better incident tracking across teams.
        </p>
      </section>

    </div>
  );
};

export default APIReference;