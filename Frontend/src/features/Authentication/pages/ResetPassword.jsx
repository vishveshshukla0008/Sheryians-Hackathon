import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../hook/useAuth";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const { handleResetPassword } = useAuth();
  const authLoading = useSelector((state) => state.auth.authLoading);
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (!token) {
      toast.error("Reset token is missing. Use the link from your email.");
    }
  }, [token]);

  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    if (!token) return;

    try {
      await handleResetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error("Reset password failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-bg relative overflow-hidden w-full">
      <div className="absolute top-0 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-44 w-44 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-125 relative z-10 animate-fade-in-up">
        <div className="relative bg-bg border border-border/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_20px_rgba(255,87,9,0.05)] p-8 sm:p-12 backdrop-blur-2xl overflow-hidden group">
          <div className="absolute -top-15 -left-10 w-[120%] h-15 blur-md bg-primary -rotate-10 opacity-80 z-0 mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-12 -left-10 w-[120%] h-15 bg-primary/40 -rotate-10 blur-xl z-0 pointer-events-none"></div>

          <div className="mb-10 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight mb-3">
              Reset your access securely.
            </h1>
            <p className="text-text-muted text-xl  font-medium ">
              Enter a strong new password using the token sent to your email.
            </p>
            {!token && (
              <p className="mt-4 text-error text-sm font-medium">
                Reset token missing. Please use the link from the password reset
                email.
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 relative z-10">
            <Input
              id="password"
              type="password"
              label="New Password"
              placeholder="New password"
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

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm new password"
              icon={FiLock}
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <Button
              type="submit"
              variant="primary"
              size="full"
              isLoading={authLoading || isSubmitting}
              disabled={!token || authLoading || isSubmitting}
              className={!token ? "opacity-60 cursor-not-allowed" : ""}>
              {token ? "Reset Password" : "Token required"}
            </Button>
          </form>

          <div className="mt-8 space-y-4 text-center relative z-10">
            <Link
              to="/login"
              className="block text-sm font-semibold text-primary hover:text-primary/80 transition-colors hover:underline">
              Back to Login
            </Link>
            <p className="text-lg font-medium text-text-muted">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-primary text-base hover:text-primary/80 transition-colors hover:underline font-bold drop-shadow-[0_0_8px_rgba(255,87,9,0.3)]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
