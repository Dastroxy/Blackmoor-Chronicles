import React, { useState } from 'react';
import { ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';
import { CASE_002_SUSPECTS, Case002AccusationData } from '../../data/case002/case002Data';
import { soundMaster } from '../../utils/audioSystem';
import { AudioControls } from '../../components/AudioControls';

interface Case002AccusationProps {
  initialData: Case002AccusationData | null;
  onConfirmAccusation: (data: Case002AccusationData) => void;
  onBackToInvestigation: () => void;
}

export const Case002Accusation: React.FC<Case002AccusationProps> = ({
  initialData,
  onConfirmAccusation,
  onBackToInvestigation
}) => {
  const [suspect, setSuspect] = useState<string>(initialData?.suspect || '');
  const [method, setMethod] = useState<string>(initialData?.method || '');
  const [motive, setMotive] = useState<string>(initialData?.motive || '');
  const [evidence, setEvidence] = useState<string>(initialData?.evidence || '');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspect) {
      setErrorMessage('Please select the prime suspect from the list.');
      return;
    }

    soundMaster.playWaxSeal();
    soundMaster.playSchoolBell();
    onConfirmAccusation({
      suspect,
      method,
      motive,
      evidence,
      submittedAt: new Date().toLocaleTimeString()
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between academy-backdrop text-[#c9d1d9] px-4 py-8 sm:px-8">
      {/* Header bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-[#21262d] pb-4">
        <button
          id="back-to-investigation-btn"
          type="button"
          onClick={onBackToInvestigation}
          className="inline-flex items-center space-x-2 text-xs font-mono-code text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO INVESTIGATION</span>
        </button>

        <div className="text-xs font-mono-code text-red-400 font-semibold tracking-wider uppercase">
          STAGE 4 • FINAL ACCUSATION
        </div>

        <AudioControls />
      </header>

      {/* Main Accusation Form */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-mono-code uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL SUBMISSION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f6fc] uppercase font-display">
            FINAL ACCUSATION
          </h1>
          <p className="text-sm text-[#8b949e] font-mono-code">
            Make your decision before opening the final record.
          </p>
        </div>

        <form
          id="final-accusation-form"
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-[#30363d] shadow-2xl space-y-6"
        >
          {/* 1. Prime Suspect */}
          <div className="space-y-2">
            <label
              htmlFor="suspect-select"
              className="block text-xs font-mono-code text-[#f0f6fc] font-semibold uppercase tracking-wider flex items-center justify-between"
            >
              <span>1. PRIMARY SUSPECT (REQUIRED)</span>
              <span className="text-[#8b949e] text-[11px]">Select 1 of 9 suspects</span>
            </label>
            <select
              id="suspect-select"
              value={suspect}
              onChange={(e) => {
                setSuspect(e.target.value);
                setErrorMessage('');
              }}
              className="w-full px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] font-medium text-sm focus:outline-none focus:border-[#58a6ff] transition-colors cursor-pointer"
            >
              <option value="" disabled>
                -- Select the person you believe is responsible --
              </option>
              {CASE_002_SUSPECTS.map((name) => (
                <option key={name} value={name} className="bg-[#161b22] text-[#f0f6fc]">
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Method */}
          <div className="space-y-2">
            <label
              htmlFor="how-happened-input"
              className="block text-xs font-mono-code text-[#f0f6fc] font-semibold uppercase tracking-wider"
            >
              2. HOW DID THE MURDER HAPPEN?
            </label>
            <textarea
              id="how-happened-input"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Detail the execution of the crime, the murder weapon or solvent, and the sequence of events in the Biology Prep Room..."
              rows={3}
              className="w-full px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors resize-y font-sans"
            />
          </div>

          {/* 3. Motive */}
          <div className="space-y-2">
            <label
              htmlFor="why-motive-input"
              className="block text-xs font-mono-code text-[#f0f6fc] font-semibold uppercase tracking-wider"
            >
              3. WHY DID THE KILLER DO IT?
            </label>
            <textarea
              id="why-motive-input"
              value={motive}
              onChange={(e) => setMotive(e.target.value)}
              placeholder="What was the underlying motive? Explain the financial, personal, or academic conflict..."
              rows={2}
              className="w-full px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors resize-y font-sans"
            />
          </div>

          {/* 4. Evidence */}
          <div className="space-y-2">
            <label
              htmlFor="evidence-proves-input"
              className="block text-xs font-mono-code text-[#f0f6fc] font-semibold uppercase tracking-wider"
            >
              4. WHAT EVIDENCE PROVES YOUR THEORY?
            </label>
            <textarea
              id="evidence-proves-input"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Cite specific clues across Police, Forensics, Autopsy, and Older Sister dossiers (e.g. CCTV gap, paint swab, bell trigger)..."
              rows={3}
              className="w-full px-4 py-3 rounded-md bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors resize-y font-sans"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded bg-red-950/40 border border-red-800 text-red-400 text-xs font-mono-code text-center">
              {errorMessage}
            </div>
          )}

          <div className="pt-2">
            <button
              id="unseal-final-record-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-md bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-base tracking-wider uppercase shadow-lg shadow-red-950/60 hover:shadow-red-900/80 transition-all duration-200 cursor-pointer active:scale-98"
            >
              <KeyRound className="w-5 h-5" />
              <span>UNSEAL FINAL RECORD</span>
            </button>
            <p className="mt-2 text-center text-xs text-[#8b949e] font-mono-code">
              Once unsealed, the official master archive will be decrypted.
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-[#21262d] pt-4 text-center text-xs text-[#8b949e] font-mono-code">
        WESTBRIDGE SENIOR ACADEMY • HOMICIDE DOSSIER INQUIRY
      </footer>
    </div>
  );
};
