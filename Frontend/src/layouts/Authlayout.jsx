import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { SiOpslevel } from "react-icons/si";
import { useTheme } from "../features/Theme/hooks/useTheme";
import PageBackButton from "../shared/components/PageBackButton";

const Authlayout = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#606060" : "#ffffff",
            color: theme === "dark" ? "#f5f5f5" : "#1f1f1f",
            border: "1px solid rgba(0,0,0,0.1)",
          },
        }}
      />

      <header className="w-full border-b border-border/70 bg-bg backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <PageBackButton fallbackPath="/" className="-ml-1 shrink-0" />
            <div className="p-2 rounded-lg text-text shadow-sm">
              <SiOpslevel className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                MayDayOps
              </p>
              <h1 className="text-sm font-bold text-text">
                Secure your access. Start faster.
              </h1>
            </div>
          </div>
          <div className="rounded-3xl bg-bg-surface border border-border px-4 py-3 shadow-sm">
            <p className="text-sm text-text-muted sm:text-base">
              Welcome ! your security and speed are our top priority.
            </p>
          </div>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Authlayout;
