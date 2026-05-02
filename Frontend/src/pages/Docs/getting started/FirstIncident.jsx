import React from "react";
import { Link } from "react-router";

const FirstIncident = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">
          Create Your First Incident
        </h1>

        <p className="text-text-muted max-w-2xl">
          Let’s walk through how an incident is created inside MayDayOps.
          This simulation shows how teams log, track, and resolve issues in real-time.
        </p>
      </section>

      {/* 🔥 INCIDENT FORM UI (FAKE DEMO) */}
      <section className="grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT → FORM */}

   <div className="p-6 border border-border rounded-2xl bg-bg-surface space-y-4">

          <h2 className="text-xl font-semibold mb-2">
            Incident Details
          </h2>

          <input
            placeholder="Incident Title (e.g. Payment Failure)"
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border outline-none focus:border-primary"
          />

          <select className="w-full px-4 py-3 rounded-lg bg-bg border border-border">
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            placeholder="Affected Service (e.g. payments-api)"
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border"
          />

          <textarea
            rows={3}
            placeholder="Describe the issue..."
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border"
          />

         <Link
  to="/signin"
  className="inline-flex items-center gap-2 mt-4
  bg-primary text-white px-5 py-2 rounded-lg font-semibold
  hover:scale-105 transition shadow-[0_0_20px_rgba(255,37,37,0.4)]"
>
  Sign in to create real incident →
</Link>

        </div>


        {/* RIGHT → LIVE PREVIEW */}
        <div className="p-6 border border-border rounded-2xl bg-black font-mono text-sm space-y-2">

          <p className="text-red-400">[ALERT] Payment Failure Detected</p>
          <p>[INFO] Incident Created</p>
          <p>[INFO] Assigned to DevOps Team</p>
          <p>[AI] Suggesting Root Cause...</p>
          <p className="text-green-400">[SUCCESS] Issue Resolved</p>

        </div>

      </section>

      {/* 🔥 VISUAL STATUS FLOW */}
      <section className="flex flex-wrap gap-4 justify-center">

        {["Detected", "Assigned", "Investigating", "Resolved"].map((step, i) => (
          <div
            key={i}
            className="px-5 py-2 rounded-full border border-border 
            bg-bg-surface text-sm hover:border-primary transition"
          >
            {step}
          </div>
        ))}

      </section>

      {/* 🔥 API BLOCK */}
      <section>

        <h2 className="text-2xl font-bold mb-4">
          API Equivalent
        </h2>

        <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
{`POST /api/incidents

{
  "title": "Payment Failure",
  "severity": "critical",
  "service": "payments-api"
}`}
        </div>

      </section>

      {/* 🔥 INSIGHT BOX */}
      <section className="p-6 rounded-xl border border-primary/30 bg-primary/5">

        <h3 className="text-primary font-semibold mb-2">
          ⚡ Why this matters
        </h3>

        <p className="text-text-muted text-sm">
          A well-structured incident ensures faster response, better collaboration,
          and improved system reliability. MayDayOps helps teams stay aligned and
          reduce downtime significantly.
        </p>

      </section>

    </div>
  );
};

export default FirstIncident;