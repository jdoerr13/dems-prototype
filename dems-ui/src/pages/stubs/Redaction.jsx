// src/pages/stubs/Redaction.jsx
import React, { useState } from "react";
import { useCases } from "../../contexts/CaseContext";
import { Eye, Shield, Wand2 } from "lucide-react";
import RedactionPreview from "../../components/RedactionPreview";

export default function RedactionPage() {
  const { evidence } = useCases();
  const [active, setActive] = useState(null);

  // Only show first 8–10 evidence items for demo
  const demoEvidence = evidence.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Redaction Tools</h1>
          <p className="text-gray-600">
            AI-powered redaction preview (mock demo only).
            <span className="ml-2 font-semibold">Phase II – Planned</span>
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Future Feature
        </span>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Wand2}
          title="Auto-Detection"
          description="Automatically detect faces, plates, and sensitive regions."
        />
        <FeatureCard
          icon={Eye}
          title="Preview Controls"
          description="Toggle redactions on/off before exporting discovery."
        />
        <FeatureCard
          icon={Shield}
          title="Compliance Ready"
          description="Meet CJIS, HIPAA, and courtroom admissibility standards."
        />
      </div>

      {/* Evidence list */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Evidence Items (Mock)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Filename</th>
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {demoEvidence.map((ev) => (
                <tr
                  key={ev.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{ev.filename}</td>
                  <td className="px-4 py-2">{ev.caseId}</td>
                  <td className="px-4 py-2">{ev.type}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      onClick={() => setActive(ev)}
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redaction Preview */}
      {active && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">
              Redaction Preview — {active.filename}
            </h3>
            <button
              className="text-sm font-semibold text-red-600 hover:text-red-700"
              onClick={() => setActive(null)}
            >
              Close
            </button>
          </div>
          <RedactionPreview item={active} />
          <p className="mt-3 text-sm text-gray-500 italic">
            Mock auto-detected regions: faces, license plates, documents.
          </p>
        </div>
      )}
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 flex-1">{description}</p>
      <button
        disabled
        className="mt-4 px-3 py-1 rounded bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
      >
        Coming Soon
      </button>
    </div>
  );
}
