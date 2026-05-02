import { FiCheckCircle, FiAlertCircle, FiActivity } from "react-icons/fi";

const StatusPage = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* 🔥 HEADER */}
      <section className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          System Status
        </h1>

        <p className="text-text-muted max-w-xl mx-auto">
          Stay updated with real-time system health and service availability.
        </p>

      </section>

      {/* 🔥 OVERALL STATUS */}
      <section className="text-center">

        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full
        bg-green-500/10 text-green-400 border border-green-500/30">

          <FiCheckCircle className="text-xl" />
          All Systems Operational

        </div>

      </section>

      {/* 🔥 SERVICES STATUS */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Services
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            { name: "API Server", status: "operational" },
            { name: "Authentication", status: "operational" },
            { name: "Payments", status: "degraded" },
            { name: "Database", status: "operational" }
          ].map((service, i) => (

            <div
              key={i}
              className="flex justify-between items-center p-5 border border-border rounded-xl bg-bg-surface"
            >

              <span>{service.name}</span>

              <span className={`text-sm flex items-center gap-2
                ${service.status === "operational" && "text-green-400"}
                ${service.status === "degraded" && "text-yellow-400"}
              `}>

                {service.status === "operational" && <FiCheckCircle />}
                {service.status === "degraded" && <FiAlertCircle />}

                {service.status}

              </span>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 INCIDENT HISTORY */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Incident History
        </h2>

        <div className="space-y-4">

          {[
            {
              title: "Payment Service Outage",
              time: "Resolved • 2 hours ago",
              status: "resolved"
            },
            {
              title: "API Latency Issue",
              time: "Resolved • Yesterday",
              status: "resolved"
            }
          ].map((incident, i) => (

            <div
              key={i}
              className="p-5 border border-border rounded-xl bg-bg-surface flex justify-between items-center"
            >

              <div>
                <p className="font-medium">{incident.title}</p>
                <p className="text-xs text-text-muted">{incident.time}</p>
              </div>

              <span className="text-green-400 text-sm flex items-center gap-2">
                <FiCheckCircle />
                Resolved
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* 🔥 UPTIME BAR */}
      <section>

        <h2 className="text-2xl font-bold mb-6">
          Uptime (Last 24h)
        </h2>

        <div className="flex gap-1">

          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-4 rounded bg-green-500/80 hover:bg-green-400 transition"
            ></div>
          ))}

        </div>

        <p className="text-xs text-text-muted mt-2">
          99.99% uptime recorded
        </p>

      </section>

      {/* 🔥 SUBSCRIBE */}
      <section className="p-6 border border-border rounded-xl bg-bg-surface text-center">

        <h3 className="font-semibold mb-2">
          Get Updates
        </h3>

        <p className="text-text-muted text-sm mb-4">
          Subscribe to receive notifications about incidents and maintenance.
        </p>

        <button className="bg-primary px-5 py-2 rounded-lg text-white font-medium hover:scale-105 transition">
          Subscribe
        </button>

      </section>

    </div>
  );
};

export default StatusPage;