// import React from "react";

// export default function Redaction() {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-8 space-y-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Redaction Tools</h1>
//         <p className="text-gray-600">
//           Preview and redact sensitive video, audio, or documents.
//         </p>
//         <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-pink-100 text-pink-700">
//           Phase III – Stub
//         </span>
//       </div>

//       {/* Video Placeholder */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="font-semibold mb-3">Sample Video</h2>
//         <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500 rounded">
//           Video Placeholder
//         </div>
//         <button className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded font-semibold">
//           Apply Redaction
//         </button>
//       </div>
//     </section>
//   );
// }

// pages/stubs/Redaction.jsx
import React, { useState } from "react";
import { useCases } from "../../contexts/CaseContext";
import RedactionPreview from "../../components/RedactionPreview";

export default function RedactionPage() {
  const { evidence } = useCases();
  const [active, setActive] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Redaction Tools</h1>
      <p className="mb-6 text-gray-600">AI-powered mock redaction preview.</p>

      <ul className="divide-y text-sm">
        {evidence.slice(0, 10).map(ev => (
          <li key={ev.id} className="py-2 flex justify-between items-center">
            <span>{ev.filename}</span>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
              onClick={() => setActive(ev)}
            >
              Preview
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div className="mt-6">
          <RedactionPreview item={active} />
          <button
            className="mt-3 px-3 py-1 bg-gray-600 text-white rounded text-xs"
            onClick={() => setActive(null)}
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
