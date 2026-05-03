import { FiZap, FiShield } from "react-icons/fi";

const EmailNotifications = () => {
    return (
        <div className="animate-fade-in-up space-y-12 pb-12">

            {/* Header */}
            <section>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight flex items-center gap-4">
                    Email Notifications
                </h1>
                <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
                    MayDayOps utilizes a high-deliverability email pipeline powered by <a href="https://resend.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">Resend</a> to ensure critical alerts bypass spam filters and wake up your on-call engineers.
                </p>
            </section>

            <hr className="border-border/60" />

            {/* Alert Routing & Rules */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-text mb-4">Intelligent Routing</h2>
                <p className="text-text-muted text-lg max-w-3xl leading-relaxed">
                    Not every incident requires a company-wide email blast. Our notification engine respects workspace boundaries and role-based preferences.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
                        <FiZap className="text-primary size-6 mb-3" />
                        <h3 className="text-lg font-bold text-text mb-2">Severity Thresholds</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Users can configure their personal notification settings. For example, a Developer might opt to receive emails only for SEV-1 and SEV-2 incidents affecting their specific assigned services.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-bg-surface shadow-sm">
                        <FiShield className="text-primary size-6 mb-3" />
                        <h3 className="text-lg font-bold text-text mb-2">Subscriber Fan-Out</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            When an incident is marked as "Public", MayDayOps automatically triggers a bulk email fan-out to all external customers subscribed to your Public Status Page.
                        </p>
                    </div>
                </div>
            </section>

            {/* Anatomy of an Alert */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text">Anatomy of an Email Alert</h2>
                <p className="text-text-muted">
                    Our email templates are designed for rapid parsing. Critical data is front-loaded so responders don't have to scroll.
                </p>

                <div className="bg-bg-surface border border-border rounded-xl p-8 max-w-2xl shadow-sm">
                    <div className="border-b border-border pb-4 mb-4">
                        <p className="text-sm text-text-muted mb-1">From: alerts@maydayops.io</p>
                        <p className="text-sm text-text-muted">Subject: <span className="font-bold text-text">[SEV-1] Payment Gateway Timeout</span></p>
                    </div>
                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 bg-error/10 border border-error/20 text-error rounded font-bold text-xs uppercase tracking-wider">
                            Critical Incident
                        </div>
                        <p className="text-text text-sm leading-relaxed">
                            An incident has been declared affecting the <strong className="font-bold">Payment Processing API</strong>.
                        </p>
                        <div className="bg-input/50 p-4 rounded-lg border border-border/50 text-sm font-mono text-text-muted">
                            "Datadog reports a 100% error rate on POST /v1/charges over the last 3 minutes."
                        </div>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold mt-2">
                            Acknowledge & Join War Room
                        </button>
                    </div>
                </div>
            </section>

            {/* Integration API */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text">Workspace Configuration API</h2>
                <p className="text-text-muted">
                    Admins can update the default email routing rules for a workspace via the API.
                </p>

                <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-border/20 shadow-lg">
                    <div className="bg-black/40 px-5 py-3 border-b border-border/20 flex gap-3 items-center">
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#4CAF50]/20 text-[#4CAF50] font-bold">PATCH</span>
                        <span className="text-sm font-mono text-white/80">/api/workspaces/:id/notifications</span>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto text-[#D4D4D4] leading-relaxed">
                        <pre>
                            {'{'}
                            <span className="text-[#9CDCFE]">"email"</span>: {'{'}
                            <span className="text-[#9CDCFE]">"enabled"</span>: <span className="text-[#569CD6]">true</span>,
                            <span className="text-[#9CDCFE]">"minimumSeverity"</span>: <span className="text-[#CE9178]">"SEV-2"</span>,
                            <span className="text-[#9CDCFE]">"ccDistributionList"</span>: [<span className="text-[#CE9178]">"engineering-leadership@company.com"</span>]
                            {'}'}
                            {'}'}
                        </pre>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default EmailNotifications;