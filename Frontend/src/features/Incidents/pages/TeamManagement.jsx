import React, { useState } from "react";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import DeclareIncidentModal from "../components/DeclareIncidentModal";
import { FiLink2 } from "react-icons/fi";
import { PiHourglassHighFill } from "react-icons/pi";
import toast from "react-hot-toast";

const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@swiggy.com",
    role: "ADMIN",
    initial: "R",
    color: "bg-error/10 text-error",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@swiggy.com",
    role: "DEVELOPER",
    initial: "P",
    color: "bg-primary/10 text-primary",
  },
  {
    id: 3,
    name: "Sahil Verma",
    email: "sahil@swiggy.com",
    role: "DEVELOPER",
    initial: "S",
    color: "bg-success/10 text-success",
  },
  {
    id: 4,
    name: "Ananya Reddy",
    email: "ananya@swiggy.com",
    role: "DEVELOPER",
    initial: "A",
    color: "bg-ring/10 text-ring",
  },
];

const pendingInvites = [
  { id: 1, email: "kiran@swiggy.com", status: "Pending" },
  { id: 2, email: "rohit@swiggy.com", status: "Pending" },
];

const TeamManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function sendInvite() {
    toast.success("Invite sent successfully");
    console.log("Yes");
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-y-auto">
      {/* Top Header */}
      <div className="h-[80px] border-b border-border flex items-center justify-between px-8 shrink-0 bg-bg">
        <h1 className="text-2xl font-bold text-text">Team Management</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            className="font-bold flex items-center gap-2">
            <FiLink2 /> Invite Link Demo
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="sm"
            className="font-bold">
            Create Incident
          </Button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        {/* Page Titles */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text mb-2">Team Management</h1>
          <p className="text-xl text-text-muted">
            Manage members and pending invitations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members List */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-text-muted uppercase mb-4">
              MEMBERS ({members.length})
            </h3>
            <div className="flex flex-col gap-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-bg-surface border border-border rounded-xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${member.color}`}>
                      {member.initial}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text mb-0.5">
                        {member.name}
                      </h4>
                      <p className="text-sm font-medium text-text-muted">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-md text-xs text-primary-foreground font-bold  ${member.role === "ADMIN" ? "bg-success" : "bg-primary"}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Invites */}
          <div className="flex flex-col gap-8">
            {/* Invite Form */}
            <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-text mb-1">
                Invite Teammate (Developer)
              </h3>
              <p className="text-md font-medium text-text-muted mb-6">
                They'll receive an email with a join link
              </p>

              <div className="mb-5">
                <Input
                  id="email"
                  type="email"
                  label="EMAIL ADDRESS"
                  placeholder="dev@swiggy.com"
                  labelClassName="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2"
                />
              </div>
              <Button
                onClick={sendInvite}
                size="full"
                className="font-bold flex items-center justify-center gap-2 text-md">
                Send Invitation
              </Button>
              <p className="text-md font-bold text-error mt-2 ">*CEO/Admin can only invite others</p>
            </div>

            {/* Pending Invites section for checking people who are accepted are not  */}
            <div>
              <h3 className="text-md font-bold text-text-muted uppercase mb-4">
                PENDING INVITES
              </h3>
              <div className="flex flex-col gap-3">
                {pendingInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="bg-bg-surface rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <span className="text-md font-medium text-text-muted">
                      {invite.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-ring text-sm font-bold">
                      <PiHourglassHighFill /> {invite.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeclareIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TeamManagement;
