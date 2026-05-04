import { useNavigate } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

/**
 * Browser history back; if stack is too shallow, navigates to fallbackPath.
 */
export default function PageBackButton({ fallbackPath = "/", className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    const idx = window.history?.state?.idx;
    if (typeof idx === "number") {
      if (idx > 0) navigate(-1);
      else navigate(fallbackPath);
      return;
    }
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={`inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-bold text-text-muted transition-colors hover:bg-primary/10 hover:text-primary ${className}`}>
      <FiArrowLeft size={18} aria-hidden />
      Back
    </button>
  );
}
