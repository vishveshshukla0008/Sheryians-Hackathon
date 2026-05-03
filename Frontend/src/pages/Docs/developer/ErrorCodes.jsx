import { FiAlertCircle } from "react-icons/fi";

const ErrorCodes = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiAlertCircle className="text-error" />
          Errors
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          MayDayOps uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the <code>2xx</code> range indicate success. Codes in the <code>4xx</code> range indicate an error that failed given the information provided.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* The Error Envelope */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">The Error Envelope</h2>
        <p className="text-text-muted max-w-3xl">
          When an API error occurs, MayDayOps returns a standard JSON envelope containing details about the failure. This structure is guaranteed to be consistent across all endpoints.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider font-bold">Standard Error Format</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto text-[#D4D4D4] leading-relaxed">
            <pre>
              {'{'}
              <span className="text-[#9CDCFE]">"error"</span>: {'{'}
              <span className="text-[#9CDCFE]">"type"</span>: <span className="text-[#CE9178]">"invalid_request_error"</span>,
              <span className="text-[#9CDCFE]">"code"</span>: <span className="text-[#CE9178]">"parameter_missing"</span>,
              <span className="text-[#9CDCFE]">"message"</span>: <span className="text-[#CE9178]">"The 'severity' field is required to create an incident."</span>,
              <span className="text-[#9CDCFE]">"param"</span>: <span className="text-[#CE9178]">"severity"</span>,
              <span className="text-[#9CDCFE]">"doc_url"</span>: <span className="text-[#CE9178]">"https://docs.maydayops.io/errors#parameter_missing"</span>
              {'}'}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* Error Codes Dictionary */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Common Error Codes</h2>
        <div className="overflow-hidden border border-border rounded-2xl bg-bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-input/50 text-text-muted text-xs uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-bold">Code</th>
                  <th className="px-6 py-4 font-bold">HTTP Status</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-input/30 transition-colors">
                  <td className="px-6 py-4 text-text font-mono font-bold">invalid_api_key</td>
                  <td className="px-6 py-4 text-text-muted"><code>401 Unauthorized</code></td>
                  <td className="px-6 py-4 text-text-muted">The provided API key is invalid, revoked, or formatted incorrectly.</td>
                </tr>
                <tr className="hover:bg-input/30 transition-colors">
                  <td className="px-6 py-4 text-text font-mono font-bold">resource_missing</td>
                  <td className="px-6 py-4 text-text-muted"><code>404 Not Found</code></td>
                  <td className="px-6 py-4 text-text-muted">The requested Incident ID or Workspace ID does not exist.</td>
                </tr>
                <tr className="hover:bg-input/30 transition-colors">
                  <td className="px-6 py-4 text-text font-mono font-bold">rate_limit_exceeded</td>
                  <td className="px-6 py-4 text-text-muted"><code>429 Too Many Requests</code></td>
                  <td className="px-6 py-4 text-text-muted">Too many requests hit the API too quickly. Back off and try again.</td>
                </tr>
                <tr className="hover:bg-input/30 transition-colors">
                  <td className="px-6 py-4 text-text font-mono font-bold">incident_locked</td>
                  <td className="px-6 py-4 text-text-muted"><code>409 Conflict</code></td>
                  <td className="px-6 py-4 text-text-muted">Attempted to append an event to an incident that has already been marked as Resolved.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ErrorCodes;