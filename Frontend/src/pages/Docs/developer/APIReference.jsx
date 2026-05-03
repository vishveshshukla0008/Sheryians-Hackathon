import { FiCode, FiLayers, FiZap, FiServer } from "react-icons/fi";

const APIReference = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiCode className="text-primary" />
          API Reference
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          The MayDayOps API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Core Concepts */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Base URL & Conventions</h2>

        <div className="bg-bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted font-bold uppercase tracking-wider mb-1">Production API</p>
            <p className="font-mono text-text text-lg">https://api.maydayops.io/v1</p>
          </div>
          <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded font-bold text-sm">
            Status: Operational
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiLayers className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Pagination</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              All top-level API resources have support for bulk fetches via "list" API methods. These list API methods share a common structure, returning a <code>has_more</code> boolean and a <code>data</code> array. We use cursor-based pagination via the <code>starting_after</code> parameter.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiZap className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Idempotency</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              The API supports idempotency for safely retrying requests without accidentally performing the same operation twice. Attach an <code>Idempotency-Key: &lt;uuid&gt;</code> header to your POST requests.
            </p>
          </div>
        </div>
      </section>

      {/* Endpoint: Create Incident */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <FiServer className="text-primary" /> Create an Incident
        </h2>
        <p className="text-text-muted max-w-3xl">
          Creates a new incident object. If you provide a <code>serviceId</code>, the API will automatically run routing rules to assign the correct on-call responders.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/20 text-blue-400 font-bold">POST</span>
              <span className="text-sm font-mono text-white/80">/v1/incidents</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {/* Left: Params */}
            <div className="p-6 border-r border-border/20 bg-[#1E1E1E]">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Body Parameters</h4>
              <ul className="space-y-4">
                <li className="border-b border-border/10 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-[#9CDCFE] text-sm">title</code>
                    <span className="text-[10px] text-error border border-error/30 px-1.5 rounded uppercase">Required</span>
                  </div>
                  <p className="text-xs text-[#D4D4D4]">string &middot; Max 100 chars. The high-level summary of the issue.</p>
                </li>
                <li className="border-b border-border/10 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-[#9CDCFE] text-sm">severity</code>
                    <span className="text-[10px] text-error border border-error/30 px-1.5 rounded uppercase">Required</span>
                  </div>
                  <p className="text-xs text-[#D4D4D4]">enum &middot; <code>SEV-1</code>, <code>SEV-2</code>, <code>SEV-3</code>, <code>SEV-4</code>.</p>
                </li>
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-[#9CDCFE] text-sm">serviceId</code>
                  </div>
                  <p className="text-xs text-[#D4D4D4]">string &middot; The ID of the affected service. Triggers auto-assignment if provided.</p>
                </li>
              </ul>
            </div>

            {/* Right: Code & Response */}
            <div className="p-6 bg-[#161616]">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Example Request</h4>
              <pre className="text-xs font-mono text-[#D4D4D4] mb-6 overflow-x-auto">
                <span className="text-[#569CD6]">curl</span> https://api.maydayops.io/v1/incidents \
                -H <span className="text-[#CE9178]">"Authorization: Bearer mdo_live_secret123"</span> \
                -d title=<span className="text-[#CE9178]">"Database Latency"</span> \
                -d severity=<span className="text-[#CE9178]">"SEV-2"</span>
              </pre>
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Response <span className="text-success font-normal lowercase ml-2">201 Created</span></h4>
              <pre className="text-xs font-mono text-[#D4D4D4] overflow-x-auto">
                {'{'}
                <span className="text-[#9CDCFE]">"id"</span>: <span className="text-[#CE9178]">"inc_0987654321"</span>,
                <span className="text-[#9CDCFE]">"object"</span>: <span className="text-[#CE9178]">"incident"</span>,
                <span className="text-[#9CDCFE]">"status"</span>: <span className="text-[#CE9178]">"investigating"</span>,
                <span className="text-[#9CDCFE]">"timeline_url"</span>: <span className="text-[#CE9178]">"https://app.maydayops.io/i/inc_0987"</span>
                {'}'}
              </pre>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default APIReference;