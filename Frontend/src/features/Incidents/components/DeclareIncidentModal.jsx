import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { api } from "../../../api/httpClient";

const DeclareIncidentModal = ({ isOpen, onClose, onIncidentCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      severity: "P1",
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      clearErrors("root.serverError");
      await api.post("/incidents", data);
      toast.success("Incident created successfully");
      reset();
      onClose();
      if (onIncidentCreated) {
        onIncidentCreated();
      }
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message: error?.message || "Failed to create incident.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm">
      <div className="bg-bg-surface border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold  mb-1 text-primary">
              Declare Incident
            </h2>
            <p className="text-xl font-medium text-text-muted">
              Create a new incident to alert your team
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted text-2xl cursor-pointer hover:text-text transition-colors p-1">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="p-6 pt-2 flex flex-col gap-5">
            <Input
              id="title"
              label="Incident Title"
              placeholder="e.g. Payment gateway down"
              labelClassName="block text-xs font-bold text-text-muted uppercase tracking-wide"
              error={errors.title}
              {...register("title", { required: "Title is required" })}
            />

            <div className="space-y-2 w-full">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wide">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Describe what's happening..."
                className={`w-full bg-input border ${errors.description ? "border-error focus:ring-error focus:border-error" : "border-border/60 focus:ring-primary focus:border-primary"} rounded-2xl px-5 py-4 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40 resize-none`}
                {...register("description", {
                  required: "Description is required",
                })}></textarea>
              {errors.description && (
                <p className="text-error text-xs ml-1 flex items-center gap-1.5 animate-fade-in-up">
                  <span className="inline-block w-1.5 h-1.5 bg-error rounded-full shadow-[0_0_5px_var(--color-error)]"></span>
                  <span className="font-medium">
                    {errors.description.message}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wide">
                Severity
              </label>
              <select
                className="w-full bg-input border border-border/60 rounded-2xl px-5 py-4 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40 appearance-none"
                {...register("severity", { required: true })}>
                <option value="P1">P1 — Critical (everything down)</option>
                <option value="P2">P2 — High (partial outage)</option>
                <option value="P3">P3 — Medium (minor issue)</option>
              </select>
            </div>

            {errors.root?.serverError && (
              <p className="text-error text-sm font-medium">{errors.root.serverError.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 pt-2 pb-8">
            <Button
              type="submit"
              size="full"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="font-bold flex items-center justify-center gap-2">
              🚨 Declare Incident
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeclareIncidentModal;
