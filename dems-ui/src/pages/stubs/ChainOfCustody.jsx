// pages/stubs/ChainOfCustody.jsx
import React from "react";
import { useCases } from "../../contexts/CaseContext";
import { ShieldCheck, Clock, FileText, Download } from "lucide-react";

// 🔹 Generate mock events per case
const mockEvents = (caseId) => [
  {
    ts: "2025-08-29 10:05",
    actor: "lea@metro.gov",
    action: "UPLOAD_EVIDENCE",
    details: `Initial evidence uploaded for ${caseId}`,
  },
  {
    ts: "2025-08-29 10:20",
    actor: "prosecutor@justice.org",
    action: "VIEW_DISCOVERY",
    details: `Prosecutor accessed ${caseId}`,
  },
  {
    ts: "2025-08-29 11:15",
    actor: "defense@lawfirm.com",
    action: "DOWNLOAD_EVIDENCE",
    details: `Defense counsel downloaded case files`,
  },
];

export default function ChainOfCustodyPage() {
  const { cases } = useCases();

  // Feature highlights like competitor decks
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Tamper-Proof Logs",
      desc: "Immutable blockchain-backed record of evidence handling.",
    },
    {
      icon: Clock,
      title: "Chronological View",
      desc: "Every access, transfer, and redaction recorded in real time.",
    },
    {
      icon: FileText,
      title: "Courtroom Export",
      desc: "Generate signed PDF/CSV for admissibility at trial.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chain of Custody</h1>
          <p className="text-gray-600">
            Trace evidence handling end-to-end with secure logs.
            <span className="ml-2 font-semibold">Phase II – Planned</span>
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
          Future Feature
        </span>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition"
          >
            <h.icon className="w-6 h-6 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-800">{h.title}</h3>
            <p className="text-sm text-gray-600 mt-1 flex-1">{h.desc}</p>
            <button
              disabled
              className="mt-4 px-3 py-1 rounded bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>

      {/* Evidence audit trails */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Evidence Audit Trails (Mock Data)
        </h2>
        {cases.slice(0, 3).map((c) => (
          <div
            key={c.caseId}
            className="mb-8 border rounded-lg overflow-hidden shadow-sm"
          >
            <div className="flex justify-between items-center bg-gray-50 px-4 py-2">
              <h3 className="font-semibold text-gray-800">
                {c.caseId} — {c.title}
              </h3>
              <button
                disabled
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-400 text-xs rounded cursor-not-allowed"
              >
                <Download className="w-3 h-3" /> Export Log
              </button>
            </div>
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 font-medium">Timestamp</th>
                  <th className="px-4 py-2 font-medium">Actor</th>
                  <th className="px-4 py-2 font-medium">Action</th>
                  <th className="px-4 py-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {mockEvents(c.caseId).map((ev, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{ev.ts}</td>
                    <td className="px-4 py-2">{ev.actor}</td>
                    <td className="px-4 py-2">{ev.action}</td>
                    <td className="px-4 py-2">{ev.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
