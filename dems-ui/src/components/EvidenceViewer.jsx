// src/components/EvidenceViewer.jsx
import React from "react";

export default function EvidenceViewer({ item }) {
  if (!item) return null;

  const renderPreview = () => {
    if (item.type?.startsWith("video")) {
      return (
        <video
          controls
          className="w-full rounded"
          src={item.url}
          style={{ maxHeight: "400px" }}
        />
      );
    }
    if (item.type?.startsWith("image")) {
      return (
        <img
          alt={item.filename}
          src={item.url}
          className="max-h-96 rounded border"
        />
      );
    }
    if (item.type?.includes("pdf")) {
      return (
        <iframe
          title={item.filename}
          src={item.url}
          className="w-full h-96 border rounded"
        />
      );
    }
    return (
      <div className="p-4 bg-gray-50 rounded border">
        <p className="text-sm text-gray-600">
          No preview available for this file type.
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{item.filename}</h3>

      {renderPreview()}

      {/* Show AI tags if available */}
      {item.aiTags && item.aiTags.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            AI Detected Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.aiTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* File metadata */}
      <div className="text-xs text-gray-500 mt-2">
        <p>Type: {item.type}</p>
        {item.size && <p>Size: {(item.size / 1024 / 1024).toFixed(2)} MB</p>}
        <p>Uploaded By: {item.uploadedBy}</p>
      </div>
    </div>
  );
}
