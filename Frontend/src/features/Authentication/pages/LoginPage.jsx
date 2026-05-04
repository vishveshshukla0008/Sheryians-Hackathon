import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { FiMail, FiLock, FiShield } from "react-icons/fi";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader";
import { defaultWorkspaceHome } from "../../../lib/workspacePaths";

const LoginPage = () => {
  const { loginHandler } = useAuth();

  const authLoading = useSelector((state) => state.auth.authLoading);
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await loginHandler(data);
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // if (authLoading) return <Loader/>;
  if (user) return <Navigate to={defaultWorkspaceHome(user.role)} replace />;

  return (
    <div className="min-h-screen flex bg-bg relative overflow-hidden w-full">
      {/* Left side Image with glowing effect - Adjusts flexibly with zoom and screen size */}
      <div className="hidden lg:flex lg:w-full relative p-6 xl:p-10 pt-5 items-center justify-center">
        {/* Intense glow behind the image matching the neon amber accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/30 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>

        {/* Responsive Image Container */}
        <div className="relative z-10 w-full h-[calc(100vh-3rem)] min-h-[600px] max-h-[900px] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(255,87,9,0.2)] border border-primary/20 group shrink-0">
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
                Welcome Back
              </h1>
              <p className="text-text-muted text-base font-medium">
                Log in to your account to continue managing incidents.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 relative z-10">
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

              {/* Password Input */}
              <div className="space-y-2">
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
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forget-password"
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="full"
                  variant="primary"
                  isLoading={authLoading}
                  className="py-4 text-lg tracking-wide shadow-[0_10px_20px_rgba(255,87,9,0.25)] hover:shadow-[0_15px_25px_rgba(255,87,9,0.35)]">
                  Log in
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-[15px] font-medium text-text-muted">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary text-lg hover:text-primary/80 transition-colors hover:underline font-bold ml-1.5 drop-shadow-[0_0_8px_rgba(255,87,9,0.3)]">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
