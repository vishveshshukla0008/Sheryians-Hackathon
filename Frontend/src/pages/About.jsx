import React from "react";
import { FiUsers, FiZap, FiTarget, FiHeart, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { SiOpslevel } from "react-icons/si"
import { Link } from "react-router";

const About = () => {
    return (
        <div className="min-h-screen bg-bg text-text">

            {/* HERO */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[180px] rounded-full"></div>

                <div className="max-w-6xl mx-auto text-center px-4 relative z-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                        We’re Building the Future of{" "}
                        <span className="text-primary">Incident Management</span>
                    </h1>

                    <p className="text-xl text-text-muted max-w-3xl mx-auto">
                        MayDayOps is redefining how teams respond to incidents — combining AI,
                        automation, and collaboration into one unified platform.
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="py-16 bg-primary text-primary-foreground"> <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center"> <div> <h2 className="text-4xl font-bold">30K+</h2> <p>Incidents Managed</p> </div> <div> <h2 className="text-4xl font-bold">1M+</h2> <p>Events Processed</p> </div> <div> <h2 className="text-4xl font-bold">500+</h2> <p>Teams Using</p> </div> <div> <h2 className="text-4xl font-bold">99.99%</h2> <p>Reliability</p> </div> </div> </section>

            {/* VALUES */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-16 text-center">
                        Our Values
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FiUsers />,
                                title: "User First",
                                desc: "We design everything with real engineers in mind.",
                            },
                            {
                                icon: <FiZap />,
                                title: "Speed & Efficiency",
                                desc: "Every second matters in production systems.",
                            },
                            {
                                icon: <FiTarget />,
                                title: "Ownership",
                                desc: "We take responsibility and deliver results.",
                            },
                            {
                                icon: <FiTrendingUp />,
                                title: "Continuous Growth",
                                desc: "We learn and improve with every incident.",
                            },
                            {
                                icon: <FiHeart />,
                                title: "Team Culture",
                                desc: "We believe great teams build great products.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-bg border border-border rounded-2xl p-8 hover:border-primary hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg text-xl mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-text-muted">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM / LEADERSHIP */}
            <section className="py-24 bg-bg">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Leading the Future of Reliability
                        </h2>
                        <p className="text-text-muted text-lg mb-6">
                            Our mission is to eliminate chaos in production systems. With AI at
                            the core, we empower teams to detect, respond, and resolve incidents
                            faster than ever.
                        </p>
                        <p className="text-text-muted">
                            Built by developers, for developers — MayDayOps brings clarity,
                            automation, and intelligence to modern infrastructure.
                        </p>
                    </div>

                    <div className="bg-bg border border-border rounded-2xl p-8 hover:border-primary hover:shadow-lg transition-all">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-text-muted">
                            To create a world where incidents are resolved automatically before
                            users even notice them.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-28 text-center overflow-hidden">

                {/* 🔥 layered glow background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float"></div>
                    <div className="absolute w-[300px] h-[300px] bg-primary/10 blur-[140px] rounded-full top-10 left-10 animate-float delay-200"></div>
                    <div className="absolute w-[300px] h-[300px] bg-primary/10 blur-[140px] rounded-full bottom-10 right-10 animate-float delay-500"></div>
                </div>

                {/* 🔥 glass container */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 rounded-3xl 
  bg-bg/40 backdrop-blur-xl border border-border 
  shadow-[0_20px_60px_rgba(255,37,37,0.15)]">

                    <h2 className="text-5xl font-extrabold mb-6 leading-tight animate-fade-in-up">
                        Ready to Transform Your{" "}
                        <span className="text-primary">Operations?</span>
                    </h2>

                    <p className="text-text-muted mb-10 text-lg animate-fade-in-up delay-200">
                        Join teams who trust MayDayOps to keep their systems running.
                    </p>

                    <Link
                        to="/signup"
                        className="relative group overflow-hidden bg-primary text-primary-foreground 
      px-7 py-3 rounded-full font-semibold text-base
      inline-flex items-center gap-2
      transition-all duration-300
      shadow-[0_0_20px_rgba(255,37,37,0.4)] 
      hover:shadow-[0_0_50px_rgba(255,37,37,0.9)]
      hover:-translate-y-1 hover:scale-105"
                    >

                        {/* 🔥 animated border glow */}
                        <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition"></span>

                        {/* 🔥 shine sweep */}
                        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[marquee_1s_ease-in-out]"></span>

                        <span className="relative z-10 flex items-center gap-2">
                            Get Started <FiArrowRight />
                        </span>

                    </Link>

                </div>
            </section>

            {/* ENGINEER SECTION */}
            <section className="py-24 border-t border-border">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div className="animate-fade-in-up">
                        <p className="text-primary font-semibold mb-2 uppercase tracking-wider">
                            BUILT FOR ENGINEERS
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Built for Engineers Who Fix the{" "}
                            <span className="text-primary">Impossible</span>
                        </h2>

                        <p className="text-text-muted text-lg mb-6">
                            MayDayOps empowers developers and SREs to detect, investigate,
                            and resolve incidents faster using AI-driven insights and
                            automated workflows — all in one unified platform.
                        </p>

                        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg">
                            Explore Features
                        </button>
                    </div>

                    {/* RIGHT IMAGE (DASHBOARD LOOK) */}
                    <div className="animate-fade-in-up delay-200">
                        <div className="bg-bg border border-border rounded-2xl p-4 shadow-xl hover:shadow-primary/20 transition-all">

                            <img
                                src="https://i.pinimg.com/1200x/3e/e3/df/3ee3dff2d1a56a038d7ad26a4a82b007.jpg" alt="dashboard"
                                className="rounded-xl"
                            />

                        </div>
                    </div>

                </div>
            </section>

            {/* VISION / LEADERSHIP SECTION */}
            <section className="py-24 border-t border-border">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                    {/* IMAGE LEFT */}
                    <div className="animate-fade-in-up delay-200">
                        <div className="bg-bg border border-border rounded-2xl p-4 shadow-xl hover:shadow-primary/20 transition-all">

                            <img
                                src="https://i.pinimg.com/736x/b3/bf/b3/b3bfb3c0b4827713fd49d859b684d746.jpg" alt="vision"
                                className="rounded-xl"
                            />

                        </div>
                    </div>

                    {/* TEXT RIGHT */}
                    <div className="animate-fade-in-up">
                        <p className="text-primary font-semibold mb-2 uppercase tracking-wider">
                            OUR VISION
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Leading the Future of{" "}
                            <span className="text-primary">Autonomous Operations</span>
                        </h2>

                        <p className="text-text-muted text-lg mb-6">
                            We believe incidents should be resolved before users even notice.
                            With AI at the core, MayDayOps predicts failures, orchestrates
                            responses, and drives faster recovery across modern systems.
                        </p>

                        <button className="bg-bg border border-border px-6 py-3 rounded-full font-bold hover:bg-bg-muted transition-all">
                            Learn More
                        </button>
                    </div>

                </div>
            </section>

            {/* RESOURCES SECTION */}
            <section className="py-24 border-t border-border">
                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-4xl font-bold mb-16 text-center">
                        Explore the Ecosystem
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">

                        {[
                            {
                                title: "Documentation",
                                desc: "Learn how to integrate and manage incidents using our APIs and tools.",
                            },
                            {
                                title: "AI Insights",
                                desc: "Discover how our AI predicts failures and suggests real-time fixes.",
                            },
                            {
                                title: "Community",
                                desc: "Join discussions, share incidents, and learn from other engineers.",
                            },
                            {
                                title: "Changelog",
                                desc: "Stay updated with new features, improvements, and releases.",
                            },
                            {
                                title: "Integrations",
                                desc: "Connect with Slack, GitHub, Datadog, and more.",
                            },
                            {
                                title: "System Status",
                                desc: "Monitor platform uptime and real-time service health.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative bg-bg border border-border rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/60"
                            >
                                {/* glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                <h3 className="text-2xl font-bold mb-2 relative z-10">
                                    {item.title}
                                </h3>

                                <p className="text-text-muted mb-4 relative z-10">
                                    {item.desc}
                                </p>

                                <span className="text-primary font-semibold relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Explore
                                    <span className="group-hover:translate-x-1 transition-all">→</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;