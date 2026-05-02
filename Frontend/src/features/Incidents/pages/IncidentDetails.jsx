import React from "react";
import { Link, useParams } from "react-router";
import { GoStopwatch } from "react-icons/go";
import Button from "../../../shared/components/Button";

const IncidentDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-8 w-full h-full">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin/incidents"
          className="px-3 py-1.5 rounded-lg border border-border text-sm font-bold text-text-muted hover:text-text hover:bg-bg-surface transition-colors flex items-center gap-2">
          ← Back
        </Link>
        <span className="text-lg font-bold text-text-muted">
          {id || "INC-29402"}
        </span>
      </div>

      {/* Header Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-4">
          API Gateway Timeout Escalation
        </h1>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-lg border border-error/30 bg-error/5 text-error text-sm font-bold">
            P1 Critical
          </span>
          <span className="px-3 py-1 rounded-lg bg-ring/10 text-ring text-md font-bold flex items-center gap-1.5">
            Investigating
          </span>
          <span className="text-lg text-text-muted font-mono flex items-center gap-2">
            <GoStopwatch className="inline-block" size={20} /> 00:42:15 elapsed
          </span>

          <select className="bg-bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text focus:outline-none focus:border-primary transition-colors appearance-none ml-2">
            <option>Investigating</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-bg-surface border border-border rounded-lg p-5 mb-8 shadow-sm">
        <p className="text-md text-text font-medium leading-relaxed">
          Detecting unusual traffic spikes from region us-east-1 originating
          from internal microservice 'Checkout-Beta'. Timeouts peaked at 12.5s.
          Connection pool showing signs of exhaustion.
        </p>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-primary  mb-6 border-b border-border pb-2">
            Live Timeline
          </h3>

          <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:left-4 before:w-[2px] before:bg-border mb-8">
            {/* Entry 1 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full border-2 border-bg bg-error/10 text-error flex items-center justify-center font-bold text-xs ring-2 ring-error/20 z-10">
                R
              </div>
              <div className="bg-bg-surface border border-border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-text">
                    Rahul Sharma
                  </span>
                  <span className="text-sm font-bold text-text-muted uppercase">
                    Admin
                  </span>
                </div>
                <p className="text-md text-text-muted mb-2">
                  Incident created. Payment service not responding from
                  us-east-1. Pulling logs now.
                </p>
                <span className="text-sm text-text-muted/70 font-mono">
                  10:02:14 PM
                </span>
              </div>
            </div>

            {/* Entry 2 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full border-2 border-bg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs ring-2 ring-primary/20 z-10">
                P
              </div>
              <div className="bg-bg-surface border border-border rounded-lg p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-text">
                    Priya Singh
                  </span>
                  <span className="text-sm font-bold text-text-muted uppercase">
                    Member
                  </span>
                </div>
                <p className="text-md text-text-muted mb-2">
                  DB connections maxed out. Found N+1 query issue in
                  order-service v2.3.1. This was introduced in today's
                  deployment.
                </p>
                <span className="text-sm text-text-muted/70 font-mono">
                  10:15:30 PM
                </span>
              </div>
            </div>

            {/* Entry 3 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full border-2 border-bg bg-success/10 text-success flex items-center justify-center font-bold text-xs ring-2 ring-success/20 z-10">
                S
              </div>
              <div className="bg-bg-surface border border-border rounded-lg p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-text">
                    Sahil Verma
                  </span>
                  <span className="text-[10px] font-bold text-text-muted uppercase">
                    Member
                  </span>
                </div>
                <p className="text-md text-text-muted mb-2">
                  Initiated rollback of order-service to v2.2.8. ETA 8 minutes.
                  Monitoring load balancer health.
                </p>
                <span className="text-sm text-text-muted/70 font-mono">
                  10:28:05 PM
                </span>
              </div>
            </div>
          </div>

          {/* New Post Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Post an update to the timeline..."
              className="w-full bg-input border border-border rounded-lg px-4 py-4 pr-24 text-lg font-medium text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors shadow-lg"
            />
            <Button size="sm" className="absolute right-2 top-2 bottom-2 px-6 rounded-md text-md">
              Post
            </Button>
          </div>
        </div>

        {/* Right Column: AI / Info */}
        <div className="flex flex-col gap-8">
          {/* AI Synopsis */}
          <div>
            <h3 className="text-xl font-bold  text-text mb-4 border-b border-border pb-2">
              AI Synopsis
            </h3>
            <div className="bg-bg-surface border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lg font-bold text-text-muted uppercase tracking-wider">
                  AI Auto-generated
                </p>
              </div>

              <h4 className="text-md font-bold text-error uppercase tracking-wider mb-1">
                Root Cause
              </h4>
              <p className="text-sm text-text leading-relaxed mb-4">
                N+1 query in order-service v2.3.1 caused DB connection pool
                exhaustion. Deployed at 09:45 PM without load testing.
              </p>

              <h4 className="text-md font-bold text-error uppercase tracking-wider mb-1">
                Action Items
              </h4>
              <ol className="text-md text-text leading-relaxed list-decimal pl-4 mb-5">
                <li>Roll back to v2.2.8</li>
                <li>Add query optimization</li>
                <li>Load test before deploy</li>
              </ol>
              <Button variant="ghost" size="full" className="border border-error/20 text-error hover:bg-error bg-error/10 hover:text-text text-lg cursor-pointer font-bold flex items-center justify-center gap-2">
                Regenerate Postmortem
              </Button>
            </div>
          </div>

          {/* Active Responders */}
          <div>
            <h3 className="text-xl font-bold text-text-muted mb-4 border-b border-border pb-2">
              Active Responders
            </h3>
            <div className="flex flex-col gap-2 mb-4">
              <div className="bg-bg-surface border border-border rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center font-bold text-md">
                  R
                </div>
                <div>
                  <div className="text-md font-bold text-text">
                    Rahul Sharma
                  </div>
                  <div className="text-sm font-semibold text-text-muted">
                    Admin • Online
                  </div>
                </div>
              </div>
              <div className="bg-bg-surface border border-border rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-md">
                  P
                </div>
                <div>
                  <div className="text-md font-bold text-text">Priya Singh</div>
                  <div className="text-sm font-semibold text-text-muted">
                    Member • Online
                  </div>
                </div>
              </div>
              <div className="bg-bg-surface border border-border rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center font-bold text-md">
                  S
                </div>
                <div>
                  <div className="text-md font-bold text-text">Sahil Verma</div>
                  <div className="text-sm font-semibold text-text-muted">
                    Member • Away
                  </div>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Assign a new responder here..."
              className="w-full bg-input border border-border rounded-lg px-4 py-4 text-md text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors shadow-sm"
            />
          </div>

          {/* Incident Info */}
          <div>
            <h3 className="text-xl font-bold text-text-muted mb-4 border-b border-border pb-2">
              Incident Info
            </h3>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex justify-between">
                <span className="text-text-muted">Created by</span>
                <span className="text-text font-medium">Rahul Sharma</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Created at</span>
                <span className="text-text font-medium">10:02 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Timeline events</span>
                <span className="text-text font-medium">3</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-text-muted">Company</span>
                <span className="text-text font-medium">Swiggy Eng</span>
              </div>
              <Button size="full" className="font-bold rounded-lg flex items-center justify-center text-lg">
                ✓ Mark as Resolved
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
