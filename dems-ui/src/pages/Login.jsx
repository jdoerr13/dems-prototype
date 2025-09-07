import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import rexusLogo from "../assets/rexus_logo.png"; // adjust path if needed

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("lea@county.gov");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role) {
        sessionStorage.setItem("role", user.role);
      }
      nav("/mfa");
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (demoEmail, demoRole) => {
    setLoading(true);
    try {
      await login(demoEmail, demoRole);
      sessionStorage.setItem("role", demoRole);
      nav("/mfa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        {/* Prototype Badge in top-right */}
        <span className="absolute top-3 right-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 ring-1 ring-gray-300">
          Prototype
        </span>

        {/* Logo + Branding */}
        <div className="flex flex-col items-center text-center mb-8 select-none">
          {/* Logo */}
          <img
            src={rexusLogo}
            alt="Rexus Logo"
            className="h-20 w-auto mb-7 drop-shadow-sm"
          />

          {/* Wordmark */}
          <h1 className="flex items-center gap-2 text-5xl font-extrabold uppercase tracking-tight">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              REXUS
            </span>
            <span className="text-gray-800 font-light tracking-widest">
              EVIDENT
            </span>
            <sup className="text-base text-gray-500 font-semibold">™</sup>
          </h1>

          {/* Divider line under wordmark */}
          <div className="w-[150px] h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-3 mb-1"></div>

          {/* Tagline */}
          <p className="text-md text-gray-600 font-medium mt-1">
            Digital Evidence Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@agency.gov"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        {/* Demo Mode */}
        <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Demo Mode</h3>
          <p className="text-xs text-gray-600 mb-3">
            Use the sample credentials below or click a button to explore portals:
          </p>

          {/* Credentials list */}
          <div className="grid grid-cols-1 gap-3 text-sm mb-4">
            <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
              <strong>Admin</strong>
              <br />
              Email: admin@rexus.com
              <br />
              Password: admin123
            </div>
            <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
              <strong>Prosecutor</strong>
              <br />
              Email: prosecutor@rexus.com
              <br />
              Password: pros123
            </div>
            <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
              <strong>Defense</strong>
              <br />
              Email: defense@rexus.com
              <br />
              Password: def123
            </div>
            <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
              <strong>Law Enforcement</strong>
              <br />
              Email: lea@rexus.com
              <br />
              Password: lea123
            </div>
          </div>

          {/* Quick Access Demo Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              disabled={loading}
              onClick={() => demoLogin("admin@rexus.com", "admin")}
              className="py-2 px-3 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-yellow-400 ring-1 ring-yellow-400/70 hover:ring-2 focus:ring-2 ring-offset-1 ring-offset-yellow-50 shadow transition disabled:opacity-60"
            >
              Admin Portal
            </button>
            <button
              disabled={loading}
              onClick={() => demoLogin("prosecutor@rexus.com", "prosecutor")}
              className="py-2 px-3 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-yellow-400 ring-1 ring-yellow-400/70 hover:ring-2 focus:ring-2 ring-offset-1 ring-offset-yellow-50 shadow transition disabled:opacity-60"
            >
              Prosecutor Portal
            </button>
            <button
              disabled={loading}
              onClick={() => demoLogin("defense@rexus.com", "defense")}
              className="py-2 px-3 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-yellow-400 ring-1 ring-yellow-400/70 hover:ring-2 focus:ring-2 ring-offset-1 ring-offset-yellow-50 shadow transition disabled:opacity-60"
            >
              Defense Portal
            </button>
            <button
              disabled={loading}
              onClick={() => demoLogin("lea@rexus.com", "lea")}
              className="py-2 px-3 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-yellow-400 ring-1 ring-yellow-400/70 hover:ring-2 focus:ring-2 ring-offset-1 ring-offset-yellow-50 shadow transition disabled:opacity-60"
            >
              LEA Portal
            </button>
          </div>

          {/* Public Portal button */}
          <div className="text-center">
            <button
              onClick={() => nav("/public")}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Go to Public Portal
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Rexus Group — Digital Evidence Management Platform
        </div>
      </div>
    </div>
  );
}
