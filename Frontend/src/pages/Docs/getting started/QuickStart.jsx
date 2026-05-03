import { FiCheckCircle, FiAlertTriangle, FiServer } from "react-icons/fi";

 const QuickStart = () => {
  return (
    <div className="animate-fade-in-up space-y-14 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Quick Start Guide
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          Get the MayDayOps API and Client running on your local machine. This guide covers repository cloning, dependency management, and environment configuration.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Prerequisites */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <FiServer className="text-primary" /> Prerequisites
        </h2>
        <p className="text-text-muted">Before you begin, ensure your development environment meets the following requirements:</p>
        <ul className="list-disc list-inside space-y-2 text-text-muted ml-4">
          <li><strong className="text-text">Node.js</strong>: Version 18.x or higher.</li>
          <li><strong className="text-text">MongoDB</strong>: A running local instance or MongoDB Atlas cluster.</li>
          <li><strong className="text-text">Redis</strong>: Required for rate limiting and WebSocket pub/sub (Upstash recommended).</li>
          <li><strong className="text-text">Package Manager</strong>: npm or yarn.</li>
        </ul>
      </section>

      {/* Step 1 */}
      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">1</div>
          <h2 className="text-3xl font-bold text-text">Clone the Repository</h2>
        </div>
        <p className="text-text-muted pl-14 text-lg">
          Begin by cloning the backend repository to your local environment.
        </p>
        <div className="ml-14 bg-[#1E1E1E] rounded-xl p-5 font-mono text-sm border border-border/20 overflow-x-auto shadow-inner">
          <span className="text-[#569CD6]">git</span> <span className="text-[#CE9178]">clone</span> https://github.com/your-org/maydayops-backend.git
          <br />
          <span className="text-[#569CD6]">cd</span> maydayops-backend
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">2</div>
          <h2 className="text-3xl font-bold text-text">Install Dependencies</h2>
        </div>
        <p className="text-text-muted pl-14 text-lg">
          Install the required Node.js packages using npm.
        </p>
        <div className="ml-14 bg-[#1E1E1E] rounded-xl p-5 font-mono text-sm border border-border/20 overflow-x-auto shadow-inner">
          <span className="text-[#569CD6]">npm</span> <span className="text-[#CE9178]">install</span>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">3</div>
          <h2 className="text-3xl font-bold text-text">Environment Configuration</h2>
        </div>
        <p className="text-text-muted pl-14 text-lg">
          Create a <code>.env</code> file in the root directory. You will need to configure your database connections, JWT secrets, and third-party API keys.
        </p>

        <div className="ml-14 bg-[#1E1E1E] rounded-xl p-5 font-mono text-sm border border-border/20 overflow-x-auto shadow-inner mb-4">
          <span className="text-[#6A9955]"># Server Configuration</span><br />
          <span className="text-[#9CDCFE]">PORT</span>=<span className="text-[#B5CEA8]">5000</span><br />
          <span className="text-[#9CDCFE]">NODE_ENV</span>=<span className="text-[#CE9178]">development</span><br /><br />

          <span className="text-[#6A9955]"># Database & Cache</span><br />
          <span className="text-[#9CDCFE]">MONGO_URI</span>=<span className="text-[#CE9178]">mongodb://localhost:27017/maydayops</span><br />
          <span className="text-[#9CDCFE]">REDIS_URL</span>=<span className="text-[#CE9178]">redis://default:password@localhost:6379</span><br /><br />

          <span className="text-[#6A9955]"># Security & Integrations</span><br />
          <span className="text-[#9CDCFE]">JWT_SECRET</span>=<span className="text-[#CE9178]">your_super_secret_key_here</span><br />
          <span className="text-[#9CDCFE]">MISTRAL_API_KEY</span>=<span className="text-[#CE9178]">your_mistral_ai_key</span>
        </div>

        {/* Admonition Box */}
        <div className="ml-14 p-5 rounded-xl border border-ring/30 bg-ring/10 flex gap-4 shadow-sm">
          <FiAlertTriangle className="text-ring mt-0.5 shrink-0" size={24} />
          <div>
            <h4 className="text-text font-bold mb-1">Security Warning</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Never commit your <code>.env</code> file to version control. Ensure it is listed in your <code>.gitignore</code>. In production, provide these variables via your hosting provider's secret management system.
            </p>
          </div>
        </div>
      </section>

      {/* Step 4 */}
      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">4</div>
          <h2 className="text-3xl font-bold text-text">Start the Server & Verify</h2>
        </div>
        <p className="text-text-muted pl-14 text-lg">
          Run the application in development mode. The server will start and connect to the database.
        </p>
        <div className="ml-14 bg-[#1E1E1E] rounded-xl p-5 font-mono text-sm border border-border/20 overflow-x-auto flex justify-between items-center shadow-inner mb-4">
          <div>
            <span className="text-[#569CD6]">npm</span> <span className="text-[#CE9178]">run</span> dev
          </div>
          <FiCheckCircle className="text-[#4CAF50] size-5" />
        </div>
        <p className="text-text-muted pl-14">
          To verify everything is working, open your browser or terminal and hit the health check endpoint:
        </p>
        <div className="ml-14 bg-[#1E1E1E] rounded-xl p-5 font-mono text-sm border border-border/20 overflow-x-auto shadow-inner">
          <span className="text-[#569CD6]">curl</span> http://localhost:5000/api/health
          <br /><br />
          <span className="text-[#6A9955]">{"// Expected Output:"}</span><br />
          <span className="text-[#D4D4D4]">{"{"}</span><br />
          <span className="text-[#9CDCFE]">  "status"</span>: <span className="text-[#CE9178]">"ok"</span>,<br />
          <span className="text-[#9CDCFE]">  "timestamp"</span>: <span className="text-[#CE9178]">"2026-05-03T12:00:00Z"</span><br />
          <span className="text-[#D4D4D4]">{"}"}</span>
        </div>
      </section>

    </div>
  );
};

export default QuickStart;