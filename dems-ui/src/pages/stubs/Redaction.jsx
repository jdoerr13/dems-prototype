import React from "react";

export default function Redaction() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Redaction Tools</h1>
        <p className="text-gray-600">
          Preview and redact sensitive video, audio, or documents.
        </p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-pink-100 text-pink-700">
          Phase III – Stub
        </span>
      </div>

      {/* Video Placeholder */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Sample Video</h2>
        <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500 rounded">
          Video Placeholder
        </div>
        <button className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded font-semibold">
          Apply Redaction
        </button>
      </div>
    </section>
  );
}
