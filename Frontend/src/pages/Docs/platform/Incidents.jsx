import { FiAlertTriangle, FiActivity } from "react-icons/fi";

const Incidents = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">
          Incident Management
        </h1>

        <p className="text-text-muted max-w-2xl">
          Track, manage, and resolve production incidents with real-time visibility.
          MayDayOps ensures faster response with structured workflows and automation.
        </p>
      </section>

      {/* 🔥 LIVE INCIDENT CARDS */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Active Incidents
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            {
              title: "Payment Service Down",
              severity: "Critical",
              status: "Ongoing"
            },
            {
              title: "API Latency Spike",
              severity: "High",
              status: "Investigating"
            }
          ].map((item, i) => (

            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-bg-surface
              hover:border-primary transition-all duration-300"
            >

              {/* top */}
              <div className="flex justify-between items-center mb-4">

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${item.severity === "Critical" && "bg-red-500/20 text-red-400"}
                  ${item.severity === "High" && "bg-yellow-500/20 text-yellow-400"}
                `}>
                  {item.severity}
                </span>

              </div>

              {/* status */}
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <FiActivity className="text-primary" />
                {item.status}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 SEVERITY SYSTEM */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Severity Levels
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          {[
            { name: "Critical", color: "bg-red-500/20 text-red-400", desc: "System down" },
            { name: "High", color: "bg-yellow-500/20 text-yellow-400", desc: "Major issue" },
            { name: "Medium", color: "bg-blue-500/20 text-blue-400", desc: "Partial impact" },
            { name: "Low", color: "bg-green-500/20 text-green-400", desc: "Minor issue" }
          ].map((item, i) => (

            <div
              key={i}
              className="p-5 border border-border rounded-xl bg-bg-surface hover:border-primary transition"
            >

              <div className={`inline-block px-3 py-1 rounded-full text-xs mb-2 ${item.color}`}>
                {item.name}
              </div>

              <p className="text-text-muted text-sm">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 TIMELINE PREVIEW */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Incident Timeline
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border space-y-2">

          <p className="text-red-400">[10:45] ALERT triggered</p>
          <p>[10:46] Incident created</p>
          <p>[10:47] Assigned to DevOps</p>
          <p>[10:48] Investigation started</p>
          <p className="text-green-400">[10:50] Issue resolved</p>

        </div>

      </section>

      {/* 🔥 API */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Create Incident (API)
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/incidents

{
  "title": "Payment Failure",
  "severity": "critical"
}`}
        </div>

      </section>

      {/* 🔥 TIP */}
      <section className="p-6 rounded-xl border border-primary/30 bg-primary/5">

        <h3 className="text-primary font-semibold mb-2 flex items-center gap-2">
          <FiAlertTriangle /> Best Practice
        </h3>

        <p className="text-text-muted text-sm">
          Always assign severity correctly. Misclassification can delay response time
          and impact system reliability.
        </p>

      </section>

    </div>
  );
};

export default Incidents;