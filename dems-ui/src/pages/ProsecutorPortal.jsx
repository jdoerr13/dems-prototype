import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCases } from "../contexts/CaseContext";
import EvidenceViewer from "../components/EvidenceViewer";
import toast from "react-hot-toast";

export default function ProsecutorPortal() {
  const { user } = useAuth();
  const { cases, evidence, acceptCase, linkCoDefendant, assignDefense } = useCases();

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mt-2">
        <a href="/prosecutor/dashboard" className="text-sm text-blue-600 hover:underline font-semibold">
          View Dashboard
        </a>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Prosecutor Case Management</h2>
        <p className="text-gray-600">
          Review submissions, accept cases, manage discovery and co-defendants.
        </p>
        <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
      </div>

      {/* Submitted Cases */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Submitted Cases</h3>
        {cases.length === 0 ? (
          <p className="text-gray-500 text-sm">No cases submitted yet.</p>
        ) : (
          <table className="min-w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-4 py-2 text-left">Case</th>
                <th className="px-4 py-2 text-left">Officer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cases.map((cs) => (
                <tr key={cs.caseId}>
                  <td className="px-4 py-2">{cs.caseId} — {cs.title}</td>
                  <td className="px-4 py-2">{cs.officerName} ({cs.officerBadge})</td>
                  <td className="px-4 py-2">{cs.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    {cs.status !== "Accepted" && (
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
                        onClick={() => {
                          acceptCase(cs.caseId, user.email);
                          toast.success(`⚖️ Case ${cs.caseId} accepted`);
                        }}
                      >
                        Accept
                      </button>
                    )}
                    <button
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                      onClick={() => {
                        const linked = prompt("Link co-defendant caseId:");
                        if (linked) {
                          linkCoDefendant(cs.caseId, linked);
                          toast(`🔗 Linked ${cs.caseId} to ${linked}`);
                        }
                      }}
                    >
                      Link Co-Defendant
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                      onClick={() => {
                        const email = prompt("Assign defense email:");
                        if (email) {
                          assignDefense(cs.caseId, email);
                          toast(`🛡️ Defense assigned to ${email}`);
                        }
                      }}
                    >
                      Assign Defense
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Discovery */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Discovery (Evidence by Case)</h3>
        {cases.map((cs) => (
          <details key={cs.caseId} className="border rounded-lg mb-3 p-3 bg-gray-50">
            <summary className="font-medium text-gray-800">{cs.caseId} — {cs.title}</summary>
            {evidence.filter((ev) => ev.caseId === cs.caseId).length === 0 ? (
              <p className="italic text-gray-400">No evidence uploaded.</p>
            ) : (
              evidence.filter((ev) => ev.caseId === cs.caseId).map((ev) => (
                <div key={ev.id} className="mt-2">
                  <EvidenceViewer item={ev} />
                </div>
              ))
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
