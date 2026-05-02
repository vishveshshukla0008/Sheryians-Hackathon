import { FiMessageSquare, FiSend } from "react-icons/fi";

const SlackIntegration = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FiMessageSquare className="text-primary" />
          Slack Integration
        </h1>

        <p className="text-text-muted max-w-2xl">
          Connect MayDayOps with Slack to receive instant alerts,
          collaborate with your team, and resolve incidents faster.
        </p>
      </section>

      {/* CHANNEL FLOW */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Workflow
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">

          {[
            "Incident Triggered",
            "Slack Alert Sent",
            "Team Discussion",
            "Resolution"
          ].map((step, i) => (

            <div
              key={i}
              className="px-5 py-2 border border-border rounded-full bg-bg-surface
              text-sm hover:border-primary transition"
            >
              {step}
            </div>

          ))}

        </div>

      </section>

      {/* SLACK MESSAGE PREVIEW */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Example Slack Alert
        </h2>

        <div className="bg-black p-6 rounded-xl text-sm border border-border space-y-2">

          <p className="text-red-400">
            🚨 *Critical Incident Detected*
          </p>

          <p>
            Service: Payments API  
            Status: Down  
            Assigned: DevOps Team
          </p>

        </div>

      </section>

      {/* COMMANDS */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Slack Commands
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            "/incident create",
            "/incident status",
            "/incident resolve"
          ].map((cmd, i) => (

            <div
              key={i}
              className="p-5 border border-border rounded-xl bg-bg-surface
              font-mono text-sm hover:border-primary transition"
            >
              {cmd}
            </div>

          ))}

        </div>

      </section>

      {/* API */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Connect Slack (API)
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/integrations/slack

{
  "webhook_url": "https://hooks.slack.com/..."
}`}
        </div>

      </section>

      {/* TIP */}
      <section className="p-6 border border-primary/30 rounded-xl bg-primary/5">

        <h3 className="text-primary font-semibold flex items-center gap-2 mb-2">
          <FiSend />
          Best Practice
        </h3>

        <p className="text-text-muted text-sm">
          Create dedicated Slack channels for incidents to keep communication
          organized and avoid noise.
        </p>

      </section>

    </div>
  );
};

export default SlackIntegration;