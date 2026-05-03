import { FiGlobe, FiLock, FiBell } from "react-icons/fi";

const StatusPage = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Status Pages
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Transparency builds trust. MayDayOps allows you to automatically translate internal technical chaos into clear, public-facing or private stakeholder communications.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Internal vs Public */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Dual-Layer Communication</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-border rounded-xl bg-bg-surface hover:border-primary/50 transition-colors">
            <FiGlobe className="text-primary size-8 mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Public Status Page</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Customer-facing. Hosted on a custom domain (e.g., `status.yourcompany.com`). You have complete control over which services and which incidents are visible here. It abstracts technical details ("Redis Eviction") into customer impact ("Checkout delays").
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-xl bg-bg-surface hover:border-primary/50 transition-colors">
            <FiLock className="text-text-muted size-8 mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Internal Status Page</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Stakeholder-facing. Protected behind SSO. Displays exact technical degradation across microservices, allowing Account Managers and internal teams to check system health without pinging the engineering team on Slack.
            </p>
          </div>
        </div>
      </section>

      {/* Component Degradation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Service Degradation Logic</h2>
        <p className="text-text-muted max-w-3xl">
          A status page is comprised of components (e.g., "Authentication API", "Payment Gateway"). When an incident is tied to a specific component, its status automatically degrades based on the Incident Severity:
        </p>
        
        <ul className="space-y-4 max-w-3xl bg-bg-surface p-6 rounded-xl border border-border">
          <li className="flex items-center gap-4">
            <span className="w-32 text-sm font-mono text-error font-bold">Major Outage</span>
            <span className="text-text-muted text-sm">Triggered by SEV-1 incidents. Component is fully down.</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="w-32 text-sm font-mono text-ring font-bold">Partial Outage</span>
            <span className="text-text-muted text-sm">Triggered by SEV-2 incidents. Component is experiencing heavy failure rates.</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="w-32 text-sm font-mono text-primary font-bold">Degraded</span>
            <span className="text-text-muted text-sm">Triggered by SEV-3 incidents. Component is slow or throwing intermittent errors.</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="w-32 text-sm font-mono text-success font-bold">Operational</span>
            <span className="text-text-muted text-sm">No active incidents. Systems operating normally.</span>
          </li>
        </ul>
      </section>

      {/* Subscriptions */}
      <section className="p-6 rounded-2xl border border-border bg-bg-surface flex flex-col sm:flex-row gap-5 items-start">
        <div className="p-3 bg-input rounded-xl text-text-muted shrink-0">
          <FiBell size={24} />
        </div>
        <div>
          <h3 className="text-lg text-text font-bold mb-2">Subscriber Notifications</h3>
          <p className="text-text-muted leading-relaxed text-sm">
            Users can subscribe to your Public Status page via Email or Webhook. When you post an update to an incident marked as "Public", MayDayOps automatically fans out emails to all subscribers using the Resend integration.
          </p>
        </div>
      </section>

    </div>
  );
};

export default StatusPage;