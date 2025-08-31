import React from "react";
import { Upload } from "lucide-react";

export default function BulkUpload() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="text-blue-600" /> Bulk Upload
        <span className="ml-2 badge phase2">Phase II – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Drag & Drop" description="Batch upload multiple evidence files at once." />
        <FeatureCard key={1} title="Metadata Mapping" description="CSV/JSON sidecar mapping for bulk evidence." />
        <FeatureCard key={2} title="Background Jobs" description="Uploads processed with email/SMS alerts." />
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}
