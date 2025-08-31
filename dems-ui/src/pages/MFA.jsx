import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MFA() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (code === "123456") { // mock OTP
      nav("/");
    } else {
      setError("Invalid code. Try 123456.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Multi-Factor Authentication</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the 6-digit code sent to {user?.email || "your email"}.
        </p>
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
        </form>
      </div>
    </div>
  );
}
