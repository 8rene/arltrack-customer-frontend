import React, { useState, useRef, useEffect } from "react";
import TandC from "../shared/TandC";
import SignupOTP from "./SignupOTP";
import OTPModal from "./OTPModal";

const AuthModal = ({ onClose, onLogin, initialView = "login" }) => {
    const [view, setView] = useState(initialView); // "login" | "signup"
    const [animating, setAnimating] = useState(false);

    // --- Login state ---
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [showLoginOTP, setShowLoginOTP] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // --- Signup state ---
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [phone, setPhone] = useState("");
    const [showTerms, setShowTerms] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showSignupOTP, setShowSignupOTP] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState("");

    const phoneRegex = /^(\+639|09)\d{9}$/;

    // Load remembered email
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberEmail");
        if (savedEmail) {
            setLoginEmail(savedEmail);
            setRemember(true);
        }
    }, []);

    const switchView = (target) => {
        if (animating || view === target) return;
        setAnimating(true);
        setTimeout(() => {
            setView(target);
            setAnimating(false);
        }, 220);
    };

    // --- Login handlers ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (remember) {
            localStorage.setItem("rememberEmail", loginEmail);
        } else {
            localStorage.removeItem("rememberEmail");
        }
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                setLoginError("Invalid email or password");
                return;
            }
            setLoginError("");
            await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail }),
            });
            setShowLoginOTP(true);
        } catch (err) {
            console.error(err);
            setLoginError("Server error. Try again.");
        }
    };

    // --- Signup handlers ---
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signupPassword !== confirm) {
            alert("Passwords do not match");
            return;
        }
        if (phone && !phoneRegex.test(phone)) {
            alert("Enter valid PH number");
            return;
        }
        if (!termsAccepted) {
            alert("You must agree to Terms & Conditions");
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        setShowSignupOTP(true);
    };

    const handleVerifySignupOTP = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: signupEmail, password: signupPassword, phone }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            alert("Signup successful!");
            setShowSignupOTP(false);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={onClose}
            >
                {/* Modal Card */}
                <div
                    className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden"
                    style={{ minHeight: "520px" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Tab Switcher */}
                    <div className="flex border-b border-gray-100">
                        <button
                            type="button"
                            onClick={() => switchView("login")}
                            className={`flex-1 py-4 text-sm font-medium tracking-wide transition-all duration-200 ${view === "login"
                                    ? "text-arl-primary border-b-2 border-arl-primary"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => switchView("signup")}
                            className={`flex-1 py-4 text-sm font-medium tracking-wide transition-all duration-200 ${view === "signup"
                                    ? "text-arl-primary border-b-2 border-arl-primary"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Sliding content wrapper */}
                    <div
                        className="transition-opacity duration-200"
                        style={{ opacity: animating ? 0 : 1 }}
                    >
                        {/* ── LOGIN VIEW ── */}
                        {view === "login" && (
                            <div className="p-8">
                                <h2 className="font-display font-black text-3xl text-arl-primary mb-6 text-center">
                                    Welcome Back
                                </h2>

                                <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
                                    <div>
                                        <label className="text-sm text-gray-600">Email</label>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="Enter your email"
                                            value={loginEmail}
                                            required
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            onInvalid={(e) =>
                                                e.target.setCustomValidity("Please include an '@' in the email address")
                                            }
                                            onInput={(e) => e.target.setCustomValidity("")}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    passwordRef.current?.focus();
                                                }
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Password</label>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="Enter your password"
                                            value={loginPassword}
                                            required
                                            minLength="8"
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            onInvalid={(e) =>
                                                e.target.setCustomValidity("Password must be at least 8 characters")
                                            }
                                            onInput={(e) => e.target.setCustomValidity("")}
                                        />
                                    </div>

                                    {loginError && <p className="text-sm text-red-500">{loginError}</p>}

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={remember}
                                                onChange={() => setRemember(!remember)}
                                                className="accent-arl-primary"
                                            />
                                            Remember me
                                        </label>
                                        <button type="button" className="text-arl-secondary hover:underline">
                                            Forgot password?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-arl-cta text-white py-3 rounded-xl font-medium hover:bg-arl-secondary transition-all duration-300"
                                    >
                                        Login
                                    </button>
                                </form>

                                <div className="my-6 flex items-center gap-3">
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <p className="text-sm text-gray-400">or</p>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                                        Continue with Google
                                    </button>
                                    <button className="w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                                        Continue with Facebook
                                    </button>
                                </div>

                                <p className="text-center text-sm text-gray-500 mt-6">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => switchView("signup")}
                                        className="text-arl-secondary cursor-pointer hover:underline"
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* ── SIGNUP VIEW ── */}
                        {view === "signup" && (
                            <div className="p-8">
                                <h2 className="font-display font-black text-3xl text-arl-primary mb-6 text-center">
                                    Create Account
                                </h2>

                                <form onSubmit={handleSignupSubmit} className="space-y-4 font-sans">
                                    <div>
                                        <label className="text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="Enter your email"
                                            value={signupEmail}
                                            onChange={(e) => setSignupEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Password</label>
                                        <input
                                            type="password"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="Enter your password"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="Confirm password"
                                            value={confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-arl-secondary"
                                            placeholder="09XXXXXXXXX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={termsAccepted}
                                            readOnly
                                            className="accent-arl-primary"
                                        />
                                        <span>
                                            I agree to{" "}
                                            <button
                                                type="button"
                                                onClick={() => setShowTerms(true)}
                                                className="text-arl-secondary hover:underline"
                                            >
                                                Terms & Conditions
                                            </button>
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-arl-cta text-white py-3 rounded-xl font-medium hover:bg-arl-secondary transition-all duration-300"
                                    >
                                        Sign Up
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-500 mt-6">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => switchView("login")}
                                        className="text-arl-secondary cursor-pointer hover:underline"
                                    >
                                        Login
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── SUB-MODALS ── */}

            {/* Login OTP */}
            {showLoginOTP && (
                <OTPModal
                    email={loginEmail}
                    onVerifySuccess={onLogin}
                    onClose={() => setShowLoginOTP(false)}
                />
            )}

            {/* Signup T&C */}
            <TandC
                isOpen={showTerms}
                onAgree={() => {
                    setTermsAccepted(true);
                    setShowTerms(false);
                }}
                onCancel={() => {
                    setTermsAccepted(false);
                    setShowTerms(false);
                }}
            />

            {/* Signup OTP */}
            <SignupOTP
                isOpen={showSignupOTP}
                email={signupEmail}
                otp={generatedOTP}
                onVerify={handleVerifySignupOTP}
                onClose={() => setShowSignupOTP(false)}
            />
        </>
    );
};

export default AuthModal;