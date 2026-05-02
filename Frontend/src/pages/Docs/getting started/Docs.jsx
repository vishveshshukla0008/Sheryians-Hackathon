// import React from "react";
// import { FiArrowRight, FiCode, FiZap, FiBookOpen } from "react-icons/fi";
// import { Link } from "react-router";

// const Docs = () => {
//     return (
// <div className="min-h-screen bg-bg text-text animate-fade-in-up">
//             {/* 🔥 HERO */}
// <section className="py-24 text-center relative overflow-hidden animate-fade-in-up">
//                     <div className="absolute inset-0 bg-primary/10 blur-[150px]"></div>

//                 <div className="relative z-10 max-w-4xl mx-auto px-4">
//                     <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
//                         Smart <span className="text-primary">Incident Response</span>
//                     </h1>

//                     <p className="text-text-muted text-lg">
//                         MayDayOps helps teams detect, respond, and resolve production incidents faster using AI-powered automation and real-time collaboration.
//                     </p>
//                 </div>
//             </section>

//             {/* 🔥 QUICK START */}
//             <section className="py-24 relative overflow-hidden animate-fade-in-up">

//                 <h2 className="text-4xl font-bold text-center mb-16">
//                     Incident Lifecycle
//                 </h2>

//                 <div className="relative max-w-6xl mx-auto">

//                     {/* 🔥 central animated line */}
//                     <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/20"></div>

//                     {[
//                         {
//                             title: "Detect Incident",
//                             desc: "System detects anomaly using monitoring signals"
//                         },
//                         {
//                             title: "Assign Responders",
//                             desc: "Auto-assign engineers based on severity"
//                         },
//                         {
//                             title: "Live Collaboration",
//                             desc: "Teams communicate and track timeline"
//                         },
//                         {
//                             title: "AI Resolution",
//                             desc: "AI suggests root cause & fixes"
//                         },
//                         {
//                             title: "Postmortem",
//                             desc: "Generate reports & insights automatically"
//                         }
//                     ].map((item, i) => (
//                         <div
//                             key={i}
//                             className={`relative flex items-center mb-16 ${i % 2 === 0 ? "justify-start" : "justify-end"
//                                 }`}
//                         >

//                             {/* 🔥 node */}
//                             <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,37,37,0.8)] animate-pulse"></div>

//                             {/* 🔥 card */}
//                             <div className={`w-[45%] p-6 border border-border rounded-xl bg-bg/60 backdrop-blur 
//         hover:border-primary transition-all hover:-translate-y-2`}>

//                                 <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                                 <p className="text-text-muted text-sm">{item.desc}</p>

//                             </div>

//                         </div>
//                     ))}

//                 </div>
//             </section>
//             {/* 🔥 FEATURES */}
//             <section className="py-20 bg-bg-surface animate-fade-in-up">
//                 <div className="max-w-6xl mx-auto px-4">

//                     <h2 className="text-3xl font-bold mb-12 text-center">
//                         Platform Capabilities
//                     </h2>

//                     <div className="grid md:grid-cols-3 gap-8">

//                         {[
//                             {
//                                 title: "AI Root Cause Analysis",
//                                 desc: "Automatically detect patterns, summarize incidents, and suggest fixes using AI."
//                             },
//                             {
//                                 title: "Live Timeline Tracking",
//                                 desc: "Track every action, update, and response in real-time during incidents."
//                             },
//                             {
//                                 title: "On-call & Escalation",
//                                 desc: "Assign responders and escalate automatically based on severity."
//                             },
//                             {
//                                 title: "Status Page",
//                                 desc: "Keep users informed with real-time public and internal status updates."
//                             },
//                             {
//                                 title: "Postmortem Reports",
//                                 desc: "Generate detailed reports with insights and prevention strategies."
//                             },
//                             {
//                                 title: "Team Collaboration",
//                                 desc: "Work together seamlessly with shared dashboards and updates."
//                             }
//                         ].map((item, i) => (
//                             <div
//                                 key={i}
//                                 className="p-6 border border-border rounded-xl 
//           hover:border-primary hover:-translate-y-2 transition-all"
//                             >
//                                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                                 <p className="text-text-muted">{item.desc}</p>
//                             </div>
//                         ))}

//                     </div>

//                 </div>
//             </section>

//             {/* 🔥 API SECTION */}
//             <section className="py-24 max-w-6xl mx-auto px-4 animate-fade-in-up">

//                 <h2 className="text-4xl font-bold mb-12 text-center">
//                     Real-Time Incident Tracking
//                 </h2>

//                 <div className="grid md:grid-cols-2 gap-12 items-center">

//                     {/* LEFT SIDE */}
//                     <div>
//                         <p className="text-text-muted mb-6 leading-relaxed">
//                             Monitor incidents as they happen. Every action is logged, tracked, and visible
//                             to your team in real-time with AI-powered insights and automated response tracking.
//                         </p>

//                         {/* terminal style */}
//                         <div className="bg-black rounded-xl p-5 text-sm font-mono border border-border relative overflow-hidden">

//                             {/* glow line */}
//                             <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/60 animate-marquee"></div>

//                             {`[10:45] ALERT triggered (payment-service)
//                             [10:46] Incident created
//                             [10:47] Assigned to DevOps Team
//                             [10:48] AI detected root cause
//                             [10:50] Fix deployed`}

//                         </div>
//                     </div>

//                     {/* RIGHT SIDE (VIDEO) */}
//                     <div className="relative">

//                         {/* video container */}
//                         <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">

//                             <video
//                                 src="/tracking.mp4"
//                                 autoPlay
//                                 loop
//                                 muted
//                                 playsInline
//                                 className="w-full h-[320px] object-cover"
//                             />
//                         </div>
//                     </div>
//                 </div>

//             </section>
//             {/* 🔥 STATUS PAGE*/}
//             <section className="py-20 bg-bg-surface animate-fade-in-up">
//                 <div className="max-w-5xl mx-auto text-center px-4">

//                     <h2 className="text-3xl font-bold mb-6">
//                         Public Status Page
//                     </h2>

//                     <p className="text-text-muted mb-10">
//                         Keep your users informed with real-time updates and service health visibility.
//                     </p>

//                     <div className="bg-bg border border-border rounded-xl p-8">
//                         <p className="text-green-500 font-semibold">✔ All Systems Operational</p>
//                     </div>

//                 </div>
//             </section>

//             {/* 🔥 CTA */}
//             <section className="py-24 text-center animate-fade-in-up">
//                 <h2 className="text-4xl font-bold mb-6">
//                     Start Managing Incidents Smarter
//                 </h2>

//                 <p className="text-text-muted mb-8">
//                     Reduce downtime, improve response time, and build reliable systems.
//                 </p>

//                  <Link
//                         to="/signup"
//                         className="relative group overflow-hidden bg-primary text-primary-foreground 
//       px-7 py-3 rounded-full font-semibold text-base
//       inline-flex items-center gap-2
//       transition-all duration-300
//       shadow-[0_0_20px_rgba(255,37,37,0.4)] 
//       hover:shadow-[0_0_50px_rgba(255,37,37,0.9)]
//       hover:-translate-y-1 hover:scale-105"
//                     >

//                         {/* 🔥 animated border glow */}
//                         <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition"></span>

//                         {/* 🔥 shine sweep */}
//                         <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[marquee_1s_ease-in-out]"></span>

//                         <span className="relative z-10 flex items-center gap-2">
//                             Get Started <FiArrowRight />
//                         </span>

//                     </Link>
//             </section>

//         </div>
//     );
// };

// export default Docs;

import React from "react";
import { NavLink } from "react-router";

const Docs = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex" >



      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* 🔥 OVERVIEW SECTION */}
        <section className="mb-20 animate-fade-in-up">

          <h2 className="text-3xl font-bold mb-6">
            What is MayDayOps?
          </h2>

          <p className="text-text-muted leading-relaxed mb-6 max-w-3xl">
            MayDayOps is a modern incident management platform designed to help engineering teams detect,
            respond, and resolve production incidents faster. It provides a centralized system where teams
            can collaborate in real-time, track incident timelines, automate workflows, and generate
            intelligent postmortems using AI-driven insights.
          </p>

          <p className="text-text-muted leading-relaxed max-w-3xl">
            Whether you're managing outages, debugging critical failures, or maintaining uptime across
            distributed systems, MayDayOps ensures that your team stays aligned, informed, and efficient
            during high-pressure situations.
          </p>

        </section>

        {/* QUICK CARDS */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">

          {[
            { title: "Quick Start", desc: "Set up your workspace in minutes" },
            { title: "API Reference", desc: "Explore endpoints & integrations" },
            { title: "SDK", desc: "Automate incident workflows" },
          ].map((item, i) => (

            <div
              key={i}
              className="group p-6 rounded-2xl border border-border bg-bg-surface 
      hover:border-primary hover:shadow-[0_0_30px_rgba(255,37,37,0.15)]
      transition-all duration-300"
            >

              <h3 className="font-semibold mb-2 group-hover:text-primary transition">
                {item.title}
              </h3>

              <p className="text-text-muted text-sm">
                {item.desc}
              </p>

            </div>

          ))}

        </section>

        {/* 🔥 INCIDENT SYSTEM DOC */}
        <section className="mb-20">

          <h2 className="text-3xl font-bold mb-6">
            Incident Management System
          </h2>

          <p className="text-text-muted leading-relaxed mb-8 max-w-3xl">
            The core of MayDayOps revolves around a structured incident lifecycle. Every incident is tracked
            from detection to resolution, ensuring complete visibility and accountability. Teams can assign
            responders, share updates, collaborate in real-time, and document every action taken during the
            incident lifecycle.
          </p>

          {/* FLOW */}
          <div className="grid md:grid-cols-4 gap-6 text-center">

            {[
              "Create Incident",
              "Assign Responders",
              "Track Timeline",
              "Resolve & Report"
            ].map((step, i) => (
              <div key={i} className="p-5 border border-border rounded-xl bg-bg-surface hover:border-primary transition">

                <p className="font-semibold mb-2">{step}</p>

                <p className="text-xs text-text-muted">
                  {[
                    "Log issues with severity and context",
                    "Automatically assign team members",
                    "Monitor updates and actions live",
                    "Generate reports and insights"
                  ][i]}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* 🔥 TIMELINE */}
        <section className="mb-20">

          <h2 className="text-3xl font-bold mb-6">Live Incident Timeline</h2>

          <p className="text-text-muted mb-6 max-w-3xl">
            Every incident is tracked in real-time with a detailed timeline of events. This allows teams to
            understand exactly what happened, when it happened, and who took action.
          </p>

          <div className="bg-black rounded-xl p-6 font-mono text-sm border border-border space-y-2">

            <p className="text-red-400">[10:45] ALERT triggered (payment-service)</p>
            <p>[10:46] Incident created by monitoring system</p>
            <p>[10:47] Assigned to DevOps Team</p>
            <p>[10:48] AI detected probable root cause</p>
            <p>[10:49] Fix deployed to production</p>
            <p className="text-green-400">[10:50] Incident resolved successfully</p>

          </div>

        </section>

        {/* 🔥 API */}
        <section className="mb-20">

          <h2 className="text-3xl font-bold mb-6">API Usage</h2>

          <p className="text-text-muted mb-6 max-w-3xl">
            MayDayOps provides a powerful REST API that allows developers to integrate incident management
            workflows directly into their applications. You can create incidents, fetch logs, update statuses,
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
            Keep your users informed with a real-time status page. Whether it's maintenance updates or
            unexpected downtime, your customers will always know what's happening with your system.
          </p>

          <div className="p-6 border border-border rounded-xl bg-bg-surface">

            <p className="text-green-500 font-semibold mb-2">
              ✔ All Systems Operational
            </p>

            <p className="text-text-muted text-sm">
              No incidents reported in the last 24 hours. All services are functioning normally.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Docs;

// import React from "react";

// const Docs = () => {
//   return (
//     <div className="animate-fade-in-up">

//       {/* HERO */}
//       <section className="mb-16">
//         <h1 className="text-4xl font-extrabold mb-4">
//           Welcome to <span className="text-primary">MayDayOps Docs</span>
//         </h1>

//         <p className="text-text-muted mb-6">
//           Everything you need to manage production incidents, automate workflows,
//           and build reliable systems.
//         </p>

//         <input
//           placeholder="Search docs..."
//           className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-bg-surface border border-border outline-none"
//         />
//       </section>

//       {/* QUICK CARDS */}
//       <section className="grid md:grid-cols-3 gap-6 mb-16">

//         {[
//           { title: "Quick Start", desc: "Get started in minutes" },
//           { title: "API Reference", desc: "Full API documentation" },
//           { title: "SDK", desc: "Integrate easily with SDK" },
//         ].map((item, i) => (
//           <div key={i} className="p-6 border border-border rounded-xl hover:border-primary transition">
//             <h3 className="font-semibold mb-2">{item.title}</h3>
//             <p className="text-text-muted text-sm">{item.desc}</p>
//           </div>
//         ))}

//       </section>

//       {/* INCIDENT SYSTEM */}
//       <section className="mb-16">

//         <h2 className="text-2xl font-bold mb-6">Incident Management System</h2>

//         <p className="text-text-muted mb-6">
//           MayDayOps provides a complete system to manage production incidents and outages.
//         </p>

//       </section>

//     </div>
//   );
// };

// export default Docs;