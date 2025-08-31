import React from "react";

const logs = [
  { id: 1, actor: "Admin User", action: "Reset password for prosecutor@county.gov", ts: "2025-08-25 08:45" },
  { id: 2, actor: "System", action: "Daily backup completed", ts: "2025-08-25 02:00" },
  { id: 3, actor: "Auditor", action: "Exported monthly activity log", ts: "2025-08-24 16:30" },
];

export default function AdvancedAudit() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Audit & Reporting</h1>
        <p className="text-gray-600">
          Filter, search, and export system activity logs for compliance.
        </p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase II – Roadmap
        </span>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Actor</th>
              <th className="text-left px-3 py-2">Action</th>
              <th className="text-left px-3 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-t">
                <td className="px-3 py-2">{log.actor}</td>
                <td className="px-3 py-2">{log.action}</td>
                <td className="px-3 py-2 text-gray-500">{log.ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
