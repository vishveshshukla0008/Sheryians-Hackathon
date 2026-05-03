import { FiBarChart2 } from "react-icons/fi";

const RateLimits = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
          <FiBarChart2 className="text-primary" />
          Rate Limits
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          To prevent abuse and ensure stability for all tenants, MayDayOps enforces rate limiting on all API endpoints. We use the standard <strong>Token Bucket Algorithm</strong> to manage request traffic.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* The Rules */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text mb-4">Standard Limits</h2>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          By default, standard workspaces are limited to <strong>100 requests per 15 minutes</strong>. Authentication endpoints (like token generation) are strictly limited to <strong>20 requests per 15 minutes</strong>.
        </p>

        <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-text mb-4">Rate Limit Headers</h3>
          <p className="text-sm text-text-muted mb-4">Every API response includes headers detailing your current usage:</p>
          <ul className="space-y-2 font-mono text-sm">
            <li><span className="text-text font-bold">X-RateLimit-Limit:</span> <span className="text-text-muted">100</span></li>
            <li><span className="text-text font-bold">X-RateLimit-Remaining:</span> <span className="text-text-muted">99</span></li>
            <li><span className="text-text font-bold">X-RateLimit-Reset:</span> <span className="text-text-muted">1714742400</span> <span className="font-sans text-xs text-text-muted opacity-70">(Unix epoch seconds)</span></li>
          </ul>
        </div>
      </section>

      {/* Interactive Widget Explanation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text">How the Token Bucket Works</h2>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          Imagine a bucket that holds a maximum number of tokens. Every time you make an API request, one token is removed from the bucket. The bucket is constantly refilled at a set rate. If you send a burst of traffic, you might drain the bucket. Once empty, any further requests will receive a <code>429 Too Many Requests</code> error until more tokens trickle in.
        </p>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          Use the simulator below to visualize how bursts and sustained traffic affect your rate limit capacity.
        </p>

      </section>

    </div>
  );
};

export default RateLimits;