import React from "react";
import { Link } from "react-router";
import {
  FiTrendingDown,
  FiUsers,
  FiClock,
  FiActivity,
  FiCpu,
  FiLayers,
  FiMessageSquare,
  FiGitCommit,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-15 pb-26 md:pt-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
          <div className="flex flex-col items-center gap-16 md:gap-20">
            {/* Dashboard Mockup - Big Format */}
            <div className="relative w-full max-w-6xl mx-auto animate-fade-in-up z-20">
              <div className="bg-bg rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/20 border border-border overflow-hidden transform transition-all duration-700 hover:shadow-primary/30 hover:-translate-y-1">
                {/* Browser/App Header */}
                <div className="flex items-center px-4 py-3 md:py-4 bg-bg border-b border-border">
                  <div className="flex space-x-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-error/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-ring/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-success/80"></div>
                  </div>
                  <div className="mx-auto px-6 py-1.5 md:py-2 rounded-md bg-bg border border-border text-xs sm:text-sm text-text-muted flex items-center gap-2 max-w-sm md:max-w-md w-full justify-center shadow-inner">
                    <FiActivity className="text-primary" />{" "}
                    maydayops.app/command-center
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex flex-col sm:flex-row min-h-[400px] h-auto md:h-[550px] lg:h-[650px] bg-bg relative">
                  {/* Sidebar */}
                  <div className="hidden sm:flex w-16 md:w-20 border-r border-border bg-bg flex-col items-center py-6 space-y-8 z-10 relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl md:text-2xl">
                      <SiOpslevel />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                      <FiActivity className="text-xl md:text-2xl" />
                    </div>
                    <FiLayers className="text-text-muted text-xl md:text-2xl hover:text-text cursor-pointer transition-colors" />
                    <FiUsers className="text-text-muted text-xl md:text-2xl hover:text-text cursor-pointer transition-colors" />
                    <FiClock className="text-text-muted text-xl md:text-2xl hover:text-text cursor-pointer transition-colors" />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-4 sm:p-5 md:p-8 flex flex-col gap-5 sm:gap-6 md:gap-8 overflow-y-auto sm:overflow-hidden">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <span className="bg-error/10 text-error border border-error/20 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            Critical Outage
                          </span>
                          <span className="text-text-muted text-sm md:text-base font-mono">
                            INC-4092
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-text truncate">
                          Payment Gateway Latency
                        </h3>
                      </div>
                      <div className="w-full sm:w-auto bg-bg-surface sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none border sm:border-none border-border flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                        <div className="text-sm text-text-muted sm:mb-1">
                          Time to Resolution
                        </div>
                        <div className="text-primary font-mono font-bold text-lg sm:text-xl md:text-3xl flex items-center gap-2 sm:gap-3">
                          <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-primary"></span>
                          </span>
                          00:01:24
                        </div>
                      </div>
                    </div>

                    {/* AI Insights & Actions */}
                    <div className="bg-linear-to-r from-primary/5 to-transparent border border-primary/20 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 relative overflow-hidden shrink-0">
                      <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-primary"></div>
                      <div className="hidden sm:flex w-14 h-14 md:w-16 md:h-16 rounded-full bg-bg border border-primary/20 text-primary items-center justify-center shrink-0 shadow-sm shadow-primary/10">
                        <FiCpu className="text-2xl md:text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-lg font-bold text-text mb-2 flex items-center gap-2">
                          <FiCpu className="text-primary sm:hidden" /> AI Root
                          Cause Analysis
                        </h4>
                        <p className="text-sm md:text-base text-text-muted mb-4 md:mb-5 leading-relaxed">
                          Detected a deadlock in the{" "}
                          <code className="text-xs md:text-sm bg-bg px-1.5 py-0.5 rounded border border-border">
                            transactions
                          </code>{" "}
                          table causing cascading failures across eu-west-1.
                          Matching automated runbook found and ready to deploy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                          <button className="w-full sm:w-auto justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-primary/90 flex items-center gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-1">
                            Auto-Remediate <FiZap />
                          </button>
                          <button className="w-full sm:w-auto justify-center bg-bg text-text px-5 py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-bold border border-border hover:bg-bg-muted transition-colors flex items-center">
                            View Trace
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline / Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 flex-1 min-h-[150px]">
                      {/* Timeline */}
                      <div className="md:col-span-2 bg-bg rounded-xl md:rounded-2xl p-4 md:p-6 border border-border flex flex-col justify-center">
                        <div className="text-xs sm:text-sm font-bold text-text-muted mb-4 sm:mb-6 uppercase tracking-wider flex items-center gap-2">
                          <FiGitCommit className="text-lg" /> Live Timeline
                        </div>
                        <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:ml-[7px] before:h-full before:w-[2px] before:bg-border">
                          <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-error ring-4 ring-bg"></div>
                            <div className="font-bold text-text text-sm">
                              10:45:12 AM
                            </div>
                            <div className="text-text-muted text-xs sm:text-sm mt-1">
                              Datadog Alert Triggered
                            </div>
                          </div>
                          <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-ring ring-4 ring-bg"></div>
                            <div className="font-bold text-text text-sm">
                              10:45:18 AM
                            </div>
                            <div className="text-text-muted text-xs sm:text-sm mt-1">
                              War room assembled via Slack
                            </div>
                          </div>
                          <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-bg animate-pulse"></div>
                            <div className="font-bold text-primary text-sm">
                              10:46:01 AM
                            </div>
                            <div className="text-primary/80 text-xs sm:text-sm mt-1">
                              Applying automated hotfix...
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fake Chart */}
                      <div className="md:col-span-3 bg-bg rounded-xl md:rounded-2xl p-4 md:p-6 border border-border flex flex-col justify-between overflow-hidden relative min-h-[150px]">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-xs sm:text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                            <FiTrendingDown className="text-lg" /> P99 Latency
                            (ms)
                          </div>
                          <div className="text-[10px] sm:text-sm font-mono text-error font-bold bg-error/10 px-2 py-1 rounded border border-error/20">
                            +450% Spike
                          </div>
                        </div>
                        <div className="flex items-end h-full gap-1 sm:gap-1.5 md:gap-2 mt-2 pb-2">
                          {[
                            30, 40, 35, 50, 180, 250, 300, 320, 280, 210, 150,
                            80, 45, 35, 30, 32,
                          ].map((val, i) => (
                            <div
                              key={i}
                              className={`w-full rounded-t-md transition-all duration-1000 ${val > 150 ? "bg-error" : val > 80 ? "bg-ring" : "bg-success"}`}
                              style={{
                                height: `${Math.max(10, (val / 320) * 100)}%`,
                                opacity: 0.85,
                              }}></div>
                          ))}
                        </div>
                        {/* Target Line */}
                        <div className="absolute bottom-[20%] left-0 w-full border-t border-dashed border-success/50 pointer-events-none flex items-end">
                          <span className="text-[10px] text-success/80 ml-2 mb-1">
                            Target 50ms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full h-full bg-primary/10 blur-[200px] rounded-full -z-10 pointer-events-none"></div>
            </div>
            {/* Text Content */}
            <div className="text-center max-w-5xl mx-auto animate-fade-in-up pt-30">
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-text tracking-tight mb-8 leading-tight font-extralight">
                Turn Production{" "}
                <span className="bg-primary text-text font-bold border border-border rounded-lg">
                  Chaos
                </span>{" "}
                <span className="font-mono italic">Into</span>{" "}
                <br className="hidden md:block" />
                <span className="font-sans font-extrabold text-primary">
                  Controlled Recovery
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-text-muted mb-12 leading-relaxed max-w-3xl mx-auto">
                A unified AI-driven incident response system that aggregates
                multi-source signals, orchestrates workflows, and enables
                end-to-end incident lifecycle management.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-2">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link
                  to="/demo"
                  className="bg-bg text-text px-8 py-4 rounded-full font-bold text-lg border border-border hover:bg-bg-muted transition-all flex items-center justify-center">
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-17 bg-bg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-4">
              When Systems Fail,{" "}
              <span className="font-extrabold text-primary">
                Everything Slows Down
              </span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Every minute of downtime isn't just lost revenue—it's lost trust
              and team burnout. Standard tools create more noise than clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTrendingDown />,
                title: "Loss of Revenue",
                desc: "Enterprise outages cost an average of $9,000 per minute.",
              },
              {
                icon: <FiUsers />,
                title: "Context Switching",
                desc: "Teams waste 40% of their time just finding the right Slack thread.",
              },
              {
                icon: <FiClock />,
                title: "Slow Root Cause",
                desc: "Without AI, identifying the breach point takes 3x longer.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-bg p-8 rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all  group">
                <div className="w-14 h-14 bg-error/10 text-error rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Features Section */}
      <section className="py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              A Smarter Way to Handle Incidents
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              MayDayOps orchestrates your entire response. From the moment an
              anomaly is detected, our AI assembles the right people and
              provides the context they need instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                icon: <FiActivity />,
                title: "Centralized Command",
                desc: "Forget tab-hopping. We pull data from Datadog, PagerDuty, Slack, and GitHub into one unified center.",
              },
              {
                icon: <FiCpu />,
                title: "AI-Assisted Resolution",
                desc: "Our proprietary LLMs analyze historical post-mortems to suggest fixes while you focus on code.",
              },
              {
                icon: <FiLayers />,
                title: "Advanced Management",
                desc: "Role-based assignments, severity levels, and automated checklists that evolve dynamically.",
              },
              {
                icon: <FiMessageSquare />,
                title: "Real-Time Collaboration",
                desc: "Slack-sync technology that keeps your chat and incident dashboard perfectly in step.",
              },
              {
                icon: <FiGitCommit />,
                title: "Live Timeline",
                desc: "Automatic event logging for every action taken, making post-mortems a breeze.",
              },
              {
                icon: <FiZap />,
                title: "AI Insights",
                desc: "Detect patterns across years of incidents to predict failures before they impact your users.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path to Resolution (Timeline) */}
      <section className="py-24 bg-bg relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] max-w-3xl bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              The Path to Resolution
            </h2>
            <p className="text-xl text-text-muted">
              How MayDayOps transforms your incident workflow.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                {
                  step: "1",
                  title: "Incident Identification",
                  desc: "Production incidents are detected through monitoring systems, operational alerts, or manual reporting with real-time severity classification.",
                },
                {
                  step: "2",
                  title: "Response Orchestration",
                  desc: "The platform instantly notifies and assigns the appropriate engineering responders to establish clear ownership and coordination.",
                },
                {
                  step: "3",
                  title: "Collaborative Investigation",
                  desc: "Teams investigate issues through a centralized live timeline while AI analyzes logs, identifies patterns, and suggests probable root causes.",
                },
                {
                  step: "4",
                  title: "Resolution Management",
                  desc: "Recovery progress is tracked in real time with structured updates, operational visibility, and stakeholder communication.",
                },
                {
                  step: "5",
                  title: "Status Communication",
                  desc: "Public and internal status pages are updated automatically to maintain transparency and keep affected users informed.",
                },
                {
                  step: "6",
                  title: "Post-Incident Analysis",
                  desc: "After resolution, the platform generates an AI-powered incident summary with root cause insights and recovery metrics for future prevention.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full  bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-transform duration-500 group-hover:scale-[1.2] z-10">
                    {item.step}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-bg p-6 rounded-2xl border-2 border-border shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                    <h4 className="text-lg font-bold text-text mb-2">
                      {item.title}
                    </h4>
                    <p className="text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial & CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-24">
            <h2 className="text-5xl font-extrabold text-text mb-18">
              Proven Reliability
            </h2>
            <div className="relative bg-bg p-10 md:p-14 rounded-3xl border border-border overflow-hidden">
              {/* Animated Waves Background */}
              <div className="absolute bottom-0 left-0 w-[200%] h-24 md:h-40 z-0 opacity-10 pointer-events-none flex animate-marquee">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-1/2 h-full fill-primary">
                  <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-1/2 h-full fill-primary">
                  <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-[200%] h-20 md:h-32 z-0 opacity-15 pointer-events-none flex animate-[marquee_20s_linear_infinite_reverse]">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-1/2 h-full fill-primary">
                  <path d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-1/2 h-full fill-primary">
                  <path d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
              </div>

              <p className="text-xl md:text-5xl font-bold text-text relative z-10 leading-snug">
                Ready to shift to autonomous operations?
              </p>
              <div className="mt-8 relative z-10">
                <p className="font-bold text-text text-xl">
                  Don't let incidents hold you back. Trusted by thousands for
                  intelligent, always-on reliability.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-2">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link
                  to="/demo"
                  className="bg-bg text-text px-8 py-4 rounded-full font-bold text-lg border border-border hover:bg-bg-muted transition-all flex items-center justify-center">
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl p-10 md:p-16 text-text shadow-[0_20px_50px_rgba(255,37,37,0.1)] border border-border bg-bg overflow-hidden group">
            {/* Glowing Orbs */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary rounded-full blur-[100px] z-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-700 pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px] z-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-700 pointer-events-none"></div>

            {/* Texture/Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay z-0 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-center">
                Be Ready Before the Next <span className="text-primary">Incident</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto text-center leading-relaxed">
                Stop reacting to chaos and start orchestrating recovery. Deploy MayDayOps and secure your systems in under 10 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Link
                  to="/signup"
                  className="relative overflow-hidden  inline-flex items-center justify-center gap-2 bg-primary  px-10 py-5 rounded-full font-bold text-lg md:text-xl transition-all hover:scale-105 shadow-xl hover:shadow-[0_0_40px_rgba(255,37,37,0.4)]  border border-transparent">
                  {/* Button shine effect */}
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-bg/20 to-transparent -translate-x-full group-hover/btn:animate-[marquee_1s_ease-in-out]"></span>
                  <span className="relative z-10  flex items-center gap-2">Start Free Trial <FiArrowRight /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
