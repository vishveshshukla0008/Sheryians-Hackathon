import React, { useState } from "react";
import { FiArrowUp, FiArrowDown, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import DeclareIncidentModal from "../components/DeclareIncidentModal";
import Button from "../../../shared/components/Button";

const IncidentDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-8 w-full h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-5xl font-bold text-primary">Dashboard</h1>
        <div className="flex items-center gap-5">
          <Button variant="secondary" size="md" className="font-bold flex items-center justify-center gap-2">
            Invite Link Demo
          </Button>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md" className="font-bold flex items-center justify-center gap-2">
            Create Incident
          </Button>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-text mb-2">Welcome Rahul 👋</h2>
        <p className="text-text-muted text-md font-medium">
          Here's what's happening with Swiggy Engineering today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {/* OPEN */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 flex flex-col justify- gap-3">
          <span className="text-md font-extrabold text-text-muted uppercase">
            Open
          </span>
          <div>
            <div className="text-5xl font-black text-error mb-3">2</div>
            <div className="flex items-center text-md text-text-muted font-medium gap-1">
              <FiArrowUp className="text-primary" size={20} />{" "}
              <span className="text-primary">1</span> from yesterday
            </div>
          </div>
        </div>

        {/* INVESTIGATING */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 flex flex-col justify- gap-3">
          <span className="text-md font-extrabold text-text-muted uppercase">
            Investigating
          </span>
          <div>
            <div className="text-5xl font-black text-ring mb-3">1</div>
            <div className="text-md text-text-muted font-medium">
              Since 42 min ago
            </div>
          </div>
        </div>

        {/* RESOLVED TODAY */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 flex flex-col justify- gap-3">
          <span className="text-md font-extrabold text-text-muted uppercase">
            Resolved Today
          </span>
          <div>
            <div className="text-5xl font-black text-success mb-3">4</div>
            <div className="flex items-center text-md text-text-muted font-medium gap-1">
              <FiArrowDown className="text-success" size={20} /> Avg MTTR 23min
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 flex flex-col justify- gap-3">
          <span className="text-md font-extrabold text-text-muted uppercase">
            Team Members
          </span>
          <div>
            <div className="text-5xl font-black text-primary mb-3">6</div>
            <div className="text-md text-text-muted font-medium">
              2 online now
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Incidents */}
        <div className="lg:col-span-2 bg-bg border border-border rounded-lg flex flex-col shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-bold text-text">Active Incidents</h3>
            <Button variant="secondary" size="sm" className="font-bold flex items-center gap-1.5 cursor-pointer">
              View all <FiArrowRight />
            </Button>
          </div>

          <div className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-md font-bold text-text-muted uppercase">
              <div className="col-span-6">Incident</div>
              <div className="col-span-2 text-center">Severity</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Time</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {/* Row 1 */}
              <div onClick={() => navigate("/admin/incidents/INC-29402")} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary/10 cursor-pointer">
                <div className="col-span-6">
                  <div className="text-sm text-text-muted font-mono mb-1">
                    INC-29402
                  </div>
                  <div className="text-md font-bold text-text">
                    API Gateway Timeout Escalation
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-2.5 py-0.5 rounded-full border border-error/30 bg-error/5 text-error text-sm font-bold">
                    P1
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-3 py-1 rounded-lg bg-ring/10 text-ring text-md font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ring animate-pulse"></span>{" "}
                    Investigating
                  </span>
                </div>
                <div className="col-span-2 text-right md text-text-muted font-mono">
                  00:42:15
                </div>
              </div>

              {/* Row 2 */}
              <div onClick={() => navigate("/admin/incidents/INC-29403")} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary/10 cursor-pointer">
                <div className="col-span-6">
                  <div className="text-sm text-text-muted font-mono mb-1">
                    INC-29403
                  </div>
                  <div className="text-md font-bold text-text">
                    Stripe Webhook Processing Latency
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-2.5 py-0.5 rounded-full border border-ring/30 bg-ring/5 text-ring text-sm font-bold">
                    P2
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-3 py-1 rounded-lg bg-error/10 text-error text-sm font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>{" "}
                    Open
                  </span>
                </div>
                <div className="col-span-2 text-right text-md text-text-muted font-mono">
                  01:12:04
                </div>
              </div>

              {/* Row 3 */}
              <div onClick={() => navigate("/admin/incidents/INC-29401")} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary/10 cursor-pointer">
                <div className="col-span-6">
                  <div className="text-sm text-text-muted font-mono mb-1">
                    INC-29401
                  </div>
                  <div className="text-md font-bold text-text">
                    Auth Service Memory Leak
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-2.5 py-0.5 rounded-full border border-success/30 bg-success/5 text-success text-sm font-bold">
                    P3
                  </span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-sm font-bold flex items-center gap-1.5">
                    Resolved
                  </span>
                </div>
                <div className="col-span-2 text-right text-md text-text-muted font-mono">
                  --
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-bg-surface border border-border rounded-2xl flex flex-col shadow-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold text-text">Recent Activity</h3>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {/* Activity 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center shrink-0 border border-error/20">
                <span className="text-error text-sm font-bold">PS</span>
              </div>
              <div>
                <p className="text-lg text-text-muted leading-snug mb-1">
                  <span className="text-text font-bold">Priya Singh</span>{" "}
                  posted update on INC-29402
                </p>
                <span className="text-sm text-text-muted font-medium">
                  2 min ago
                </span>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <span className="text-primary text-sm font-bold">SV</span>
              </div>
              <div>
                <p className="text-lg text-text-muted leading-snug mb-1">
                  <span className="text-text font-bold">Sahil Verma</span> was
                  assigned to INC-29402
                </p>
                <span className="text-sm text-text-muted font-medium">
                  15 min ago
                </span>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 border border-success/20">
                <span className="text-success text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-lg text-text-muted leading-snug mb-1">
                  <span className="text-text font-bold">INC-29401</span>{" "}
                  resolved by Rahul Sharma
                </p>
                <span className="text-sm text-text-muted font-medium">
                  1 hr ago
                </span>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <span className="text-primary text-sm font-bold">AI</span>
              </div>
              <div>
                <p className="text-lg text-text-muted leading-snug mb-1">
                  AI Postmortem generated for INC-29401
                </p>
                <span className="text-sm text-text-muted font-medium">
                  1 hr ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeclareIncidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default IncidentDashboard;
