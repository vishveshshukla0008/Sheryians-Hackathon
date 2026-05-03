
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
import Footer from "../shared/components/Footer";

const DocsLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg text-text">

      {/* 🔥 STICKY SIDEBAR */}
      <aside
        className="hidden md:block w-64 shrink-0 bg-bg border-r border-border p-5 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto"
        style={{
          scrollbarWidth: "none",        // Firefox
          msOverflowStyle: "none"        // IE/Edge
        }}
      >
        <h2 className="text-lg font-bold text-text mb-8">Documentation</h2>

        <nav className="space-y-8 text-sm pb-10">

          {/* 🔹 Getting Started */}
          <div>
            <p className="text-text-muted mb-3 uppercase text-xs font-bold tracking-wider">
              Getting Started
            </p>
            <div className="space-y-1.5">
              <NavLink to="/docs" end className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"
                }`
              }>
                <FiBook size={16} /> Introduction
              </NavLink>
              <NavLink to="/docs/quick-start" className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"
                }`
              }>
                <FiZap size={16} /> Quick Start
              </NavLink>
              <NavLink to="/docs/first-incident" className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"
                }`
              }>
                <FiAlertCircle size={16} /> Your First Incident
              </NavLink>
            </div>
          </div>

          {/* 🔹 Platform */}
          <div>
            <p className="text-text-muted mb-3 uppercase text-xs font-bold tracking-wider">
              Platform
            </p>
            <div className="space-y-1.5">
              <NavLink to="/docs/workspaces" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiUsers size={16} /> Workspaces
              </NavLink>
              <NavLink to="/docs/members" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiLayers size={16} /> Members & Roles
              </NavLink>
              <NavLink to="/docs/incidents" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiAlertTriangle size={16} /> Incidents
              </NavLink>
              <NavLink to="/docs/timeline" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiClock size={16} /> Timeline & Updates
              </NavLink>
              <NavLink to="/docs/status" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiGlobe size={16} /> Status Page
              </NavLink>
              <NavLink to="/docs/postmortem" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiActivity size={16} /> AI Postmortem
              </NavLink>
            </div>
          </div>

          {/* 🔹 Integrations */}
          <div>
            <p className="text-text-muted mb-3 uppercase text-xs font-bold tracking-wider">
              Integrations
            </p>
            <div className="space-y-1.5">
              <NavLink to="/docs/email" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiMail size={16} /> Email Notifications
              </NavLink>
              <NavLink to="/docs/slack" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiSlack size={16} /> Slack Integration
              </NavLink>
            </div>
          </div>

          {/* 🔹 Developer */}
          <div>
            <p className="text-text-muted mb-3 uppercase text-xs font-bold tracking-wider">
              Developer
            </p>
            <div className="space-y-1.5">
              <NavLink to="/docs/api" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiCode size={16} /> API Reference
              </NavLink>
              <NavLink to="/docs/auth" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiLock size={16} /> Authentication
              </NavLink>
              <NavLink to="/docs/rate-limits" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiBarChart2 size={16} /> Rate Limits
              </NavLink>
              <NavLink to="/docs/errors" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiAlertCircle size={16} /> Error Codes
              </NavLink>
              <NavLink to="/docs/sdk" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-bg-surface hover:text-text"}`}>
                <FiPackage size={16} /> SDK (NPM)
              </NavLink>
            </div>
          </div>

          {/* 🔹 Footer Box */}
          <div className="mt-8 p-5 rounded-2xl bg-bg-surface border border-border">
            <p className="font-bold text-text mb-1">Need help?</p>
            <p className="text-text-muted text-sm mb-4">Join our developer community</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-input text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <FiSlack size={18} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-input text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.02c-3.25.7-3.94-1.56-3.94-1.56-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.41-1.27.74-1.56-2.6-.3-5.33-1.3-5.33-5.78 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.2a11.2 11.2 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.5-2.74 5.48-5.35 5.77.42.36.8 1.1.8 2.22v3.3c0 .31.2.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </div>
          </div>

        </nav>
      </aside>

      {/* 🔥 CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* The main scrollable content area */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 w-full max-w-4xl mx-auto">
          <Outlet />
        </div>

        {/* 
          🔥 FOOTER INJECTION
          It sits at the bottom of the <main> container, respecting the sidebar.
        */}
        <div className="w-full border-t border-border mt-auto">
          <Footer />
        </div>

      </main>
    </div>
  );
};

export default DocsLayout;
