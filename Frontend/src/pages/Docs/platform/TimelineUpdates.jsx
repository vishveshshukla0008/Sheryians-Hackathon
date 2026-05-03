import { FiClock, FiActivity } from "react-icons/fi";

const TimelineUpdates = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">
          Timeline & Updates
        </h1>

        <p className="text-text-muted max-w-2xl">
          Every incident is tracked with a real-time timeline. All updates,
          actions, and responses are logged to ensure transparency and faster resolution.
        </p>
      </section>

      {/* 🔥 VERTICAL TIMELINE */}
      <section className="relative max-w-3xl mx-auto">

        {/* line */}
        <div className="absolute left-2 top-0 h-full w-[2px] bg-primary/30"></div>

        {[
          { time: "10:45", text: "Alert triggered (payment-service)", type: "alert" },
          { time: "10:46", text: "Incident created", type: "info" },
          { time: "10:47", text: "Assigned to DevOps team", type: "info" },
          { time: "10:48", text: "Investigation started", type: "info" },
          { time: "10:49", text: "Fix deployed", type: "success" },
          { time: "10:50", text: "Incident resolved", type: "success" }
        ].map((item, i) => (

          <div
            key={i}
            className="relative flex items-start gap-6 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >

            {/* 🔥 dot */}
            <div className="relative">

              {/* pulse ring */}
              <span className="absolute w-4 h-4 rounded-full bg-primary/30 animate-ping"></span>

              {/* main dot */}
              <span className="relative w-4 h-4 rounded-full bg-primary block"></span>

            </div>

            {/* content */}
            <div>

              <div className="text-xs text-text-muted mb-1">
                {item.time}
              </div>

              <div className={`text-sm font-medium
                ${item.type === "alert" && "text-red-400"}
                ${item.type === "success" && "text-green-400"}
              `}>
                {item.text}
              </div>

            </div>

          </div>

        ))}

      </section>

      {/* 🔥 LIVE LOG PANEL */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Live Updates Log
        </h2>

        <div className="bg-black rounded-xl p-6 font-mono text-sm border border-border space-y-2">

          <p className="text-red-400">[ALERT] Payment Service Down</p>
          <p>[INFO] Incident created by monitoring system</p>
          <p>[INFO] Developer assigned</p>
          <p>[INFO] Debugging started</p>
          <p className="text-green-400">[SUCCESS] System restored</p>

        </div>

      </section>

      {/* 🔥 UPDATE TYPES */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Update Types
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Alert",
              desc: "Triggered automatically when anomaly detected",
              color: "text-red-400"
            },
            {
              title: "Update",
              desc: "Manual updates from team members",
              color: "text-blue-400"
            },
            {
              title: "Resolution",
              desc: "Final status after issue is fixed",
              color: "text-green-400"
            }
          ].map((item, i) => (

            <div
              key={i}
              className="p-6 border border-border rounded-xl bg-bg-surface hover:border-primary transition"
            >

              <h3 className={`font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>

              <p className="text-text-muted text-sm">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 API */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Post Update (API)
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/incidents/:id/update

{
  "message": "Fix deployed successfully",
  "status": "resolved"
}`}
        </div>

      </section>

      {/* 🔥 TIP */}
      <section className="p-6 rounded-xl border border-primary/30 bg-primary/5">

        <h3 className="text-primary font-semibold mb-2 flex items-center gap-2">
          <FiClock /> Best Practice
        </h3>

        <p className="text-text-muted text-sm">
          Keep updates frequent and clear. A well-maintained timeline helps teams
          understand incident progression and improves post-incident analysis.
        </p>

      </section>

    </div>
  );
};

export default TimelineUpdates;