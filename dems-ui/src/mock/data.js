// data.js

// -------------------------------------------------------------------
// USERS
// -------------------------------------------------------------------
export const users = [
  { email: "lea@metro.gov", role: "lea" },
  { email: "prosecutor@justice.org", role: "prosecutor" },
  { email: "defense@lawfirm.com", role: "defense" },
  { email: "admin@system.gov", role: "admin" },
];

// -------------------------------------------------------------------
// BASE CASES
// -------------------------------------------------------------------
const baseCases = [
  {
    caseId: "C-2001",
    title: "State vs. Doe",
    officerName: "Officer Jane Roe",
    officerBadge: "A1234",
    incidentDate: "2025-08-20",
    agency: "Metro Police Department",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: "defense@lawfirm.com",
    coDefendants: ["C-2002"],
  },
  {
    caseId: "C-2002",
    title: "State vs. Doe (Co-Defendant)",
    officerName: "Officer Jane Roe",
    officerBadge: "A1234",
    incidentDate: "2025-08-20",
    agency: "Metro Police Department",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: null,
    coDefendants: ["C-2001"],
  },
  { caseId: "C-1001", title: "Burglary Downtown", status: "Submitted", officerName: "Officer Smith", officerBadge: "1234", agency: "Central City PD", defenseEmail: null },
  { caseId: "C-1002", title: "Traffic Stop DUI", status: "Accepted", officerName: "Officer Johnson", officerBadge: "5678", agency: "County Sheriff’s Office", defenseEmail: "defense1@lawfirm.com" },
  { caseId: "C-1003", title: "Domestic Disturbance", status: "Submitted", officerName: "Officer Lee", officerBadge: "1111", agency: "Westside Police Department", defenseEmail: null },
  { caseId: "C-1004", title: "Armed Robbery", status: "Accepted", officerName: "Officer Patel", officerBadge: "2222", agency: "Highway Patrol Unit", defenseEmail: "defense2@lawfirm.com" },
  { caseId: "C-1005", title: "Fraudulent Checks", status: "Rejected", officerName: "Officer Kim", officerBadge: "3333", agency: "Downtown Precinct", defenseEmail: null },
  { caseId: "C-1006", title: "Vandalism at Park", status: "Submitted", officerName: "Officer Rivera", officerBadge: "4444", agency: "Central City PD", defenseEmail: null },
  { caseId: "C-1007", title: "Homicide Investigation", status: "Accepted", officerName: "Officer Green", officerBadge: "5555", agency: "State Bureau of Investigation", defenseEmail: "defense3@lawfirm.com" },
  { caseId: "C-1008", title: "Cybercrime Ring", status: "Submitted", officerName: "Officer Daniels", officerBadge: "6666", agency: "Cybercrime Task Force", defenseEmail: null },
  { caseId: "C-1009", title: "Drug Trafficking", status: "Accepted", officerName: "Officer Carter", officerBadge: "7777", agency: "Narcotics Division", defenseEmail: "defense4@lawfirm.com" },
  { caseId: "C-1010", title: "Assault Downtown Bar", status: "Submitted", officerName: "Officer Nguyen", officerBadge: "8888", agency: "Eastside Police Department", defenseEmail: null },
];

// -------------------------------------------------------------------
// GENERATED CASES
// -------------------------------------------------------------------
const generateCases = () => {
  const agencies = [
    "Central City PD",
    "Metro Police Department",
    "County Sheriff’s Office",
    "State Bureau of Investigation",
    "Cybercrime Task Force",
    "Narcotics Division",
    "Westside Police Department",
    "Eastside Police Department",
    "Highway Patrol Unit",
    "Downtown Precinct",
  ];
  const statuses = ["Submitted", "Accepted", "Rejected"];
  const cases = [];

  for (let i = 11; i <= 50; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    cases.push({
      caseId: `C-${1010 + i}`,
      title: `Demo Case ${i}`,
      officerName: `Officer ${["Smith","Lee","Nguyen","Patel","Rivera"][i % 5]}`,
      officerBadge: `${2000 + i}`,
      incidentDate: `2025-08-${(i % 28) + 1}`,
      agency: agencies[i % agencies.length],
      createdBy: "lea@metro.gov",
      status,
      prosecutorEmail: status === "Accepted" ? "prosecutor@justice.org" : null,
      defenseEmail: status === "Accepted" ? `defense${i}@lawfirm.com` : null,
      coDefendants: [],
    });
  }

  return cases;
};

export const initialCases = [...baseCases, ...generateCases()];

// -------------------------------------------------------------------
// HELPER: AI Tags Generator
// -------------------------------------------------------------------
const aiTagsPool = [
  "weapon", "vehicle", "timestamp", "face", "license plate",
  "street sign", "cash", "firearm", "alcohol", "drug paraphernalia",
  "suspect", "victim", "document", "evidence bag", "location marker"
];

function randomTags() {
  const shuffled = aiTagsPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2); // 2–4 tags
}

// -------------------------------------------------------------------
// EVIDENCE
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// EVIDENCE
// -------------------------------------------------------------------
export const initialEvidence = [
  {
    id: "ev-1",
    caseId: "C-2001",
    filename: "bodycam_1.mp4",
    type: "video/mp4",
    size: 250_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    aiTags: ["face", "timestamp", "vehicle"],
  },
  {
    id: "ev-2",
    caseId: "C-2001",
    filename: "scene_photo.jpg",
    type: "image/jpeg",
    size: 2_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://images.unsplash.com/photo-1528372444006-1bfc81acab02?q=80&w=1200&auto=format&fit=crop",
    aiTags: ["weapon", "suspect", "street sign"],
  },
  // Auto-generate 100 demo evidence items
  ...Array.from({ length: 100 }).map((_, i) => ({
    id: `E-${2000 + i}`,
    caseId: `C-${1000 + ((i % 40) + 1)}`,
    filename: `evidence_${i}.${i % 3 === 0 ? "mp4" : i % 3 === 1 ? "jpg" : "pdf"}`,
    type: i % 3 === 0 ? "video/mp4" : i % 3 === 1 ? "image/jpeg" : "application/pdf",
    size: Math.floor(Math.random() * 50_000_000) + 500_000,
    uploadedBy: "lea@metro.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    aiTags: randomTags(),
  })),
];


// -------------------------------------------------------------------
// AUDITS
// -------------------------------------------------------------------
export const initialAudits = [
  { id: "A-1", timestamp: "2025-08-25T10:00:00Z", actor: "lea@metro.gov", action: "LOGIN", targetId: null, ip: "127.0.0.1" },
  { id: "A-2", timestamp: "2025-08-25T10:03:00Z", actor: "lea@metro.gov", action: "UPLOAD_EVIDENCE", targetId: "C-2001", ip: "127.0.0.1" },
  ...Array.from({ length: 200 }).map((_, i) => ({
    id: `A-${i + 3}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    actor: ["lea@metro.gov", "prosecutor@justice.org", "defense@lawfirm.com", "admin@system.gov"][i % 4],
    action: ["LOGIN", "UPLOAD_EVIDENCE", "CREATE_CASE", "VIEW_DISCOVERY"][i % 4],
    targetId: `C-${1000 + (i % 40)}`,
    ip: `192.168.1.${i % 255}`,
  })),
];

// -------------------------------------------------------------------
// NOTIFICATIONS
// -------------------------------------------------------------------
export const initialNotifications = [
  { id: "N-1", message: "New user request pending approval", ts: Date.now() - 10000 },
  { id: "N-2", message: "Scheduled system maintenance tomorrow at 2 AM", ts: Date.now() - 50000 },
  { id: "N-3", message: "Evidence retention policy updated", ts: Date.now() - 150000 },
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `N-${i + 4}`,
    message: `System notification ${i + 4}`,
    ts: Date.now() - (i + 1) * 60000,
  })),
];
