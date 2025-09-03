// components/DiscoveryExport.jsx
import React from "react";
import { useCases } from "../contexts/CaseContext";
import { saveAs } from "file-saver";

export default function DiscoveryExport({ caseId }) {
  const { evidence } = useCases();
  const items = evidence.filter(ev => ev.caseId === caseId);

  const exportCSV = () => {
    const header = "id,filename,type,uploadedBy\n";
    const rows = items.map(i => `${i.id},${i.filename},${i.type},${i.uploadedBy}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${caseId}_discovery.csv`);
  };

  return (
    <button
      onClick={exportCSV}
      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
    >
      Export Discovery Packet
    </button>
  );
}
