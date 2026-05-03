import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const mod = (n, m) => ((n % m) + m) % m;

const stackVariants = {
  enter: (dir) => ({
    y: dir === "up" ? 70 : -70,
    opacity: 0,
    scale: 0.985,
    filter: "blur(2px)",
  }),
  center: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: (dir) => ({
    y: dir === "up" ? -640 : 640,
    opacity: 0,
    scale: 0.985,
    filter: "blur(2px)",
    transition: { duration: 0.34, ease: "easeOut" },
  }),
};

const baseCardClass =
  "absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.45)]";

const TestimonialSwipeStack = ({
  items,
  className = "",
  heightClassName = "h-[320px] sm:h-[360px] md:h-[380px]",
}) => {
  const safe = Array.isArray(items) ? items.filter(Boolean) : [];
  const len = safe.length;

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState("up"); // used for animation direction

  const stack = useMemo(() => {
    if (!len) return [];
    const top = safe[mod(active, len)];
    const next = safe[mod(active + 1, len)];
    const next2 = safe[mod(active + 2, len)];
    return [top, next, next2];
  }, [active, len, safe]);

  const go = (nextDir) => {
    if (!len) return;
    setDir(nextDir);
    setActive((p) => (nextDir === "up" ? mod(p + 1, len) : mod(p - 1, len)));
  };

  if (!len) return null;

  const top = stack[0];
  const mid = stack[1];
  const back = stack[2];

  return (
    <div className={`relative ${heightClassName} ${className}`}>
      {/* Back cards (visible stack layers) */}
      <motion.div
        className={baseCardClass}
        animate={{ y: 30, scale: 0.95, opacity: 0.48 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url("${back?.bgImage ?? mid?.bgImage}")` }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_45%)]" />
        </div>
      </motion.div>

      <motion.div
        className={baseCardClass}
        animate={{ y: 14, scale: 0.975, opacity: 0.7 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url("${mid?.bgImage}")` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.14),transparent_45%)]" />
        </div>
      </motion.div>

      {/* Top card (animated + draggable) */}
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={top?.id ?? active}
          className={`${baseCardClass} z-10 cursor-grab active:cursor-grabbing`}
          custom={dir}
          variants={stackVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.7 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.y < -70) go("up");
            else if (info.offset.y > 70) go("down");
          }}
          aria-label="Testimonial card"
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url("${top?.bgImage}")`,
              }}
            />
            {/* Dark overlay + subtle grid */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_90%_30%,rgba(255,255,255,0.14),transparent_40%)]" />
            <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
          </div>

          <div className="relative h-full p-6 sm:p-8 md:p-10 text-white">
            {/* Content layout like screenshot */}
            <div className="h-full grid md:grid-cols-[1.3fr_0.9fr] gap-8 items-center">
              <div className="min-w-0">
                <div className="text-5xl leading-none font-black opacity-90">
                  “
                </div>
                <p className="mt-3 text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-xl">
                  {top?.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  {top?.brandMark ? (
                    <img
                      src={top.brandMark}
                      alt={top.brandAlt ?? "Brand"}
                      className="h-6 w-auto opacity-90"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-6 px-2 rounded bg-white/10 border border-white/15 text-xs font-bold tracking-wider flex items-center">
                      {top?.brandAlt ?? "TEAM"}
                    </div>
                  )}
                  <div className="text-sm text-white/85 font-semibold">
                    {top?.personTitle}
                  </div>
                </div>
              </div>

              <div className="justify-self-start md:justify-self-end">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  {top?.metricBig}
                </div>
                <div className="mt-2 text-sm sm:text-base text-white/75 max-w-[18rem]">
                  {top?.metricSmall}
                </div>
              </div>
            </div>

            {/* Right-side controls like screenshot */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => go("up")}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <FiChevronUp size={18} />
              </button>
              <button
                type="button"
                onClick={() => go("down")}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <FiChevronDown size={18} />
              </button>
            </div>

            {/* Small hint */}
            <div className="absolute left-8 bottom-5 text-[11px] uppercase tracking-wider text-white/65 font-bold">
              Swipe up / down
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mid/back card preview content (optional tiny glow only) */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="absolute -inset-10 bg-primary/10 blur-[120px] opacity-50" />
      </div>
    </div>
  );
};

export default TestimonialSwipeStack;

