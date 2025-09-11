// src/pages/MFA.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  Building2,
  Lock,
  RefreshCw,
  Timer,
} from "lucide-react";

export default function MFA() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 min in seconds
  const nav = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const submit = (e) => {
    e.preventDefault();
    if (code === "123456" && timeLeft > 0) {
      nav("/");
    } else if (timeLeft <= 0) {
      setError("Code expired. Please resend a new code.");
    } else {
      setError("Invalid code. Try 123456.");
    }
  };

  const resendCode = () => {
    setResendMsg("A new code has been sent to your email (mock).");
    setCode("");
    setError("");
    setTimeLeft(300); // reset timer
    setTimeout(() => setResendMsg(""), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-2">
          <span className="flex items-center gap-1 text-blue-600">
            <Lock className="w-4 h-4" /> Step 2 of 2
          </span>
          <span>MFA Verification</span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-600 rounded-full w-full" />
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Multi-Factor Authentication
          </h2>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code sent to <strong>{user?.email || "your email"}</strong>.
          </p>
        </div>

        {/* MFA Form */}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="123456"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Verify
          </button>

          {/* Resend + Timer */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <button
              type="button"
              onClick={resendCode}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <RefreshCw className="w-4 h-4" /> Resend Code
            </button>
            <div className="flex items-center gap-1 text-gray-600">
              <Timer className="w-4 h-4" />
              <span>
                Code expires in{" "}
                <span className={timeLeft <= 60 ? "text-red-600 font-semibold" : ""}>
                  {formatTime(timeLeft)}
                </span>
              </span>
            </div>
          </div>
          {resendMsg && <p className="text-green-600 text-xs mt-1">{resendMsg}</p>}
        </form>

        {/* Future Integrations / Compliance */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Planned Integrations & Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <IntegrationCard
              icon={Smartphone}
              title="Authenticator Apps"
              description="Google Authenticator, Duo, Authy"
            />
            <IntegrationCard
              icon={KeyRound}
              title="SMS / Push Codes"
              description="Text messages or app notifications"
            />
            <IntegrationCard
              icon={ShieldCheck}
              title="CJIS / FedRAMP MFA"
              description="Law enforcement grade compliance"
            />
            <IntegrationCard
              icon={Building2}
              title="SSO / Enterprise"
              description="Okta, Azure AD, and enterprise IdPs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-3 flex flex-col hover:shadow transition">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-blue-600" />
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}
