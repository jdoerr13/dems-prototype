// import React from "react";
// import { Share2 } from "lucide-react";

// export default function CrossAgencyCollaboration() {
//   return (
//     <section>
//       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//         <Share2 className="text-orange-600" /> Cross-Agency Collaboration
//         <span className="ml-2 badge phase3">Phase III – Stub</span>
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FeatureCard key={0} title="Agency Invites" description="Securely invite other agencies with scoped access." />
//         <FeatureCard key={1} title="Shared Vaults" description="Shared evidence repositories with permissions." />
//         <FeatureCard key={2} title="Reciprocal Audits" description="Full audit trail for external collaboration." />
//       </div>
//     </section>
//   );
// }

// function FeatureCard({ title, description }) {
//   return (
//     <div className="bg-white rounded-lg border p-4 shadow-sm">
//       <h3 className="font-semibold">{title}</h3>
//       <p className="text-sm text-gray-600 mt-1">{description}</p>
//     </div>
//   );
// }

// pages/stubs/CrossAgency.jsx
import React, { useState } from "react";
import { useCases } from "../../contexts/CaseContext";

export default function CrossAgencyPage() {
  const { cases, notify } = useCases();
  const [agency, setAgency] = useState("");

  const inviteAgency = () => {
    if (!agency) return;
    notify(`Invited ${agency} to collaborate on shared cases.`);
    setAgency("");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Cross-Agency Sharing</h1>
      <p className="mb-6 text-gray-600">Invite other agencies for collaboration (mock).</p>

      <input
        className="border rounded px-3 py-2 text-sm w-2/3"
        value={agency}
        onChange={(e) => setAgency(e.target.value)}
        placeholder="Enter Agency Name"
      />
      <button
        onClick={inviteAgency}
        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded text-sm"
      >
        Invite
      </button>

      <div className="mt-6">
        <h2 className="font-semibold">Recent Cases (shared view)</h2>
        <ul className="divide-y text-sm">
          {cases.slice(0, 5).map(c => (
            <li key={c.caseId} className="py-2">
              {c.caseId} — {c.title} ({c.agency})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
