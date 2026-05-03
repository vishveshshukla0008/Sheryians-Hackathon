import { FiLock, FiKey, FiEyeOff } from "react-icons/fi";

const Authentication = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiLock className="text-primary" />
          Authentication
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          The MayDayOps API uses API keys to authenticate requests. You can view and manage your API keys in the MayDayOps Dashboard under <strong>Developer Settings</strong>.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* Key Types */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Types of API Keys</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiKey className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Workspace Keys</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Scoped to an entire workspace. Best used for automated systems, CI/CD pipelines, and global monitoring tools (like Datadog).
            </p>
            <code className="px-2 py-1 bg-input rounded text-xs font-mono text-text">mdo_live_wsp_xxxxxxxx</code>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
            <FiEyeOff className="text-primary size-6 mb-3" />
            <h3 className="text-lg font-bold text-text mb-2">Personal Access Tokens (PATs)</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Scoped to your specific user account. Actions taken with this token will appear in the timeline as performed by *you*. Best for local scripts.
            </p>
            <code className="px-2 py-1 bg-input rounded text-xs font-mono text-text">mdo_live_pat_xxxxxxxx</code>
          </div>
        </div>
      </section>

      {/* Making Requests */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Making Authenticated Requests</h2>
        <p className="text-text-muted">
          Authentication to the API is performed via HTTP Basic Auth or the Bearer token standard. Provide your API key as the basic auth username value. You do not need to provide a password.
        </p>

        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
          <div className="bg-black/40 px-5 py-3 border-b border-border/20">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider font-bold">Example: Bearer Auth</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto text-[#D4D4D4] leading-relaxed">
            <pre>
              <span className="text-[#569CD6]">curl</span> https://api.maydayops.io/v1/auth/verify \
              -H <span className="text-[#CE9178]">"Authorization: Bearer mdo_live_wsp_8f7d6e5c4b3a2"</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="p-6 border border-error/30 bg-error/5 rounded-xl">
        <h3 className="text-error font-bold mb-3 flex items-center gap-2">
          Security Best Practices
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-text-muted">
          <li>Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</li>
          <li>All API requests must be made over HTTPS. Calls made over plain HTTP will fail.</li>
          <li>API requests without authentication will also fail with a <code>401 Unauthorized</code> response.</li>
        </ul>
      </section>

    </div>
  );
};

export default Authentication;