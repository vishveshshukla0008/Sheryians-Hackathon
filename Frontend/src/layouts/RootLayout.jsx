import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const RootLayout = () => {
  const theme = document.body.getAttribute("data-theme");

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
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
