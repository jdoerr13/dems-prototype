import React from "react";

export default function AuditTrail({ audits, limit = 25 }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Audit Trail</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Actor</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">IP</th>
            </tr>
          </thead>
          <tbody>
            {audits.slice(0, limit).map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {new Date(a.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">{a.actor}</td>
                <td className="px-4 py-2">{a.action}</td>
                <td className="px-4 py-2">{String(a.targetId ?? "")}</td>
                <td className="px-4 py-2">{a.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
