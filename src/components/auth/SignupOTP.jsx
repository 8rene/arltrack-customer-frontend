import React, { useState, useEffect, useRef } from "react";
import "../../styles/SignupOTP.css";

const MAX_ATTEMPTS = 3;

const SignupOTP = ({ isOpen, email, generatedOTP, onVerify, onClose, onRestart, loading }) => {
  const [otp,         setOtp]         = useState(["", "", "", "", "", ""]);
  const [timer,       setTimer]       = useState(60);
  const [attempts,    setAttempts]    = useState(0);
  const [errorMsg,    setErrorMsg]    = useState("");
  const [blocked,     setBlocked]     = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const inputs = useRef([]);

  // Reset everything when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setAttempts(0);
    setErrorMsg("");
    setBlocked(false);
    setResendCount(0);
    setTimeout(() => inputs.current[0]?.focus(), 100);
  }, [isOpen]);

  // Countdown timer — restarts on every resend
  useEffect(() => {
    if (!isOpen || blocked) return;
    setTimer(60);
    const interval = setInterval(() => setTimer((prev) => {
      if (prev <= 1) { clearInterval(interval); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(interval);
  }, [isOpen, resendCount, blocked]);

  const handleChange = (value, index) => {
    // Letters blocked — digits only
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMsg("");
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Handle paste — fill all 6 boxes
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const verifyOTP = () => {
    if (blocked) return;

    const entered = otp.join("");
    if (entered.length < 6) {
      setErrorMsg("Please enter all 6 digits.");
      return;
    }

    if (entered !== generatedOTP) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        // Max attempts reached — block and signal parent to restart OTP
        setBlocked(true);
        setErrorMsg("");
        // Immediately call restart so parent can go back without waiting
        onRestart();
        return;
      }

      const remaining = MAX_ATTEMPTS - newAttempts;
      setErrorMsg(
        `Incorrect OTP. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
      );
      // Clear the boxes for re-entry
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => inputs.current[0]?.focus(), 50);
      return;
    }

    // Correct OTP
    onVerify();
  };

  const resendOTP = () => {
    // Reset UI state
    setOtp(["", "", "", "", "", ""]);
    setAttempts(0);
    setErrorMsg("");
    setResendCount((c) => c + 1); // triggers countdown useEffect to restart timer
    setTimeout(() => inputs.current[0]?.focus(), 50);
    // ✅ Tell parent to call sendOTP again — generates and emails a new OTP from backend
    onRestart();
  };

  if (!isOpen) return null;

  const filled = otp.filter(Boolean).length;

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        {/* Icon */}
        <div className="otp-icon">✉️</div>

        <h2>Email Verification</h2>
        <p>
          Enter the 6-digit OTP sent to<br />
          <b>{email}</b>
        </p>

        {/* Attempt indicator */}
        <div className="otp-attempts">
          {[...Array(MAX_ATTEMPTS)].map((_, i) => (
            <span
              key={i}
              className={`otp-dot ${i < attempts ? "otp-dot--used" : "otp-dot--active"}`}
            />
          ))}
        </div>
        <p className="otp-attempts-label">
          {attempts === 0
            ? `${MAX_ATTEMPTS} attempts allowed`
            : `${MAX_ATTEMPTS - attempts} attempt${MAX_ATTEMPTS - attempts === 1 ? "" : "s"} remaining`}
        </p>

        {/* OTP boxes */}
        <div className="otp-boxes" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="off"
            />
          ))}
        </div>

        {/* Error message */}
        {errorMsg && <p className="otp-error">⛔ {errorMsg}</p>}

        {/* Verify */}
        <button
          className="verify-btn"
          onClick={verifyOTP}
          disabled={loading || blocked || filled < 6}
        >
          {loading ? "Verifying…" : "Verify OTP"}
        </button>

        {/* Resend / timer */}
        <div className="resend">
          {timer > 0 ? (
            <span className="otp-timer">⏱ Resend in {timer}s</span>
          ) : (
            <button className="resend-btn" onClick={resendOTP}>
              Resend OTP
            </button>
          )}
        </div>

        {/* Cancel */}
        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupOTP;
