import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const theme = document.body.getAttribute("data-theme");

  return (
    <div className="bg-bg text-text min-h-screen">
      <nav>Navbar</nav>
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
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
