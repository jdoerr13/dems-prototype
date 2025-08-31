// src/contexts/CaseContext.jsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialCases, initialEvidence, initialAudits, initialNotifications, users } from '../mock/data';

const CaseContext = createContext(null);

export function CaseProvider({ children }) {
  const [cases, setCases] = useState(initialCases);
  const [evidence, setEvidence] = useState(initialEvidence);
  const [audits, setAudits] = useState(initialAudits);
  const [notifications, setNotifications] = useState(initialNotifications || []);

  const addAudit = (entry) => {
    const row = { id: Date.now(), timestamp: new Date().toISOString(), ...entry };
    setAudits(prev => [row, ...prev]);
  };

  const notify = (msg) => {
    const n = { id: Date.now(), message: msg, read: false, ts: new Date().toISOString() };
    setNotifications(prev => [n, ...prev]);
  };

  const addCase = (c) => {
    setCases(prev => [c, ...prev]);
    addAudit({ actor: c.createdBy, action: 'CREATE_CASE', targetId: c.caseId, ip: '127.0.0.1' });
    notify(`New case created: ${c.caseId}`);
  };

  const addEvidence = (ev) => {
    setEvidence(prev => [ev, ...prev]);
    addAudit({ actor: ev.uploadedBy, action: 'UPLOAD_EVIDENCE', targetId: ev.caseId, ip: '127.0.0.1' });
    notify(`New evidence uploaded for case ${ev.caseId}`);
  };

  const acceptCase = (caseId, prosecutorEmail) => {
    setCases(prev => prev.map(c => c.caseId === caseId ? { ...c, status: 'Accepted', prosecutorEmail } : c));
    addAudit({ actor: prosecutorEmail, action: 'ACCEPT_CASE', targetId: caseId, ip: '127.0.0.1' });
    notify(`Case ${caseId} accepted by ${prosecutorEmail}`);
  };

  const linkCoDefendant = (caseId, linkedId) => {
    setCases(prev => prev.map(c => c.caseId === caseId
      ? { ...c, coDefendants: Array.from(new Set([...(c.coDefendants||[]), linkedId])) }
      : c
    ));
    addAudit({ actor: 'system', action: 'LINK_CODEFENDANT', targetId: `${caseId}->${linkedId}`, ip: '127.0.0.1' });
  };

  const assignDefense = (caseId, defenseEmail) => {
    setCases(prev => prev.map(c => c.caseId === caseId ? { ...c, defenseEmail } : c));
    addAudit({ actor: defenseEmail, action: 'ASSIGN_DEFENSE', targetId: caseId, ip: '127.0.0.1' });
    notify(`Defense counsel ${defenseEmail} assigned to ${caseId}`);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const value = useMemo(() => ({
    users, cases, evidence, audits, notifications,
    addCase, addEvidence, acceptCase, linkCoDefendant, assignDefense, notify, markAllRead
  }), [cases, evidence, audits, notifications]);

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCases() { 
  return useContext(CaseContext); 
}
