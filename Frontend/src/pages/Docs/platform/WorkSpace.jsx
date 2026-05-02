const Workspaces = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">
          Workspaces
        </h1>

        <p className="text-text-muted max-w-2xl">
          Workspaces are the foundation of MayDayOps. They allow teams to organize
          incidents, services, and members into isolated environments for better
          collaboration and control.
        </p>
      </section>

      {/* 🔥 VISUAL STRUCTURE */}
      <section className="grid md:grid-cols-3 gap-6">

        {[
          {
            title: "Team Isolation",
            desc: "Separate teams and projects into dedicated environments."
          },
          {
            title: "Service Mapping",
            desc: "Map services like API, DB, and frontend inside workspace."
          },
          {
            title: "Access Control",
            desc: "Control who can view, edit, or manage incidents."
          }
        ].map((item, i) => (

          <div
            key={i}
            className="p-6 rounded-2xl border border-border bg-bg-surface
            hover:border-primary hover:shadow-[0_0_25px_rgba(255,37,37,0.2)]
            transition-all duration-300"
          >

            <h3 className="font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-text-muted text-sm">
              {item.desc}
            </p>

          </div>

        ))}

      </section>

      {/* 🔥 HOW IT WORKS (DIAGRAM STYLE) */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Workspace Structure
        </h2>

        <p className="text-text-muted mb-10 max-w-2xl">
          Each workspace acts like a container that groups your team, services,
          and incidents together. This ensures clarity and avoids conflicts across teams.
        </p>

        {/* STRUCTURE VISUAL */}
        <div className="flex flex-wrap gap-6 justify-center">

          {["Workspace", "Services", "Incidents", "Team"].map((item, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-xl border border-border bg-bg-surface
              text-sm hover:border-primary transition"
            >
              {item}
            </div>
          ))}

        </div>

      </section>

      {/* 🔥 EXAMPLE USE CASE */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Example Use Case
        </h2>

        <div className="p-6 border border-border rounded-xl bg-bg-surface space-y-3">

          <p className="text-text-muted text-sm">
            A company with multiple products can create separate workspaces:
          </p>

          <ul className="text-sm space-y-2 text-text-muted">
            <li>• Payments Team Workspace</li>
            <li>• Authentication Service Workspace</li>
            <li>• Frontend Monitoring Workspace</li>
          </ul>

          <p className="text-text-muted text-sm mt-3">
            Each workspace manages its own incidents without affecting others.
          </p>

        </div>

      </section>

      {/* 🔥 API SNIPPET */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Create Workspace (API)
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/workspaces

{
  "name": "Payments Team",
  "description": "Handles all payment-related incidents"
}`}
        </div>

      </section>

      {/* 🔥 TIP */}
      <section className="p-6 rounded-xl border border-primary/30 bg-primary/5">

        <h3 className="text-primary font-semibold mb-2">
          ⚡ Best Practice
        </h3>

        <p className="text-text-muted text-sm">
          Keep workspaces focused and avoid mixing unrelated services. This improves
          clarity during incidents and speeds up response time.
        </p>

      </section>

    </div>
  );
};

export default Workspaces;