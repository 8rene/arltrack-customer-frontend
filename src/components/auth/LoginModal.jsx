import React, { useState, useRef, useEffect } from "react";
import "../../styles/loginModal.css";

const LoginModal = ({ onLogin, onClose, onSwitchToSignUp }) => {
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember,     setRemember]     = useState(false);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);

  const emailRef    = useRef(null);
  const passwordRef = useRef(null);

  // Load remembered email on mount
  useEffect(() => {
    const saved = localStorage.getItem("arl_remember_email");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Remember me
    if (remember) {
      localStorage.setItem("arl_remember_email", email);
    } else {
      localStorage.removeItem("arl_remember_email");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Store JWT for future authenticated requests
      localStorage.setItem("arl_token", data.token);

      // Pass user data up to App
      onLogin(data.user);
      onClose();

    } catch (err) {
      console.error("Login error:", err);
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-overlay"
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="login-close" onClick={onClose} type="button">✕</button>

        <h2>Welcome Back</h2>
        <p className="login-subtitle">Log in to your ARL Track account</p>

        <form onSubmit={handleSubmit}>
          <div className="login-group">
            {/* Email */}
            <div>
              <label className="login-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className="login-input"
                placeholder="yourname@email.com"
                value={email}
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    passwordRef.current?.focus();
                  }
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="login-label">Password</label>
              <div className="login-password-wrapper">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  required
                  minLength={8}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="login-error" style={{ marginBottom: "0.75rem" }}>
              ⛔ {error}
            </p>
          )}

          {/* Options row */}
          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <button type="button" className="login-forgot">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <hr /><span>or</span><hr />
        </div>

        {/* Social — placeholder buttons (no Firebase client SDK) */}
        <div className="login-social-group">
          <button type="button" className="login-social-btn">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <button type="button" className="login-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="login-footer">
          Don't have an account?{" "}
          <span onClick={onSwitchToSignUp}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
