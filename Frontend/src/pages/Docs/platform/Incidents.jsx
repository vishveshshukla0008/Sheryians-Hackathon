
const Incidents = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Incident Management
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          An Incident is the core object of MayDayOps. It represents an active disruption to your systems. Proper incident structure ensures MTTR (Mean Time To Recovery) is kept to an absolute minimum.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Severity System */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-2">Severity Levels (SEV)</h2>
        <p className="text-text-muted mb-6 max-w-3xl">
          Standardizing how you measure impact prevents panic. "Is this a wake-the-CEO issue, or a fix-it-tomorrow issue?"
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 border border-error/40 rounded-xl bg-error/5 flex gap-4 items-start">
            <span className="px-3 py-1 bg-error text-white font-bold rounded text-sm shrink-0">SEV-1</span>
            <div>
              <h3 className="font-bold text-text mb-1">Critical / Outage</h3>
              <p className="text-sm text-text-muted">Core business systems are entirely down. Customers cannot pay, login, or use the primary product. Requires immediate all-hands response.</p>
            </div>
          </div>

          <div className="p-5 border border-ring/40 rounded-xl bg-ring/5 flex gap-4 items-start">
            <span className="px-3 py-1 bg-ring text-white font-bold rounded text-sm shrink-0">SEV-2</span>
            <div>
              <h3 className="font-bold text-text mb-1">Major Degradation</h3>
              <p className="text-sm text-text-muted">A significant feature is broken, but workarounds exist or it only affects a subset of users. Paging required, but not necessarily all-hands.</p>
            </div>
          </div>

          <div className="p-5 border border-primary/40 rounded-xl bg-primary/5 flex gap-4 items-start">
            <span className="px-3 py-1 bg-primary text-white font-bold rounded text-sm shrink-0">SEV-3</span>
            <div>
              <h3 className="font-bold text-text mb-1">Minor Issue</h3>
              <p className="text-sm text-text-muted">Noticeable bugs or performance degradation, but non-blocking. Handled during normal business hours by the owning team.</p>
            </div>
          </div>

          <div className="p-5 border border-[#4CAF50]/40 rounded-xl bg-[#4CAF50]/5 flex gap-4 items-start">
            <span className="px-3 py-1 bg-[#4CAF50] text-white font-bold rounded text-sm shrink-0">SEV-4</span>
            <div>
              <h3 className="font-bold text-text mb-1">Low / Cosmetic</h3>
              <p className="text-sm text-text-muted">Internal tooling issues, minor UI glitches, or insignificant anomalies. Handled via standard backlog grooming.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Anatomy of an Incident */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Anatomy of an Incident Payload</h2>
        <p className="text-text-muted">When declaring an incident via the API, context is everything. The more data you provide, the faster responders can act.</p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex gap-3 items-center">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/20 text-blue-400 font-bold">POST</span>
            <span className="text-sm font-mono text-white/80">/api/incidents</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-[#D4D4D4] leading-relaxed">
              {'{'}
              <span className="text-[#6A9955]">"// 1. Core Identifiers"</span>
              <span className="text-[#9CDCFE]">"title"</span>: <span className="text-[#CE9178]">"Redis Cache Eviction Spike"</span>,
              <span className="text-[#9CDCFE]">"severity"</span>: <span className="text-[#CE9178]">"SEV-2"</span>,

              <span className="text-[#6A9955]">"// 2. Routing (Crucial for Auto-Assignment)"</span>
              <span className="text-[#9CDCFE]">"serviceId"</span>: <span className="text-[#CE9178]">"srv_9823749823"</span>,

              <span className="text-[#6A9955]">"// 3. Context (Markdown Supported)"</span>
              <span className="text-[#9CDCFE]">"description"</span>: <span className="text-[#CE9178]">"Metrics indicate a 400% spike in cache evictions..."</span>,

              <span className="text-[#6A9955]">"// 4. Integrations"</span>
              <span className="text-[#9CDCFE]">"notifySlackChannel"</span>: <span className="text-[#569CD6]">true</span>
              {'}'}
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Incidents;