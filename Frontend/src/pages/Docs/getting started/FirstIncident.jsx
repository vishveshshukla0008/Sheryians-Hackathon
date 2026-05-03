import { FiLayout, FiCode, FiZap } from "react-icons/fi";

const FirstIncident = () => {
  return (
    <div className="animate-fade-in-up space-y-16 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Your First Incident
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Learn how to log, manage, and resolve a system outage. You can create an incident manually via the Dashboard UI, or programmatically via the API.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* The Lifecycle */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-text">The Incident Lifecycle</h2>
        <p className="text-text-muted text-lg">
          Incidents flow through a standardized state machine to ensure everyone knows exactly what phase of recovery the team is in.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 border border-border rounded-xl bg-bg-surface">
            <span className="inline-block px-3 py-1 rounded-full border border-border bg-bg text-sm font-bold mb-3">1. Detected</span>
            <p className="text-text-muted text-sm leading-relaxed">The incident has just been created. Alerts are firing, and on-call engineers are being notified via Email and Slack. No one has explicitly taken ownership yet.</p>
          </div>
          <div className="p-5 border border-primary/30 rounded-xl bg-primary/5">
            <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/20 text-primary text-sm font-bold mb-3">2. Investigating</span>
            <p className="text-text-muted text-sm leading-relaxed">A responder has acknowledged the alert. The team is actively diagnosing the root cause and deploying hotfixes to the staging environment.</p>
          </div>
          <div className="p-5 border border-ring/30 rounded-xl bg-ring/5">
            <span className="inline-block px-3 py-1 rounded-full border border-ring/30 bg-ring/20 text-ring text-sm font-bold mb-3">3. Mitigated</span>
            <p className="text-text-muted text-sm leading-relaxed">The immediate bleeding has stopped (e.g., traffic rolled back to a stable version), but the underlying bug still needs to be permanently patched.</p>
          </div>
          <div className="p-5 border border-[#4CAF50]/30 rounded-xl bg-[#4CAF50]/5">
            <span className="inline-block px-3 py-1 rounded-full border border-[#4CAF50]/30 bg-[#4CAF50]/20 text-[#4CAF50] text-sm font-bold mb-3">4. Resolved</span>
            <p className="text-text-muted text-sm leading-relaxed">The system is fully stable. The timeline is locked, and Mistral AI is automatically generating the Postmortem report for team review.</p>
          </div>
        </div>
      </section>

      {/* UI vs API */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-text mb-6">Creating an Incident</h2>

        {/* Via Dashboard */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-text flex items-center gap-2">
            <FiLayout className="text-primary" /> Method 1: Via Dashboard
          </h3>
          <p className="text-text-muted">
            If a customer reports an issue or you notice an anomaly manually, you can declare an incident from the UI.
          </p>
          <ol className="list-decimal list-inside space-y-3 text-text-muted ml-2 bg-bg-surface p-6 rounded-xl border border-border">
            <li>Navigate to the <strong className="text-text">Incidents</strong> tab in your workspace.</li>
            <li>Click the <strong className="text-text bg-primary/10 text-primary px-2 py-0.5 rounded">Declare Incident</strong> button.</li>
            <li>Fill in the Title, Description, and select the affected <strong className="text-text">Service</strong> (e.g., "Payments API").</li>
            <li>Select the <strong className="text-text">Severity</strong> (SEV-1 is critical, SEV-4 is minor).</li>
            <li>Click Submit. The Live War Room will immediately open.</li>
          </ol>
        </div>

        {/* Via API */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-text flex items-center gap-2">
            <FiCode className="text-primary" /> Method 2: Via REST API
          </h3>
          <p className="text-text-muted">
            For automated systems like Datadog, Prometheus, or AWS CloudWatch, trigger incidents via our secure REST endpoint.
          </p>

          <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
            <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex gap-3 items-center">
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/20 text-blue-400 font-bold">POST</span>
              <span className="text-sm font-mono text-white/80">/api/incidents</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-[#D4D4D4] leading-relaxed">
                <span className="text-[#6A9955]">{"// Example cURL request from an automated monitor"}</span>
                <span className="text-[#569CD6]">curl</span> -X POST https://api.maydayops.io/v1/incidents \
                -H <span className="text-[#CE9178]" >"Authorization: Bearer YOUR_API_KEY"</span> \
                -H <span className="text-[#CE9178]" >"Content-Type: application/json"</span> \
                -d <span className="text-[#CE9178]" >'{"{"}
                  "title": "High CPU utilization on Postgres Primary",
                  "severity": "SEV-2",
                  "service": "database-cluster",
                  "description": "CPU spiked to 99% for over 5 minutes."
                  {"}"}'</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time sync note */}
      <section className="p-6 rounded-2xl border border-ring/30 bg-ring/5 flex flex-col sm:flex-row gap-5 items-start shadow-sm">
        <div className="p-3 bg-ring/20 rounded-xl text-ring shrink-0">
          <FiZap size={24} />
        </div>
        <div>
          <h3 className="text-xl text-ring font-bold mb-2">Real-Time WebSockets</h3>
          <p className="text-text-muted leading-relaxed">
            The moment an incident is created (via UI or API), a <code>incident:created</code> WebSocket event is fired. All users currently logged into the workspace will see the incident appear on their dashboard instantly, without needing to refresh the page.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FirstIncident;
