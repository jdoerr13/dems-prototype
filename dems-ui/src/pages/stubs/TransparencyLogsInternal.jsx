// src/pages/TransparencyLogsInternal.jsx
import React, { useState, useMemo } from "react";
import { ShieldCheck, Eye, Download, Search } from "lucide-react";

export default function TransparencyLogsInternal() {
  const [filters, setFilters] = useState({ caseId: "", user: "", action: "" });

  // Mock access logs
  const accessLogs = [
    {
      id: "TL-1",
      caseId: "C-2001",
      user: "prosecutor@justice.org",
      action: "VIEW_EVIDENCE",
      target: "bodycam_1.mp4",
      ts: "2025-09-05T10:15:00Z",
    },
    {
      id: "TL-2",
      caseId: "C-2023",
      user: "defense9@lawfirm.com",
      action: "DOWNLOAD_EVIDENCE",
      target: "dashcam_co_defendant.mp4",
      ts: "2025-09-05T11:02:00Z",
    },
    {
      id: "TL-3",
      caseId: "C-2014",
      user: "admin@system.gov",
      action: "VIEW_DISCOVERY",
      target: "plea_agreement_draft.docx",
      ts: "2025-09-05T12:45:00Z",
    },
  ];

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return accessLogs.filter((log) => {
      return (
        (filters.caseId === "" ||
          log.caseId.toLowerCase().includes(filters.caseId.toLowerCase())) &&
        (filters.user === "" ||
          log.user.toLowerCase().includes(filters.user.toLowerCase())) &&
        (filters.action === "" ||
          log.action.toLowerCase().includes(filters.action.toLowerCase()))
      );
    });
  }, [accessLogs, filters]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Internal Transparency Logs
          </h2>
          <p className="text-gray-600">
            Restricted view for Admins & Defense Counsel. Tracks disclosures,
            evidence views, and downloads.
          </p>
          <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-700">
            Phase II – Restricted
          </span>
        </div>
        <ShieldCheck className="w-10 h-10 text-purple-600" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Case ID
          </label>
          <input
            type="text"
            value={filters.caseId}
            onChange={(e) => setFilters({ ...filters, caseId: e.target.value })}
            placeholder="e.g. C-2001"
            className="border rounded px-3 py-2 text-sm w-40"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            User
          </label>
          <input
            type="text"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            placeholder="e.g. defense@lawfirm.com"
            className="border rounded px-3 py-2 text-sm w-60"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Action
          </label>
          <input
            type="text"
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            placeholder="e.g. VIEW_EVIDENCE"
            className="border rounded px-3 py-2 text-sm w-48"
          />
        </div>
        <Search className="w-5 h-5 text-gray-400 ml-auto" />
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Access Events (Mock Data)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Timestamp</th>
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">User</th>
                <th className="px-4 py-2 font-medium">Action</th>
                <th className="px-4 py-2 font-medium">Target</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    No logs match filters
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {new Date(log.ts).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{log.caseId}</td>
                    <td className="px-4 py-2">{log.user}</td>
                    <td className="px-4 py-2 flex items-center gap-1">
                      {log.action === "VIEW_EVIDENCE" && (
                        <Eye className="w-4 h-4 text-blue-600" />
                      )}
                      {log.action === "DOWNLOAD_EVIDENCE" && (
                        <Download className="w-4 h-4 text-green-600" />
                      )}
                      {log.action.replace("_", " ")}
                    </td>
                    <td className="px-4 py-2">{log.target}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Fake Pagination */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm disabled:opacity-50"
            disabled={true}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 12].map((p, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded text-sm ${
                  p === 1
                    ? "bg-purple-600 text-white"
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
