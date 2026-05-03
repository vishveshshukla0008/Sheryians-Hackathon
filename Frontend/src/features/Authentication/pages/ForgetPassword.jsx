import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { FiMail } from "react-icons/fi";
import { Link, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader";
import { useAuth } from "../hook/useAuth";

const ForgetPassword = () => {
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const user = useSelector((state) => state.auth.user);

  const { handleForgotPasswordLinkSent } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    // Start cooldown immediately when clicked
    setCooldownTimer(120);
    console.log("Forgot Password Email:", data.email);
    await handleForgotPasswordLinkSent(data.email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Auto-reset email input after successful submission
  useEffect(() => {
    if (!isSubmitSuccessful) return;

    const resetTimer = setTimeout(() => {
      setValue("email", "");
    }, 3000);

    return () => clearTimeout(resetTimer);
  }, [isSubmitSuccessful, setValue]);

  // Countdown timer effect
  useEffect(() => {
    if (cooldownTimer <= 0) return;

    const interval = setInterval(() => {
      setCooldownTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-bg relative overflow-hidden w-full">
      {/* Subtle background floating element */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-xl bg-primary/10 blur-[100px] pointer-events-none animate-float"></div>
      <div
        className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-float"
        style={{ animationDelay: "1s" }}></div>

      <div className="w-full max-w-125 relative z-10 animate-fade-in-up">
        <div className="relative bg-bg border border-border/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_20px_rgba(255,87,9,0.05)] p-8 sm:p-12 backdrop-blur-2xl overflow-hidden group">
          {/* Tilted Top Primary Accent */}
          <div className="absolute -top-15 -left-10 w-[120%] h-15 blur-md bg-primary -rotate-10 opacity-80 z-0 mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-12 -left-10 w-[120%] h-15 bg-primary/40 -rotate-10 blur-xl z-0 pointer-events-none"></div>

          {/* Header Section */}
          <div className="mb-10 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight mb-3">
              Reset Password
            </h1>
            <p className="text-text-muted text-base font-medium">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Success Message */}
          {isSubmitSuccessful && (
            <div className="mb-8 p-4 bg-success/10 border border-success/50 rounded-2xl animate-fade-in-up">
              <p className="text-success font-bold text-md">
                Check your email for password reset instructions!
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 relative z-10">
            {/* Email Input */}
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="full"
              disabled={cooldownTimer > 0}
              isLoading={authLoading || isSubmitting}
              className={cooldownTimer > 0 ? "opacity-60" : ""}>
              {cooldownTimer > 0
                ? `Resend in ${formatTime(cooldownTimer)}`
                : "Send Reset Link"}
            </Button>
          </form>

          {/* Navigation Links */}
          <div className="mt-8 space-y-4 text-center relative z-10">
            <Link
              to="/login"
              className="block text-lg font-semibold text-primary hover:text-primary/80 transition-colors hover:underline">
              Back to Login
            </Link>
            <p className="text-lg font-medium text-text-muted">
              Don't have an account ?{" "}
              <Link
                to="/signup"
                className="text-primary text-base hover:text-primary/80 transition-colors hover:underline font-bold drop-shadow-[0_0_8px_rgba(255,87,9,0.3)]">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
