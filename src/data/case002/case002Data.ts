/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * THE BLACKMOOR CHRONICLES
 * CASE 002 — THE LAST BELL
 * Westbridge Senior Academy Investigation
 * 
 * Companion Moderator specifications and dossier metadata.
 * NOTE: All investigative evidence resides solely inside the 4 printed dossiers.
 * The website contains NO investigative clues.
 */

export interface Case002DossierInfo {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  color: string;
}

export interface Case002AccusationData {
  suspect: string;
  method: string;
  motive: string;
  evidence: string;
  submittedAt: string;
}

export type Case002Screen = 
  | 'landing'
  | 'briefing'
  | 'investigation'
  | 'accusation'
  | 'final-reveal';

export const CASE_002_INFO = {
  caseId: 'CASE-002',
  caseNumber: 'CASE 002',
  title: 'The Last Bell',
  date: 'Modern Day',
  location: 'Westbridge Senior Academy',
  tagline: 'A student is dead inside Westbridge Senior Academy. Four investigators. Four different files. One truth.',
  timerDurationSecs: 3600, // 60 minutes
};

export const CASE_002_DOSSIERS: Case002DossierInfo[] = [
  {
    id: 'police',
    title: 'POLICE DOSSIER',
    subtitle: 'Official statements, security personnel interrogations, and academy entry logs.',
    tag: 'LAW ENFORCEMENT',
    description: 'Contains formal interrogation records, campus floor layout maps, and initial security guard logs.',
    color: 'from-blue-900/40 to-slate-900/60'
  },
  {
    id: 'forensics',
    title: 'FORENSICS DOSSIER',
    subtitle: 'Physical trace analysis, toxicological swabs, and digital timestamps.',
    tag: 'CRIME LAB',
    description: 'Swabs recovered from the locker hall, CCTV technical anomalies, and chemical residue data.',
    color: 'from-cyan-900/40 to-slate-900/60'
  },
  {
    id: 'autopsy',
    title: 'AUTOPSY DOSSIER',
    subtitle: 'Medical examiner findings, post-mortem trauma, and estimated time of death.',
    tag: 'CORONER REPORT',
    description: 'Physiological trauma analysis, post-mortem lividity, and critical time-of-death interval.',
    color: 'from-rose-900/40 to-slate-900/60'
  },
  {
    id: 'sister',
    title: "OLDER SISTER'S DOSSIER",
    subtitle: 'Private correspondence, hidden student secrets, and unmonitored group chats.',
    tag: 'PRIVATE INQUIRY',
    description: 'Unfiltered student text messages, student council records, rumors, and undisclosed rivalries.',
    color: 'from-amber-900/40 to-slate-900/60'
  }
];

export const CASE_002_SUSPECTS: string[] = [
  'Rhea Kapoor',
  'Kabir Shah',
  'Vihaan Malhotra',
  'Maya Iyer',
  'Dev Arora',
  'Nikhil Rao',
  'Sara Fernandes',
  'Ananya Sen',
  'Ramesh Yadav'
];
