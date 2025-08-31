import React from "react";

export default function EvidenceViewer({ item }) {
  if (!item) {
    return <p className="text-gray-500 italic">No evidence selected.</p>;
  }

  const { filename, type, url } = item;

  // --- Video Preview ---
  if (type?.startsWith("video")) {
    return (
      <div>
        <video
          controls
          className="w-full max-h-[500px] rounded shadow"
          src={url}
        />
        <p className="mt-2 text-sm text-gray-600">{filename}</p>
      </div>
    );
  }

  // --- Image Preview ---
  if (type?.startsWith("image")) {
    return (
      <div>
        <img
          src={url}
          alt={filename}
          className="max-h-[500px] rounded shadow mx-auto"
        />
        <p className="mt-2 text-sm text-gray-600">{filename}</p>
      </div>
    );
  }

  // --- PDF Preview ---
  if (type === "application/pdf") {
    return (
      <div>
        <iframe
          src={url}
          title={filename}
          className="w-full h-[600px] border rounded"
        />
        <p className="mt-2 text-sm text-gray-600">{filename}</p>
      </div>
    );
  }

  // --- DOCX / Word files ---
  if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <div className="p-6 border rounded bg-gray-50 text-center">
        <p className="mb-3 text-sm text-gray-700">
          Word document preview is not available in-browser.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          Download {filename}
        </a>
      </div>
    );
  }

  // --- Plain text ---
  if (type?.startsWith("text")) {
    return (
      <div className="bg-gray-100 border rounded p-4 overflow-y-auto max-h-[500px] text-sm">
        <iframe
          src={url}
          title={filename}
          className="w-full h-[400px] bg-white"
        />
        <p className="mt-2 text-sm text-gray-600">{filename}</p>
      </div>
    );
  }

  // --- Fallback ---
  return (
    <div className="p-6 border rounded bg-gray-50 text-center">
      <p className="mb-3 text-sm text-gray-700">
        Preview not available for this file type.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
      >
        Download {filename}
      </a>
    </div>
  );
}
