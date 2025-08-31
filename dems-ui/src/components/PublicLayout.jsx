import React from "react";
import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          DEMS Public
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link to="/public" className="block px-3 py-2 rounded hover:bg-gray-700">
            🌍 Public Portal
          </Link>
          <Link to="/transparency" className="block px-3 py-2 rounded hover:bg-gray-700">
            📜 Transparency Logs
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
