import React, { useState } from 'react';
import { 
  FileText, Shield, Clock, HelpCircle, CheckCircle2, 
  ChevronRight, Lock, AlertOctagon, User, BookOpen, 
  Send, Sparkles, AlertTriangle, Key, Layers, MessageSquareQuote
} from 'lucide-react';
import { 
  CASE_001_INFO, 
  EVIDENCE_CATALOG, 
  HINTS_DATA, 
  INVESTIGATOR_ROLES 
} from '../data/case001Data';
import { 
  InvestigatorRole, 
  InvestigationTab, 
  EvidenceItem, 
  TheorySubmissionData 
} from '../types';
import { EvidenceModal } from '../components/EvidenceModal';
import { soundMaster } from '../utils/audioSystem';

interface InvestigationDashboardProps {
  currentRole: InvestigatorRole | null;
  activeTab: InvestigationTab;
  onTabChange: (tab: InvestigationTab) => void;
  unlockedHintLevel: number;
  onUnlockNextHint: () => void;
  submittedTheory: TheorySubmissionData | null;
  onSubmitTheory: (theory: TheorySubmissionData) => void;
  onOpenFinalRecord: () => void;
}

export const InvestigationDashboard: React.FC<InvestigationDashboardProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  unlockedHintLevel,
  onUnlockNextHint,
  submittedTheory,
  onSubmitTheory,
  onOpenFinalRecord
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [evidenceFilter, setEvidenceFilter] = useState<'all' | 'artifact' | 'document' | 'chronology' | 'lore'>('all');
  
  // Interactive team notes for the 10 framework questions
  const [frameworkNotes, setFrameworkNotes] = useState<Record<number, string>>({});
  
  // Theory Form State
  const [theoryForm, setTheoryForm] = useState<TheorySubmissionData>(submittedTheory || {
    responsible: '',
    method: '',
    motive: '',
    securedChapel: '',
    bellStrokes: '',
    reliquary: '',
    ledger: '',
    evidenceSupport: ''
  });

  const [showSealModal, setShowSealModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleEvidenceClick = (item: EvidenceItem) => {
    soundMaster.playPaperRustle();
    setSelectedEvidence(item);
  };

  const handleHintRequest = () => {
    soundMaster.playWaxSeal();
    soundMaster.playBellToll(1);
    onUnlockNextHint();
  };

  const handleTheoryChange = (field: keyof TheorySubmissionData, value: string) => {
    setTheoryForm(prev => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify all 8 fields are filled
    const fields: (keyof TheorySubmissionData)[] = [
      'responsible', 'method', 'motive', 'securedChapel',
      'bellStrokes', 'reliquary', 'ledger', 'evidenceSupport'
    ];

    for (const f of fields) {
      if (!theoryForm[f] || theoryForm[f].trim().length < 5) {
        setValidationError(`Please complete all fields before sealing your reconstruction. Incomplete: ${f.toUpperCase()}`);
        return;
      }
    }

    soundMaster.playWaxSeal();
    onSubmitTheory(theoryForm);
    setShowSealModal(true);
  };

  const filteredEvidence = EVIDENCE_CATALOG.filter(item => {
    if (evidenceFilter === 'all') return true;
    return item.category === evidenceFilter;
  });

  return (
    <div id="investigation-dashboard" className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
      {/* Tab Navigation */}
      <nav id="investigation-tab-nav" className="flex items-center space-x-1 sm:space-x-2 border-b border-[#30221c] pb-3 mb-6 overflow-x-auto">
        <button
          id="tab-btn-case"
          type="button"
          onClick={() => { soundMaster.playPaperRustle(); onTabChange('case'); }}
          className={`px-3.5 py-2 rounded-t font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'case'
              ? 'bg-[#211613] text-[#f5ebd9] border-t-2 border-x border-[#804b38]'
              : 'text-[#8c7766] hover:text-[#ded0be] hover:bg-[#16100f]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#b2824e]" />
          <span>Case Overview</span>
        </button>

        <button
          id="tab-btn-evidence"
          type="button"
          onClick={() => { soundMaster.playPaperRustle(); onTabChange('evidence'); }}
          className={`px-3.5 py-2 rounded-t font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'evidence'
              ? 'bg-[#211613] text-[#f5ebd9] border-t-2 border-x border-[#804b38]'
              : 'text-[#8c7766] hover:text-[#ded0be] hover:bg-[#16100f]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#86a8c4]" />
          <span>Shared Evidence</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2e1e18] text-[#e0cfbd] font-mono-archive">
            {EVIDENCE_CATALOG.length}
          </span>
        </button>

        <button
          id="tab-btn-timeline"
          type="button"
          onClick={() => { soundMaster.playPaperRustle(); onTabChange('timeline'); }}
          className={`px-3.5 py-2 rounded-t font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'timeline'
              ? 'bg-[#211613] text-[#f5ebd9] border-t-2 border-x border-[#804b38]'
              : 'text-[#8c7766] hover:text-[#ded0be] hover:bg-[#16100f]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#9fb896]" />
          <span>Framework & Timeline</span>
        </button>

        <button
          id="tab-btn-hints"
          type="button"
          onClick={() => { soundMaster.playPaperRustle(); onTabChange('hints'); }}
          className={`px-3.5 py-2 rounded-t font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'hints'
              ? 'bg-[#211613] text-[#f5ebd9] border-t-2 border-x border-[#804b38]'
              : 'text-[#8c7766] hover:text-[#ded0be] hover:bg-[#16100f]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#b986c4]" />
          <span>Consultation Hints</span>
          {unlockedHintLevel > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2e1e18] text-[#e0cfbd] font-mono-archive">
              {unlockedHintLevel}/3
            </span>
          )}
        </button>

        <button
          id="tab-btn-theory"
          type="button"
          onClick={() => { soundMaster.playPaperRustle(); onTabChange('theory'); }}
          className={`px-3.5 py-2 rounded-t font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'theory'
              ? 'bg-[#291717] text-[#f5ebd9] border-t-2 border-x border-[#914532]'
              : 'text-[#8c7766] hover:text-[#e09e9e] hover:bg-[#1f1212]'
          }`}
        >
          <Send className="w-3.5 h-3.5 text-[#df8686]" />
          <span>Final Reconstruction</span>
        </button>
      </nav>

      {/* =========================================================================
          TAB 1: CASE OVERVIEW
         ========================================================================= */}
      {activeTab === 'case' && (
        <section id="tab-content-case" className="space-y-6">
          {/* Main Case Banner */}
          <div className="p-6 rounded-lg bg-[#181110] border border-[#3b2a22] shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d201a] pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono-archive text-[#b8956e] uppercase tracking-widest">
                  OFFICIAL INVESTIGATIVE BRIEFING
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5ebd9] mt-0.5">
                  The Murder of Lord Alistair Blackmoor
                </h2>
              </div>
              <div className="text-right font-mono-archive text-xs text-[#8c7766]">
                <div>DISCOVERED: OCTOBER 1896</div>
                <div className="text-[#d89771]">ST. AURELIUS CHAPEL</div>
              </div>
            </div>

            <p className="text-[#cebfad] text-base leading-relaxed mb-6 font-serif">
              {CASE_001_INFO.description}
            </p>

            {/* Core Objectives */}
            <div className="bg-[#1f1614] p-4 rounded border border-[#4a3429] mb-6">
              <h3 className="text-xs uppercase tracking-widest font-display font-bold text-[#e6b980] mb-2 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#c79c65]" />
                <span>PRIMARY INVESTIGATION OBJECTIVES</span>
              </h3>
              <p className="text-xs text-[#baa996] mb-3">
                Your group must unite the five physical lenses to reach unanimous agreement on:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {CASE_001_INFO.objectives.map((obj, i) => (
                  <div key={i} className="p-2.5 bg-[#16100f] border border-[#33241d] rounded text-xs text-[#e0cfbb] flex items-center space-x-2">
                    <span className="text-[#a8744d] font-bold">›</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Initial Crime Scene Findings */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-display font-bold text-[#bfa48e] mb-3">
                Initial Crime Scene Observations (Recorded at Dawn)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {CASE_001_INFO.initialScene.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#140e0d] border border-[#261b16] rounded text-[#b3a18f] flex items-start space-x-2">
                    <span className="text-[#b87455] font-mono-archive mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suspect Pool Reference */}
          <div className="p-6 rounded-lg bg-[#181110] border border-[#3b2a22] shadow-xl">
            <h3 className="text-sm font-display font-bold text-[#e6b980] mb-1 uppercase tracking-wider flex items-center space-x-2">
              <User className="w-4 h-4 text-[#c79c65]" />
              <span>Established Suspect Pool</span>
            </h3>
            <p className="text-xs text-[#968372] mb-4">
              Cross-examine the statements, movements, and financial records within the physical dossiers. The true culprit is exactly one of these individuals:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CASE_001_INFO.suspectPool.map((suspect, idx) => (
                <div key={idx} className="p-3 bg-[#140e0d] border border-[#2b1f1a] rounded flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-[#241714] border border-[#4a3429] flex items-center justify-center text-[#c9a473] font-mono-archive text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-[#eddcc9]">{suspect}</div>
                    <div className="text-[10px] text-[#7d695b]">Blackmoor Valley Subject</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 2: SHARED EVIDENCE INDEX
         ========================================================================= */}
      {activeTab === 'evidence' && (
        <section id="tab-content-evidence" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d201a] pb-3">
            <div>
              <h2 className="text-xl font-display font-bold text-[#f5ebd9]">
                Shared Evidence & Archival Registry
              </h2>
              <p className="text-xs text-[#9c8978]">
                Select any evidence code to view catalog notes and dossier cross-reference prompts.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center space-x-1 text-xs font-mono-archive overflow-x-auto">
              {(['all', 'artifact', 'document', 'chronology', 'lore'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { soundMaster.playPaperRustle(); setEvidenceFilter(cat); }}
                  className={`px-2.5 py-1 rounded capitalize transition-colors ${
                    evidenceFilter === cat
                      ? 'bg-[#3b2a22] text-[#f5ebd9] border border-[#694c39]'
                      : 'bg-[#140e0d] text-[#8c7766] border border-[#261b16] hover:text-[#d6c4b2]'
                  }`}
                >
                  {cat === 'all' ? 'All (34)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {filteredEvidence.map((item) => (
              <div
                key={item.id}
                id={`evidence-btn-${item.code}`}
                onClick={() => handleEvidenceClick(item)}
                className="p-3 bg-[#16100f] border border-[#2e211b] hover:border-[#63493b] rounded cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between group shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono-archive font-bold text-[#dfb581] group-hover:text-[#ffdbad]">
                      {item.code}
                    </span>
                    <span className="text-[9px] uppercase font-mono-archive text-[#705e4f]">
                      {item.category.slice(0, 3)}
                    </span>
                  </div>
                  <div className="text-xs font-display font-semibold text-[#e8dccb] line-clamp-2 leading-tight">
                    {item.name}
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-[#877566] flex items-center justify-between border-t border-[#241a16] pt-1.5">
                  <span>View Card</span>
                  <ChevronRight className="w-3 h-3 text-[#705e4f] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-[#7d695b] italic pt-4">
            *Evidence cards contain neutral catalog descriptions only. Full forensic analysis and witness affidavits are in your printed physical booklets.
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 3: FRAMEWORK & TIMELINE
         ========================================================================= */}
      {activeTab === 'timeline' && (
        <section id="tab-content-timeline" className="space-y-6">
          <div className="p-6 rounded-lg bg-[#181110] border border-[#3b2a22]">
            <h2 className="text-xl font-display font-bold text-[#f5ebd9] mb-1">
              Ten-Point Investigative Framework
            </h2>
            <p className="text-xs text-[#9c8978] mb-6">
              The archive poses these ten questions to guide your group discussion. Use the notepad fields to log your team's collective conclusions as you cross-reference your dossiers.
            </p>

            <div className="space-y-4">
              {CASE_001_INFO.frameworkQuestions.map((q, idx) => (
                <div key={idx} className="p-4 bg-[#140e0d] border border-[#2b1f1a] rounded-lg">
                  <div className="text-sm font-display font-bold text-[#e6b980] mb-2">
                    {q}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Record your team's deductions and cross-referenced evidence numbers here..."
                    value={frameworkNotes[idx] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFrameworkNotes(prev => ({ ...prev, [idx]: val }));
                    }}
                    className="w-full bg-[#1c1513] border border-[#3b2a22] rounded p-2.5 text-xs text-[#ded1c0] placeholder-[#665447] focus:outline-none focus:border-[#7d562b]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 4: HINTS SYSTEM
         ========================================================================= */}
      {activeTab === 'hints' && (
        <section id="tab-content-hints" className="space-y-6">
          <div className="p-6 rounded-lg bg-[#181110] border border-[#3b2a22]">
            <div className="flex items-center justify-between border-b border-[#2d201a] pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono-archive text-[#b8956e] uppercase tracking-widest">
                  CONSULTATIVE GUIDANCE
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#f5ebd9] mt-0.5">
                  Archival Hint Chamber
                </h2>
              </div>
              <div className="text-xs font-mono-archive px-3 py-1.5 rounded bg-[#211613] border border-[#4a3429] text-[#e0cfbb]">
                HINTS USED: <span className="text-[#f1c990] font-bold">{unlockedHintLevel}</span> / 3
              </div>
            </div>

            <p className="text-xs text-[#baa895] leading-relaxed mb-6">
              Hints do not solve the case or reveal the murderer. They guide your attention toward critical discrepancies.
              There is no penalty for using hints. Request the next level only when the group is stuck.
            </p>

            {/* Hint Levels Accordion / Cards */}
            <div className="space-y-4 mb-8">
              {HINTS_DATA.map((hint) => {
                const isUnlocked = unlockedHintLevel >= hint.level;
                return (
                  <div
                    key={hint.level}
                    className={`p-5 rounded-lg border-2 transition-all ${
                      isUnlocked
                        ? 'bg-[#1f1614] border-[#694735] shadow-md'
                        : 'bg-[#130e0d] border-[#261c17] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {isUnlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-[#86c496]" />
                        ) : (
                          <Lock className="w-4 h-4 text-[#6e5949]" />
                        )}
                        <h3 className="text-xs font-display font-bold text-[#ebdcc9] uppercase tracking-wider">
                          {hint.label}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono-archive text-[#857161]">
                        {isUnlocked ? 'ACCESSIBLE' : 'SEALED'}
                      </span>
                    </div>

                    {isUnlocked ? (
                      <div className="text-sm text-[#e8dbcc] font-serif leading-relaxed whitespace-pre-line pl-6 border-l-2 border-[#804b38]">
                        {hint.text}
                      </div>
                    ) : (
                      <div className="text-xs text-[#6e5b4c] italic pl-6">
                        This guidance level remains sealed. You may request it below.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Request Button */}
            {unlockedHintLevel < 3 ? (
              <div className="text-center pt-4 border-t border-[#291e18]">
                <button
                  id="btn-request-next-hint"
                  type="button"
                  onClick={handleHintRequest}
                  className="px-6 py-3 rounded bg-[#2b1b17] border border-[#6b3f2e] hover:border-[#965c44] text-[#f2e5d5] font-display text-xs font-bold tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
                >
                  Request Hint Level {unlockedHintLevel + 1}
                </button>
              </div>
            ) : (
              <div className="text-center text-xs text-[#8c7766] font-mono-archive italic">
                All consultative hint levels have been unsealed.
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 5: FINAL RECONSTRUCTION (THEORY SUBMISSION)
         ========================================================================= */}
      {activeTab === 'theory' && (
        <section id="tab-content-theory" className="space-y-6">
          <div className="p-6 rounded-lg bg-[#181110] border-2 border-[#452825] shadow-2xl">
            <div className="border-b border-[#3b2320] pb-4 mb-6">
              <span className="text-[11px] font-mono-archive text-[#df8686] uppercase tracking-widest flex items-center space-x-1.5 mb-1">
                <AlertOctagon className="w-3.5 h-3.5 text-[#df8686]" />
                <span>FINAL INVESTIGATIVE RECONSTRUCTION</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#f5ebd9]">
                Submit Your Unified Theory
              </h2>
              <p className="text-xs text-[#baa49b] mt-1">
                "Do not submit until all five investigators agree." Complete all eight required fields.
              </p>
            </div>

            {validationError && (
              <div className="p-3 bg-[#2b1414] border border-[#853434] rounded text-xs text-[#f2a2a2] flex items-center space-x-2 mb-6 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-[#f2a2a2] shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleValidateAndSubmit} className="space-y-5">
              {/* Field 1: Responsible Suspect */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  1. WHO IS RESPONSIBLE? *
                </label>
                <select
                  id="theory-field-responsible"
                  value={theoryForm.responsible}
                  onChange={(e) => handleTheoryChange('responsible', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] focus:outline-none focus:border-[#966344] font-display"
                >
                  <option value="">-- Select Culprit From Suspect Pool --</option>
                  {CASE_001_INFO.suspectPool.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Field 2: Murder Method */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  2. HOW DID THE MURDER HAPPEN? (Physical Cause & Weapon) *
                </label>
                <textarea
                  id="theory-field-method"
                  rows={3}
                  required
                  placeholder="Explain the physical cause of death, the instrument used, and the struggle beside the altar..."
                  value={theoryForm.method}
                  onChange={(e) => handleTheoryChange('method', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 3: Motive */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  3. WHAT WAS THE MOTIVE? (Financial, Inheritance, or Blackmail) *
                </label>
                <textarea
                  id="theory-field-motive"
                  rows={3}
                  required
                  placeholder="Explain what the killer stood to gain or conceal, referencing the upcoming Monday solicitor meeting..."
                  value={theoryForm.motive}
                  onChange={(e) => handleTheoryChange('motive', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 4: Apparent Secured Chapel */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  4. HOW DID THE CHAPEL APPEAR SECURED FROM WITHIN? *
                </label>
                <textarea
                  id="theory-field-secured"
                  rows={3}
                  required
                  placeholder="Explain the lock trick, key manipulation, or mechanical entry/exit..."
                  value={theoryForm.securedChapel}
                  onChange={(e) => handleTheoryChange('securedChapel', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 5: Three Bell Strokes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  5. WHAT DID THE THREE BELL STROKES MEAN? (Why rung after midnight?) *
                </label>
                <textarea
                  id="theory-field-bell"
                  rows={3}
                  required
                  placeholder="Explain the time discrepancy between death and the 02:17 bell, and the false timestamp/folklore reason..."
                  value={theoryForm.bellStrokes}
                  onChange={(e) => handleTheoryChange('bellStrokes', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 6: Reliquary */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  6. WHAT IS THE SIGNIFICANCE OF THE RELIQUARY? *
                </label>
                <textarea
                  id="theory-field-reliquary"
                  rows={2}
                  required
                  placeholder="Explain what was concealed or sought inside the stone coffer..."
                  value={theoryForm.reliquary}
                  onChange={(e) => handleTheoryChange('reliquary', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 7: Ledger */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  7. WHAT IS THE SIGNIFICANCE OF THE LEDGER? *
                </label>
                <textarea
                  id="theory-field-ledger"
                  rows={2}
                  required
                  placeholder="Explain the mortgage entries, payments to J.R., and the financial conspiracy..."
                  value={theoryForm.ledger}
                  onChange={(e) => handleTheoryChange('ledger', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Field 8: Supporting Evidence */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-display font-bold text-[#f0e3d2] mb-1.5">
                  8. WHAT EVIDENCE SUPPORTS YOUR THEORY? (List specific E-, D-, W-, L- codes) *
                </label>
                <textarea
                  id="theory-field-evidence"
                  rows={2}
                  required
                  placeholder="E.g., E-005 dark fiber, E-018 altar resin vs E-017 bell residue, D-007 physician note..."
                  value={theoryForm.evidenceSupport}
                  onChange={(e) => handleTheoryChange('evidenceSupport', e.target.value)}
                  className="w-full bg-[#140e0d] border border-[#402b23] rounded p-3 text-xs text-[#ded1c0] placeholder-[#6b584d] focus:outline-none focus:border-[#966344]"
                />
              </div>

              {/* Submit / Seal Action */}
              <div className="pt-4 border-t border-[#3b2320] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#8c7766] font-mono-archive">
                  CONFIRMATION REQUIRES CONSENSUS OF ALL 5 INVESTIGATORS
                </span>

                <button
                  id="btn-submit-theory"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#3d1918] border-2 border-[#8a3835] hover:border-[#b84e49] text-[#faecec] font-display text-xs font-bold tracking-widest uppercase transition-colors shadow-2xl flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#e89b9b]" />
                  <span>Submit & Seal Theory</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Sealed Archive Confirmation Modal */}
      {showSealModal && (
        <div 
          id="theory-sealed-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-lg bg-[#191010] border-2 border-[#662828] rounded-lg shadow-2xl p-6 sm:p-8 text-[#ded0be] text-center candlelight-glow">
            <div className="w-14 h-14 rounded-full bg-[#2b1616] border border-[#7d2f2f] mx-auto flex items-center justify-center text-[#df8686] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono-archive text-[#e09898] uppercase tracking-widest">
              CONFIDENTIAL ARCHIVE ACTION
            </span>
            <h3 className="text-2xl font-display font-bold text-[#faecec] mt-1 mb-3">
              Your Reconstruction Has Been Sealed
            </h3>

            <p className="text-sm text-[#cebfb2] leading-relaxed mb-6 font-serif">
              "Your reconstruction has been sealed in the archive."
            </p>

            <div className="bg-[#241313] p-4 rounded border border-[#522424] text-xs text-[#df9a9a] mb-8">
              <strong>CRITICAL WARNING:</strong>
              <div className="mt-1">
                "Once the final record is opened, the investigation cannot be undone."
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="btn-return-to-review"
                type="button"
                onClick={() => setShowSealModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#1e1514] border border-[#452e26] text-[#b8a494] hover:text-[#f0e3d2] text-xs font-display uppercase tracking-wider transition-colors"
              >
                Review Theory Again
              </button>

              <button
                id="btn-open-final-record"
                type="button"
                onClick={() => {
                  soundMaster.playWaxSeal();
                  soundMaster.playBellToll(3);
                  setShowSealModal(false);
                  onOpenFinalRecord();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#4d1c1a] border-2 border-[#9e3a36] hover:border-[#cf524d] text-[#fff] text-xs font-display font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-[0_0_25px_rgba(207,82,77,0.4)] cursor-pointer"
              >
                Open Final Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence card popup */}
      <EvidenceModal
        evidence={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />
    </div>
  );
};
