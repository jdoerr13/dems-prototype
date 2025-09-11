// src/pages/AdvancedAudit.jsx
import React, { useState } from "react";
import { ShieldCheck, Filter, Search, Download } from "lucide-react";

export default function AdvancedAudit() {
  const [query, setQuery] = useState("");

  // Mock advanced audit events
  const events = [
    {
      id: "AA-1001",
      timestamp: "2025-09-01 10:15:00",
      actor: "lea@metro.gov",
      action: "CHAIN_OF_CUSTODY",
      details: "Bodycam footage logged into secure evidence locker",
    },
    {
      id: "AA-1002",
      timestamp: "2025-09-02 14:22:00",
      actor: "prosecutor@justice.org",
      action: "VIEW_REDACTED",
      details: "Redacted discovery packet opened (3 items hidden)",
    },
    {
      id: "AA-1003",
      timestamp: "2025-09-03 09:41:00",
      actor: "defense@lawfirm.com",
      action: "FAILED_LOGIN",
      details: "Invalid MFA attempt — account locked for 30 mins",
    },
  ];

  // Filter events (basic mock search)
  const filtered = events.filter(
    (e) =>
      e.actor.toLowerCase().includes(query.toLowerCase()) ||
      e.action.toLowerCase().includes(query.toLowerCase()) ||
      e.details.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Advanced Audit</h2>
          <p className="text-gray-600">
            Deeper chain-of-custody and compliance reports with redaction,
            MFA, and login event tracking.
            {/* <span className="ml-2 font-semibold">Phase III – Future</span> */}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Phase III – Custom Feature
        </span>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search audits (actor, action, details)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-2 bg-gray-100 text-gray-400 rounded flex items-center gap-1 text-sm cursor-not-allowed"
          >
            <Filter className="w-4 h-4" /> Advanced Filters (Planned)
          </button>
          <button
            disabled
            className="px-3 py-2 bg-gray-100 text-gray-400 rounded flex items-center gap-1 text-sm cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Audit Events 
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Event ID</th>
                <th className="px-4 py-2 font-medium">Timestamp</th>
                <th className="px-4 py-2 font-medium">Actor</th>
                <th className="px-4 py-2 font-medium">Action</th>
                <th className="px-4 py-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No audit events found
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{e.id}</td>
                    <td className="px-4 py-2">{e.timestamp}</td>
                    <td className="px-4 py-2">{e.actor}</td>
                    <td className="px-4 py-2 font-semibold">{e.action}</td>
                    <td className="px-4 py-2">{e.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
