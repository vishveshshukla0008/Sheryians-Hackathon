import React, { useState } from "react";
import { useNavigate } from "react-router";
import DeclareIncidentModal from "../components/DeclareIncidentModal";
import Button from "../../../shared/components/Button";

const incidents = [
  {
    id: "INC-29402",
    title: "API Gateway Timeout Escalation",
    severity: "P1",
    timeElapsed: "00:42:15",
    status: "Investigating",
  },
  {
    id: "INC-29403",
    title: "Stripe Webhook Processing Latency",
    severity: "P2",
    timeElapsed: "01:12:04",
    status: "Open",
  },
  {
    id: "INC-29405",
    title: "Auth Service Memory Leak - Cluster B",
    severity: "P3",
    timeElapsed: "02:55:30",
    status: "Open",
  },
  {
    id: "INC-29401",
    title: "CDN Cache Invalidation Failure",
    severity: "P2",
    timeElapsed: "--",
    status: "Resolved",
  },
];

const IncidentAdmin = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-8 w-full h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-text">Active Incidents</h1>
        <div className="flex items-center gap-5">
          <Button variant="secondary" size="md" className="font-bold flex items-center justify-center gap-2">
            Invite Link Demo
          </Button>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md" className="font-bold">
            + Create Incident
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-bg-surface border border-border rounded-lg flex flex-col shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-text mb-1">
              Active Incidents
            </h3>
            <p className="text-md font-medium text-text-muted">
              Monitoring real-time infrastructure anomalies
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" className="font-bold">
              Filter
            </Button>
            <Button variant="secondary" size="md" className="font-bold">
              Export
            </Button>
          </div>
        </div>

        <div className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-md font-bold text-text-muted uppercase">
            <div className="col-span-2">Status</div>
            <div className="col-span-6">Incident Title</div>
            <div className="col-span-2 text-center">Severity</div>
            <div className="col-span-2 text-right">Time Elapsed</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => navigate(`/admin/incidents/${inc.id}`)}
                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary/5 cursor-pointer transition-colors"
              >
                <div className="col-span-2 flex items-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 ${
                      inc.status === "Investigating"
                        ? "bg-ring/10 text-ring"
                        : inc.status === "Open"
                          ? "bg-error/10 text-error animate-pulse"
                          : "bg-success/10 text-success"
                    }`}>
                    {inc.status}
                  </span>
                </div>

                <div className="col-span-6">
                  <div className="text-md text-text-muted font-mono mb-1">
                    {inc.id}
                  </div>
                  <div className="text-lg font-bold text-text">{inc.title}</div>
                </div>

                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-3 py-0.5 rounded-full border text-sm font-bold ${
                      inc.severity === "P1"
                        ? "border-error/30 bg-error/5 text-error"
                        : inc.severity === "P2"
                          ? "border-ring/30 bg-ring/5 text-ring"
                          : "border-success/30 bg-success/5 text-success"
                    }`}>
                    {inc.severity}
                  </span>
                </div>

                <div className="col-span-2 text-right text-lg text-text-muted font-mono">
                  {inc.timeElapsed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeclareIncidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default IncidentAdmin;
