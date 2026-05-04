import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { FiUser, FiMail, FiLock, FiBriefcase } from "react-icons/fi";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader";
import { defaultWorkspaceHome } from "../../../lib/workspacePaths";

const SignupPage = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const authLoading = useSelector((state) => state.auth.authLoading);
  const user = useSelector((state) => state.auth.user);

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      password: "",
      role: "",
    },
  });

  // if (authLoading) return <Loader />;
  if (user) return <Navigate to={defaultWorkspaceHome(user.role)} replace />;

  const onSubmit = async (data) => {
    try {
      await handleRegister(data);
      reset();
      navigate("/verify-email", { state: { email: data.email } });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const availableRoles = [
    { id: "ADMIN", label: "Admin" },
    { id: "CEO", label: "CEO" },
    { id: "DEVELOPER", label: "Developer" }
  ];

  return (
    <div className="min-h-screen flex bg-bg relative overflow-hidden w-full">
      {/* Left side Image with glowing effect - Adjusts flexibly with zoom and screen size */}
      <div className="hidden lg:flex lg:w-full relative p-6 xl:p-10 items-center justify-center">
        {/* Intense glow behind the image matching the neon amber accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/30 blur-[150px] rounded-full pointer-events-none "></div>

        {/* Responsive Image Container */}
        <div className="relative z-10 w-full h-full min-h-[600px] max-h-[900px] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(255,87,9,0.2)] border border-primary/20 group shrink-0">
          <img
            src="/incident.png"
            alt="Cybersecurity Incident Art"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay gradient for seamless blending */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/50 to-transparent opacity-50"></div>

          <div
            className="absolute bottom-16 left-12 right-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}>
            <h2 className="text-4xl xl:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
              Control the chaos. <br />{" "}
              <span className="text-primary drop-shadow-[0_0_20px_rgba(255,87,9,0.6)]">
                Lead the response.
              </span>
            </h2>
            <p className="text-gray-300 text-lg xl:text-xl max-w-lg leading-relaxed font-medium">
              Join the elite teams that trust our platform for rapid,
              intelligent, and seamless incident resolution.
            </p>
          </div>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-7/12 xl:w-[55%] flex items-center justify-center p-6 sm:p-12 z-10 relative">
        {/* Subtle background floating element for the right side */}
        <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[70px] pointer-events-none animate-float"></div>

        {/* Greatly increased width for the form container */}
        <div className="w-full max-w-[550px] xl:max-w-[600px] relative z-10 animate-fade-in-up">
          <div className="relative bg-bg border border-border/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_20px_rgba(255,87,9,0.05)] p-8 sm:p-12 backdrop-blur-2xl overflow-hidden group">
            {/* Tilted Top Primary Accent */}
            <div className="absolute -top-15 -left-10 w-[120%] h-15 blur-md bg-primary -rotate-10 opacity-80 z-0 mix-blend-screen pointer-events-none"></div>
            <div className="absolute -top-12 -left-10 w-[120%] h-15 bg-primary/40 -rotate-10 blur-xl z-0 pointer-events-none"></div>

            <div className="mb-10 text-center sm:text-left relative z-10">
              <h1 className="text-4xl font-black text-text tracking-tight mb-3">
                {submittedData ? "Registration Complete" : "Create Account"}
              </h1>
              <p className="text-text-muted text-base font-medium">
                {submittedData
                  ? "Here is the data you submitted."
                  : "Join our platform and select your roles to get started."}
              </p>
            </div>

            {submittedData ? (
              <div className="space-y-6 animate-fade-in-up">
                <div className="bg-primary/5 border border-primary/20 p-6 sm:p-8 rounded-2xl shadow-[inset_0_0_20px_rgba(255,87,9,0.05)]">
                  <div className="space-y-4">
                    <div className="flex flex-col border-b border-border/50 pb-3">
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                        Full Name
                      </span>
                      <span className="text-lg text-text font-medium">
                        {submittedData.name}
                      </span>
                    </div>
                    <div className="flex flex-col border-b border-border/50 pb-3">
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                        Email Address
                      </span>
                      <span className="text-lg text-text font-medium">
                        {submittedData.email}
                      </span>
                    </div>
                    <div className="flex flex-col border-b border-border/50 pb-3">
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                        Company Name
                      </span>
                      <span className="text-lg text-text font-medium">
                        {submittedData.companyName}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                        Role
                      </span>
                      <span className="text-lg text-primary font-bold capitalize">
                        {submittedData.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={() => setSubmittedData(null)}
                    size="full"
                    variant="outline"
                    className="py-4 text-lg tracking-wide border-primary/50 text-text hover:bg-primary/10">
                    Back to Signup
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <Input
                  label="Full Name"
                  id="name"
                  placeholder="Ravi Kumar"
                  icon={FiUser}
                  error={errors.name}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                {/* Email Input */}
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="ravi@swiggy.com"
                  icon={FiMail}
                  error={errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />

                {/* Company Name Input */}
                <Input
                  label="Company Name"
                  id="companyName"
                  placeholder="Swiggy"
                  icon={FiBriefcase}
                  error={errors.companyName}
                  {...register("companyName", {
                    required: "Company Name is required",
                    minLength: {
                      value: 2,
                      message: "Company Name must be at least 2 characters",
                    },
                  })}
                />

                {/* Password Input */}
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="SecurePass123"
                  icon={FiLock}
                  error={errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                {/* Role Selection */}
                <div className="space-y-3 pt-2">
                  <label className="text-md text-text ml-1 opacity-80">
                    Select Role
                  </label>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {availableRoles.map((role) => (
                      <label
                        key={role.id}
                        className="relative flex items-center cursor-pointer group/role flex-1 sm:flex-none">
                        <input
                          type="radio"
                          value={role.id}
                          className="peer sr-only"
                          {...register("role", {
                            required: "Please select a role",
                          })}
                        />
                        <div className="w-full sm:w-auto h-12 px-6 flex items-center justify-center rounded-xl border-2 border-border/50 bg-input/20 text-text-muted peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all duration-300 peer-checked:shadow-[0_0_15px_rgba(255,87,9,0.2)] hover:border-primary/50 hover:bg-input/40 hover:-translate-y-0.5">
                          <span className="text-[15px] font-bold tracking-wide">
                            {role.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="text-error text-xs mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                      <span className="inline-block w-1.5 h-1.5 bg-error rounded-full shadow-[0_0_5px_var(--color-error)]"></span>
                      <span className="font-medium">{errors.role.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    size="full"
                    variant="primary"
                    isLoading={authLoading}
                    className="py-4 text-lg tracking-wide shadow-[0_10px_20px_rgba(255,87,9,0.25)] hover:shadow-[0_15px_25px_rgba(255,87,9,0.35)]">
                    Create Account
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-md font-medium text-text-muted">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-lg hover:text-primary/80 transition-colors hover:underline font-bold ml-1.5 drop-shadow-[0_0_8px_rgba(255,87,9,0.3)]">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
