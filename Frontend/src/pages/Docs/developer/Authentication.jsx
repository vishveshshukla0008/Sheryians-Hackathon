const Authentication = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Authentication</h1>

        <p className="text-text-muted max-w-3xl leading-relaxed">
          All requests to the MayDayOps API must be authenticated using a Bearer token.
          This ensures secure communication and prevents unauthorized access to your
          incidents and system data.
        </p>

        <p className="text-text-muted max-w-3xl leading-relaxed mt-4">
          Authentication is handled using API keys generated from your dashboard.
          These keys should be kept secure and never exposed in frontend code.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">How Authentication Works</h2>

        <div className="space-y-3 text-text-muted leading-relaxed">
          <p>1. Generate your API key from the MayDayOps dashboard.</p>
          <p>2. Include the key in every API request using the Authorization header.</p>
          <p>3. The server validates the token before processing the request.</p>
          <p>4. If the token is invalid or missing, the request is rejected.</p>
        </div>
      </section>

      {/* HEADER FORMAT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Authorization Header</h2>

        <p className="text-text-muted mb-4">
          All requests must include the following header:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`Authorization: Bearer YOUR_API_KEY`}
        </div>

        <p className="text-text-muted text-sm mt-3">
          Replace <code>YOUR_API_KEY</code> with your actual API token.
        </p>
      </section>

      {/* EXAMPLE REQUEST */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Example Request</h2>

        <p className="text-text-muted mb-4">
          Example of creating an incident with authentication:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`POST /api/incidents

Headers:
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

Body:
{
  "title": "Server Crash",
  "severity": "critical"
}`}
        </div>
      </section>

      {/* SECURITY NOTES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Security Best Practices</h2>

        <div className="space-y-3 text-text-muted leading-relaxed">
          <p>• Never expose API keys in frontend applications.</p>
          <p>• Always store keys securely in environment variables.</p>
          <p>• Rotate API keys periodically.</p>
          <p>• Use role-based access for better security control.</p>
        </div>
      </section>

      {/* ERROR HANDLING */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Authentication Errors</h2>

        <div className="space-y-4">

          <div className="p-4 border border-border rounded-lg">
            <p className="font-mono text-sm mb-1">401 Unauthorized</p>
            <p className="text-text-muted text-sm">
              The request is missing a valid authentication token.
            </p>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <p className="font-mono text-sm mb-1">403 Forbidden</p>
            <p className="text-text-muted text-sm">
              The token is valid but does not have permission to access this resource.
            </p>
          </div>

        </div>
      </section>

      {/* TIP */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl">

        <h3 className="text-primary font-semibold mb-2">
          Pro Tip
        </h3>

        <p className="text-text-muted text-sm leading-relaxed">
          If you're integrating with backend services, always handle token validation
          errors gracefully and retry requests only when necessary.
        </p>

      </section>

    </div>
  );
};

export default Authentication;