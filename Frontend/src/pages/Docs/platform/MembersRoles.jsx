import { FiShield, FiUserCheck, FiEye, FiTerminal, FiAlertTriangle } from "react-icons/fi";

const MembersRoles = () => {
    return (
        <div className="animate-fade-in-up space-y-12 pb-12">

            <section>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
                    Members & Roles
                </h1>
                <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
                    Incident management requires strict governance. MayDayOps enforces the Principle of Least Privilege (PoLP) through a rigid Role-Based Access Control (RBAC) matrix.
                </p>
            </section>

            <hr className="border-border/60" />

            {/* Roles Breakdown */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-text mb-4">The Four Archetypes</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-border bg-bg-surface flex gap-5">
                        <div className="mt-1"><FiShield className="text-error size-6" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-text mb-1">Admin</h3>
                            <p className="text-sm text-text-muted leading-relaxed">God-mode for the workspace. Can regenerate API keys, connect Slack integrations, delete the workspace, and forcefully resolve any incident.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-bg-surface flex gap-5">
                        <div className="mt-1"><FiTerminal className="text-primary size-6" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-text mb-1">Developer / Responder</h3>
                            <p className="text-sm text-text-muted leading-relaxed">The core operators. Can acknowledge incidents, post timeline updates, and interact with the AI Postmortem tools. Cannot alter integrations.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-bg-surface flex gap-5">
                        <div className="mt-1"><FiUserCheck className="text-ring size-6" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-text mb-1">CEO / Stakeholder</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Executive visibility. Can view the live timeline and read postmortems to understand business impact, but cannot accidentally resolve or alter an active incident.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-bg-surface flex gap-5">
                        <div className="mt-1"><FiEye className="text-success size-6" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-text mb-1">User / Viewer</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Strictly read-only access to the internal dashboard. Typically given to Customer Support teams so they know what to tell clients.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Permissions Matrix */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text">Permissions Matrix</h2>
                <div className="overflow-hidden border border-border rounded-2xl bg-bg-surface shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-input/50 text-text-muted text-xs uppercase tracking-wider border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Action</th>
                                    <th className="px-6 py-4 font-bold text-center">Admin</th>
                                    <th className="px-6 py-4 font-bold text-center">Developer</th>
                                    <th className="px-6 py-4 font-bold text-center">CEO</th>
                                    <th className="px-6 py-4 font-bold text-center">User</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { action: "Declare Incidents", a: true, d: true, c: false, u: false },
                                    { action: "Post Timeline Updates", a: true, d: true, c: false, u: false },
                                    { action: "Edit Public Status Page", a: true, d: true, c: false, u: false },
                                    { action: "Invite Members", a: true, d: false, c: false, u: false },
                                    { action: "Manage API Keys", a: true, d: false, c: false, u: false },
                                    { action: "View Dashboards & Logs", a: true, d: true, c: true, u: true },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-input/30 transition-colors">
                                        <td className="px-6 py-4 text-text font-medium">{row.action}</td>
                                        <td className="px-6 py-4 text-center">{row.a ? <span className="text-success font-bold">✓</span> : <span className="text-text-muted">-</span>}</td>
                                        <td className="px-6 py-4 text-center">{row.d ? <span className="text-success font-bold">✓</span> : <span className="text-text-muted">-</span>}</td>
                                        <td className="px-6 py-4 text-center">{row.c ? <span className="text-success font-bold">✓</span> : <span className="text-text-muted">-</span>}</td>
                                        <td className="px-6 py-4 text-center">{row.u ? <span className="text-success font-bold">✓</span> : <span className="text-text-muted">-</span>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Security Note */}
            <section className="p-5 rounded-xl border border-ring/30 bg-ring/5 flex gap-4 items-start">
                <FiAlertTriangle className="text-ring mt-1 shrink-0 size-5" />
                <div>
                    <h3 className="text-ring font-bold mb-1">Security Handling</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                        If a token belonging to a `User` role attempts to hit the `POST /api/incidents` endpoint, the API will reject the request with a strict `403 Forbidden` standard error envelope.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default MembersRoles;