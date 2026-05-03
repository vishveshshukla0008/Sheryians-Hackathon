import { FiShield, FiBriefcase, FiKey } from "react-icons/fi";

const Workspaces = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          Workspaces
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Workspaces form the architectural foundation of MayDayOps. They provide strict data isolation, allowing enterprise organizations to manage multiple autonomous teams within a single billing account.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Multi-Tenant Architecture */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-text mb-4">Multi-Tenant Isolation</h2>
        <p className="text-text-muted text-lg max-w-3xl">
          Under the hood, every Incident, Timeline Event, and Member is strictly scoped to a `workspaceId`. This guarantees that an incident in the "Marketing Site" workspace cannot bleed into the "Core Banking API" workspace.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiBriefcase className="text-primary size-8 mb-4" />
            <h3 className="font-bold text-text mb-2">Team Autonomy</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Different engineering squads can define their own severity definitions, connect their own Slack channels, and manage their own on-call schedules.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiShield className="text-primary size-8 mb-4" />
            <h3 className="font-bold text-text mb-2">Data Boundaries</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              API keys and integration webhooks are bound to the workspace. A compromised Datadog integration in Workspace A cannot trigger alerts in Workspace B.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiKey className="text-primary size-8 mb-4" />
            <h3 className="font-bold text-text mb-2">Granular Access</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              A user can be an `Admin` in the Frontend workspace, but only a `Viewer` in the Database workspace.
            </p>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Provisioning via API</h2>
        <p className="text-text-muted">
          Enterprise customers often automate workspace creation when onboarding new internal engineering teams.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex gap-3 items-center">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/20 text-blue-400 font-bold">POST</span>
            <span className="text-sm font-mono text-white/80">/api/workspaces</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-[#D4D4D4] leading-relaxed">
              <span className="text-[#9CDCFE]">Body</span>:
              {'{'}
              <span className="text-[#9CDCFE]">"name"</span>: <span className="text-[#CE9178]">"Data Engineering Platform"</span>,
              <span className="text-[#9CDCFE]">"slug"</span>: <span className="text-[#CE9178]">"data-eng"</span>,
              <span className="text-[#9CDCFE]">"settings"</span>: {'{'}
              <span className="text-[#9CDCFE]">"requirePostmortem"</span>: <span className="text-[#569CD6]">true</span>,
              <span className="text-[#9CDCFE]">"defaultSeverity"</span>: <span className="text-[#CE9178]">"SEV-3"</span>
              {'}'}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Workspaces;