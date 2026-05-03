import { FiCpu, FiFileText, FiTrendingUp, FiCrosshair } from "react-icons/fi";

const AIPostmortem = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiCpu className="text-primary" />
          AI Postmortems
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Nobody likes writing postmortems. MayDayOps leverages Mistral AI to instantly generate comprehensive, blameless Root Cause Analysis (RCA) documents the moment an incident is resolved.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Why AI? */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Eliminate the Blank Page</h2>
        <p className="text-text-muted text-lg max-w-3xl leading-relaxed">
          The goal of an AI Postmortem is not to replace human engineering judgment, but to provide a 90% completed draft. It synthesizes hundreds of timeline logs, chat messages, and system alerts into a cohesive narrative.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 rounded-xl border border-border bg-bg-surface">
            <FiFileText className="text-primary size-6 mb-3" />
            <h3 className="font-bold text-text mb-2">Executive Summary</h3>
            <p className="text-sm text-text-muted">Translates dense technical logs into a clear, one-paragraph summary suitable for management.</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-bg-surface">
            <FiCrosshair className="text-primary size-6 mb-3" />
            <h3 className="font-bold text-text mb-2">Blameless RCA</h3>
            <p className="text-sm text-text-muted">Identifies the structural failure (e.g., "lack of rate limiting") rather than the human error.</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-bg-surface">
            <FiTrendingUp className="text-primary size-6 mb-3" />
            <h3 className="font-bold text-text mb-2">Action Items</h3>
            <p className="text-sm text-text-muted">Suggests Jira tickets (e.g., "Implement exponential backoff") to prevent recurrence.</p>
          </div>
        </div>
      </section>

      {/* How it works under the hood */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">How it Works (Mistral AI)</h2>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          When you trigger the `POST /api/incidents/:id/postmortem` endpoint, MayDayOps gathers the entire immutable incident timeline. We format this data and send a highly structured system prompt to the Mistral AI model.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg mt-4">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider font-bold">Generated Output Example (Markdown)</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto text-[#D4D4D4] leading-relaxed">
            <pre>
              # Postmortem: INC-29402 API Gateway Timeout

              ## 1. Summary
              Between 10:45 UTC and 10:50 UTC, the primary API gateway experienced a 100% error rate, resulting in failed customer checkouts. The issue was resolved by increasing the database connection pool size.

              ## 2. Root Cause
              A marketing push caused a 5x traffic spike. The `payment-service` exhausted its allowed database connections (max: 100), causing upstream gateway requests to time out after 30 seconds.

              ## 3. Timeline
              - **10:45:** PagerDuty alert fired for 5xx errors.
              - **10:47:** Developer identified connection pool exhaustion in Datadog.
              - **10:49:** Hotfix deployed increasing pool limit to 500.

              ## 4. Action Items
              - [ ] Implement query caching for read-heavy operations.
              - [ ] Set up alerts for when DB connection pool hits 80% capacity.
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AIPostmortem;