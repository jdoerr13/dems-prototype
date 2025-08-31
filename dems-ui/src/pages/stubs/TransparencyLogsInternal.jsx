import React from "react";

export default function TransparencyLogsInternal() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Internal Transparency Logs
        </h2>
        <p className="text-gray-600 mb-4">
          Role-based view for Admins and Defense: shows disclosures,
          audit history, and access events related to cases.
        </p>
        <span className="px-3 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-700">
          Phase II – Restricted
        </span>
      </div>
    </section>
  );
}
