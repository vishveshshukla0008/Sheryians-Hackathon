/** ADMIN/CEO use /admin/* shell; DEVELOPER/MEMBER use /dashboard, /incidents, etc. */
export const canManageWorkspace = (role) => role === "ADMIN" || role === "CEO";

export const defaultWorkspaceHome = (role) =>
  canManageWorkspace(role) ? "/admin/dashboard" : "/dashboard";
