import React, { useState } from "react";
import Button from "../../../shared/components/Button";
import DeclareIncidentModal from "../components/DeclareIncidentModal";
import { FiLink2 } from "react-icons/fi";

const services = [
  { name: "Order Service", status: "Operational", statusColor: "success" },
  { name: "Payment Gateway", status: "Degraded Performance", statusColor: "ring" },
  { name: "Auth Service", status: "Operational", statusColor: "success" },
  { name: "Delivery API", status: "Operational", statusColor: "success" },
  { name: "Notification Service", status: "Outage", statusColor: "error" },
  { name: "Analytics", status: "Operational", statusColor: "success" },
];

const IncidentStatusPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-y-auto">
      {/* Top Header */}
      <div className="h-[80px] border-b border-border flex items-center justify-between px-8 shrink-0 bg-bg">
        <h1 className="text-xl font-bold text-text">Status Page</h1>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="font-bold flex items-center gap-2">
            <FiLink2 /> Invite Link Demo
          </Button>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" className="font-bold">
            + Create Incident
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-12 px-4">
        {/* Status Badge */}
        <div className="bg-success/10 border border-success/20 rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
          <span className="text-success font-bold text-xl">All Systems Operational</span>
        </div>

        {/* Titles */}
        <h1 className="text-4xl font-bold text-text mb-2 text-center">
          Swiggy Engineering Status
        </h1>
        <p className="text-text-muted text-xl mb-12 text-center">
          Real-time status for all Swiggy services
        </p>

        {/* Services List */}
        <div className="w-full max-w-3xl flex flex-col gap-3 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-bg-surface border border-border rounded-lg p-5 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-text font-bold text-xl">{service.name}</span>
              </div>
              <div className={`flex items-center gap-2 text-${service.statusColor}`}>
                <span className="text-lg font-bold">{service.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Incidents */}
        <div className="w-full max-w-3xl">
          <h3 className="text-md font-bold text-text-muted uppercase mb-4">
            Active Incidents
          </h3>
          <div className="bg-bg-surface border border-border rounded-xl p-5 flex items-start gap-4 shadow-sm">
            <span className="px-2.5 py-1 rounded-md border border-ring/30 bg-ring/10 text-ring text-xs font-bold shrink-0 mt-0.5">
              P2
            </span>
            <div>
              <h4 className="text-text font-bold text-lg mb-1">
                Stripe Webhook Processing Latency
              </h4>
              <p className="text-text-muted text-md font-medium">
                Team is investigating. ETA: 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <DeclareIncidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default IncidentStatusPage;
