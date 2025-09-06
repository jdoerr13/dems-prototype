// src/hooks/useDashboardData.js
import { useMemo } from "react";
import { useCases } from "../contexts/CaseContext";
import {
  initialCases,
  initialEvidence,
  initialAudits,
  initialNotifications,
  initialAiTags,
} from "../mock/data";

export default function useDashboardData() {
  const {
    cases = [],
    evidence = [],
    audits = [],
    notifications = [],
  } = useCases();

  // ---------- COUNTS ----------
  const counts = useMemo(
    () => ({
      totalCases: cases.length,
      acceptedCases: cases.filter((c) => c.status === "Accepted").length,
      submittedCases: cases.filter((c) => c.status === "Submitted").length,
      rejectedCases: cases.filter((c) => c.status === "Rejected").length,
      evidenceItems: evidence.length,
      auditsCount: audits.length,
      notificationsCount: notifications.length,
      defenseAssigned: cases.filter((c) => !!c.defenseEmail).length,
    }),
    [cases, evidence, audits, notifications]
  );

  // ---------- CHART DATA ----------
  const charts = useMemo(() => {
    // Cases by status
    const casesByStatus = [
      { name: "Submitted", value: counts.submittedCases },
      { name: "Accepted", value: counts.acceptedCases },
      { name: "Rejected", value: counts.rejectedCases },
    ];

    // Evidence by type
    const evidenceByType = [
      {
        name: "Video",
        value: evidence.filter((ev) =>
          ev.type?.toLowerCase().startsWith("video")
        ).length,
      },
      {
        name: "Image",
        value: evidence.filter((ev) =>
          ev.type?.toLowerCase().startsWith("image")
        ).length,
      },
      {
        name: "Other",
        value: evidence.filter(
          (ev) =>
            ev.type &&
            !ev.type.toLowerCase().startsWith("video") &&
            !ev.type.toLowerCase().startsWith("image")
        ).length,
      },
    ];

    // Cases by agency
    const casesByAgencyMap = cases.reduce((acc, c) => {
      if (!c.agency) return acc;
      acc[c.agency] = acc[c.agency] || 0;
      acc[c.agency]++;
      return acc;
    }, {});
    const casesByAgency = Object.entries(casesByAgencyMap).map(
      ([name, value]) => ({ name, value })
    );

    // Recent audits
    const recentAudits = audits.slice(0, 5);

// AI Tags — use evidence tags if present, otherwise fall back to initialAiTags
const aiTagMap = {};
evidence.forEach((ev) => {
  (ev.aiTags || []).forEach((tag) => {
    aiTagMap[tag] = (aiTagMap[tag] || 0) + 1;
  });
});
let aiTags = Object.entries(aiTagMap).map(([name, value]) => ({
  name,
  value,
}));

if (aiTags.length === 0 && initialAiTags?.length) {
  aiTags = initialAiTags;
}

    return { casesByStatus, evidenceByType, casesByAgency, recentAudits, aiTags };
  }, [cases, evidence, audits, counts]);

  return { counts, charts, cases, evidence, audits, notifications };
}
