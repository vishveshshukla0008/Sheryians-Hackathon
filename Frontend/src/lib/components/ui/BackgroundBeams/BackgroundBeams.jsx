import { motion, useReducedMotion } from "framer-motion";
import { useSelector } from "react-redux";
import { cn } from "../../../utils/cn.js";

/** Full beam density (original look). Lenis `lerp` + section `isolate` help keep scroll smooth. */
const PATH_COUNT = 50;

const beamPaths = Array.from({ length: PATH_COUNT }, (_, i) => {
  const x0 = -380 + i * 7;
  const y0 = -189 - i * 8;
  const xa = -312 + i * 7;
  const ya = 216 - i * 8;
  const xb = 152 + i * 7;
  const yb = 343 - i * 8;
  const xc = 616 + i * 7;
  const yc = 470 - i * 8;
  const xd = 684 + i * 7;
  const yd = 875 - i * 8;
  return `M${x0} ${y0}C${x0} ${y0} ${xa} ${ya} ${xb} ${yb}C${xc} ${yc} ${xd} ${yd} ${xd} ${yd}`;
});

const baseStrokeD = beamPaths.join(" ");

/** Faster sweep on dark; light slightly slower so beams stay readable */
function sweepTiming(index, isDark) {
  const base = isDark ? 3.8 : 4.6;
  const spread = isDark ? 2.8 : 3.4;
  return {
    duration: base + (index % 7) * (spread / 7),
    ease: "easeInOut",
    repeat: Infinity,
    delay: index * (isDark ? 0.04 : 0.055),
  };
}

export function BackgroundBeams({ className }) {
  const mode = useSelector((state) => state.theme.theme);
  const isDark = mode === "dark";
  const reduceMotion = useReducedMotion();

  const baseOpacity = isDark ? 0.07 : 0.125;
  const lineOpacity = isDark ? 0.4 : 0.58;
  const strokeW = isDark ? 0.5 : 0.62;

  const accent = isDark
    ? { a: "#18CCFC", b: "#6344F5", c: "#AE48FF" }
    : { a: "#0891b2", b: "#4f46e5", c: "#9333ea" };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden transform-gpu backface-hidden",
        isDark ? "opacity-100" : "opacity-[0.97]",
        className,
      )}
      aria-hidden
    >
      <svg
        className="absolute z-0 h-full w-full min-h-[320px] transform-gpu"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d={baseStrokeD}
          stroke="url(#paint0_radial_beams)"
          strokeOpacity={isDark ? baseOpacity : baseOpacity * 1.15}
          strokeWidth={strokeW}
        />

        {beamPaths.map((d, index) => (
          <motion.path
            key={`beam-${index}`}
            d={d}
            stroke={`url(#linearGradient-beams-${index})`}
            strokeOpacity={lineOpacity}
            strokeWidth={strokeW}
          />
        ))}

        <defs>
          {beamPaths.map((_, index) =>
            reduceMotion ? (
              <linearGradient
                key={`gradient-def-${index}`}
                id={`linearGradient-beams-${index}`}
                gradientUnits="userSpaceOnUse"
                x1="42%"
                x2="58%"
                y1="0%"
                y2="100%"
              >
                <stop stopColor={accent.a} stopOpacity={0} />
                <stop offset="22%" stopColor={accent.a} />
                <stop offset="32.5%" stopColor={accent.b} />
                <stop offset="100%" stopColor={accent.c} stopOpacity={0} />
              </linearGradient>
            ) : (
              <motion.linearGradient
                key={`gradient-def-${index}`}
                id={`linearGradient-beams-${index}`}
                gradientUnits="userSpaceOnUse"
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${93 + (index % 9)}%`],
                }}
                transition={sweepTiming(index, isDark)}
              >
                <stop stopColor={accent.a} stopOpacity={0} />
                <stop stopColor={accent.a} />
                <stop offset="32.5%" stopColor={accent.b} />
                <stop offset="100%" stopColor={accent.c} stopOpacity={0} />
              </motion.linearGradient>
            ),
          )}

          <radialGradient
            id="paint0_radial_beams"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop
              offset="0.0666667"
              stopColor={isDark ? "var(--beam-radial-mid)" : "var(--beam-radial-mid-light)"}
            />
            <stop
              offset="0.243243"
              stopColor={isDark ? "var(--beam-radial-mid)" : "var(--beam-radial-mid-light)"}
            />
            <stop offset="0.43594" stopColor="white" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
