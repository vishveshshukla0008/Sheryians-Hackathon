import { FiMail, FiBell } from "react-icons/fi";

const EmailNotifications = () => {
    return (
        <div className="space-y-20 animate-fade-in-up">

            {/* HEADER */}
            <section>
                <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                    <FiMail className="text-primary" />
                    Email Notifications
                </h1>

                <p className="text-text-muted max-w-2xl">
                    Stay informed about incidents and system updates with real-time email alerts.
                    Configure notifications based on severity and roles.
                </p>
            </section>

            {/* ALERT TYPES */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Notification Triggers
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    {[
                        "Incident Created",
                        "Severity Escalation",
                        "Incident Resolved"
                    ].map((item, i) => (

                        <div
                            key={i}
                            className="p-6 border border-border rounded-xl bg-bg-surface
              hover:border-primary transition"
                        >
                            <p className="font-medium">{item}</p>
                        </div>

                    ))}

                </div>

            </section>

            {/* SAMPLE EMAIL */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Sample Email
                </h2>

                <div className="p-6 border border-border rounded-xl bg-bg-surface">

                    <p className="text-sm text-text-muted mb-2">
                        Subject: 🚨 Critical Incident Detected
                    </p>

                    <p className="text-sm">
                        A critical issue has been detected in the payment service.
                        Immediate attention is required.
                    </p>

                </div>

            </section>

            {/* SETTINGS */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Notification Settings
                </h2>

                <div className="space-y-4">

                    {["Critical Alerts", "Daily Summary", "Resolution Updates"].map((item, i) => (

                        <div
                            key={i}
                            className="flex justify-between items-center p-4 border border-border rounded-lg bg-bg-surface"
                        >
                            <span>{item}</span>

                            <div className="w-10 h-5 bg-primary rounded-full relative">
                                <span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span>
                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* API */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Configure Email (API)
                </h2>

                <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
                    {`POST /api/notifications/email

                     {
                        "enabled": true,
                        "severity": "critical"
                        }`}
                </div>

            </section>

            {/* TIP */}
            <section className="p-6 border border-primary/30 rounded-xl bg-primary/5">

                <h3 className="text-primary font-semibold flex items-center gap-2 mb-2">
                    <FiBell />
                    Best Practice
                </h3>

                <p className="text-text-muted text-sm">
                    Avoid notification overload. Configure alerts based on severity
                    to ensure only critical issues get immediate attention.
                </p>

            </section>

        </div>
    );
};

export default EmailNotifications;