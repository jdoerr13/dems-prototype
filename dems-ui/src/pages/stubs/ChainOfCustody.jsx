import React from "react";

const mockChain = [
  { id: 1, item: "Bodycam Video", actor: "Officer Smith", action: "Uploaded", ts: "2025-08-25 10:00" },
  { id: 2, item: "Scene Photo", actor: "Evidence Tech Roe", action: "Reviewed", ts: "2025-08-25 10:30" },
  { id: 3, item: "Lab Report", actor: "Forensics Lab", action: "Attached", ts: "2025-08-26 09:15" },
];

export default function ChainOfCustody() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Chain of Custody</h1>
        <p className="text-gray-600">
          Track evidence lifecycle with full audit logs and custody records.
        </p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase II – Roadmap
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Item</th>
              <th className="text-left px-3 py-2">Actor</th>
              <th className="text-left px-3 py-2">Action</th>
              <th className="text-left px-3 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {mockChain.map(ev => (
              <tr key={ev.id} className="border-t">
                <td className="px-3 py-2">{ev.item}</td>
                <td className="px-3 py-2">{ev.actor}</td>
                <td className="px-3 py-2">{ev.action}</td>
                <td className="px-3 py-2 text-gray-500">{ev.ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
