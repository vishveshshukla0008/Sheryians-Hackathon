import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Brand primary (window + feature nav) */
const PRIMARY = "#ff5709";
const PRIMARY_SOFT = "#fff4ee";
const PRIMARY_MID = "#ffb899";
const PRIMARY_RICH = "#ff5709";
const PRIMARY_TEXT_ON_ORANGE = "#ffffff";
const PRIMARY_TEXT_ACCENT = "#7c2d12";

const FEATURES = [
  {
    id: "smart-alerting",
    title: "Smart alerting",
    subtitle: "Cut noise with ML that knows what matters",
  },
  {
    id: "incident-response",
    title: "Incident response",
    subtitle:
      "The right person gets paged based on severity and availability",
  },
  {
    id: "timeline",
    title: "Timeline",
    subtitle: "Every update, alert, and chat in one unified timeline",
  },
  {
    id: "ai-postmortem",
    title: "AI Postmortem",
    subtitle:
      "AI writes the summary, tracks action items, and helps you improve",
  },
];

/** Outer slab: primary gradient */
const showcaseBgClass =
  "relative overflow-hidden rounded-3xl min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] p-4 sm:p-6 lg:p-8";

function ShowcaseBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(105deg, ${PRIMARY_SOFT} 0%, #ffd4c0 22%, ${PRIMARY_MID} 52%, ${PRIMARY} 78%, #7c2d12 100%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.45]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 80% at 12% 40%, rgba(255, 87, 9, 0.22), transparent 55%),
            radial-gradient(circle at center, rgba(255,255,255,0.45) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 18px 18px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-transparent to-black/55" aria-hidden />
    </>
  );
}

/** Frosted Slack/browser shell — sab kuch halke transparent taake peeche dots dikhein */
const glassChrome =
  "rounded-xl border border-white/25 bg-white/[0.12] backdrop-blur-[18px] shadow-[0_32px_100px_rgba(0,0,0,0.45)] ring-1 ring-white/10 overflow-hidden";

function MiniSidebarRail() {
  return (
    <div
      className="relative flex w-12 sm:w-[52px] shrink-0 flex-col items-center gap-2 border-r border-white/15 bg-black/15 backdrop-blur-sm py-3 px-1.5"
      aria-hidden
    >
      <div className="h-1.5 w-6 rounded-full bg-white/35" />
      <div className="h-1.5 w-7 rounded-full bg-white/22" />
      <div
        className="mt-1 h-9 w-full max-w-[2rem] rounded-lg shadow-[0_0_22px_rgba(255,87,9,0.45)] ring-1 ring-white/60"
        style={{ backgroundColor: PRIMARY }}
      />
      <div className="h-1.5 w-7 rounded-full bg-white/15" />
      <div className="h-1.5 w-5 rounded-full bg-white/10" />
      <div className="mt-auto flex flex-col gap-1.5">
        <div className="h-5 w-5 rounded-full bg-white/12 border border-white/10" />
        <div className="h-5 w-5 rounded-full bg-white/10 border border-white/10" />
      </div>
    </div>
  );
}

function WindowChromeGlass() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/15 bg-black/[0.12] backdrop-blur-md">
      <div className="flex gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 min-w-0 rounded-lg bg-white/[0.14] border border-white/18 px-3 py-1.5 text-[10px] sm:text-[11px] text-white/80 font-mono truncate shadow-inner">
        app.maydayops.com/command-center · Slack
      </div>
    </div>
  );
}

function MayDayOpsAppHeader({ time = "2:45 PM" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 mb-4">
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm border border-black/[0.06]"
          style={{ backgroundColor: PRIMARY, color: PRIMARY_TEXT_ON_ORANGE }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 3L4 10v11h16V10l-8-7zm0 3.83L17 11v9H7v-8l5-4.17z" />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="font-bold text-neutral-900 text-sm sm:text-base tracking-tight">
            MayDayOps
          </span>
          <span className="ml-2 inline-flex rounded border border-neutral-200 bg-neutral-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-neutral-600">
            APP
          </span>
        </div>
      </div>
      <time className="text-xs font-medium text-neutral-400">{time}</time>
    </div>
  );
}

/** Solid white Slack card taake typography padhe */
const slackCard =
  "rounded-xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-4 sm:p-5";

const POSTMORTEM_BUILD_STEPS = [
  "Pulling alerts, deploys, and chat…",
  "Drafting executive summary…",
  "Linking owners and due dates…",
  "Rendering action items…",
];

function PostmortemReportScroll() {
  return (
    <div className="space-y-5 text-sm text-neutral-800 leading-relaxed">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 mb-1">
          Executive summary
        </p>
        <p>
          On Oct 17 a deployment to order-service introduced an N+1 query path;
          DB connection pools saturated and API latency exceeded SLO for all
          regions. Rollback to v2.2.8 restored steady state within the targeted
          recovery window.
        </p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 mb-1">
          Customer impact
        </p>
        <p>
          Greenagonia checkout and dashboard APIs saw elevated 503s and long
          tails on reads for approximately 26 minutes. No confirmed data loss.
          External status page updated at +12m and resolved at +41m.
        </p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 mb-1">
          Timeline (high level)
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>22:02 — Automated P2 opened from latency composite.</li>
          <li>22:15 — DB saturation correlated with today&apos;s deploy.</li>
          <li>22:28 — Rollback initiated; LB health trending green.</li>
          <li>23:38 — Incident closed after sustained recovery checks.</li>
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 mb-1">
          Root cause (working theory)
        </p>
        <p>
          Missing index on hot path combined with ORM change amplified query
          fan-out under peak checkout traffic. Guardrails did not block deploy
          because synthetic checks missed production-shaped payloads.
        </p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 mb-2">
          Action items
        </p>
        <ol className="list-decimal pl-4 space-y-2">
          <li>Add query-shape monitors + deploy freeze on pool saturation.</li>
          <li>Backfill index + replay load test with prod-like traces.</li>
          <li>Run blameless review Apr 11 — owner @Jenny.</li>
        </ol>
      </div>
    </div>
  );
}

/** Tab 4 — preview → build animation → scrollable report */
function PanelAiPostmortem() {
  const [phase, setPhase] = useState("preview");

  useEffect(() => {
    if (phase !== "building") return undefined;
    const t = window.setTimeout(() => setPhase("report"), 2600);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div className={`${slackCard} text-neutral-900 flex flex-col max-h-[420px]`}>
      <MayDayOpsAppHeader />
      <AnimatePresence mode="wait">
        {phase === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-800">
              <span className="mr-1" aria-hidden>
                ✨
              </span>
              <span className="font-semibold text-neutral-950">
                Incident review started
              </span>{" "}
              We found two opportunities for improvement and generated a review
              to get you started.
            </p>
            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50/70 p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Datadog charts on actions not appearing
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Incident in MayDayOps
                </p>
                <p className="text-[11px] text-neutral-400 mt-2">Oct 17</p>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">
                An outage caused long load times and timeouts across
                Greenagonia&apos;s API endpoints, impacting all customers.
                Greenagonia&apos;s affected features stabilized and the incident
                was resolved at 23:38 UTC.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 text-[11px] font-semibold">
                  Stage: Documenting
                </span>
                <span className="rounded-full bg-sky-100 text-sky-900 border border-sky-200 px-3 py-1 text-[11px] font-semibold">
                  Owner: @Jenny
                </span>
                <span className="rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 px-3 py-1 text-[11px] font-semibold">
                  📅 Apr 11, 2026
                </span>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setPhase("building")}
                  className="rounded-full border-2 px-4 py-2 text-xs font-bold transition-colors hover:opacity-90"
                  style={{
                    borderColor: PRIMARY_RICH,
                    color: PRIMARY_TEXT_ACCENT,
                    backgroundColor: PRIMARY_SOFT,
                  }}
                >
                  View incident review
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 space-y-4 py-2"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Building report…
            </p>
            <div className="space-y-3">
              {POSTMORTEM_BUILD_STEPS.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.35, duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <motion.span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                    style={{ borderColor: PRIMARY_RICH, color: PRIMARY_TEXT_ACCENT }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.35 + 0.1, type: "spring" }}
                  >
                    {i + 1}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800">
                      {label}
                    </p>
                    <motion.div
                      className="mt-1.5 h-1.5 rounded-full bg-neutral-200 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.35 + 0.15 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: PRIMARY_RICH }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          delay: i * 0.35 + 0.2,
                          duration: 0.45,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "report" && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col flex-1 min-h-0 mt-1"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Incident review
              </p>
              <button
                type="button"
                onClick={() => setPhase("preview")}
                className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
              >
                Back
              </button>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 max-h-[280px] overflow-y-auto overscroll-contain pr-2 pl-3 py-3 [scrollbar-width:thin]">
              <PostmortemReportScroll />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ALERT_COPY = {
  acknowledge: {
    stageLine: "Stage: Acknowledged · Priority: P2",
    title: "Acknowledged — on-call loop paused",
    body: "Primary acknowledged from mobile. Noise suppression rules muted duplicate correlated alerts. SLA acknowledgement timer started; next escalation window opens in 18 minutes unless severity bumps.",
    footer: "Notified: Anas Ali · Priya Singh · bridge standby channel armed.",
  },
  escalate: {
    stageLine: "Stage: Escalating · Priority: P2 → P1 candidate",
    title: "Tier-2 policy engaged",
    body: "Escalation path invoked: SMS + push to DB rotation + payments TL. Incident commander tagged automatically from rotation calendar. Customer-facing banner draft queued for approval.",
    footer: "Sent via policy east-critical · delivery receipts tracked in Timeline.",
  },
  bridge: {
    stageLine: "Stage: Mobilizing · Bridge live",
    title: "War-room bridge open",
    body: "Audio bridge spun up with waiting room + moderator PIN. Screen-share lane reserved for charts dashboard. Slack #war-room bridged for transcript capture.",
    footer: "Join URL pinned · expires when incident resolves.",
  },
};

function PanelSmartAlerting() {
  const [action, setAction] = useState("acknowledge");

  const copy = ALERT_COPY[action];

  return (
    <div className={`${slackCard} space-y-4`}>
      <MayDayOpsAppHeader time="1:08 PM" />
      <div className="rounded-lg border border-neutral-200 bg-neutral-50/90 p-3 sm:p-4">
        <p
          className="text-[11px] font-bold uppercase tracking-wide"
          style={{ color: PRIMARY_TEXT_ACCENT }}
        >
          MayDayOps APP
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={action}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <p className="mt-2 text-sm font-semibold text-neutral-900">
              Datadog charts not appearing
            </p>
            <p className="text-xs text-neutral-600 mt-1">{copy.stageLine}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800">
              {copy.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              {copy.body}
            </p>
            <p className="mt-2 text-[11px] text-neutral-500 border-t border-neutral-200/80 pt-2">
              {copy.footer}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap gap-2">
          {(
            [
              ["acknowledge", "Acknowledge"],
              ["escalate", "Escalate"],
              ["bridge", "Open bridge"],
            ]
          ).map(([key, label]) => {
            const on = action === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setAction(key)}
                className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                  on
                    ? "text-white shadow-sm ring-2 ring-black/10"
                    : "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
                }`}
                style={
                  on ? { backgroundColor: PRIMARY_RICH } : undefined
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PanelIncidentResponse() {
  return (
    <div className={`${slackCard} space-y-3 text-sm text-neutral-800`}>
      <MayDayOpsAppHeader time="11:42 AM" />
      <p className="font-semibold text-neutral-900">
        Here&apos;s my analysis{" "}
        <span style={{ color: PRIMARY_RICH }}>@Pedro</span>
      </p>
      <div className="border-l-2 pl-3 space-y-2" style={{ borderColor: PRIMARY_RICH }}>
        <p className="text-xs font-bold uppercase text-neutral-500">Key findings</p>
        <p>Canary slice took traffic spike; auth latency crossed SLO in ap-south-1.</p>
        <p className="text-xs font-bold uppercase text-neutral-500 pt-2">Primary issue</p>
        <p>Rollout skipped a readiness gate; paging lagged behind blast radius.</p>
        <p className="text-xs font-bold uppercase text-neutral-500 pt-2">Next steps</p>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Halt releases for payments edge.</li>
          <li>Ping DB rotation with replication graph.</li>
          <li>Post update in #war-room.</li>
        </ol>
      </div>
    </div>
  );
}

const TIMELINE_ROWS = [
  {
    id: "1",
    letter: "A",
    ring: "ring-orange-400",
    name: "Anas Ali",
    role: "ADMIN",
    body: "Incident created. Payment service unresponsive from us-east-1. Pulling logs.",
    meta: "10:02:14 PM · postedBy._id: 664abc…",
  },
  {
    id: "2",
    letter: "P",
    ring: "ring-blue-500",
    name: "Priya Singh",
    role: "DEVELOPER",
    body: "DB connections maxed out. Found N+1 query in order-service v2.3.1. Today's deploy introduced this.",
    meta: "10:15:30 PM · _id: 665t1…",
  },
  {
    id: "3",
    letter: "S",
    ring: "ring-slate-400",
    name: "Sahil Verma",
    role: "MEMBER",
    body: "Rollback of order-service to v2.2.8 initiated. ETA 8 min. Monitoring LB health.",
    meta: "10:28:05 PM",
  },
  {
    id: "4",
    letter: "J",
    ring: "ring-teal-500",
    name: "Jenny Park",
    role: "ON-CALL",
    body: "SEV-2 cleared after sustained green checks. Customer update posted; post-incident review ticket opened.",
    meta: "10:41:22 PM · review_id: inc_rev_998…",
  },
];

function PanelTimeline() {
  return (
    <div className={`${slackCard} space-y-3 text-sm max-h-[420px] flex flex-col`}>
      <MayDayOpsAppHeader time="9:51 AM" />
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden flex flex-col flex-1 min-h-0 shadow-inner">
        <div className="px-3 pt-3 pb-2 border-b border-neutral-100 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Live timeline
          </p>
        </div>
        <div className="relative px-3 py-4 overflow-y-auto max-h-[320px] overscroll-contain">
          <div className="absolute left-[22px] top-6 bottom-6 w-px bg-neutral-200" aria-hidden />
          <div className="space-y-5 relative">
            {TIMELINE_ROWS.map((row, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: fromLeft ? -56 : 56 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                    delay: 0.08 + i * 0.14,
                  }}
                  className="relative flex gap-3 pl-1"
                >
                  <div
                    className={`relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white ring-2 ring-offset-2 ring-offset-white ${row.ring}`}
                  >
                    {row.letter}
                  </div>
                  <div className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                      <span className="font-bold text-neutral-900">
                        {row.name}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                        {row.role}
                      </span>
                    </div>
                    <p className="mt-1.5 text-neutral-800 leading-snug text-[13px]">
                      {row.body}
                    </p>
                    <p className="mt-2 text-[11px] text-neutral-400 font-mono">
                      {row.meta}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const panelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function GlassBrowserWindow({ active }) {
  const panels = [
    <PanelSmartAlerting key="a" />,
    <PanelIncidentResponse key="b" />,
    <PanelTimeline key="c" />,
    <PanelAiPostmortem key="d" />,
  ];

  return (
    <div className={`${glassChrome} max-w-xl mx-auto`}>
      <WindowChromeGlass />
      <div className="flex min-h-[320px] sm:min-h-[360px]">
        <MiniSidebarRail />
        <div className="flex-1 min-w-0 p-3 sm:p-4">
          <div className="relative min-h-[280px] sm:min-h-[320px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                {panels[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureShowcaseSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="w-full bg-bg border-y border-border/80"
      aria-labelledby="feature-showcase-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <h2
          id="feature-showcase-heading"
          className="text-3xl sm:text-4xl font-bold text-text tracking-tight max-w-3xl mb-10 lg:mb-14"
        >
          From alert to resolution—one place your team actually{" "}
          <span style={{ color: PRIMARY }}>uses</span>
          .
        </h2>

        <div className="lg:grid lg:grid-cols-5 lg:gap-x-10 xl:gap-x-14 lg:items-start">
          <div className="lg:hidden -mx-4 px-4 mb-6 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(i)}
                className={`snap-start shrink-0 rounded-full px-4 py-2.5 text-base font-bold transition-colors ${
                  active === i
                    ? "shadow-md ring-1 ring-black/10 text-white"
                    : "bg-bg-surface text-text border border-border hover:border-primary/40"
                }`}
                style={active === i ? { backgroundColor: PRIMARY } : undefined}
              >
                {f.title}
              </button>
            ))}
          </div>

          <aside className="hidden lg:block lg:col-span-2">
            <nav
              className="sticky top-[30vh] space-y-2 pr-4"
              aria-label="Product features"
            >
              {FEATURES.map((f, i) => {
                const isOn = active === i;
                return (
                  <motion.div
                    key={f.id}
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  >
                    {isOn ? (
                      <motion.button
                        type="button"
                        layout
                        initial={{ opacity: 0.92 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setActive(i)}
                        className="w-full text-left rounded-xl px-5 py-4 shadow-lg shadow-black/10 ring-1 ring-black/10 text-white"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        <div className="font-bold text-lg leading-snug">
                          {f.title}
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={f.subtitle}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.22 }}
                            className="mt-2 text-base text-white/90 font-medium leading-relaxed"
                          >
                            {f.subtitle}
                          </motion.p>
                        </AnimatePresence>
                      </motion.button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className="w-full text-left font-bold text-text text-xl py-3 px-2 rounded-lg hover:text-primary transition-colors"
                      >
                        {f.title}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </aside>

          <div className="lg:col-span-3">
            <div className={`${showcaseBgClass} lg:sticky lg:top-24 lg:z-10`}>
              <ShowcaseBackdrop />
              <div className="relative z-[1]">
                <GlassBrowserWindow active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
