const ErrorCodes = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Error Codes</h1>

        <p className="text-text-muted max-w-3xl leading-relaxed">
          The MayDayOps API uses standard HTTP status codes to indicate
          the success or failure of a request. Understanding these errors
          is essential for debugging issues and building reliable integrations.
        </p>

        <p className="text-text-muted max-w-3xl leading-relaxed mt-4">
          Each error response includes a status code and a message explaining
          what went wrong. Developers should always handle these errors properly
          to ensure smooth user experience.
        </p>
      </section>

      {/* ERROR STRUCTURE */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Error Response Format</h2>

        <p className="text-text-muted mb-4">
          All errors follow a consistent JSON structure:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`{
  "error": "Invalid request",
  "code": 400,
  "details": "Missing required field: title"
}`}
        </div>
      </section>

      {/* CLIENT ERRORS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Client Errors (4xx)</h2>

        <div className="space-y-6">

          {/* 400 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">400 — Bad Request</h3>

            <p className="text-text-muted text-sm mb-2">
              The request is invalid or missing required parameters.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Check your request body and ensure all required
              fields are provided correctly.
            </p>
          </div>

          {/* 401 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">401 — Unauthorized</h3>

            <p className="text-text-muted text-sm mb-2">
              Authentication token is missing or invalid.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Ensure you are sending a valid Bearer token
              in the Authorization header.
            </p>
          </div>

          {/* 403 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">403 — Forbidden</h3>

            <p className="text-text-muted text-sm mb-2">
              You do not have permission to access this resource.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Check user roles and permissions.
            </p>
          </div>

          {/* 404 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">404 — Not Found</h3>

            <p className="text-text-muted text-sm mb-2">
              The requested resource does not exist.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Verify the endpoint URL or resource ID.
            </p>
          </div>

        </div>
      </section>

      {/* SERVER ERRORS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Server Errors (5xx)</h2>

        <div className="space-y-6">

          {/* 500 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">500 — Internal Server Error</h3>

            <p className="text-text-muted text-sm mb-2">
              Something went wrong on the server.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Retry the request or check system status.
            </p>
          </div>

          {/* 503 */}
          <div className="p-5 border border-border rounded-xl">
            <h3 className="font-semibold mb-2">503 — Service Unavailable</h3>

            <p className="text-text-muted text-sm mb-2">
              The service is temporarily unavailable due to maintenance or overload.
            </p>

            <p className="text-text-muted text-sm">
              <strong>Fix:</strong> Retry after some time or check status page.
            </p>
          </div>

        </div>
      </section>

      {/* DEBUGGING GUIDE */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Debugging Tips</h2>

        <div className="space-y-3 text-text-muted leading-relaxed">

          <p>• Always log API responses for debugging.</p>
          <p>• Check request payload before sending.</p>
          <p>• Validate authentication headers.</p>
          <p>• Use Postman or curl to test endpoints.</p>

        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl">

        <h3 className="text-primary font-semibold mb-2">
          Common Mistakes
        </h3>

        <div className="text-text-muted text-sm space-y-2">

          <p>• Sending incorrect JSON format</p>
          <p>• Missing required fields</p>
          <p>• Using expired API tokens</p>
          <p>• Calling wrong endpoints</p>

        </div>

      </section>

    </div>
  );
};

export default ErrorCodes;