export type InvestigatorRole = 'sheriff' | 'investigator' | 'mortician' | 'forensics' | 'shaman';

export interface RoleInfo {
  id: InvestigatorRole;
  title: string;
  subtitle: string;
  focus: string[];
  description: string;
  dossierCode: string;
}

export type EvidenceCategory = 'artifact' | 'document' | 'chronology' | 'lore';

export interface EvidenceItem {
  id: string;
  code: string;
  name: string;
  category: EvidenceCategory;
  shortDesc: string;
  catalogNotes: string;
  relevantRoles: InvestigatorRole[];
  physicalDossierPrompt: string;
}

export interface HintItem {
  level: number;
  label: string;
  text: string;
  audioKey: string;
}

export interface TheorySubmissionData {
  responsible: string;
  method: string;
  motive: string;
  securedChapel: string;
  bellStrokes: string;
  reliquary: string;
  ledger: string;
  evidenceSupport: string;
  submittedAt?: string;
}

export interface CaseOverviewData {
  caseId: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  status: 'ACTIVE' | 'LOCKED' | 'CLOSED';
  description: string;
  initialScene: string[];
  objectives: string[];
  frameworkQuestions: string[];
  suspectPool: string[];
}

export type ScreenState = 
  | 'landing'
  | 'opening'
  | 'role-selection'
  | 'investigation'
  | 'final-reveal';

export type InvestigationTab = 
  | 'case'
  | 'evidence'
  | 'timeline'
  | 'hints'
  | 'theory';
