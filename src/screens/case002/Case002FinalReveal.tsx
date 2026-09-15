import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ChevronRight, ChevronLeft, 
  RotateCcw, Home, Play, Pause, AlertTriangle, FileText, ShieldAlert
} from 'lucide-react';
import { 
  unpackCase002SealedArchive, 
  Case002MasterRevealData, 
  Case002RevealSection 
} from '../../data/case002/case002SealedArchive';
import { Case002AccusationData } from '../../data/case002/case002Data';
import { soundMaster } from '../../utils/audioSystem';
import { AudioControls } from '../../components/AudioControls';

interface Case002FinalRevealProps {
  submittedAccusation: Case002AccusationData | null;
  onReturnToArchive: () => void;
}

export const Case002FinalReveal: React.FC<Case002FinalRevealProps> = ({
  submittedAccusation,
  onReturnToArchive
}) => {
  const [masterData, setMasterData] = useState<Case002MasterRevealData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);
  const [showAccusationComparison, setShowAccusationComparison] = useState(false);

  // Unpack the sealed archive when screen mounts
  useEffect(() => {
    try {
      const data = unpackCase002SealedArchive();
      setMasterData(data);
      soundMaster.playSchoolBell();
    } catch {
      // Seal breach fallback
    }
  }, []);

  // Auto-pacing progression
  useEffect(() => {
    if (!isPlayingAuto || !masterData) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < masterData.sections.length - 1) {
        soundMaster.playClockTick();
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setIsPlayingAuto(false);
        setRevealFinished(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentStepIndex, isPlayingAuto, masterData]);

  if (!masterData) {
    return (
      <div className="min-h-screen flex items-center justify-center academy-backdrop text-[#c9d1d9]">
        <div className="text-center font-mono-code">
          <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-[#8b949e]">
            Unsealing Master Record...
          </p>
        </div>
      </div>
    );
  }

  const currentSection: Case002RevealSection = masterData.sections[currentStepIndex];
  const isClimaxStep = currentStepIndex === masterData.sections.length - 1;

  const handleNext = () => {
    soundMaster.playPaperRustle();
    if (currentStepIndex < masterData.sections.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      if (currentStepIndex + 1 === masterData.sections.length - 1) {
        soundMaster.playSchoolBell();
        setRevealFinished(true);
      }
    } else {
      setRevealFinished(true);
    }
  };

  const handlePrev = () => {
    soundMaster.playPaperRustle();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    soundMaster.playDoorClick();
    setCurrentStepIndex(0);
    setRevealFinished(false);
    setIsPlayingAuto(false);
  };

  return (
    <div 
      id="case002-final-reveal-screen"
      className="relative min-h-screen flex flex-col justify-between academy-backdrop text-[#c9d1d9] px-4 py-6 sm:px-8 select-none"
    >
      {/* Header Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-[#21262d] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-red-950/60 border border-red-700 flex items-center justify-center text-red-400 font-mono-code font-bold text-xs">
            02
          </div>
          <div>
            <div className="text-[10px] font-mono-code text-red-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>MASTER RECORD UNSEALED</span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-[#f0f6fc] tracking-wider uppercase font-display">
              {masterData.caseTitle} • THE TRUTH
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <AudioControls />
        </div>
      </header>

      {/* Main Section Content */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-mono-code text-[#8b949e] mb-4">
          <span className="uppercase tracking-widest flex items-center gap-2">
            {isClimaxStep ? (
              <span className="text-red-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CULMINATION • MASTER VERDICT</span>
              </span>
            ) : (
              `CASE 002 DOSSIER RECONSTRUCTION • SECTION ${currentStepIndex + 1} OF ${masterData.sections.length}`
            )}
          </span>
          <span>
            {currentStepIndex + 1} / {masterData.sections.length}
          </span>
        </div>

        {/* Section Card */}
        <div
          className={`p-6 sm:p-10 rounded-xl border transition-all duration-300 shadow-2xl ${
            isClimaxStep
              ? 'bg-[#181216] border-red-800/80 shadow-red-950/40'
              : 'bg-[#161b22] border-[#30363d]'
          }`}
        >
          <h2
            className={`text-lg sm:text-2xl font-bold mb-5 tracking-tight uppercase font-display ${
              isClimaxStep ? 'text-red-300' : 'text-[#f0f6fc]'
            }`}
          >
            {currentSection.title}
          </h2>

          <div className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed whitespace-pre-line border-l-2 border-[#58a6ff]/40 pl-5 sm:pl-7 font-sans">
            {currentSection.text}
          </div>
        </div>

        {/* Section Step Dots */}
        <div className="mt-8 flex items-center justify-center space-x-1.5 flex-wrap gap-y-1">
          {masterData.sections.map((sec, idx) => (
            <button
              key={sec.step || idx}
              type="button"
              onClick={() => {
                soundMaster.playPaperRustle();
                setCurrentStepIndex(idx);
                if (idx === masterData.sections.length - 1) {
                  setRevealFinished(true);
                }
              }}
              title={sec.title}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentStepIndex
                  ? 'w-8 bg-red-500'
                  : idx < currentStepIndex
                    ? 'w-2 bg-[#58a6ff]/60 hover:bg-[#58a6ff]'
                    : 'w-2 bg-[#30363d] hover:bg-[#484f58]'
              }`}
            />
          ))}
        </div>

        {/* Navigation Step Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            id="btn-prev-reveal-step"
            type="button"
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className="px-4 py-2 rounded bg-[#161b22] border border-[#30363d] text-xs font-mono-code uppercase tracking-wider text-[#8b949e] hover:text-[#f0f6fc] disabled:opacity-30 disabled:hover:text-[#8b949e] transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              id="btn-toggle-reveal-auto"
              type="button"
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="px-3 py-2 rounded bg-[#161b22] border border-[#30363d] text-xs font-mono-code uppercase tracking-wider text-[#8b949e] hover:text-[#f0f6fc] transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAuto ? 'Pause Auto-Pacing' : 'Auto-Pacing'}</span>
            </button>
          </div>

          <button
            id="btn-next-reveal-step"
            type="button"
            disabled={currentStepIndex === masterData.sections.length - 1}
            onClick={handleNext}
            className="px-5 py-2 rounded bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-xs font-mono-code font-bold uppercase tracking-wider text-white transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-30"
          >
            <span>Next Section</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Conclusion Actions once read */}
        {(revealFinished || isClimaxStep) && (
          <div className="mt-12 p-6 sm:p-8 bg-[#161b22] border border-red-800/80 rounded-xl text-center shadow-2xl">
            <div className="inline-block px-4 py-1 rounded bg-red-950/60 border border-red-800 text-red-400 font-mono-code text-xs font-bold uppercase tracking-widest mb-3">
              CASE 002 • CLOSED
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] mb-2 tracking-tight uppercase font-display">
              Investigation Concluded
            </h3>
            <p className="text-xs text-[#8b949e] max-w-lg mx-auto mb-6">
              The four physical dossiers—Police, Forensics, Autopsy, and Older Sister—have exposed the manufactured alibi and confirmed the truth of Westbridge Senior Academy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="btn-toggle-theory-comparison"
                type="button"
                onClick={() => {
                  soundMaster.playPaperRustle();
                  setShowAccusationComparison(!showAccusationComparison);
                }}
                className="px-5 py-2.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-mono-code text-[#f0f6fc] transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>
                  {showAccusationComparison ? 'Hide Team Accusation' : 'Compare Team Accusation'}
                </span>
              </button>

              <button
                id="btn-play-reveal-again"
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-mono-code text-[#f0f6fc] transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8b949e]" />
                <span>Review From Beginning</span>
              </button>

              <button
                id="btn-return-to-archive-landing"
                type="button"
                onClick={() => {
                  soundMaster.playDoorClick();
                  onReturnToArchive();
                }}
                className="px-6 py-2.5 rounded bg-red-700 hover:bg-red-600 text-xs font-mono-code font-bold uppercase tracking-widest text-white transition-colors flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Case Archive</span>
              </button>
            </div>
          </div>
        )}

        {/* Accusation Comparison Drawer */}
        {showAccusationComparison && submittedAccusation && (
          <div className="mt-8 p-6 rounded-xl bg-[#0d1117] border border-[#30363d] text-left text-xs space-y-4 shadow-xl">
            <div className="border-b border-[#21262d] pb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#f0f6fc] uppercase tracking-wider font-mono-code">
                  Investigators' Sealed Accusation
                </h4>
                <p className="text-[11px] text-[#8b949e]">
                  Submitted at {submittedAccusation.submittedAt} before unsealing the master record:
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-[10px] font-mono-code">
                LOCKED RECORD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#161b22] p-4 rounded border border-[#21262d]">
                <div className="font-mono-code font-bold text-[#8b949e] mb-1 uppercase text-[10px]">
                  1. Accused Prime Suspect:
                </div>
                <div className="text-base font-bold text-red-400">
                  {submittedAccusation.suspect || 'None entered'}
                </div>
              </div>

              <div className="bg-[#161b22] p-4 rounded border border-[#21262d]">
                <div className="font-mono-code font-bold text-[#8b949e] mb-1 uppercase text-[10px]">
                  2. Execution of Murder:
                </div>
                <div className="text-[#f0f6fc] leading-relaxed">
                  {submittedAccusation.method || 'No description provided'}
                </div>
              </div>

              <div className="bg-[#161b22] p-4 rounded border border-[#21262d]">
                <div className="font-mono-code font-bold text-[#8b949e] mb-1 uppercase text-[10px]">
                  3. Underlying Motive:
                </div>
                <div className="text-[#f0f6fc] leading-relaxed">
                  {submittedAccusation.motive || 'No motive provided'}
                </div>
              </div>

              <div className="bg-[#161b22] p-4 rounded border border-[#21262d]">
                <div className="font-mono-code font-bold text-[#8b949e] mb-1 uppercase text-[10px]">
                  4. Cited Dossier Evidence:
                </div>
                <div className="text-[#f0f6fc] leading-relaxed">
                  {submittedAccusation.evidence || 'No evidence cited'}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center border-t border-[#21262d] pt-4 text-[11px] font-mono-code text-[#8b949e]">
        WESTBRIDGE SENIOR ACADEMY • CASE 002: THE LAST BELL • ARCHIVED
      </footer>
    </div>
  );
};
