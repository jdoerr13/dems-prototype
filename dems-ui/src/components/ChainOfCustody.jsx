// components/ChainOfCustody.jsx
import React from "react";
import { useCases } from "../contexts/CaseContext";

export default function ChainOfCustody({ caseId }) {
  const { audits } = useCases();
  const chain = audits.filter(a => a.targetId === caseId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-4">
      <h3 className="font-semibold mb-3">Chain of Custody</h3>
      {chain.length === 0 ? (
        <p className="text-gray-500 text-sm">No custody events logged.</p>
      ) : (
        <ul className="divide-y text-sm">
          {chain.map(ev => (
            <li key={ev.id} className="py-2">
              <span className="font-medium">{ev.actor}</span> — {ev.action}
              <span className="float-right text-xs text-gray-400">
                {new Date(ev.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
