import React, { useState } from "react";
import { useCases } from "../contexts/CaseContext";
import { EvidenceAPI } from "../api";

export default function EvidenceUpload({ caseId, uploadedBy }) {
  const { addEvidence } = useCases();
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    try {
      // Stubbed backend call (replace with real API later)
      await EvidenceAPI.upload({ file, caseId });
      const ev = {
        id: "ev-" + Date.now(),
        caseId,
        filename: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        uploadedBy,
        url: URL.createObjectURL(file),
      };
      addEvidence(ev);
      setFile(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-md p-6 mt-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
        <span className="text-xs text-gray-500">
          Demo: local blob URLs, real system: S3 multipart uploads
        </span>
      </div>

      <input
        type="file"
        className="block w-full text-sm text-gray-600 border rounded-lg p-2 mb-4 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        type="submit"
        disabled={!file || busy}
        className={`w-full py-2 px-4 rounded font-semibold text-white transition ${
          !file || busy
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {busy ? "Uploading…" : "Upload Evidence"}
      </button>
    </form>
  );
}
