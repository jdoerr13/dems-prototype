// src/pages/CoDefendantLinking.jsx
import React from "react";
import { Users } from "lucide-react";

export default function CoDefendantLinking() {
  // Mock linked cases
  const linkedCases = [
    {
      caseId: "C-2023",
      title: "State vs. Carter – Weapons Charge",
      coDefendants: ["C-2024"],
      date: "2025-08-18",
    },
    {
      caseId: "C-2024",
      title: "State vs. Carter (Co-Defendant)",
      coDefendants: ["C-2023"],
      date: "2025-08-18",
    },
  ];

  // Mock shared evidence
  const sharedEvidence = [
    {
      id: "ev-2023-2",
      filename: "dashcam_co_defendant.mp4",
      linkedCases: ["C-2023", "C-2024"],
    },
    {
      id: "ev-2024-1",
      filename: "witness_statement.pdf",
      linkedCases: ["C-2023", "C-2024"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
          <Users className="text-blue-600" /> Co-Defendant Linking
          <span className="ml-2 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
            Phase II – Planned
          </span>
        </h2>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Future Feature
        </span>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Link Cases"
          description="Relate multiple defendants to one incident."
        />
        <FeatureCard
          title="Shared Discovery"
          description="Share discovery while maintaining restrictions."
        />
        <FeatureCard
          title="Audit Trails"
          description="Track merges/splits across linked cases."
        />
      </div>

      {/* Linked Cases Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Linked Cases (Mock Data)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">Title</th>
                <th className="px-4 py-2 font-medium">Co-Defendants</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {linkedCases.map((c) => (
                <tr key={c.caseId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{c.caseId}</td>
                  <td className="px-4 py-2">{c.title}</td>
                  <td className="px-4 py-2">{c.coDefendants.join(", ")}</td>
                  <td className="px-4 py-2">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shared Evidence Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Shared Evidence (Mock Data)
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {sharedEvidence.map((ev) => (
            <li
              key={ev.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{ev.filename}</span>
              <span className="text-gray-500">
                Linked to {ev.linkedCases.join(" & ")}
              </span>
            </li>
          ))}
        </ul>
        <button
          disabled
          className="mt-4 px-4 py-2 bg-gray-100 text-gray-400 rounded text-sm cursor-not-allowed"
        >
          Manage Shared Evidence (Coming Soon)
        </button>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 flex-1 mt-2">{description}</p>
      <button
        disabled
        className="mt-4 px-3 py-1 rounded bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
      >
        Coming Soon
      </button>
    </div>
  );
}
