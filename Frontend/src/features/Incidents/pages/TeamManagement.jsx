import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { canManageWorkspace } from "../../../lib/workspacePaths";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import DeclareIncidentModal from "../components/DeclareIncidentModal";
import { FiLink2 } from "react-icons/fi";
import { PiHourglassHighFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { api } from "../../../api/httpClient";

const getAvatarColor = (role) => {
  if (role === "CEO") return "bg-error/10 text-error";
  if (role === "ADMIN") return "bg-success/10 text-success";
  if (role === "DEVELOPER") return "bg-primary/10 text-primary";
  return "bg-ring/10 text-ring";
};

const TeamManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const isPrivileged = canManageWorkspace(user?.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTeamData = async () => {
    try {
      setIsLoadingData(true);
      setErrorMessage("");

      const membersPromise = api.get("/company/members");
      const invitesPromise = isPrivileged
        ? api.get("/company/invites/pending")
        : Promise.resolve({ data: { invites: [] } });

      const [membersRes, invitesRes] = await Promise.all([membersPromise, invitesPromise]);

      setMembers(membersRes?.data?.members || []);
      setPendingInvites(invitesRes?.data?.invites || []);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to fetch team data.");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const sendInvite = async () => {
    const email = inviteEmail.trim().toLowerCase();
    if (!email) {
      toast.error("Please enter email address");
      return;
    }

    try {
      setIsSendingInvite(true);
      await api.post("/company/invite", { email, role: "DEVELOPER" });
      toast.success("Invite sent successfully");
      setInviteEmail("");
      await fetchTeamData();
    } catch (error) {
      toast.error(error?.message || "Failed to send invite");
    } finally {
      setIsSendingInvite(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-y-auto">
      {/* Top Header */}
      <div className="h-[80px] border-b border-border flex items-center justify-between px-8 shrink-0 bg-bg">
        <h1 className="text-2xl font-bold text-text">Team Management</h1>
        {isPrivileged && (
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
        )}
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        {/* Page Titles */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text mb-2">Team Management</h1>
          <p className="text-xl text-text-muted">
            Manage members and pending invitations
          </p>
          {errorMessage && <p className="text-error mt-3 text-sm font-medium">{errorMessage}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members List */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-text-muted uppercase mb-4">
              MEMBERS ({members.length})
            </h3>
            <div className="flex flex-col gap-3">
              {isLoadingData && (
                <div className="bg-bg-surface border border-border rounded-xl p-5 text-text-muted">
                  Loading members...
                </div>
              )}
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-bg-surface border border-border rounded-xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${getAvatarColor(member.role)}`}>
                      {(member.name || "U").charAt(0).toUpperCase()}
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
                    className={`px-3 py-1 rounded-md text-xs text-primary-foreground font-bold  ${member.role === "ADMIN" || member.role === "CEO" ? "bg-success" : "bg-primary"}`}>
                    {member.role}
                  </span>
                </div>
              ))}
              {!isLoadingData && members.length === 0 && (
                <div className="bg-bg-surface border border-border rounded-xl p-5 text-text-muted">
                  No members found.
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Invites */}
          <div className="flex flex-col gap-8">
            {/* Invite Form */}
            <div className="bg-bg-surface border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-text mb-1">
                Invite mates
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
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  labelClassName="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2"
                />
              </div>
              <Button
                onClick={sendInvite}
                size="full"
                isLoading={isSendingInvite}
                disabled={!isPrivileged || isSendingInvite}
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
                {isLoadingData && (
                  <div className="bg-bg-surface rounded-xl p-4 text-text-muted shadow-sm">
                    Loading pending invites...
                  </div>
                )}
                {pendingInvites.map((invite) => (
                  <div
                    key={invite._id}
                    className="bg-bg-surface rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <span className="text-md font-medium text-text-muted">
                      {invite.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-ring text-sm font-bold">
                      <PiHourglassHighFill /> {invite.status}
                    </span>
                  </div>
                ))}
                {!isLoadingData && pendingInvites.length === 0 && (
                  <div className="bg-bg-surface rounded-xl p-4 text-text-muted shadow-sm">
                    No pending invites.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPrivileged && (
        <DeclareIncidentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeamManagement;
