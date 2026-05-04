import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { useTheme } from "../features/Theme/hooks/useTheme";
import PageBackButton from "../shared/components/PageBackButton";

const RootLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const showBackBar = location.pathname !== "/" && !location.pathname.startsWith("/docs");

  return (
    <div className="bg-bg text-text min-h-screen">
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
      <Navbar />
      <main className="relative z-10">
        {showBackBar && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <PageBackButton fallbackPath="/" />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
