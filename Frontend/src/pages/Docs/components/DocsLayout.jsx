import { Outlet, NavLink } from "react-router";
import {
  FiBook,
  FiZap,
  FiAlertCircle,
  FiUsers,
  FiLayers,
  FiClock,
  FiActivity,
  FiGlobe,
  FiMail,
  FiSlack,
  FiCode,
  FiLock,
  FiBarChart2,
  FiAlertTriangle,
  FiPackage,
} from "react-icons/fi";


const DocsLayout = () => {
  return (
    <div className="min-h-screen bg-bg text-text"
      style={{
        scrollbarWidth: "none",        // Firefox
        msOverflowStyle: "none"        // IE/Edge
      }}>

      {/* 🔥 FIXED SIDEBAR */}

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border p-5 bg-bg z-50 overflow-y-auto" style={{
        scrollbarWidth: "none",        // Firefox
        msOverflowStyle: "none"        // IE/Edge
      }}>
        <h2 className="text-lg font-bold mb-6">Documentation</h2>

        <div className="space-y-6 text-sm">

          {/* 🔹 Getting Started */}
          <div>
            <p className="text-text-muted mb-2 uppercase text-xs tracking-wide">
              Getting Started
            </p>

            <div className="space-y-1">

              <NavLink to="/docs" end className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiBook size={16} /> Introduction
              </NavLink>

              <NavLink to="/docs/quick-start" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiZap size={16} /> Quick Start
              </NavLink>

              <NavLink to="/docs/first-incident" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiAlertCircle size={16} /> Your First Incident
              </NavLink>

            </div>
          </div>

          {/* 🔹 Platform */}
          <div>
            <p className="text-text-muted mb-2 uppercase text-xs tracking-wide">
              Platform
            </p>

            <div className="space-y-1">

              <NavLink to="/docs/workspaces" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiUsers size={16} /> Workspaces
              </NavLink>

              <NavLink to="/docs/members" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiLayers size={16} /> Members & Roles
              </NavLink>

              <NavLink to="/docs/incidents" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiAlertTriangle size={16} /> Incidents
              </NavLink>

              <NavLink to="/docs/timeline" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiClock size={16} /> Timeline & Updates
              </NavLink>

              <NavLink to="/docs/status" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiGlobe size={16} /> Status Page
              </NavLink>

              <NavLink to="/docs/postmortem" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiActivity size={16} /> AI Postmortem
              </NavLink>

            </div>
          </div>

          {/* 🔹 Integrations */}
          <div>
            <p className="text-text-muted mb-2 uppercase text-xs tracking-wide">
              Integrations
            </p>

            <div className="space-y-1">

              <NavLink to="/docs/email" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiMail size={16} /> Email Notifications
              </NavLink>

              <NavLink to="/docs/slack" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiSlack size={16} /> Slack Integration
              </NavLink>

            </div>
          </div>

          {/* 🔹 Developer */}
          <div>
            <p className="text-text-muted mb-2 uppercase text-xs tracking-wide">
              Developer
            </p>

            <div className="space-y-1">

              <NavLink to="/docs/api" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiCode size={16} /> API Reference
              </NavLink>

              <NavLink to="/docs/auth" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiLock size={16} /> Authentication
              </NavLink>

              <NavLink to="/docs/rate-limits" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiBarChart2 size={16} /> Rate Limits
              </NavLink>

              <NavLink to="/docs/errors" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-primary transition">
                <FiAlertCircle size={16} /> Error Codes
              </NavLink>

              <NavLink to="/docs/sdk" className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-bg-surface hover:text-primary"
                }`
              }>
                <FiPackage size={16} /> SDK (NPM)
              </NavLink>

            </div>
          </div>

          {/* 🔹 Footer Box */}
          <div className="mt-8 p-4 rounded-xl bg-bg-surface border border-border text-xs">
            <p className="mb-2 font-semibold">Need help?</p>
            <p className="text-text-muted mb-3">Join our community</p>

            <div className="flex items-center gap-4">

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-primary/10 transition group"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-primary transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.02c-3.25.7-3.94-1.56-3.94-1.56-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.41-1.27.74-1.56-2.6-.3-5.33-1.3-5.33-5.78 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.2a11.2 11.2 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.5-2.74 5.48-5.35 5.77.42.36.8 1.1.8 2.22v3.3c0 .31.2.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-primary/10 transition group"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-primary transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.249.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.1.246.198.372.292a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.892.076.076 0 00-.04.106c.36.699.772 1.364 1.225 1.994a.076.076 0 00.084.028 19.876 19.876 0 006.002-3.03.077.077 0 00.03-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.21 0 2.165 1.094 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.21 0 2.165 1.094 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
                </svg>
              </a>

            </div>
          </div>

        </div>

      </aside>

      {/* 🔥 CONTENT AREA */}
      <main className="ml-64 p-8 h-screen overflow-y-auto "
        style={{
          scrollbarWidth: "none",        // Firefox
          msOverflowStyle: "none"        // IE/Edge
        }}>
        <Outlet />
      </main>

    </div>
  );
};

export default DocsLayout;