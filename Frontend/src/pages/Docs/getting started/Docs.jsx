import { Link } from "react-router";
import { FiArrowRight, FiActivity, FiCpu, FiMessageSquare, FiBookOpen, FiLayers, FiShield } from "react-icons/fi";

const Docs = () => {
  return (
    <div className="animate-fade-in-up space-y-16 pb-12">

      {/* Header */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Introduction to MayDayOps
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl mb-6">
          MayDayOps is a comprehensive, multi-tenant incident response platform designed for high-velocity engineering teams. It bridges the gap between system alerts and human action.
        </p>
        <p className="text-lg text-text-muted leading-relaxed max-w-3xl">
          When production systems fail, every second counts. MayDayOps centralizes alerting, on-call scheduling, real-time collaboration, and post-incident analysis into a single unified workflow, ensuring your team can recover from downtime with confidence and speed.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Core Concepts */}
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-text mb-3">Core Capabilities</h2>
          <p className="text-text-muted text-lg">Our platform is engineered around three pillars of reliability.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <FiActivity size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-3">Live War Room</h3>
            <p className="text-text-muted leading-relaxed">
              Ditch scattered chat threads. Every incident spins up a dedicated, WebSocket-powered timeline where system events, metric snapshots, and team communications are logged immutably in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <FiShield size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-3">Role-Based Access (RBAC)</h3>
            <p className="text-text-muted leading-relaxed">
              Incident response requires different contexts. Admins manage configurations, Developers execute fixes, and CEOs/Stakeholders get high-level impact summaries without the technical noise.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <FiCpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-text mb-3">AI Postmortems</h3>
            <p className="text-text-muted leading-relaxed">
              Powered by Mistral AI, MayDayOps automatically reads your incident timeline upon resolution to draft Root Cause Analyses (RCA), timeline summaries, and prevention strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Key Terminology */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Key Terminology</h2>
        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border/60">
            <div className="p-6 flex flex-col md:flex-row gap-4 md:gap-8 hover:bg-input/30 transition-colors">
              <div className="md:w-1/4 font-bold text-text flex items-center gap-2">
                <FiLayers className="text-primary" /> Workspace
              </div>
              <div className="md:w-3/4 text-text-muted">
                An isolated environment for your organization. All incidents, users, and services belong to a specific workspace. Multi-tenant architecture ensures strict data boundaries.
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-4 md:gap-8 hover:bg-input/30 transition-colors">
              <div className="md:w-1/4 font-bold text-text flex items-center gap-2">
                <FiBookOpen className="text-primary" /> Incident
              </div>
              <div className="md:w-3/4 text-text-muted">
                A tracked event representing a disruption in service. Incidents carry a Severity (SEV-1 to SEV-4), a Status, and an assigned list of Responders.
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-4 md:gap-8 hover:bg-input/30 transition-colors">
              <div className="md:w-1/4 font-bold text-text flex items-center gap-2">
                <FiMessageSquare className="text-primary" /> Timeline Event
              </div>
              <div className="md:w-3/4 text-text-muted">
                An atomic entry in an incident's history. This can be an automated system alert, a status change, or a manual comment added by an investigating developer.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-text">Where to go next</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/docs/quick-start"
            className="flex items-center justify-between p-5 rounded-xl border border-border hover:border-primary bg-bg-surface transition-colors group w-full sm:w-1/2 shadow-sm hover:shadow-md"
          >
            <div>
              <p className="text-lg font-bold text-text mb-1">Quick Start</p>
              <p className="text-text-muted">Set up your local environment</p>
            </div>
            <FiArrowRight className="text-text-muted group-hover:text-primary transition-colors size-6" />
          </Link>

          <Link
            to="/docs/api"
            className="flex items-center justify-between p-5 rounded-xl border border-border hover:border-primary bg-bg-surface transition-colors group w-full sm:w-1/2 shadow-sm hover:shadow-md"
          >
            <div>
              <p className="text-lg font-bold text-text mb-1">API Reference</p>
              <p className="text-text-muted">Explore REST endpoints</p>
            </div>
            <FiArrowRight className="text-text-muted group-hover:text-primary transition-colors size-6" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Docs;