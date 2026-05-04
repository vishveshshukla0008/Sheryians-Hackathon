import { FiAlertTriangle } from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-bg-surface/95 p-8 shadow-2xl shadow-primary/10 text-center">
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-bg shadow-inner">
            <SiOpslevel className="text-3xl text-primary" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-error/10 px-4 py-2 text-error text-sm font-semibold uppercase tracking-[0.2em]">
          <FiAlertTriangle className="text-base animate-pulse" />
          Recovering
        </div>

        <h2 className="mt-5 text-2xl font-bold text-text">Solving the error</h2>
        <p className="mt-3 text-sm text-text-muted leading-6">
          Hang tight while we reroute the incident and restore normal operation.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70 animate-pulse delay-150" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/40 animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
