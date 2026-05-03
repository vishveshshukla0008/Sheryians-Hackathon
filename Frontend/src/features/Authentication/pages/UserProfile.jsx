import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  FiEdit3,
  FiShield,
  FiBriefcase,
  FiClock,
  FiMail,
  FiUser,
  FiTag,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import toast from "react-hot-toast";
import { setUser } from "../state/auth.slice";
import Loader from "../../../shared/components/Loader";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      companyName: user?.company?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.company?.name || "",
      });
    }
  }, [user, reset]);

  if (authLoading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  const lastLogin = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const handleSave = async (data) => {
    const updatedUser = {
      ...user,
      name: data.name,
    };

    dispatch(setUser(updatedUser));
    toast.success("Profile updated successfully");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6 sm:p-10 overflow-hidden">
      <div className="absolute rotate-45 right-0 bottom-0 h-72 w-72  bg-primary/5 blur-xl pointer-events-none"></div>

      <div className="relative w-full max-w-[1180px] grid gap-8 lg:grid-cols-[1.25fr_0.85fr] items-start z-10">
        <div className="relative bg-bg border border-border/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.08),0_0_20px_rgba(255,87,9,0.05)] p-8 sm:p-10 overflow-hidden backdrop-blur-2xl">
          <div className="absolute -top-15 -left-10 w-[120%] h-12 blur-md bg-primary -rotate-6 opacity-80 z-0 mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-12 -left-10 w-[120%] h-12 bg-primary/40 -rotate-8 blur-xl z-0 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-3xl text-text font-semibold mb-2">
                  Account profile
                </p>
                <p className="text-text-muted text-base font-medium mt-3 max-w-2xl">
                  View and edit your workspace profile in one place. Press
                  update to unlock changes and save them instantly.
                </p>
              </div>

              <Button
                type="button"
                variant={editMode ? "secondary" : "outline"}
                className="shrink-0"
                onClick={() => setEditMode((current) => !current)}>
                <span className="inline-flex items-center gap-2">
                  <FiEdit3 />
                  {editMode ? "Cancel edit" : "Update profile"}
                </span>
              </Button>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  label="Full name"
                  id="name"
                  placeholder="Jane Doe"
                  icon={FiUser}
                  error={errors.name}
                  readOnly={!editMode}
                  className={editMode ? "" : "bg-bg-surface"}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Please enter a valid name",
                    },
                  })}
                />
                <Input
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  icon={FiMail}
                  error={errors.email}
                  readOnly
                  className="bg-bg-surface cursor-not-allowed"
                  {...register("email")}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  label="Role"
                  id="role"
                  placeholder="ADMIN"
                  icon={FiShield}
                  readOnly
                  className="bg-bg-surface"
                  {...register("role")}
                />
                <Input
                  label="Company"
                  id="companyName"
                  placeholder={user.company?.name || "Acme Inc"}
                  icon={FiBriefcase}
                  readOnly
                  className="bg-bg-surface"
                  {...register("companyName")}
                />
              </div>

              {editMode && (
                <div className="flex flex-col gap-4 sm:flex-row items-center justify-end pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="full"
                    className="max-w-[220px]"
                    onClick={() => {
                      reset({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        companyName: user.company?.name || "",
                      });
                      setEditMode(false);
                    }}>
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    className="max-w-[220px]"
                    isLoading={isSubmitting}>
                    Save changes
                  </Button>
                </div>
              )}
            </form>

            <div className="mt-8 rounded-xl border border-border/40 bg-bg p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-lg font-bold uppercase  text-primary">
                    Company details
                  </p>
                  <h2 className="text-2xl font-bold text-text mt-2">
                    Organization summary
                  </h2>
                </div>
                <div className="bg-primary/10 text-primary rounded-2xl px-4 py-2 text-sm font-bold">
                  {user.company?.plan || "FREE"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Company ID",
                    value: user.company?.id || "—",
                    icon: HiBuildingOffice2,
                  },
                  {
                    label: "Slug",
                    value: user.company?.slug || "—",
                    icon: FiTag,
                  },
                  {
                    label: "Members",
                    value: user.company?.memberCount ?? "—",
                    icon: FiUsers,
                  },
                  {
                    label: "Plan",
                    value: user.company?.plan || "—",
                    icon: FiAward,
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`
        rounded-xl border border-border/60 bg-bg p-4 text-md
        ${index === 0 ? "md:col-span-2" : ""}
      `}>
                    <div className="flex items-center gap-3">
                      <div className="min-w-[34px] min-h-[34px] flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <item.icon size={18} />
                      </div>

                      <div>
                        <p className="text-text-muted uppercase tracking-wide font-semibold">
                          {item.label}
                        </p>

                        <p className="text-text font-semibold mt-2 wrap-break-word">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="relative bg-bg-surface border border-border/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.08)] p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-2xl uppercase text-primary font-extrabold">
                Quick summary
              </p>
              <h2 className="text-2xl font-bold text-text mt-2">
                Account snapshot
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Workspace",
                value: user.company?.name || "—",
                icon: HiBuildingOffice2,
              },
              {
                label: "Role",
                value: user.role || "—",
                icon: FiShield,
              },
              {
                label: "Email",
                value: user.email || "—",
                icon: FiMail,
              },
              {
                label: "Last Active",
                value: lastLogin,
                icon: FiClock,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-border/60 bg-bg p-4">
                <div className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-md text-text-muted uppercase tracking-wide font-semibold">
                    {item.label}
                  </p>
                  <p className="text-text font-semibold mt-1 wrap-break-word">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border/60 pt-6">
            <p className="text-md font-bold text-text-muted uppercase tracking-wider mb-3">
              Status
            </p>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-text font-bold text-lg">
                Active workspace access
              </p>
              <p className="text-text-muted mt-2 text-md leading-relaxed">
                Your profile is connected to the active company and can be
                updated instantly from this page.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UserProfile;
