import {FiActivity, FiLock,FiZap } from "react-icons/fi";

const TimelineUpdates = () => {
  return (
    <div className="animate-fade-in-up space-y-12 pb-12">

      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
          Timeline & Updates
        </h1>
        <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
          The Timeline is the beating heart of an active incident. It is a strictly chronological, immutable log of everything that happens from the moment an alert fires until the postmortem is signed off.
        </p>
      </section>

      <hr className="border-border/60" />

      {/* The Animated Timeline Example */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-text mb-8">The Live War Room</h2>
        
        <div className="bg-bg-surface border border-border rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {/* Event 1 */}
              <div className="relative flex items-start gap-6">
                <div className="relative z-10 flex items-center justify-center size-6 rounded-full bg-error/20 border border-error text-error shrink-0 mt-0.5">
                  <FiActivity size={12} />
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1 font-mono">10:45:02 UTC</p>
                  <p className="text-sm font-bold text-text">PagerDuty Alert Triggered</p>
                  <p className="text-sm text-text-muted mt-1">CPU on database-primary crossed 95% threshold.</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-6">
                <div className="relative z-10 flex items-center justify-center size-6 rounded-full bg-bg border border-border text-text shrink-0 mt-0.5">
                  <span className="size-2 rounded-full bg-text-muted"></span>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1 font-mono">10:47:15 UTC</p>
                  <p className="text-sm font-bold text-text">Rahul Sharma (DevOps) acknowledged</p>
                  <p className="text-sm text-text-muted mt-1">"I'm looking into the slow query logs now."</p>
                </div>
              </div>

              {/* Event 3 - THE PULSING EVENT */}
              <div className="relative flex items-start gap-6">
                {/* 🔥 The Pulsing Dot */}
                <div className="relative z-10 flex items-center justify-center size-6 shrink-0 mt-0.5">
                  <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></span>
                  <span className="relative block w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]"></span>
                </div>
                <div>
                  <p className="text-xs text-primary mb-1 font-mono font-bold animate-pulse">LIVE NOW</p>
                  <p className="text-sm font-bold text-text">Status changed to Investigating</p>
                  <div className="mt-2 p-3 rounded-lg bg-input/50 border border-border/50">
                    <p className="text-sm text-text-muted font-mono">Rolling back deploy #4928 to stable...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WebSocket Infrastructure */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <FiZap className="text-primary" /> WebSocket Architecture
        </h2>
        <p className="text-text-muted leading-relaxed max-w-3xl">
          You don't need to refresh the page during an incident. MayDayOps maintains a persistent WebSocket connection utilizing Redis Pub/Sub under the hood. When anyone (or an automated API integration) posts an update, the <code>timeline:new</code> event is broadcast instantly to all active clients viewing that incident.
        </p>
      </section>

      {/* Immutability Note */}
      <section className="p-6 rounded-2xl border border-border bg-bg-surface flex flex-col sm:flex-row gap-5 items-start">
        <div className="p-3 bg-input rounded-xl text-text-muted shrink-0">
          <FiLock size={24} />
        </div>
        <div>
          <h3 className="text-lg text-text font-bold mb-2">Immutable by Design for Compliance</h3>
          <p className="text-text-muted leading-relaxed text-sm">
            Timeline events cannot be edited or deleted once posted. This is a strict architectural decision to ensure SOC2 compliance and guarantee that post-incident analyses (and AI summaries) are based on the absolute truth of what happened, not a revised history.
          </p>
        </div>
      </section>

    </div>
  );
};

export default TimelineUpdates;