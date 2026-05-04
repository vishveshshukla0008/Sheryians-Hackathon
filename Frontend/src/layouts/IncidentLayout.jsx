import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "../features/Theme/hooks/useTheme";
import {
  FiGrid,
  FiAlertCircle,
  FiActivity,
  FiSearch,
  FiBell,
  FiUsers,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";
import { Toaster } from "react-hot-toast";
import { useWorkspacePaths } from "../features/Incidents/hooks/useWorkspacePaths";
import { canManageWorkspace } from "../lib/workspacePaths";
import { api } from "../api/httpClient";

const IncidentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const paths = useWorkspacePaths();
  const isPrivileged = canManageWorkspace(user?.role);

  const [searchQuery, setSearchQuery] = useState("");
  const [allIncidents, setAllIncidents] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const hideTopNav =
    location.pathname === "/admin/status" ||
    location.pathname === "/admin/team" ||
    location.pathname === "/status" ||
    location.pathname === "/team";

  useEffect(() => {
    const fetchIncidents = async () => {
      setIsSearchLoading(true);
      try {
        const response = await api.get("/incidents");
        setAllIncidents(response?.data?.incidents || []);
      } catch {
        setAllIncidents([]);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const searchResults = allIncidents
    .filter((incident) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) {
        return false;
      }

      const id = incident._id || "";
      const title = incident.title || "";
      const description = incident.description || "";
      const status = incident.status || "";
      const severity = incident.severity || "";

      return (
        id.toLowerCase().includes(query) ||
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        status.toLowerCase().includes(query) ||
        severity.toLowerCase().includes(query)
      );
    })
    .slice(0, 6);

  const mainNav = [
    { name: "Dashboard", path: paths.dashboard, icon: FiGrid },
    { name: "Incidents", path: paths.incidents, icon: FiAlertCircle },
    { name: "Status Page", path: paths.status, icon: FiActivity },
  ];

  const adminNav = [{ name: "Team", path: paths.team, icon: FiUsers }];

  const companyLabel =
    user?.companyId?.name || user?.company?.name || "Workspace";

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
        <aside className="w-65 bg-bg border-r border-border flex flex-col shrink-0">
          <div className="h-20 flex items-center px-6 border-b border-border shrink-0">
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

          <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-6 px-3 text-lg">
            <div>
              <h3 className="text-md font-bold text-text-muted uppercase px-3 mb-2">
                Main
              </h3>
              <nav className="flex flex-col gap-1">
                {mainNav.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (link.path.endsWith("/incidents") &&
                      location.pathname.startsWith(link.path + "/"));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors relative ${
                        isActive
                          ? "bg-primary/10 text-text border-l-[3px] border-primary"
                          : "text-text-muted hover:text-text hover:bg-primary/10"
                      }`}>
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      {link.badge && (
                        <span className="bg-error text-white absolute left-1/2 top-1 text-error-foreground text-sm h-5 w-5 flex items-center justify-center font-bold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {isPrivileged && (
              <div>
                <h3 className="text-md font-bold text-text-muted uppercase px-3 mb-2">
                  Admin
                </h3>
                <nav className="flex flex-col gap-1">
                  {adminNav.map((link) => {
                    const isActive = location.pathname === link.path;
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
            )}

            {!isPrivileged && (
              <div>
                <h3 className="text-md font-bold text-text-muted uppercase px-3 mb-2">
                  Team
                </h3>
                <nav className="flex flex-col gap-1">
                  <Link
                    to={paths.team}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      location.pathname === paths.team
                        ? "bg-primary/10 text-primary border-l-[3px] border-primary"
                        : "text-text-muted hover:text-text hover:bg-primary/10"
                    }`}>
                    <FiUsers size={18} />
                    <span className="font-medium">Team</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border shrink-0">
            <div className="flex items-center gap-3 bg-bg-surface border border-border p-3 rounded-xl cursor-pointer hover:bg-bg-muted transition-colors">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {(user?.name || "?").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-bold text-text truncate">
                  {user?.name || "User"}
                </div>
                <div className="text-[10px] text-text-muted uppercase font-bold truncate">
                  {user?.role || "—"} · {companyLabel}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-bg min-h-0">
          {!hideTopNav && (
            <header className="h-20 border-b border-border flex items-center justify-between px-8 shrink-0">
              <div className="flex items-center gap-8">
                <nav className="hidden md:flex items-center gap-6 pt-0.5">
                  <span className="text-lg font-bold text-text-muted uppercase">
                    Systems
                  </span>
                  <span className="text-lg font-bold text-text-muted uppercase">
                    Responders
                  </span>
                  <span className="text-lg font-bold text-text-muted uppercase">
                    Logs
                  </span>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted z-10"
                    size={14}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search incidents..."
                    className="bg-input border border-border rounded-full py-2 pl-9 pr-4 text-[11px] text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full"
                  />

                  {searchQuery.trim() !== "" && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-border bg-bg-surface shadow-lg max-h-80 overflow-y-auto">
                      {searchResults.map((incident) => (
                        <button
                          key={incident._id}
                          type="button"
                          onClick={() => {
                            navigate(paths.incidentDetail(incident._id));
                            setSearchQuery("");
                          }}
                          className="w-full text-left px-4 py-3 border-b border-border last:border-b-0 hover:bg-primary/10 transition-colors flex flex-col">
                          <div className="text-sm font-bold text-text">
                            {incident.title}
                          </div>
                          <div className="text-[10px] text-text-muted mt-1 flex gap-2">
                            <span className="font-mono">
                              {incident._id?.slice(-8).toUpperCase()}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-white text-[9px] font-bold ${
                                incident.status === "OPEN"
                                  ? "bg-error"
                                  : incident.status === "INVESTIGATING"
                                    ? "bg-ring"
                                    : "bg-success"
                              }`}>
                              {incident.status}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-white text-[9px] font-bold ${
                                incident.severity === "P1"
                                  ? "bg-error"
                                  : incident.severity === "P2"
                                    ? "bg-ring"
                                    : "bg-success"
                              }`}>
                              {incident.severity}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchQuery.trim() !== "" &&
                    searchResults.length === 0 &&
                    !isSearchLoading && (
                      <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-border bg-bg-surface shadow-lg px-4 py-3">
                        <div className="text-sm text-text-muted">
                          No incidents found
                        </div>
                      </div>
                    )}
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="text-text-muted hover:text-text transition-colors relative ml-3 p-1 rounded-lg hover:bg-bg-muted">
                  {theme === "dark" ? (
                    <FiSun size={18} />
                  ) : (
                    <FiMoon size={18} />
                  )}
                </button>
                <button
                  type="button"
                  className="text-text-muted hover:text-text transition-colors relative ml-3">
                  <FiBell size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full border-2 border-bg" />
                </button>
                <div className="w-8 h-8 rounded-full bg-bg-muted border border-border overflow-hidden ml-3 flex items-center justify-center text-xs font-bold text-text">
                  {(user?.name || "?").charAt(0).toUpperCase()}
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 min-h-0 overflow-y-auto relative">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default IncidentLayout;
