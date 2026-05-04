/** Socket.IO HTTP origin (no /api suffix). API lives at VITE_API_URL with /api path. */
export function getSocketBaseUrl() {
  const explicit = import.meta.env.VITE_SOCKET_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  return api.replace(/\/api\/?$/, "");
}
