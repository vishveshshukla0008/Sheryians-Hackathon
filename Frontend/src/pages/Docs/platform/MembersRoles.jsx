import { FiShield, FiBarChart2, FiTool, FiEye } from "react-icons/fi";

const MembersRoles = () => {
    return (
        <div className="space-y-20 animate-fade-in-up">

            {/* HEADER */}
            <section>
                <h1 className="text-4xl font-bold mb-4">
                    Members & Roles
                </h1>

                <p className="text-text-muted max-w-2xl">
                    Assign roles to your team members to control access and responsibilities
                    during incidents. Each role is designed to ensure clarity and efficiency.
                </p>
            </section>

            {/* 🔥 ROLE CARDS */}
            <section className="grid md:grid-cols-4 gap-6">

                {[
                    {
                        role: "Admin",
                        desc: "Full control over workspace, members, and incidents.",
                        icon: <FiShield />
                    },
                    {
                        role: "CEO",
                        desc: "High-level visibility of incidents and system analytics.",
                        icon: <FiBarChart2 />
                    },
                    {
                        role: "Developer",
                        desc: "Handles incidents, fixes issues, and updates timelines.",
                        icon: <FiTool />
                    },
                    {
                        role: "User",
                        desc: "Can only view system status via the public status page.",
                        icon: <FiEye />
                    }
                ].map((item, i) => (

                    <div
                        key={i}
                        className="group p-6 rounded-2xl border border-border bg-bg-surface
      hover:border-primary hover:shadow-[0_0_30px_rgba(255,37,37,0.2)]
      transition-all duration-300"
                    >

                        {/* SINGLE ICON */}
                        <div className="mb-4 text-primary text-2xl group-hover:scale-110 transition">
                            {item.icon}
                        </div>

                        <h3 className="font-semibold mb-2 group-hover:text-primary transition">
                            {item.role}
                        </h3>

                        <p className="text-text-muted text-sm">
                            {item.desc}
                        </p>

                    </div>

                ))}

            </section>

            {/* 🔥 PERMISSIONS TABLE */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Role Permissions
                </h2>

                <div className="border border-border rounded-xl overflow-hidden">

                    <table className="w-full text-sm">

                        <thead className="bg-bg-surface text-text-muted">
                            <tr>
                                <th className="text-left p-4">Permission</th>
                                <th className="p-4">Admin</th>
                                <th className="p-4">CEO</th>
                                <th className="p-4">Developer</th>
                                <th className="p-4">User</th>
                            </tr>
                        </thead>

                        <tbody>

                            {[
                                ["Create Incident", "✔", "✖", "✔", "✖"],
                                ["Resolve Incident", "✔", "✖", "✔", "✖"],
                                ["View Analytics", "✔", "✔", "✖", "✖"],
                                ["Invite Members", "✔", "✖", "✖", "✖"],
                                ["View Status Page", "✔", "✔", "✔", "✔"]
                            ].map((row, i) => (

                                <tr
                                    key={i}
                                    className="border-t border-border text-center hover:bg-bg-surface transition"
                                >
                                    <td className="p-4 text-left">{row[0]}</td>
                                    <td className="p-4">{row[1]}</td>
                                    <td className="p-4">{row[2]}</td>
                                    <td className="p-4">{row[3]}</td>
                                    <td className="p-4">{row[4]}</td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>

            {/* 🔥 USER FLOW (IMPORTANT ADDITION) */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Role-Based Workflow
                </h2>

                <p className="text-text-muted mb-8 max-w-2xl">
                    During an incident, each role plays a specific part in resolving the issue efficiently.
                </p>

                <div className="flex flex-wrap gap-6 justify-center">

                    {[
                        "Admin → Oversees system",
                        "Developer → Fixes issue",
                        "CEO → Monitors impact",
                        "User → Checks status page"
                    ].map((item, i) => (

                        <div
                            key={i}
                            className="px-5 py-2 rounded-full border border-border bg-bg-surface
              text-sm hover:border-primary transition"
                        >
                            {item}
                        </div>

                    ))}

                </div>

            </section>

            {/* 🔥 API */}
            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Invite Member API
                </h2>

                <div className="bg-black p-6 rounded-xl font-mono text-sm border border-border">
                    {`POST /api/members/invite

{
  "email": "dev@company.com",
  "role": "developer"
}`}
                </div>

            </section>

        </div>
    );
};

export default MembersRoles;