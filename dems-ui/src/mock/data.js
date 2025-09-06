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
  {
    caseId: "C-2011",
    title: "State vs. Alvarez – Motion to Suppress",
    officerName: "Officer Cruz",
    officerBadge: "B4455",
    incidentDate: "2025-08-29",
    agency: "County Sheriff’s Office",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: null,
    coDefendants: [],
  },
  {
    caseId: "C-2012",
    title: "State vs. Chen – Multi-Defendant Fraud",
    officerName: "Officer Lopez",
    officerBadge: "C9988",
    incidentDate: "2025-08-30",
    agency: "Downtown Precinct",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: null,
    coDefendants: ["C-2013"],
  },
  {
    caseId: "C-2013",
    title: "State vs. Chen (Co-Defendant)",
    officerName: "Officer Lopez",
    officerBadge: "C9988",
    incidentDate: "2025-08-30",
    agency: "Downtown Precinct",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: null,
    coDefendants: ["C-2012"],
  },
  {
    caseId: "C-2014",
    title: "State vs. Banks – Plea Negotiation",
    officerName: "Officer Adams",
    officerBadge: "D7788",
    incidentDate: "2025-08-31",
    agency: "Metro Police Department",
    createdBy: "lea@metro.gov",
    status: "Accepted",
    prosecutorEmail: "prosecutor@justice.org",
    defenseEmail: "defense5@lawfirm.com",
    coDefendants: [],
  },

  // EXTRA DEFENSE CASES
  {
    caseId: "C-2020",
    title: "State vs. Johnson – Burglary",
    officerName: "Officer Cruz",
    officerBadge: "D4455",
    incidentDate: "2025-08-10",
    agency: "Metro Police Department",
    createdBy: "lea@metro.gov",
    status: "Accepted",
    prosecutorEmail: "prosecutor@justice.org",
    defenseEmail: "defense6@lawfirm.com",
    coDefendants: [],
  },
  {
    caseId: "C-2021",
    title: "State vs. Ramirez – Narcotics",
    officerName: "Officer Lee",
    officerBadge: "E5522",
    incidentDate: "2025-08-15",
    agency: "Narcotics Division",
    createdBy: "lea@metro.gov",
    status: "Accepted",
    prosecutorEmail: "prosecutor@justice.org",
    defenseEmail: "defense7@lawfirm.com",
    coDefendants: [],
  },
  {
    caseId: "C-2022",
    title: "State vs. Patel – Fraudulent ID",
    officerName: "Officer Daniels",
    officerBadge: "F8833",
    incidentDate: "2025-08-17",
    agency: "County Sheriff’s Office",
    createdBy: "lea@metro.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: "defense8@lawfirm.com",
    coDefendants: [],
  },
{
  caseId: "C-2023",
  title: "State vs. Carter – Weapons Charge",
  officerName: "Officer Kim",
  officerBadge: "G9922",
  incidentDate: "2025-08-18",
  agency: "Highway Patrol Unit",
  createdBy: "lea@metro.gov",
  status: "Accepted",
  prosecutorEmail: "prosecutor@justice.org",
  defenseEmail: "defense9@lawfirm.com",
  coDefendants: ["C-2024"],   // 🔥 new line
},
  {
  caseId: "C-2024",
  title: "State vs. Carter (Co-Defendant)",
  officerName: "Officer Kim",
  officerBadge: "G9922",
  incidentDate: "2025-08-18",
  agency: "Highway Patrol Unit",
  createdBy: "lea@metro.gov",
  status: "Accepted",
  prosecutorEmail: "prosecutor@justice.org",
  defenseEmail: "defense10@lawfirm.com",
  coDefendants: ["C-2023"],
},

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
  // Extra targeted defense evidence
  {
    id: "ev-2020-1",
    caseId: "C-2020",
    filename: "surveillance_cam.mp4",
    type: "video/mp4",
    size: 120_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    aiTags: ["face", "vehicle"],
  },
  {
    id: "ev-2021-1",
    caseId: "C-2021",
    filename: "drug_lab_photo.jpg",
    type: "image/jpeg",
    size: 4_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://images.unsplash.com/photo-1607082349566-1873725e4f46?q=80&w=1200",
    aiTags: ["drug paraphernalia", "cash"],
  },
  // --- Extra defense-targeted evidence for richer demo ---
{
  id: "ev-2020-2",
  caseId: "C-2020",
  filename: "fingerprint_scan.jpg",
  type: "image/jpeg",
  size: 1_800_000,
  uploadedBy: "lea@metro.gov",
  url: "https://images.unsplash.com/photo-1616628188464-5b962f8d8336?q=80&w=1200",
  aiTags: ["fingerprint", "suspect"],
},
{
  id: "ev-2021-2",
  caseId: "C-2021",
  filename: "lab_report.pdf",
  type: "application/pdf",
  size: 950_000,
  uploadedBy: "prosecutor@justice.org",
  url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  aiTags: ["document", "drug paraphernalia"],
},
{
  id: "ev-2022-2",
  caseId: "C-2022",
  filename: "surveillance_still.jpg",
  type: "image/jpeg",
  size: 2_400_000,
  uploadedBy: "lea@metro.gov",
  url: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1200",
  aiTags: ["suspect", "location marker"],
},
{
  id: "ev-2023-3",
  caseId: "C-2023",
  filename: "ballistics_report.pdf",
  type: "application/pdf",
  size: 1_200_000,
  uploadedBy: "prosecutor@justice.org",
  url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  aiTags: ["weapon", "document"],
},
{
  id: "ev-2024-2",
  caseId: "C-2024",
  filename: "jail_call_audio.mp3",
  type: "audio/mpeg",
  size: 7_000_000,
  uploadedBy: "lea@metro.gov",
  url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
  aiTags: ["voice", "timestamp"],
},

  {
    id: "ev-2022-1",
    caseId: "C-2022",
    filename: "fake_id_scan.pdf",
    type: "application/pdf",
    size: 1_500_000,
    uploadedBy: "lea@metro.gov",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    aiTags: ["document", "suspect"],
  },
  {
    id: "ev-2023-1",
    caseId: "C-2023",
    filename: "weapons_confiscated.jpg",
    type: "image/jpeg",
    size: 3_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://images.unsplash.com/photo-1604152135912-04a579b4e21c?q=80&w=1200",
    aiTags: ["weapon", "evidence bag"],
  },
  {
    id: "ev-2023-2",
    caseId: "C-2023",
    filename: "dashcam_co_defendant.mp4",
    type: "video/mp4",
    size: 150_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    aiTags: ["vehicle", "timestamp", "face"],
  },
  {
    id: "ev-2024-1",
    caseId: "C-2024",
    filename: "witness_statement.pdf",
    type: "application/pdf",
    size: 800_000,
    uploadedBy: "prosecutor@justice.org",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    aiTags: ["document", "text"],
  },
  {
    id: "ev-2011-1",
    caseId: "C-2011",
    filename: "traffic_stop_audio.mp3",
    type: "audio/mpeg",
    size: 5_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    aiTags: ["voice", "timestamp"],
  },
  {
    id: "ev-2012-1",
    caseId: "C-2012",
    filename: "bank_records.pdf",
    type: "application/pdf",
    size: 1_200_000,
    uploadedBy: "lea@metro.gov",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    aiTags: ["document", "cash"],
  },
  {
    id: "ev-2013-1",
    caseId: "C-2013",
    filename: "security_cam.mp4",
    type: "video/mp4",
    size: 300_000_000,
    uploadedBy: "lea@metro.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    aiTags: ["face", "license plate", "vehicle"],
  },
  {
    id: "ev-2014-1",
    caseId: "C-2014",
    filename: "plea_agreement_draft.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 250_000,
    uploadedBy: "prosecutor@justice.org",
    url: "https://file-examples.com/storage/fe1f88dcb88c/2017/02/file-sample_100kB.docx",
    aiTags: ["document", "text"],
  },
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

  // ✅ Seed explicit ACCEPT_CASE & REJECT_CASE logs
  { id: "A-999", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-2014", ip: "127.0.0.1" },
  { id: "A-1000", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ASSIGN_DEFENSE", targetId: "C-2014", ip: "127.0.0.1" },

  // Extra ACCEPT_CASE logs
  { id: "A-1001", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-1002", ip: "127.0.0.1" },
  { id: "A-1002", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-1004", ip: "127.0.0.1" },
  { id: "A-1003", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-1007", ip: "127.0.0.1" },
  { id: "A-1004", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-1009", ip: "127.0.0.1" },
  { id: "A-1005", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "ACCEPT_CASE", targetId: "C-2020", ip: "127.0.0.1" },

  // Extra REJECT_CASE logs
  { id: "A-1006", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "REJECT_CASE", targetId: "C-1005", ip: "127.0.0.1" },
  { id: "A-1007", timestamp: new Date().toISOString(), actor: "prosecutor@justice.org", action: "REJECT_CASE", targetId: "C-2022", ip: "127.0.0.1" },
  { id: "A-1008", timestamp: new Date().toISOString(), actor: "admin@system.gov", action: "REJECT_CASE", targetId: "C-1010", ip: "127.0.0.1" },
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
  { id: "N-101", message: "Case C-2011 requires suppression hearing scheduling", ts: Date.now() - 200000 },
  { id: "N-102", message: "Evidence uploaded for multi-defendant case C-2012", ts: Date.now() - 300000 },
  { id: "N-103", message: "New plea negotiation notes filed in C-2014", ts: Date.now() - 400000 },
];

// -------------------------------------------------------------------
// STUBBED AI TAGS
// -------------------------------------------------------------------
export const initialAiTags = [
  { name: "faces", value: 23 },
  { name: "license plates", value: 12 },
  { name: "weapons", value: 7 },
  { name: "drug paraphernalia", value: 5 },
];
