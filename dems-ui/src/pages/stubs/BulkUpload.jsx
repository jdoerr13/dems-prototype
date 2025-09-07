// src/pages/stubs/BulkUpload.jsx
import React, { useState } from "react";
import { Upload, FileSpreadsheet, Server } from "lucide-react";

export default function BulkUpload() {
  const [files, setFiles] = useState([]);

  // Mock handler (disabled in demo)
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected.map((f) => ({ name: f.name, size: f.size })));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Upload className="text-blue-600" /> Bulk Upload
        </h2>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Phase II – Planned
        </span>
      </div>
      <p className="text-gray-600">
        Simulated bulk upload feature for Phase II — drag & drop, metadata mapping,
        and background processing.
      </p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Upload}
          title="Drag & Drop"
          description="Batch upload multiple evidence files at once."
        />
        <FeatureCard
          icon={FileSpreadsheet}
          title="Metadata Mapping"
          description="CSV/JSON sidecar mapping for bulk evidence ingest."
        />
        <FeatureCard
          icon={Server}
          title="Background Jobs"
          description="Uploads processed asynchronously with alerts."
        />
      </div>

      {/* Mock Upload Zone */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Upload Zone (Mock Demo)
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500 mb-4">
          <p className="mb-2">Drag & drop files here</p>
          <p className="text-xs text-gray-400">.mp4, .jpg, .pdf supported</p>
          <input
            type="file"
            multiple
            disabled
            onChange={handleFiles}
            className="hidden"
            id="bulk-upload-input"
          />
          <label
            htmlFor="bulk-upload-input"
            className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold cursor-not-allowed opacity-50"
          >
            Select Files (Disabled in Demo)
          </label>
        </div>

        {/* Mock progress */}
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((f, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm text-gray-700"
              >
                <span>{f.name}</span>
                <span className="text-xs text-gray-500">
                  {(f.size / 1024).toFixed(1)} KB
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sample CSV Mapping */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Sample CSV Mapping (Mock)
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Metadata sidecar maps uploaded files to case records:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">Filename</th>
                <th className="px-4 py-2 font-medium">Officer</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">C-2023</td>
                <td className="px-4 py-2">dashcam_1.mp4</td>
                <td className="px-4 py-2">Officer Kim</td>
                <td className="px-4 py-2">2025-08-18</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">C-2012</td>
                <td className="px-4 py-2">bank_records.pdf</td>
                <td className="px-4 py-2">Officer Lopez</td>
                <td className="px-4 py-2">2025-08-30</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">C-2001</td>
                <td className="px-4 py-2">bodycam_1.mp4</td>
                <td className="px-4 py-2">Officer Roe</td>
                <td className="px-4 py-2">2025-08-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
