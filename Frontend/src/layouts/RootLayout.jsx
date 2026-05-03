import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { useTheme } from "../features/Theme/hooks/useTheme";

const RootLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();

  // Determine if we should hide the global footer
  // It checks if the URL path starts with "/docs" or "/admin"
  const hideFooter = location.pathname.startsWith("/docs") || location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
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
      
      {/* Navbar stays global */}
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Conditionally render the Footer */}
      {!hideFooter && <Footer />}
      
    </div>
  );
};

export default RootLayout;