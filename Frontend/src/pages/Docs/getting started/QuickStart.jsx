const QuickStart = () => {
  return (
    <section className="py-24 pt-0 relative overflow-hidden animate-fade-in-up">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-16">
        Quick Start Guide
      </h1>

      <p className="text-text-muted text-center max-w-2xl mx-auto mb-20">
        Get up and running with MayDayOps in minutes. Follow these steps to set up your workspace,
        manage incidents, and start monitoring your systems efficiently.
      </p>

      <div className="relative max-w-5xl mx-auto">

        {/* 🔥 vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] 
    bg-linear-to-b from-transparent via-primary/40 to-transparent"></div>

        {[
          {
            title: "Create Your Workspace",
            desc: "Sign up and initialize your workspace. This is where your team, services, and incidents will be managed."
          },
          {
            title: "Invite Your Team",
            desc: "Add team members and assign roles such as Admin, Responder, or Viewer to collaborate effectively."
          },
          {
            title: "Create Your First Incident",
            desc: "Log an incident with severity level, affected service, and initial context to start tracking."
          },
          {
            title: "Track Timeline & Updates",
            desc: "Monitor real-time updates, actions, and logs as your team works toward resolution."
          },
          {
            title: "Resolve & Generate Postmortem",
            desc: "Close the incident and automatically generate insights, summaries, and root cause analysis."
          }
        ].map((item, i) => (

          <div
            key={i}
            className={`relative flex items-center mb-16 opacity-0 animate-fade-in-up ${i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >

            {/* 🔥 step number circle */}
            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center">

              {/* outer ring animation */}
              <span className="absolute w-full h-full rounded-full bg-primary/30 animate-ping"></span>

              {/* main circle */}
              <span className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg">
                {i + 1}
              </span>

            </div>

            {/* 🔥 card */}
            <div className={`w-[45%] p-6 border border-border rounded-xl 
        bg-bg-surface hover:border-primary transition-all duration-300 
        hover:-translate-y-2`}>

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default QuickStart;