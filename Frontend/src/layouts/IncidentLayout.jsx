import { Outlet, Link, useLocation } from "react-router";
import { useTheme } from "../features/Theme/hooks/useTheme";
import {
  FiGrid,
  FiAlertCircle,
  FiActivity,
  FiPlus,
  FiSettings,
  FiHelpCircle,
  FiSearch,
  FiBell,
  FiUsers,
} from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";
import { Toaster } from "react-hot-toast";

const IncidentLayout = () => {
  const location = useLocation();
  const { theme } = useTheme();

  console.log(theme);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#606060" : "#ffffff",
            color: theme === "dark" ? "#f5f5f5" : "#1f1f1f",
            border: "1px solid rgba(0,0,0,0.1)",
            fontSize: "1.2rem",
            fontWeight: "bold",
          },
        }}
      />
      <div className="flex h-screen bg-bg text-text overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[260px] bg-bg border-r border-border flex flex-col shrink-0">
          {/* Logo Area in topBar */}
          <div className="h-[80px] flex items-center px-6 border-b border-border shrink-0">
            <div className="flex items-center justify-center mr-3">
              <SiOpslevel size={30} />
            </div>
            <div>
              <h1 className="text-text font-bold text-lg leading-tight tracking-wide">
                MayDayOps
              </h1>
              <p className="text-text-muted text-sm font-bold mt-0.5">
                Incident Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-6 px-3 text-lg">
            {/* MAIN Section */}
            <div>
              <h3 className="text-md font-bold text-text-muted uppercase px-3 mb-2">
                Main
              </h3>
              <nav className="flex flex-col gap-1">
                {[
                  { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
                  {
                    name: "Incidents",
                    path: "/admin/incidents",
                    icon: FiAlertCircle,
                    badge: 2,
                  },
                  {
                    name: "Status Page",
                    path: "/admin/status",
                    icon: FiActivity,
                  },
                ].map((link) => {
                  const isActive = location.pathname.includes(link.path);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors relative ${
                        isActive
                          ? "bg-primary/10 text-primary-foreground border-l-[3px] border-primary"
                          : "text-text-muted hover:text-text hover:bg-primary/10"
                      }`}>
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      {link.badge && (
                        <span className="bg-error absolute left-1/2 top-1 text-error-foreground text-sm h-5 w-5 flex items-center justify-center font-bold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ADMIN Section */}
            <div>
              <h3 className="text-md font-bold text-text-muted uppercase px-3 mb-2">
                Admin
              </h3>
              <nav className="flex flex-col gap-1">
                {[
                  { name: "Team", path: "/admin/team", icon: FiUsers },
                  {
                    name: "Settings",
                    path: "/admin/settings",
                    icon: FiSettings,
                  },
                ].map((link) => {
                  const isActive = location.pathname.includes(link.path);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors relative ${
                        isActive
                          ? "bg-primary/10 text-primary border-l-[3px] border-primary"
                          : "text-text-muted hover:text-text hover:bg-primary/10"
                      }`}>
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-medium">{link.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom Profile */}
          <div className="p-4 border-t border-border shrink-0">
            <div className="flex items-center gap-3 bg-bg-surface border border-border p-3 rounded-xl cursor-pointer hover:bg-bg-muted transition-colors">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                R
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-bold text-text truncate">
                  Rahul Sharma
                </div>
                <div className="text-[10px] text-text-muted uppercase font-bold truncate">
                  Admin · Swiggy
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-bg">
          {/* Navbar */}
          {location.pathname !== "/admin/status" &&
            location.pathname !== "/admin/team" && (
              <header className="h-[80px] border-b border-border flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center gap-8">
                  <nav className="hidden md:flex items-center gap-6 pt-0.5">
                    <Link
                      to="#"
                      className="text-lg font-bold text-text-muted hover:text-text transition-colors uppercase">
                      Systems
                    </Link>
                    <Link
                      to="#"
                      className="text-lg font-bold  text-text-muted hover:text-text transition-colors uppercase">
                      Responders
                    </Link>
                    <Link
                      to="#"
                      className="text-lg font-bold  text-text-muted hover:text-text transition-colors uppercase">
                      Logs
                    </Link>
                  </nav>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <FiSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                      size={14}
                    />
                    <input
                      type="text"
                      placeholder="SEARCH SYSTEM..."
                      className="bg-input border border-border rounded-full py-2 pl-9 pr-4 text-[11px] text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-[220px]"
                    />
                  </div>
                  <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full text-[10px] font-bold  transition-colors uppercase ml-2">
                    Create Incident
                  </button>
                  <button className="text-text-muted hover:text-text transition-colors relative ml-3">
                    <FiBell size={18} />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full border-2 border-bg"></span>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-bg-muted border border-border overflow-hidden ml-3">
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </header>
            )}

          {/* Page Content */}
          <main className="flex-1 overflow-hidden relative">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default IncidentLayout;
