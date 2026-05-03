import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../../utils/cn.js";

const ThreeDCardContext = createContext(false);

function toPx(value) {
  if (value === undefined || value === null) return "0px";
  return typeof value === "number" ? `${value}px` : String(value);
}

export function CardContainer({ children, className, containerClassName }) {
  const ref = useRef(null);
  const [mouseEntered, setMouseEntered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 14;
    const y = (e.clientY - top - height / 2) / 14;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseEntered(false);
    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center py-6 md:py-8",
        containerClassName,
      )}
      style={{ perspective: "880px" }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setMouseEntered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex items-center justify-center transition-transform duration-150 ease-out will-change-transform",
          className,
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <ThreeDCardContext.Provider value={mouseEntered}>
          {children}
        </ThreeDCardContext.Provider>
      </div>
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div
      className={cn(
        "min-h-[260px] w-full max-w-[22rem] [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}) {
  const ref = useRef(null);
  const isMouseEntered = useContext(ThreeDCardContext);

  useEffect(() => {
    if (!ref.current) return;
    const tx = toPx(translateX);
    const ty = toPx(translateY);
    const tz = toPx(translateZ);
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${tx}) translateY(${ty}) translateZ(${tz}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full transition-transform duration-150 ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}
