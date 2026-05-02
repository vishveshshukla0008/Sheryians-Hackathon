import { FiCpu, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const AIPostmortem = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FiCpu className="text-primary" />
          AI Postmortem
        </h1>

        <p className="text-text-muted max-w-2xl">
          Automatically generate detailed post-incident reports using AI.
          Analyze root causes, timeline events, and get actionable insights
          to prevent future outages.
        </p>
      </section>

      {/* 🔥 SUMMARY */}
      <section className="p-6 border border-border rounded-xl bg-bg-surface">

        <h2 className="text-2xl font-semibold mb-4">
          Incident Summary
        </h2>

        <p className="text-text-muted text-sm leading-relaxed">
          The payment service experienced a critical outage due to a database
          connection timeout. The issue lasted for approximately 5 minutes
          and impacted all transaction processing.
        </p>

      </section>

      {/* 🔥 ROOT CAUSE */}
      <section className="p-6 border border-border rounded-xl bg-bg-surface">

        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-400">
          <FiAlertTriangle />
          Root Cause Analysis
        </h2>

        <p className="text-text-muted text-sm">
          AI detected that the root cause was a misconfigured database connection pool,
          leading to timeout failures under high load conditions.
        </p>

      </section>

      {/* 🔥 TIMELINE ANALYSIS */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Timeline Breakdown
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border space-y-2">

          <p className="text-red-400">[10:45] Alert triggered</p>
          <p>[10:46] Incident created</p>
          <p>[10:47] DB connection errors detected</p>
          <p>[10:48] Root cause identified by AI</p>
          <p className="text-green-400">[10:50] Fix deployed</p>

        </div>

      </section>

      {/* 🔥 RECOMMENDATIONS */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          AI Recommendations
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Increase database connection pool size",
            "Implement retry mechanism",
            "Add monitoring for DB latency"
          ].map((rec, i) => (

            <div
              key={i}
              className="p-5 border border-border rounded-xl bg-bg-surface
              hover:border-primary transition"
            >

              <p className="text-sm flex items-start gap-2">
                <FiCheckCircle className="text-green-400 mt-1" />
                {rec}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 AI REPORT BOX */}
      <section className="p-6 border border-primary/30 rounded-xl bg-primary/5">

        <h3 className="text-primary font-semibold mb-2 flex items-center gap-2">
          <FiCpu />
          AI Insight
        </h3>

        <p className="text-text-muted text-sm">
          Similar incidents have occurred in the past under high traffic conditions.
          Consider scaling infrastructure dynamically during peak usage.
        </p>

      </section>

      {/* 🔥 API */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Generate Postmortem (API)
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/incidents/:id/postmortem

{
  "includeAI": true
}`}
        </div>

      </section>

    </div>
  );
};

export default AIPostmortem;