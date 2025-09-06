import React, { useState, useMemo } from "react";
import { useCases } from "../contexts/CaseContext";
import AuditTrail from "../components/AuditTrail";
import { Bell, FileSpreadsheet, Gavel, Search, XCircle } from "lucide-react";

export default function AdminConsole() {
  const { cases, audits, notifications } = useCases();
  const [filterMode, setFilterMode] = useState("all");
  const [auditQuery, setAuditQuery] = useState("");

  // KPI values (fake scale for demo realism)
  const kpis = {
    totalCases: 18334,
    accepted: cases.filter((c) => c.status === "Accepted").length,
    rejected: cases.filter((c) => c.status === "Rejected").length,
    notifications: notifications.length,
  };

  // Audits filtered by mode + search
  const filteredAudits = useMemo(() => {
    let data = [...audits];

    if (filterMode === "accepted") {
      data = data.filter((a) => a.action === "ACCEPT_CASE");
    } else if (filterMode === "rejected") {
      data = data.filter((a) => a.action === "REJECT_CASE");
    }

    if (auditQuery) {
      const q = auditQuery.toLowerCase();
      data = data.filter(
        (a) =>
          (a.actor || "").toLowerCase().includes(q) ||
          (a.action || "").toLowerCase().includes(q) ||
          (a.targetId || "").toLowerCase().includes(q)
      );
    }

    return data;
  }, [audits, filterMode, auditQuery]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Console</h2>
          <p className="text-gray-600">Audit logs, notifications, and system metrics.</p>
          <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
            Phase I – Active
          </span>
        </div>
        <a
          href="/admin/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          View Dashboard
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cases"
          value={kpis.totalCases}
          subtitle="All submissions"
          color="bg-blue-600"
          icon={FileSpreadsheet}
          onClick={() => setFilterMode("all")}
          active={filterMode === "all"}
        />
        <StatCard
          title="Accepted"
          value={kpis.accepted}
          subtitle="Ready for trial"
          color="bg-green-600"
          icon={Gavel}
          onClick={() => setFilterMode("accepted")}
          active={filterMode === "accepted"}
        />
        <StatCard
          title="Rejected"
          value={kpis.rejected}
          subtitle="Dismissed"
          color="bg-red-600"
          icon={XCircle}
          onClick={() => setFilterMode("rejected")}
          active={filterMode === "rejected"}
        />
        <StatCard
          title="Notifications"
          value={kpis.notifications}
          subtitle="System alerts"
          color="bg-indigo-600"
          icon={Bell}
        />
      </div>

      {/* Notifications (always visible) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Notifications</h3>
        <ul className="divide-y divide-gray-200 text-sm text-gray-700 max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <li className="py-2 text-gray-400 italic">No notifications</li>
          ) : (
            notifications
              .slice()
              .sort((a, b) => b.ts - a.ts)
              .map((n) => (
                <li key={n.id} className="py-2 hover:bg-gray-50">
                  <span className="text-gray-500">
                    {new Date(n.ts).toLocaleString()}
                  </span>{" "}
                  — {n.message}
                </li>
              ))
          )}
        </ul>
      </div>

      {/* Audit Trail with search */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Audit Trail</h3>
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search audits (actor, action, target)..."
              value={auditQuery}
              onChange={(e) => setAuditQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <AuditTrail audits={filteredAudits} />

        {/* Fake Pagination */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 1833].map((p, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded text-sm ${
                  p === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={p === "..."}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, subtitle, color, icon: Icon, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg border-2 transition ${
        active ? "border-blue-500" : "border-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <h3 className="text-sm text-gray-600">{title}</h3>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className={`text-2xl font-bold text-white px-2 rounded ${color}`}>
          {value}
        </span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
}
