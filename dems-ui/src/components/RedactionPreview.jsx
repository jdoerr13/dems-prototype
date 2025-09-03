// components/RedactionPreview.jsx
import React from "react";

export default function RedactionPreview({ item }) {
  if (!item) return null;
  return (
    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <h3 className="font-semibold mb-2">AI Redacted Preview</h3>
      {item.type?.startsWith("video") ? (
        <div className="relative">
          <video src={item.url} controls className="w-full rounded" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
            Faces Blurred (Mock)
          </div>
        </div>
      ) : (
        <div className="p-6 border rounded bg-white">
          <p>No redaction required for this file type.</p>
        </div>
      )}
    </div>
  );
}
