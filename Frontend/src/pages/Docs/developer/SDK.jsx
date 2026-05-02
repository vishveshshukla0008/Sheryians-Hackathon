const SDK = () => {
  return (
    <div className="space-y-20 animate-fade-in-up">

      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-bold mb-4">SDK (JavaScript)</h1>

        <p className="text-text-muted max-w-3xl leading-relaxed">
          The MayDayOps SDK provides a simple and efficient way to integrate
          incident management directly into your applications. Instead of manually
          calling API endpoints, you can use pre-built functions to create, update,
          and manage incidents.
        </p>

        <p className="text-text-muted max-w-3xl leading-relaxed mt-4">
          The SDK handles authentication, request formatting, and error handling,
          allowing you to focus on business logic instead of API plumbing.
        </p>
      </section>

      {/* INSTALLATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Installation</h2>

        <p className="text-text-muted mb-4">
          Install the official SDK using npm or yarn:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
npm install maydayops-sdk
        </div>
      </section>

      {/* SETUP */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Setup</h2>

        <p className="text-text-muted mb-4">
          Initialize the SDK with your API key. This should be done once during app startup.
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`import MaydayOps from "maydayops-sdk";

const client = new MaydayOps({
  apiKey: process.env.MAYDAY_API_KEY
});`}
        </div>

        <p className="text-text-muted text-sm mt-3">
          Always store API keys in environment variables for security.
        </p>
      </section>

      {/* CREATE INCIDENT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Create an Incident</h2>

        <p className="text-text-muted mb-4">
          Use the SDK to create incidents directly from your application.
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`await client.incidents.create({
  title: "Payment Service Down",
  severity: "critical",
  service: "payments"
});`}
        </div>
      </section>

      {/* UPDATE INCIDENT */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Update an Incident</h2>

        <p className="text-text-muted mb-4">
          Add updates or resolve an incident:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`await client.incidents.update("inc_12345", {
  message: "Fix deployed successfully",
  status: "resolved"
});`}
        </div>
      </section>

      {/* FETCH INCIDENTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Fetch Incidents</h2>

        <p className="text-text-muted mb-4">
          Retrieve incidents with filters:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`const incidents = await client.incidents.list({
  status: "active",
  severity: "critical"
});`}
        </div>
      </section>

      {/* FULL FLOW */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Full Example Flow</h2>

        <p className="text-text-muted mb-4">
          Example of complete incident lifecycle:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`// Create incident
const incident = await client.incidents.create({
  title: "Server Crash",
  severity: "critical"
});

// Update incident
await client.incidents.update(incident.id, {
  message: "Restarting server"
});

// Resolve incident
await client.incidents.update(incident.id, {
  status: "resolved"
});`}
        </div>
      </section>

      {/* ERROR HANDLING */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Error Handling</h2>

        <p className="text-text-muted mb-4">
          Always handle errors when working with API calls:
        </p>

        <div className="bg-black p-5 rounded-xl font-mono text-sm border border-border">
{`try {
  await client.incidents.create({...});
} catch (error) {
  console.error(error.message);
}`}
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section className="p-6 border border-primary/30 bg-primary/5 rounded-xl">

        <h3 className="text-primary font-semibold mb-2">
          Best Practices
        </h3>

        <div className="text-text-muted text-sm space-y-2 leading-relaxed">

          <p>• Initialize SDK once, reuse across app</p>
          <p>• Use environment variables for API keys</p>
          <p>• Handle errors properly</p>
          <p>• Avoid unnecessary repeated calls</p>
          <p>• Use async/await for clean code</p>

        </div>

      </section>

    </div>
  );
};

export default SDK;