// src/pages/DefensePortal.jsx
import React, { useMemo, useState } from "react";
import { useCases } from "../contexts/CaseContext";
import EvidenceViewer from "../components/EvidenceViewer";

export default function DefensePortal() {
  const { cases, evidence } = useCases();
  const [activeItem, setActiveItem] = useState(null);

  // Only cases assigned to defense
  const assigned = useMemo(() => cases.filter(c => c.defenseEmail), [cases]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Defense Discovery Portal</h2>
        <p className="text-gray-600">Secure access to discovery (read-only).</p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
      </div>

      {/* Assigned Cases */}
      {assigned.map((cs) => (
        <div key={cs.caseId} className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <strong className="text-gray-800">{cs.caseId}</strong>
            <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
              Assigned to {cs.defenseEmail}
            </span>
          </div>

          <ul className="space-y-2">
            {evidence
              .filter((ev) => ev.caseId === cs.caseId)
              .map((ev) => (
                <li key={ev.id} className="text-sm flex items-center gap-3">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold"
                    onClick={() => setActiveItem(ev)}
                  >
                    View
                  </button>
                  <span className="text-gray-700">{ev.filename}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Evidence Preview Modal/Pane */}
      {activeItem && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-3">
            <strong className="text-gray-800">Preview: {activeItem.filename}</strong>
            <button
              className="text-sm font-semibold text-red-600 hover:text-red-700"
              onClick={() => setActiveItem(null)}
            >
              Close
            </button>
          </div>
          <EvidenceViewer item={activeItem} />
        </div>
      )}
    </section>
  );
}
