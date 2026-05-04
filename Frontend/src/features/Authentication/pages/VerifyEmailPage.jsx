import { useState, useEffect } from "react";
import { useLocation, Link, Navigate } from "react-router";
import { FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Button from "../../../shared/components/Button";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const VerifyEmailPage = () => {
  const location = useLocation();
  const { handleResendVerification } = useAuth();
  const authLoading = useSelector((state) => state.auth.authLoading);
  // Get email from router state if available, otherwise redirect to register
  const email = location.state?.email;

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const onResendClick = async () => {
    if (timer > 0) return;
    setTimer(30);
    await handleResendVerification(email);
  };

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleOpenEmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden w-full p-6">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-200 h-[30%] bg-primary/20 blur-[120px] rounded-full pointer-events-none "></div>

      {/* Additional subtle floating elements */}

      <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-125 relative z-10 animate-fade-in-up">
        <div className="relative bg-bg border border-border rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.2),0_0_20px_rgba(255,87,9,0.1)] p-8 sm:p-12 backdrop-blur-2xl overflow-hidden group text-center">
          {/* Top Primary Accent */}
          <div className="absolute -top-15 -left-10 w-[120%] h-15 blur-md bg-primary -rotate-10 opacity-60 z-0 mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-12 -left-10 w-[120%] h-15 bg-primary/40 -rotate-10 blur-xl z-0 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon Container with animations */}
            <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_40px_rgba(255,87,9,0.15)] relative group-hover:shadow-[0_0_50px_rgba(255,87,9,0.25)] transition-all duration-500">
              <div className="absolute inset-0 rounded-full bg-primary/20  opacity-20"></div>
              <FiMail className="text-5xl text-primary" />
              <div className="absolute -bottom-1 -right-1 bg-bg rounded-full p-1.5 border-2 border-primary shadow-[0_0_15px_rgba(255,87,9,0.4)]">
                <FiCheckCircle className="text-2xl text-primary" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight mb-4">
              Check your email
            </h1>

            <p className="text-text-muted text-[17px] font-medium mb-8 leading-relaxed max-w-sm mx-auto">
              We've sent a verification link to <br />
              <span className="text-text font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] mt-1 block">
                {email}
              </span>
            </p>

            <div className="w-full space-y-4">
              <Button
                onClick={handleOpenEmail}
                size="full"
                variant="primary"
                className="py-4 text-lg tracking-wide shadow-[0_10px_20px_rgba(255,87,9,0.25)] hover:shadow-[0_15px_25px_rgba(255,87,9,0.35)] flex items-center justify-center gap-2 group/btn">
                Open Email App
                <FiArrowRight className="text-xl group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="mt-8 text-center flex flex-col items-center h-[76px] justify-center">
              {timer > 0 ? (
                <p className="text-text-muted text-lg font-medium">
                  Wait for {timer} seconds for resend !
                </p>
              ) : (
                <>
                  <p className="text-text-muted text-lg font-medium">
                    Didn't receive an email?
                  </p>
                  <Button
                    variant="ghost"
                    onClick={onResendClick}
                    isLoading={authLoading}
                    className="text-primary hover:text-primary-hover hover:bg-transparent transition-colors text-xl font-medium mt-1">
                    Resend Email
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Back to login */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-text-muted hover:text-text transition-colors text-xl font-medium flex items-center justify-center gap-2 hover:-translate-x-1 duration-300 w-fit mx-auto">
            <FiArrowRight className="rotate-180" />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
