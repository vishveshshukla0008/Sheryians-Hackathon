// import { useState } from "react";
// import {
//     FiMail,
//     FiPhone,
//     FiMapPin,
//     FiBriefcase,
//     FiTarget,
//     FiCheckCircle,
//     FiSend
// } from "react-icons/fi";
// import { SiOpslevel, SiDatadog, SiPagerduty, SiSentry, SiSlack } from "react-icons/si";
// import Input from "../shared/components/Input";
// import Button from "../shared/components/Button";

// // API Intent Options
// const intentOptions = [
//     { value: "purchase_company", label: "Enterprise Purchase" },
//     { value: "demo", label: "Request a Demo" },
//     { value: "pricing", label: "Pricing Enquiry" },
//     { value: "general", label: "General Support" },
// ];

// const ContactUs = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         companyName: "",
//         email: "",
//         phone: "",
//         subject: "",
//         intent: "purchase_company",
//         message: "",
//     });

//     const [status, setStatus] = useState("idle"); // idle | loading | success | error
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setStatus("loading");
//         setErrorMessage("");

//         try {
//             // Structure body to match your API spec exactly
//             const apiBody = {
//                 name: formData.name,
//                 companyName: formData.companyName,
//                 email: formData.email,
//                 message: formData.message,
//                 ...(formData.phone && { phone: formData.phone }),
//                 ...(formData.subject && { subject: formData.subject }),
//                 ...(formData.intent && { intent: formData.intent }),
//             };

//             // Simulated API Call
//             console.log("Payload to /api/contact:", apiBody);
//             await new Promise((resolve) => setTimeout(resolve, 1500));

//             setStatus("success");

//             // 🔥 YAHAN FORM RESET KIYA GAYA HAI 🔥
//             setFormData({
//                 name: "",
//                 companyName: "",
//                 email: "",
//                 phone: "",
//                 subject: "",
//                 intent: "purchase_company",
//                 message: "",
//             });

//         } catch (error) {
//             setStatus("error");
//             setErrorMessage("Something went wrong. Please try again later.");
//         }
//     };

//     return (
//         <main className="min-h-screen bg-bg relative overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
//             {/* Background Ambience */}
//             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-slow-spin mix-blend-screen" />
//             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ring/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

//                     {/* Left Column: Headers & Info Cards */}
//                     <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12 animate-fade-in-up">
//                         <div className="space-y-6">
//                             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface border border-border text-text-muted font-semibold text-sm shadow-sm">
//                                 <SiOpslevel className="text-primary" />
//                                 B2B Enquiry Center
//                             </div>

//                             <h1 className="text-5xl md:text-6xl font-black text-text tracking-tight leading-[1.1]">
//                                 Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-ring">touch</span>
//                             </h1>

//                             <p className="text-lg text-text-muted leading-relaxed max-w-md">
//                                 Have questions or ready to transform your business operations with MayDayOps? Our enterprise team is here to help.
//                             </p>
//                         </div>

//                         <div className="space-y-4">
//                             {[
//                                 { icon: FiMail, title: "Email us", value: "sales@maydayops.io", link: "mailto:sales@maydayops.io" },
//                                 { icon: FiPhone, title: "Call us", value: "+91 98765 43210", link: "tel:+919876543210" },
//                                 { icon: FiMapPin, title: "Our location", value: "Ops Tower, Gurugram, IN", link: "#" },
//                             ].map((item, index) => (
//                                 <a
//                                     key={index}
//                                     href={item.link}
//                                     className="group flex items-center justify-between bg-bg-surface/50 hover:bg-bg-surface border border-border/60 hover:border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
//                                 >
//                                     <div className="flex items-center gap-4">
//                                         <div className="p-3 rounded-xl bg-input group-hover:bg-primary/10 transition-colors">
//                                             <item.icon className="size-5 text-text-muted group-hover:text-primary transition-colors" />
//                                         </div>
//                                         <div>
//                                             <h4 className="text-sm font-bold text-text">{item.title}</h4>
//                                             <p className="text-sm text-text-muted mt-0.5">{item.value}</p>
//                                         </div>
//                                     </div>
//                                     <div className="p-2 bg-input rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
//                                         <span className="text-primary text-lg leading-none">↗</span>
//                                     </div>
//                                 </a>
//                             ))}
//                         </div>

//                         <div className="pt-8 border-t border-border/50">
//                             <p className="text-sm font-medium text-text-muted mb-6">You'll be in great company</p>
//                             <div className="flex flex-wrap gap-6 text-text-muted opacity-60">
//                                 <SiDatadog className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
//                                 <SiPagerduty className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
//                                 <SiSentry className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
//                                 <SiSlack className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column: Floating Form Panel */}
//                     <div className="lg:col-span-7 lg:sticky lg:top-24 animate-fade-in-up [animation-delay:200ms] animate-float relative">
//                         <div className="bg-bg-surface border border-border/80 p-8 md:p-10 rounded-[2rem] shadow-2xl relative z-10 backdrop-blur-xl">

//                             {status === "success" ? (
//                                 <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
//                                     <div className="size-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
//                                         <FiCheckCircle className="size-10 text-success" />
//                                     </div>
//                                     <h3 className="text-3xl font-bold text-text mb-4">Request Received!</h3>
//                                     <p className="text-text-muted text-lg max-w-md mx-auto">
//                                         Thanks — we've received your inquiry. Our team will reach out about using MayDayOps for your company shortly.
//                                     </p>
//                                     <Button
//                                         variant="outline"
//                                         className="mt-10 rounded-full"
//                                         onClick={() => setStatus("idle")}
//                                     >
//                                         Submit another inquiry
//                                     </Button>
//                                 </div>
//                             ) : (
//                                 <form onSubmit={handleSubmit} className="space-y-6">

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                         <Input
//                                             label="Full Name"
//                                             id="name"
//                                             placeholder="Rahul Verma"
//                                             value={formData.name}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                         <Input
//                                             label="Company Name"
//                                             id="companyName"
//                                             icon={FiBriefcase}
//                                             placeholder="Acme Logistics"
//                                             value={formData.companyName}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                         <Input
//                                             label="Work Email"
//                                             id="email"
//                                             type="email"
//                                             icon={FiMail}
//                                             placeholder="rahul@acme.com"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                         <Input
//                                             label="Phone Number (Optional)"
//                                             id="phone"
//                                             type="tel"
//                                             icon={FiPhone}
//                                             placeholder="+91 98765 43210"
//                                             value={formData.phone}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                         <Input
//                                             label="Subject (Optional)"
//                                             id="subject"
//                                             placeholder="Enterprise Purchase"
//                                             value={formData.subject}
//                                             onChange={handleInputChange}
//                                         />

//                                         {/* Custom Select mimicking Input component styling */}
//                                         <div className="space-y-2 w-full">
//                                             <label htmlFor="intent" className="text-md font-bold text-text ml-1 opacity-80">
//                                                 How can we help?
//                                             </label>
//                                             <div className="relative group/input">
//                                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within/input:text-primary transition-colors">
//                                                     <FiTarget className="h-[1.15rem] w-[1.15rem]" />
//                                                 </div>
//                                                 <select
//                                                     id="intent"
//                                                     value={formData.intent}
//                                                     onChange={handleInputChange}
//                                                     className="w-full pl-12 pr-10 py-4 appearance-none bg-input border border-border/60 focus:ring-primary focus:border-primary rounded-2xl text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40 cursor-pointer"
//                                                 >
//                                                     {intentOptions.map(option => (
//                                                         <option key={option.value} value={option.value} className="bg-bg text-text">
//                                                             {option.label}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
//                                                     ▼
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Custom Textarea mimicking Input component styling */}
//                                     <div className="space-y-2 w-full">
//                                         <label htmlFor="message" className="text-md font-bold text-text ml-1 opacity-80">
//                                             Message
//                                         </label>
//                                         <div className="relative group/input">
//                                             <textarea
//                                                 id="message"
//                                                 placeholder="We want MayDayOps for our ops team (~50 seats). Please share onboarding steps..."
//                                                 value={formData.message}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 minLength={10}
//                                                 className="w-full pl-5 pr-5 py-4 min-h-[120px] bg-input border border-border/60 focus:ring-primary focus:border-primary rounded-2xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40"
//                                             />
//                                         </div>
//                                     </div>

//                                     {errorMessage && (
//                                         <p className="text-error text-sm font-medium">{errorMessage}</p>
//                                     )}

//                                     <div className="pt-2">
//                                         <Button
//                                             type="submit"
//                                             size="full"
//                                             isLoading={status === "loading"}
//                                             className="rounded-full"
//                                         >
//                                             {!status || status !== "loading" && (
//                                                 <>Submit Request <FiSend className="size-5 ml-2" /></>
//                                             )}
//                                         </Button>
//                                     </div>
//                                 </form>
//                             )}
//                         </div>

//                         {/* Decorative element behind form */}
//                         <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-[2.5rem] -z-10 blur-xl opacity-50"></div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default ContactUs;


import { useState } from "react";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiBriefcase,
    FiTarget,
    FiCheckCircle,
    FiSend
} from "react-icons/fi";
import { SiOpslevel, SiDatadog, SiPagerduty, SiSentry, SiSlack } from "react-icons/si";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";

// API Intent Options matching the backend enum
const intentOptions = [
    { value: "purchase_company", label: "Enterprise Purchase" },
    { value: "demo", label: "Request a Demo" },
    { value: "pricing", label: "Pricing Enquiry" },
    { value: "general", label: "General Support" },
];

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        subject: "",
        intent: "purchase_company",
        message: "",
    });

    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // Structure body to match your API spec exactly
            const apiBody = {
                name: formData.name,
                companyName: formData.companyName,
                email: formData.email,
                message: formData.message,
                ...(formData.phone && { phone: formData.phone }),
                ...(formData.subject && { subject: formData.subject }),
                ...(formData.intent && { intent: formData.intent }),
            };

            // Replace with your actual backend URL or use environment variables like import.meta.env.VITE_API_URL
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiBody),
            });

            const data = await response.json();

            // Handle validation errors (400) or server errors (500)
            if (!response.ok) {
                // If your ApiError utility sends an array of validation errors, we can extract the first one
                const errorMsg = data.errors && data.errors.length > 0
                    ? data.errors[0].msg
                    : data.message || "Failed to submit request.";
                throw new Error(errorMsg);
            }

            // Success! (201 Created)
            setStatus("success");

            // Empty the form fields after successful submission
            setFormData({
                name: "",
                companyName: "",
                email: "",
                phone: "",
                subject: "",
                intent: "purchase_company",
                message: "",
            });

        } catch (error) {
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong. Please try again later.");
        }
    };

    return (
        <main className="min-h-screen bg-bg relative overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-slow-spin mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ring/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Headers & Info Cards */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12 animate-fade-in-up">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface border border-border text-text-muted font-semibold text-sm shadow-sm">
                                <SiOpslevel className="text-primary" />
                                B2B Enquiry Center
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-text tracking-tight leading-[1.1]">
                                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-ring">touch</span>
                            </h1>

                            <p className="text-lg text-text-muted leading-relaxed max-w-md">
                                Have questions or ready to transform your business operations with MayDayOps? Our enterprise team is here to help.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: FiMail, title: "Email us", value: "sales@maydayops.io", link: "mailto:sales@maydayops.io" },
                                { icon: FiPhone, title: "Call us", value: "+91 98765 43210", link: "tel:+919876543210" },
                                { icon: FiMapPin, title: "Our location", value: "Ops Tower, Gurugram, IN", link: "#" },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="group flex items-center justify-between bg-bg-surface/50 hover:bg-bg-surface border border-border/60 hover:border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-input group-hover:bg-primary/10 transition-colors">
                                            <item.icon className="size-5 text-text-muted group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-text">{item.title}</h4>
                                            <p className="text-sm text-text-muted mt-0.5">{item.value}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 bg-input rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <span className="text-primary text-lg leading-none">↗</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-border/50">
                            <p className="text-sm font-medium text-text-muted mb-6">You'll be in great company</p>
                            <div className="flex flex-wrap gap-6 text-text-muted opacity-60">
                                <SiDatadog className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
                                <SiPagerduty className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
                                <SiSentry className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
                                <SiSlack className="size-7 hover:text-text hover:opacity-100 transition-all cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Floating Form Panel */}
                    <div className="lg:col-span-7 lg:sticky lg:top-24 animate-fade-in-up [animation-delay:200ms] animate-float relative">
                        <div className="bg-bg-surface border border-border/80 p-8 md:p-10 rounded-[2rem] shadow-2xl relative z-10 backdrop-blur-xl">

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
                                    <div className="size-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
                                        <FiCheckCircle className="size-10 text-success" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-text mb-4">Request Received!</h3>
                                    <p className="text-text-muted text-lg max-w-md mx-auto">
                                        Thanks — we've received your inquiry. Our team will reach out about using MayDayOps for your company shortly.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-10 rounded-full"
                                        onClick={() => setStatus("idle")}
                                    >
                                        Submit another inquiry
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <Input
                                            label="Full Name"
                                            id="name"
                                            placeholder="Rahul Verma"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            label="Company Name"
                                            id="companyName"
                                            icon={FiBriefcase}
                                            placeholder="Acme Logistics"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <Input
                                            label="Work Email"
                                            id="email"
                                            type="email"
                                            icon={FiMail}
                                            placeholder="rahul@acme.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            label="Phone Number (Optional)"
                                            id="phone"
                                            type="tel"
                                            icon={FiPhone}
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <Input
                                            label="Subject (Optional)"
                                            id="subject"
                                            placeholder="Enterprise Purchase"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                        />

                                        {/* Custom Select mimicking Input component styling */}
                                        <div className="space-y-2 w-full">
                                            <label htmlFor="intent" className="text-md font-bold text-text ml-1 opacity-80">
                                                How can we help?
                                            </label>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within/input:text-primary transition-colors">
                                                    <FiTarget className="h-[1.15rem] w-[1.15rem]" />
                                                </div>
                                                <select
                                                    id="intent"
                                                    value={formData.intent}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-10 py-4 appearance-none bg-input border border-border/60 focus:ring-primary focus:border-primary rounded-2xl text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40 cursor-pointer"
                                                >
                                                    {intentOptions.map(option => (
                                                        <option key={option.value} value={option.value} className="bg-bg text-text">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Textarea mimicking Input component styling */}
                                    <div className="space-y-2 w-full">
                                        <label htmlFor="message" className="text-md font-bold text-text ml-1 opacity-80">
                                            Message
                                        </label>
                                        <div className="relative group/input">
                                            <textarea
                                                id="message"
                                                placeholder="We want MayDayOps for our ops team (~50 seats). Please share onboarding steps..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                minLength={10}
                                                className="w-full pl-5 pr-5 py-4 min-h-[120px] bg-input border border-border/60 focus:ring-primary focus:border-primary rounded-2xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40"
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <p className="text-error text-sm font-medium">{errorMessage}</p>
                                    )}

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            size="full"
                                            isLoading={status === "loading"}
                                            className="rounded-full"
                                        >
                                            {!status || status !== "loading" && (
                                                <>Submit Request <FiSend className="size-5 ml-2" /></>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Decorative element behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-[2.5rem] -z-10 blur-xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactUs;



