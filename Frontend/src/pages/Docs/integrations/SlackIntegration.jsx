import { FiRefreshCw, FiHash, FiTerminal } from "react-icons/fi";
import { SiSlack } from "react-icons/si"; // Using the official Slack icon if you have react-icons/si

const SlackIntegration = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <SiSlack className="text-[#E01E5A]" />
          Slack ChatOps
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Meet developers where they already work. The MayDayOps Slack integration provides bi-directional syncing, allowing you to declare, manage, and resolve incidents entirely from within Slack.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Feature Breakdown */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-text mb-4">Core Capabilities</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiHash className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Dedicated Channels</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              When an incident is declared, the bot automatically creates a dedicated channel (e.g., `#inc-payment-outage`) and invites the assigned on-call responders.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiRefreshCw className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Bi-Directional Sync</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Messages pinned or tagged with a specific emoji in the Slack channel are automatically pulled into the MayDayOps Live Timeline as formal updates.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiTerminal className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Slash Commands</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Update severity, reassign roles, or declare resolution using native Slack slash commands without opening the dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Slack Block Kit Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Interactive Alerts (Block Kit)</h2>
        <p className="text-text-muted max-w-3xl">
          Alerts sent to your `#engineering-alerts` channel use Slack's Block Kit UI, providing actionable buttons right in the chat.
        </p>

        <div className="bg-[#1A1D21] border border-border/20 rounded-xl p-6 max-w-2xl shadow-lg font-sans">
          <div className="flex gap-4">
            <div className="size-10 rounded bg-white flex items-center justify-center shrink-0">
              {/* Faking a logo avatar */}
              <span className="font-black text-black">MD</span>
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white">MayDayOps</span>
                <span className="text-xs px-1 rounded bg-[#E01E5A] text-white font-bold">APP</span>
                <span className="text-xs text-gray-400">10:45 AM</span>
              </div>
              <p className="text-[#D1D2D3] mb-3">
                <span className="text-[#E01E5A]">🚨 New Incident Declared:</span> <strong>Redis Cache Eviction Spike</strong>
              </p>

              <div className="border-l-4 border-[#E01E5A] pl-3 py-1 mb-3">
                <p className="text-[#D1D2D3] text-sm"><strong className="text-white">Severity:</strong> SEV-2</p>
                <p className="text-[#D1D2D3] text-sm"><strong className="text-white">Service:</strong> database-cluster</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="bg-[#007A5A] hover:bg-[#148567] text-white text-sm font-bold px-4 py-1.5 rounded transition-colors">
                  Acknowledge
                </button>
                <button className="bg-[#222529] hover:bg-[#2C3035] text-[#D1D2D3] border border-[#565856] text-sm font-bold px-4 py-1.5 rounded transition-colors">
                  Join Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Setting up Webhooks (API)</h2>
        <p className="text-text-muted">
          Link your workspace to a Slack Webhook URL to enable one-way alerting. For bi-directional sync, you must install the MayDayOps Slack App via OAuth.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex gap-3 items-center">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/20 text-blue-400 font-bold">POST</span>
            <span className="text-sm font-mono text-white/80">/api/integrations/slack</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto text-[#D4D4D4] leading-relaxed">
            <pre>
              {'{'}
              <span className="text-[#9CDCFE]">"webhookUrl"</span>: <span className="text-[#CE9178]">"https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"</span>,
              <span className="text-[#9CDCFE]">"defaultChannel"</span>: <span className="text-[#CE9178]">"#engineering-alerts"</span>,
              <span className="text-[#9CDCFE]">"events"</span>: [
              <span className="text-[#CE9178]">"incident.created"</span>,
              <span className="text-[#CE9178]">"incident.resolved"</span>
              ]
              {'}'}
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SlackIntegration;