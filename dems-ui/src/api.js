import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const api = axios.create({ baseURL: API_BASE });

// Example endpoints to integrate next week:
export const EvidenceAPI = {
  upload(formData) {
    // return api.post('/evidence/upload', formData);
    // For now, return a resolved promise to simulate success:
    return Promise.resolve({ data: { ok: true } });
  },
  listByCase(caseId) {
    // return api.get(`/evidence?caseId=${caseId}`);
    return Promise.resolve({ data: [] });
  }
};

export const CaseAPI = {
  list() {
    // return api.get('/cases');
    return Promise.resolve({ data: [] });
  },
  accept(caseId) {
    // return api.post(`/cases/${caseId}/accept`);
    return Promise.resolve({ data: { ok: true } });
  },
  create(payload) {
    // return api.post('/cases', payload);
    return Promise.resolve({ data: { ok: true } });
  }
};

// export default api;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// // Attach token automatically if available
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Auth
// export const signup = (data) => API.post("/auth/signup", data);
// export const login = (data) => API.post("/auth/login", data);

// // Cases
// export const createCase = (data) => API.post("/cases", data);
// export const getCases = () => API.get("/cases");

// // Evidence
// export const uploadEvidence = (caseId, data) =>
//   API.post(`/evidence/${caseId}`, data);
// export const getEvidence = (caseId) =>
//   API.get(`/evidence/${caseId}`);

// export const EvidenceAPI = {
//   upload: (caseId, data) => uploadEvidence(caseId, data),
//   list: (caseId) => getEvidence(caseId),
// };