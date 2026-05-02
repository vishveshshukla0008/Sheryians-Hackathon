const RateLimits = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Rate Limits</h1>

        <p className="text-text-muted max-w-3xl leading-relaxed">
          Rate limits protect the system from overload and ensure fair usage.
          Traffic is not constant — it fluctuates over time based on real usage.
        </p>
      </section>

      {/* 🔥 LINE GRAPH */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Request Pattern (Last Minute)
        </h2>

        <div className="relative h-24 w-full">

          {/* SVG GRAPH */}
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="w-full h-full"
          >

            {/* 🔥 GLOW LINE */}
            <path
              d="M0,25 
                 L5,22 
                 L10,18 
                 L15,24 
                 L20,15 
                 L25,20 
                 L30,10 
                 L35,14 
                 L40,22 
                 L45,18 
                 L50,25 
                 L55,12 
                 L60,20 
                 L65,16 
                 L70,24 
                 L75,14 
                 L80,18 
                 L85,12 
                 L90,20 
                 L95,16 
                 L100,10"
              fill="none"
              stroke="rgba(255, 37, 37, 0.3)"
              strokeWidth="4"
            />

            {/* 🔥 MAIN LINE */}
            <path
              d="M0,25 
                 L5,22 
                 L10,18 
                 L15,24 
                 L20,15 
                 L25,20 
                 L30,10 
                 L35,14 
                 L40,22 
                 L45,18 
                 L50,25 
                 L55,12 
                 L60,20 
                 L65,16 
                 L70,24 
                 L75,14 
                 L80,18 
                 L85,12 
                 L90,20 
                 L95,16 
                 L100,10"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* GRADIENT */}
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#ff2525" />
              </linearGradient>
            </defs>

          </svg>

          {/* 🔥 GLOW EFFECT */}
          <div className="absolute inset-0 blur-xl opacity-30"></div>

        </div>

        <p className="text-xs text-text-muted mt-3">
          Real-time request variation showing spikes and drops in API usage.
        </p>
      </section>

      {/* 🔥 THRESHOLD LINE */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Rate Limit Threshold
        </h2>

        <div className="relative h-16 bg-bg-surface rounded-lg overflow-hidden flex items-center">

          {/* base line */}
          <div className="w-full h-[3px] bg-red-500/40 rounded-full"></div>

          {/* glow */}
          <div className="absolute w-full h-[3px] bg-red-500 blur-md opacity-60"></div>

          {/* threshold indicator */}
          <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>

        </div>

        <p className="text-xs text-text-muted mt-3">
          When traffic crosses the threshold point, requests may be rate limited.
        </p>
      </section>

      {/* 🔥 EXPLANATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>

        <div className="space-y-3 text-text-muted leading-relaxed">

          <p>• API traffic fluctuates based on user activity.</p>
          <p>• Sudden spikes may exceed allowed limits.</p>
          <p>• Sustained high traffic triggers rate limiting.</p>
          <p>• System automatically recovers after cooldown.</p>

        </div>
      </section>

      {/* 🔥 ERROR */}
      <section>
        <h2 className="text-2xl font-bold mb-4">429 Response</h2>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`HTTP/1.1 429 Too Many Requests

{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}`}
        </div>
      </section>

      {/* 🔥 BEST PRACTICE */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl">

        <h3 className="text-primary font-semibold mb-2">
          Best Practices
        </h3>

        <div className="text-text-muted text-sm space-y-2">
          <p>• Avoid sending burst requests</p>
          <p>• Implement retry with delay</p>
          <p>• Use caching to reduce calls</p>
          <p>• Monitor API usage patterns</p>
        </div>

      </section>

    </div>
  );
};

export default RateLimits;