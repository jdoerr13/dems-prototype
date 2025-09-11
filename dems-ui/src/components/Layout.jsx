// src/components/Layout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCases } from "../contexts/CaseContext";
import rexusLogo from "../assets/rexus_logo.png"; // ✅ adjust path if needed

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { notifications, markAllRead } = useCases();
  const nav = useNavigate();
  const role = user?.role;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl relative">
        {/* Branding */}
        <div className="p-6 border-b border-gray-800 flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src={rexusLogo}
            alt="Rexus Logo"
            className="h-14 w-auto mb-3 drop-shadow-sm"
          />

          {/* Wordmark */}
          <h1 className="flex items-center gap-1 text-2xl font-extrabold uppercase tracking-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              REXUS
            </span>
            <span className="text-gray-200 font-light tracking-widest">
              EVIDENT
            </span>
            <sup className="text-[10px] text-gray-400 font-semibold">™</sup>
          </h1>

          {/* Tagline */}
          <p className="mt-1 text-xs text-gray-400 font-medium">
            Digital Evidence Management
          </p>
        </div>

        {/* Notification Bell */}
        <div className="absolute top-4 right-4" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="relative">
            <span className="text-xl">🔔</span>
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {open && (
            <div className="absolute top-8 left-0 w-72 bg-white text-gray-800 rounded shadow-lg border max-h-80 overflow-y-auto z-50">
              <div className="flex justify-between items-center p-3 font-semibold border-b bg-gray-50">
                Notifications
                <button
                  onClick={() => markAllRead()}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              {notifications.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">
                  No new notifications
                </div>
              ) : (
                <ul className="text-sm">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`px-3 py-2 border-b last:border-b-0 ${
                        n.read ? "text-gray-400" : "font-medium"
                      }`}
                    >
                      {n.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 mt-4">
          {role === "lea" && (
            <Section title="Law Enforcement">
              <NavLink to="/lea/dashboard">📊 Dashboard</NavLink>
              <NavLink to="/lea">🚓 LEA Portal</NavLink>
              <NavLink to="/chain">🔗 Chain of Custody</NavLink>
              <NavLink to="/bulkupload">📦 Bulk Upload</NavLink>
            </Section>
          )}

          {role === "prosecutor" && (
            <Section title="Prosecutor">
              <NavLink to="/prosecutor/dashboard">📊 Dashboard</NavLink>
              <NavLink to="/prosecutor">⚖️ Prosecutor Portal</NavLink>
              <NavLink to="/codefendants">👥 Co-Defendants</NavLink>
              <NavLink to="/delegation">🧑‍🤝‍🧑 Defense Delegation</NavLink>
              <NavLink to="/redaction">✂️ Redaction Tools</NavLink>
              <NavLink to="/analytics">📈 Analytics</NavLink>
            </Section>
          )}

          {role === "defense" && (
            <Section title="Defense">
              <NavLink to="/defense/dashboard">📊 Dashboard</NavLink>
              <NavLink to="/defense">🛡️ Defense Portal</NavLink>
              <NavLink to="/delegation">👥 Delegation</NavLink>
              <NavLink to="/transparency-internal">📜 Transparency Logs</NavLink>
            </Section>
          )}

          {role === "admin" && (
            <Section title="Admin">
              <NavLink to="/admin/dashboard">📊 Dashboard</NavLink>
              <NavLink to="/admin">🔧 Admin Console</NavLink>
              <NavLink to="/users">👤 User Management</NavLink>
              <NavLink to="/advanced-audit">📑 Advanced Audit</NavLink>
              <NavLink to="/transparency-internal">📜 Transparency Logs</NavLink>
              <NavLink to="/analytics">📈 Analytics</NavLink>
              <NavLink to="/cross-agency">🌐 Cross-Agency</NavLink>
              <NavLink to="/archival">🗄️ Archival</NavLink>
            </Section>
          )}

          {!role && (
            <Section title="Public Access">
              <NavLink to="/public">🌍 Public Portal</NavLink>
              <NavLink to="/transparency">📜 Transparency Logs</NavLink>
            </Section>
          )}
        </nav>

        {/* Auth */}
        <div className="p-4 border-t border-gray-800">
          {user ? (
            <button
              className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              Logout ({user.role})
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
    >
      {children}
    </Link>
  );
}
