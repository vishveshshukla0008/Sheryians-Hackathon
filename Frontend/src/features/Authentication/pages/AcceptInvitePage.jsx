import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../../api/httpClient";
import { setUser } from "../state/auth.slice";
import { defaultWorkspaceHome } from "../../../lib/workspacePaths";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { FiUser, FiLock, FiMail } from "react-icons/fi";

const AcceptInvitePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token")?.trim() || "";
  const dispatch = useDispatch();
  const existingUser = useSelector((state) => state.auth.user);

  const [setup, setSetup] = useState(null);
  const [setupError, setSetupError] = useState("");
  const [isLoadingSetup, setIsLoadingSetup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setSetupError("Invite link is missing a token. Ask your admin for a new invite.");
        setIsLoadingSetup(false);
        return;
      }
      try {
        setIsLoadingSetup(true);
        setSetupError("");
        const res = await api.get(`/company/invite/setup?token=${encodeURIComponent(token)}`);
        const data = res?.data;
        setSetup({
          email: data?.email || "",
          companyName: data?.companyName || "",
          role: data?.role || "MEMBER",
        });
        reset({ name: "", password: "", confirmPassword: "" });
      } catch (error) {
        setSetupError(error?.message || "Invalid or expired invite link.");
        setSetup(null);
      } finally {
        setIsLoadingSetup(false);
      }
    };
    load();
  }, [token, reset]);

  if (existingUser) {
    return <Navigate to={defaultWorkspaceHome(existingUser.role)} replace />;
  }

  const onSubmit = async (data) => {
    if (!token || !setup?.email) return;
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await api.post("/company/invite/accept", {
        token,
        name: data.name.trim(),
        email: setup.email,
        password: data.password,
      });
      const u = res?.data?.user;
      if (u) {
        dispatch(
          setUser({
            id: u.id,
            _id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            companyId: u.companyId,
          })
        );
      }
      toast.success(res?.message || "Welcome! Your account is ready.");
      navigate(defaultWorkspaceHome(u.role), { replace: true });
    } catch (error) {
      toast.error(error?.message || "Could not accept invite");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingSetup) {
    return (
      <div className="w-full max-w-md px-4 py-10 text-center text-text-muted">
        Loading invite…
      </div>
    );
  }

  if (setupError || !setup) {
    return (
      <div className="w-full max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold text-text mb-3">Invite unavailable</h1>
        <p className="text-text-muted mb-6">{setupError || "This invite could not be loaded."}</p>
        <Link to="/login" className="text-primary font-bold hover:underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md px-4 py-10">
      <h1 className="text-3xl font-black text-text mb-2">Join {setup.companyName}</h1>
      <p className="text-text-muted mb-2">
        Role: <span className="font-bold text-text">{setup.role}</span>
      </p>
      <p className="text-sm text-text-muted mb-8">
        Create your password to finish setup. You must use the invited email below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wide">
            Invited email
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-bg-surface px-4 py-3 text-text">
            <FiMail className="text-text-muted shrink-0" />
            <span className="truncate text-sm font-medium">{setup.email}</span>
          </div>
        </div>

        <Input
          id="name"
          label="Your name"
          placeholder="Full name"
          icon={FiUser}
          error={errors.name}
          {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          icon={FiLock}
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Repeat password"
          icon={FiLock}
          error={errors.confirmPassword}
          {...register("confirmPassword", { required: "Please confirm password" })}
        />

        <Button type="submit" size="full" variant="primary" isLoading={isSubmitting} className="py-4 font-bold">
          Accept invite & join
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default AcceptInvitePage;
