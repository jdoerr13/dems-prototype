import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from './SupabaseContext'
import { toSnakeCase } from './utility';
import { toCamelCase } from './utility';

const CaseContext = createContext(null);

export function CaseProvider({ children }) {
  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [audits, setAudits] = useState([]);
  const [notifications, setNotifications] = useState([]);

  /** -------- INITIAL LOAD -------- */
  useEffect(() => {
  const fetchAll = async () => {
    try {
      const [caseRes, evidenceRes, auditRes, notifRes] = await Promise.all([
        supabase.from('cases').select('*'),
        supabase.from('evidence').select('*'),
        supabase.from('audits').select('*'),
        supabase.from('notifications').select('*'),
      ]);

      if (caseRes.error) console.error("Cases error:", caseRes.error.message);
      if (evidenceRes.error) console.error("Evidence error:", evidenceRes.error.message);
      if (auditRes.error) console.error("Audits error:", auditRes.error.message);
      if (notifRes.error) console.error("Notifications error:", notifRes.error.message);

      setCases(toCamelCase(caseRes.data || []));
      setEvidence(toCamelCase(evidenceRes.data || []));
      setAudits(toCamelCase(auditRes.data || []));
      setNotifications(toCamelCase(notifRes.data || []));
      
    } catch (err) {
      console.error("Unexpected fetch error:", err.message);
    }
  };

  fetchAll();
}, []);


  /** -------- AUDITS -------- */
  const addAudit = async (entry) => {
    let row = {
      timestamp: new Date().toISOString(),
      ...entry,
    };
    const audit = toSnakeCase(row)
    const { data, error } = await supabase.from('audits').insert([audit]).select();
    if (error) {
      console.error("Insert error:", error.message);
    }
    if (data) setAudits((prev) => [data[0], ...prev]);
  };

  /** -------- NOTIFICATIONS -------- */
  const notify = async (msg) => {
    const n = {
      message: msg,
      read: false,
      ts: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('notifications').insert([n]).select();
    if (data) setNotifications((prev) => [data[0], ...prev]);
  };

  const markAllRead = async () => {
    const { data } = await supabase
      .from('notifications')
      .update({ read: true })
      .neq('read', true)
      .select();
    if (data) setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  /** -------- CASES -------- */
  const addCase = async (c) => {
    c = toSnakeCase(c)
    const { data, error } = await supabase.from('cases').insert([c]).select();
    if (error) {
      console.error("Insert error:", error.message);
    }
    if (data) setCases((prev) => [data[0], ...prev]);
    await addAudit({
      actor: c.createdBy,
      action: 'CREATE_CASE',
      targetId: c.caseId,
      ip: '127.0.0.1',
    });
  await notify(`New case created: ${c.caseId}`);
  };

  const acceptCase = async (caseId, prosecutorEmail) => {
    const { data } = await supabase
      .from('cases')
      .update({ status: 'Accepted', prosecutorEmail })
      .eq('caseId', caseId)
      .select();
    if (data) setCases((prev) =>
      prev.map((c) => (c.caseId === caseId ? data[0] : c))
    );
    await addAudit({
      actor: prosecutorEmail,
      action: 'ACCEPT_CASE',
      targetId: caseId,
      ip: '127.0.0.1',
    });
    await notify(`Case ${caseId} accepted by ${prosecutorEmail}`);
  };

  const linkCoDefendant = async (caseId, linkedId) => {
    const target = cases.find((c) => c.caseId === caseId);
    const updated = {
      coDefendants: Array.from(new Set([...(target.coDefendants || []), linkedId])),
    };
    const { data } = await supabase
      .from('cases')
      .update(updated)
      .eq('caseId', caseId)
      .select();
    if (data) setCases((prev) =>
      prev.map((c) => (c.caseId === caseId ? data[0] : c))
    );
    await addAudit({
      actor: 'system',
      action: 'LINK_CODEFENDANT',
      targetId: `${caseId}->${linkedId}`,
      ip: '127.0.0.1',
    });
  };

  const assignDefense = async (caseId, defenseEmail) => {
    const { data } = await supabase
      .from('cases')
      .update({ defenseEmail })
      .eq('caseId', caseId)
      .select();
    if (data) setCases((prev) =>
      prev.map((c) => (c.caseId === caseId ? data[0] : c))
    );
    await addAudit({
      actor: defenseEmail,
      action: 'ASSIGN_DEFENSE',
      targetId: caseId,
      ip: '127.0.0.1',
    });
    await notify(`Defense counsel ${defenseEmail} assigned to ${caseId}`);
  };

  /** -------- EVIDENCE -------- */
  const addEvidence = async (ev) => {
    ev = toSnakeCase(ev)
    const { data, error } = await supabase.from('evidence').insert([ev]).select();
    if (error) {
      console.error("Insert error:", error.message);
    }
    if (data) setEvidence((prev) => [data[0], ...prev]);
    await addAudit({
      actor: ev.uploadedBy,
      action: 'UPLOAD_EVIDENCE',
      targetId: ev.caseId,
      ip: '127.0.0.1',
    });
    await notify(`New evidence uploaded for case ${ev.caseId}`);
  };

  /** -------- VALUE -------- */
  const value = useMemo(
    () => ({
      cases,
      evidence,
      audits,
      notifications,
      addCase,
      addEvidence,
      acceptCase,
      linkCoDefendant,
      assignDefense,
      notify,
      markAllRead,
    }),
    [cases, evidence, audits, notifications]
  );

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCases() {
  return useContext(CaseContext);
}
