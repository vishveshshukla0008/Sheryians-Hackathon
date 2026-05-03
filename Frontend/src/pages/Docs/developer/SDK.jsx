import { FiPackage, FiTerminal } from "react-icons/fi";

const SDK = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiPackage className="text-primary" />
          Node.js SDK
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          While you can interact with our REST API using standard HTTP clients, we provide an official Node.js SDK to make integration seamless. It handles authentication, automatic retries, and provides full type safety out of the box.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* INSTALLATION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <FiTerminal className="text-primary" /> Installation
        </h2>
        <p className="text-text-muted">
          Install the official SDK using npm, yarn, or pnpm. Requires Node.js 18+.
        </p>

        <div className="bg-[#1E1E1E] p-5 rounded-xl font-mono text-sm border border-border/20 shadow-lg">
          <pre className="text-[#D4D4D4] whitespace-pre-wrap">
            <span className="text-[#569CD6]">npm</span> install @maydayops/node
          </pre>
        </div>
      </section>

      {/* SETUP */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Initialization</h2>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          Initialize the client with your secret API key. The SDK will automatically handle attaching the Bearer token to all outbound requests. This should be done once during app startup.
        </p>

        <div className="bg-[#1E1E1E] p-5 rounded-xl font-mono text-sm border border-border/20 shadow-lg overflow-x-auto">
          <pre className="text-[#D4D4D4] leading-relaxed">
            <span className="text-[#C586C0]">import</span> {"{"} MayDayOps {"}"} <span className="text-[#C586C0]">from</span> <span className="text-[#CE9178]">"@maydayops/node"</span>;

            <span className="text-[#569CD6]">const</span> client = <span className="text-[#569CD6]">new</span> MayDayOps({"{"}
            apiKey: process.env.MAYDAY_API_KEY,
            maxNetworkRetries: <span className="text-[#B5CEA8]">3</span>, <span className="text-[#6A9955]">// Auto-retry on 503s or network errors</span>
            {"}"});
          </pre>
        </div>

        <p className="text-text-muted text-sm mt-3">
          <strong>Security Note:</strong> Always store API keys in environment variables. Never commit them to version control.
        </p>
      </section>

      {/* CREATE INCIDENT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text mb-4">Create an Incident</h2>
        <p className="text-text-muted mb-4 max-w-3xl leading-relaxed">
          Use the SDK to declare incidents directly from your application's error boundaries or custom monitoring scripts. You can pass an idempotency key to prevent duplicate incidents during network retries.
        </p>

        <div className="bg-[#1E1E1E] p-5 rounded-xl font-mono text-sm border border-border/20 shadow-lg overflow-x-auto">
          <pre className="text-[#D4D4D4] leading-relaxed">
            <span className="text-[#569CD6]">const</span> incident = <span className="text-[#C586C0]">await</span> client.incidents.<span className="text-[#DCDCAA]">create</span>({"{"}
            title: <span className="text-[#CE9178]">"Postgres Connection Refused"</span>,
            severity: <span className="text-[#CE9178]">"SEV-1"</span>,
            serviceId: <span className="text-[#CE9178]">"srv_db_cluster"</span>,
            description: <span className="text-[#CE9178]">"Connections to the primary RDS instance are failing."</span>
            {"}"}, {"{"}
            <span className="text-[#6A9955]">// Provide an idempotency key to prevent duplicate incidents</span>
            idempotencyKey: <span className="text-[#CE9178]">"req_123456789"</span>
            {"}"});

            <span className="text-[#4EC9B0]">console</span>.<span className="text-[#DCDCAA]">log</span>(<span className="text-[#CE9178]">{"`Incident declared: ${incident.id}`"}</span>);
          </pre>
        </div>
      </section>

      {/* UPDATE INCIDENT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text mb-4">Update an Incident</h2>
        <p className="text-text-muted mb-4">
          Append timeline events, change severities, or mark an incident as resolved.
        </p>

        <div className="bg-[#1E1E1E] p-5 rounded-xl font-mono text-sm border border-border/20 shadow-lg overflow-x-auto">
          <pre className="text-[#D4D4D4] leading-relaxed">
            <span className="text-[#C586C0]">await</span> client.incidents.<span className="text-[#DCDCAA]">update</span>(<span className="text-[#CE9178]">"inc_0987654321"</span>, {"{"}
            message: <span className="text-[#CE9178]">"Rolling back database changes..."</span>,
            status: <span className="text-[#CE9178]">"investigating"</span>
            {"}"});
          </pre>
        </div>
      </section>

      {/* ERROR HANDLING */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text mb-4">Error Handling</h2>
        <p className="text-text-muted mb-4">
          The SDK throws custom error objects. Always catch and handle these gracefully, especially when building automated workflows.
        </p>

        <div className="bg-[#1E1E1E] p-5 rounded-xl font-mono text-sm border border-border/20 shadow-lg overflow-x-auto">
          <pre className="text-[#D4D4D4] leading-relaxed">
            <span className="text-[#C586C0]">try</span> {"{"}
            <span className="text-[#C586C0]">await</span> client.incidents.<span className="text-[#DCDCAA]">create</span>({"{"} <span className="text-[#6A9955]">/* ... */</span> {"}"});
            {"}"} <span className="text-[#C586C0]">catch</span> (error) {"{"}
            <span className="text-[#C586C0]">if</span> (error <span className="text-[#569CD6]">instanceof</span> MayDayOps.APIError) {"{"}
            <span className="text-[#4EC9B0]">console</span>.<span className="text-[#DCDCAA]">error</span>(<span className="text-[#CE9178]">"API Error:"</span>, error.status); <span className="text-[#6A9955]">// e.g., 429</span>
            <span className="text-[#4EC9B0]">console</span>.<span className="text-[#DCDCAA]">error</span>(<span className="text-[#CE9178]">"Message:"</span>, error.message);  <span className="text-[#6A9955]">// e.g., "Rate limit exceeded"</span>
            {"}"} <span className="text-[#C586C0]">else</span> {"{"}
            <span className="text-[#4EC9B0]">console</span>.<span className="text-[#DCDCAA]">error</span>(<span className="text-[#CE9178]">"Network or Unknown Error:"</span>, error);
            {"}"}
            {"}"}
          </pre>
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl shadow-sm">
        <h3 className="text-primary font-bold mb-3 text-lg">
          Best Practices
        </h3>
        <div className="text-text-muted text-sm space-y-2 leading-relaxed">
          <p>• <strong>Singleton Pattern:</strong> Initialize the SDK client once and export it for reuse across your application.</p>
          <p>• <strong>Idempotency:</strong> Always use <code>idempotencyKey</code> when creating incidents via automated cron jobs or scripts to avoid duplicates.</p>
          <p>• <strong>Error Boundaries:</strong> Wrap critical SDK calls in <code>try/catch</code> blocks so a failed monitoring call doesn't crash your main application.</p>
        </div>
      </section>

    </div>
  );
};

export default SDK;