import React from "react";
import { NavLink } from "react-router";

const Docs = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 p-8 pt-0 overflow-y-auto">
        {/* 🔥 OVERVIEW SECTION */}
        <section className="mb-20 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-6">What is MayDayOps?</h2>
          <p className="text-text-muted leading-relaxed mb-6 max-w-3xl">
            MayDayOps is a modern incident management platform designed to help
            engineering teams detect, respond, and resolve production incidents
            faster. It provides a centralized system where teams can collaborate
            in real-time, track incident timelines, automate workflows, and
            generate intelligent postmortems using AI-driven insights.
          </p>

          <p className="text-text-muted leading-relaxed max-w-3xl">
            Whether you're managing outages, debugging critical failures, or
            maintaining uptime across distributed systems, MayDayOps ensures
            that your team stays aligned, informed, and efficient during
            high-pressure situations.
          </p>
        </section>

        {/* QUICK CARDS */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { title: "Quick Start", desc: "Set up your workspace in minutes" },
            {
              title: "API Reference",
              desc: "Explore endpoints & integrations",
            },
            { title: "SDK", desc: "Automate incident workflows" },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-border bg-bg-surface 
      hover:border-primary hover:shadow-[0_0_30px_rgba(255,37,37,0.15)]
      transition-all duration-300">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition">
                {item.title}
              </h3>

              <p className="text-text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 🔥 INCIDENT SYSTEM DOC */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">
            Incident Management System
          </h2>

          <p className="text-text-muted leading-relaxed mb-8 max-w-3xl">
            The core of MayDayOps revolves around a structured incident
            lifecycle. Every incident is tracked from detection to resolution,
            ensuring complete visibility and accountability. Teams can assign
            responders, share updates, collaborate in real-time, and document
            every action taken during the incident lifecycle.
          </p>

          {/* FLOW */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "Create Incident",
              "Assign Responders",
              "Track Timeline",
              "Resolve & Report",
            ].map((step, i) => (
              <div
                key={i}
                className="p-5 border border-border rounded-xl bg-bg-surface hover:border-primary transition">
                <p className="font-semibold mb-2">{step}</p>

                <p className="text-xs text-text-muted">
                  {
                    [
                      "Log issues with severity and context",
                      "Automatically assign team members",
                      "Monitor updates and actions live",
                      "Generate reports and insights",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 TIMELINE */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Live Incident Timeline</h2>

          <p className="text-text-muted mb-6 max-w-3xl">
            Every incident is tracked in real-time with a detailed timeline of
            events. This allows teams to understand exactly what happened, when
            it happened, and who took action.
          </p>

          <div className="bg-black rounded-xl p-6 font-mono text-sm border border-border space-y-2">
            <p className="text-red-400">
              [10:45] ALERT triggered (payment-service)
            </p>
            <p>[10:46] Incident created by monitoring system</p>
            <p>[10:47] Assigned to DevOps Team</p>
            <p>[10:48] AI detected probable root cause</p>
            <p>[10:49] Fix deployed to production</p>
            <p className="text-green-400">
              [10:50] Incident resolved successfully
            </p>
          </div>
        </section>

        {/* 🔥 API */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">API Usage</h2>

          <p className="text-text-muted mb-6 max-w-3xl">
            MayDayOps provides a powerful REST API that allows developers to
            integrate incident management workflows directly into their
            applications. You can create incidents, fetch logs, update statuses,
            and automate responses programmatically.
          </p>

          <div className="bg-black rounded-xl p-6 font-mono text-sm border border-border">
            {`POST /api/incidents

Headers:
Authorization: Bearer <your_token>

Body:
{
  "title": "Database outage",
  "severity": "critical",
  "service": "auth-service"
}`}
          </div>
        </section>

        {/* 🔥 STATUS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Public Status Page</h2>

          <p className="text-text-muted mb-6 max-w-3xl">
            Keep your users informed with a real-time status page. Whether it's
            maintenance updates or unexpected downtime, your customers will
            always know what's happening with your system.
          </p>

          <div className="p-6 border border-border rounded-xl bg-bg-surface">
            <p className="text-green-500 font-semibold mb-2">
              ✔ All Systems Operational
            </p>

            <p className="text-text-muted text-sm">
              No incidents reported in the last 24 hours. All services are
              functioning normally.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Docs;
