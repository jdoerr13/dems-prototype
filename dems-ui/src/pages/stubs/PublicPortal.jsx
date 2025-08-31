import React from "react";

export default function PublicPortal() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Public Portal</h2>
        <p className="text-gray-600 mb-4">
          Public access to hearings, case notices, and non-sensitive records.
        </p>
        <span className="px-3 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
          Public Access
        </span>
      </div>
    </section>
  );
}
