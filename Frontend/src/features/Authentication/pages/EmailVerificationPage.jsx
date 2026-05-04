import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FiMail } from "react-icons/fi";
import Button from "../../../shared/components/Button";
import { useAuth } from "../hook/useAuth";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleEmailVerification } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);

  const token = new URLSearchParams(location.search).get("token");

  const handleAuthenticate = async () => {
    if (!token) {
      toast.error("Verification token is missing.");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await handleEmailVerification(token);

      if (response && !response.error) {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1200);
      } else {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1800);
      }
    } catch {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="w-full max-w-xl relative">
        <div className="absolute inset-x-0 top-0 -translate-y-1/2 mx-auto h-40 w-72 rounded-full bg-primary/20 blur-3xl opacity-70 pointer-events-none" />
        <div className="relative rounded-3xl border border-primary/20 bg-bg-surface p-8 shadow-[0_0_80px_rgba(255,87,9,0.15)] text-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="relative z-10 mb-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiMail size={32} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-text">
              Authenticate Account
            </h1>
            <p className="mt-3 text-md text-text-muted">
              Click Authenticate to verify your email and complete your account
              setup.
            </p>
            {token ? (
              <p className="mt-2 text-sm text-text-muted wrap-break-word">
                Token detected in URL, ready to verify.
              </p>
            ) : (
              <p className="mt-2 text-sm text-error">
                No verification token found in the URL.
              </p>
            )}
          </div>

          <Button
            onClick={handleAuthenticate}
            size="full"
            variant="primary"
            isLoading={isVerifying}
            className="text-lg font-bold py-4">
            Authenticate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
