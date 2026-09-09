import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, ShieldCheck, ChevronRight, ChevronLeft, 
  RotateCcw, Home, Play, Pause, BookOpen, Volume2, Sparkles, ScrollText, AlertCircle
} from 'lucide-react';
import { unpackSealedArchive, MasterRevealData, RevealSection } from '../data/sealedArchive';
import { TheorySubmissionData } from '../types';
import { soundMaster } from '../utils/audioSystem';
import { AudioControls } from '../components/AudioControls';

interface FinalRevealProps {
  submittedTheory: TheorySubmissionData | null;
  onReturnToArchive: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({
  submittedTheory,
  onReturnToArchive
}) => {
  const [masterData, setMasterData] = useState<MasterRevealData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);
  const [showTheoryComparison, setShowTheoryComparison] = useState(false);

  const audioHandleRef = useRef<{ stop: () => void; isPlaying: () => boolean } | null>(null);

  // Unpack the sealed archive when screen mounts
  useEffect(() => {
    try {
      const data = unpackSealedArchive();
      setMasterData(data);
    } catch (err) {
      console.error("Seal breach error:", err);
    }

    // Play final-reveal audio if present
    audioHandleRef.current = soundMaster.playAudioTrack(
      '/audio/final-reveal.mp3',
      () => {
        setRevealFinished(true);
      },
      () => {
        // Fallback to text pacing
      }
    );

    return () => {
      if (audioHandleRef.current) {
        audioHandleRef.current.stop();
      }
    };
  }, []);

  // Auto progression if user toggles autoplay
  useEffect(() => {
    if (!isPlayingAuto || !masterData) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < masterData.sections.length - 1) {
        soundMaster.playClockTick();
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsPlayingAuto(false);
        setRevealFinished(true);
      }
    }, 7500); // 7.5s per section in auto mode

    return () => clearTimeout(timer);
  }, [currentStepIndex, isPlayingAuto, masterData]);

  if (!masterData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0b0b] text-[#ded7cc]">
        <div className="text-center font-display">
          <div className="w-10 h-10 border-2 border-[#804b38] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-[#a8927e]">Breaking Archival Seal...</p>
        </div>
      </div>
    );
  }

  const currentSection = masterData.sections[currentStepIndex];
  const isClimaxStep = currentStepIndex === masterData.sections.length - 1;

  const handleNext = () => {
    soundMaster.playPaperRustle();
    if (currentStepIndex < masterData.sections.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      if (currentStepIndex + 1 === masterData.sections.length - 1) {
        soundMaster.playBellToll(1);
        setRevealFinished(true);
      }
    } else {
      setRevealFinished(true);
    }
  };

  const handlePrev = () => {
    soundMaster.playPaperRustle();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleRestartReveal = () => {
    soundMaster.playWaxSeal();
    setCurrentStepIndex(0);
    setRevealFinished(false);
    setIsPlayingAuto(false);
  };

  return (
    <div 
      id="final-reveal-screen"
      className="relative min-h-screen flex flex-col justify-between archive-vignette text-[#ded7cc] px-4 py-6 sm:px-8 select-none"
    >
      {/* Solemn Archival Header (No investigation controls) */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-[#30221c] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-[#803d33] bg-[#211111] flex items-center justify-center text-[#e89b9b] font-display font-bold text-sm">
            †
          </div>
          <div>
            <div className="text-[10px] font-mono-archive text-[#a66a6a] uppercase tracking-widest">
              CASE 001 • FINAL RECORD UNSEALED
            </div>
            <h1 className="text-xs sm:text-sm font-display font-bold text-[#f5ebd9] tracking-wider uppercase">
              The Truth of St. Aurelius
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <AudioControls />
        </div>
      </header>

      {/* Main Cinematic Text Narration */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-mono-archive text-[#8c7766] mb-4">
          <span className="uppercase tracking-widest">
            {isClimaxStep ? (
              <span className="text-[#e29b9b] font-bold">CULMINATION • RESPONSIBLE IDENTITY</span>
            ) : (
              `EVIDENTIARY RECONSTRUCTION • ${currentSection.step} OF ${masterData.sections.length}`
            )}
          </span>
          <span>
            {currentStepIndex + 1} / {masterData.sections.length}
          </span>
        </div>

        {/* Narrative Card */}
        <div className={`p-6 sm:p-10 rounded-lg border-2 shadow-2xl transition-all duration-500 parchment-border candlelight-glow ${
          isClimaxStep 
            ? 'bg-[#241313] border-[#8a3333]' 
            : 'bg-[#181110] border-[#423126]'
        }`}>
          {/* Section Heading */}
          <h2 className={`text-lg sm:text-2xl font-display font-bold mb-5 tracking-wide ${
            isClimaxStep ? 'text-[#ffdbdb]' : 'text-[#f5ebd9]'
          }`}>
            {currentSection.title}
          </h2>

          {/* Section Text */}
          <div className="text-base sm:text-lg text-[#ded3c3] font-serif leading-relaxed whitespace-pre-line border-l-2 border-[#804b38] pl-5 sm:pl-7">
            {currentSection.text}
          </div>
        </div>

        {/* Progress Timeline Dots */}
        <div className="mt-8 flex items-center justify-center space-x-1.5 flex-wrap gap-y-1">
          {masterData.sections.map((sec, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundMaster.playPaperRustle();
                setCurrentStepIndex(idx);
                if (idx === masterData.sections.length - 1) {
                  setRevealFinished(true);
                }
              }}
              title={sec.title}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-7 bg-[#df9775]'
                  : idx < currentStepIndex
                    ? 'w-2 bg-[#523d32]'
                    : 'w-2 bg-[#211714]'
              }`}
            />
          ))}
        </div>

        {/* Step Navigation Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            id="btn-prev-reveal-step"
            type="button"
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className="px-4 py-2 rounded bg-[#1c1412] border border-[#38271e] text-xs font-display uppercase tracking-wider text-[#b8a494] hover:text-[#f0e3d2] disabled:opacity-40 disabled:hover:text-[#b8a494] transition-colors flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              id="btn-toggle-reveal-auto"
              type="button"
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="px-3 py-2 rounded bg-[#1c1412] border border-[#38271e] text-xs font-display uppercase tracking-wider text-[#b8a494] hover:text-[#f0e3d2] transition-colors flex items-center space-x-1.5"
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
            className="px-5 py-2 rounded bg-[#331c19] border border-[#6b3f2e] text-xs font-display font-bold uppercase tracking-wider text-[#f5ebd9] hover:bg-[#4a2723] transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-30"
          >
            <span>Next Section</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Finished / Case Closed Stamp Block */}
        {(revealFinished || isClimaxStep) && (
          <div className="mt-12 p-6 sm:p-8 bg-[#171010] border-2 border-[#662828] rounded-lg text-center shadow-2xl animate-fade-in">
            <div className="inline-block px-4 py-1 rounded bg-[#331414] border border-[#802e2e] text-[#f29696] font-mono-archive text-xs font-bold uppercase tracking-widest mb-3">
              CASE 001 • CLOSED
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faecec] mb-2 tracking-wide">
              Investigation Complete
            </h3>
            <p className="text-xs text-[#bda99a] max-w-lg mx-auto mb-6">
              The physical evidence has been united. The five lenses of the Sheriff, Investigator, Mortician, Forensics Expert, and Shaman have brought the truth of St. Aurelius into the light.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="btn-toggle-theory-comparison"
                type="button"
                onClick={() => {
                  soundMaster.playPaperRustle();
                  setShowTheoryComparison(!showTheoryComparison);
                }}
                className="px-5 py-2.5 rounded bg-[#211614] border border-[#4a3429] text-xs font-display text-[#ded0be] hover:border-[#856144] transition-colors flex items-center space-x-2"
              >
                <ScrollText className="w-3.5 h-3.5 text-[#cf9b61]" />
                <span>{showTheoryComparison ? 'Hide Team Submission' : 'Compare Team Theory'}</span>
              </button>

              <button
                id="btn-play-reveal-again"
                type="button"
                onClick={handleRestartReveal}
                className="px-5 py-2.5 rounded bg-[#211614] border border-[#4a3429] text-xs font-display text-[#ded0be] hover:border-[#856144] transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#86a8c4]" />
                <span>Play Reveal Again</span>
              </button>

              <button
                id="btn-return-to-archive-landing"
                type="button"
                onClick={() => {
                  soundMaster.playWaxSeal();
                  onReturnToArchive();
                }}
                className="px-6 py-2.5 rounded bg-[#3d1818] border border-[#7d2f2f] text-xs font-display font-bold uppercase tracking-widest text-[#fff] hover:bg-[#572222] transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Archive</span>
              </button>
            </div>
          </div>
        )}

        {/* Team Theory Comparison Drawer */}
        {showTheoryComparison && submittedTheory && (
          <div className="mt-8 p-6 rounded-lg bg-[#140e0d] border border-[#402b23] text-left text-xs space-y-4">
            <div className="border-b border-[#2d201a] pb-3">
              <h4 className="text-sm font-display font-bold text-[#e6b980] uppercase tracking-wider">
                Investigators' Sealed Theory
              </h4>
              <p className="text-[11px] text-[#8c7766]">
                Here is what your five investigators submitted prior to unsealing the master record:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Accused Culprit:</div>
                <div className="text-[#f5ebd9] font-semibold">{submittedTheory.responsible || 'None entered'}</div>
              </div>
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Murder Method:</div>
                <div className="text-[#ded1c0]">{submittedTheory.method}</div>
              </div>
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Stated Motive:</div>
                <div className="text-[#ded1c0]">{submittedTheory.motive}</div>
              </div>
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Secured Chapel Theory:</div>
                <div className="text-[#ded1c0]">{submittedTheory.securedChapel}</div>
              </div>
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Three Bell Strokes:</div>
                <div className="text-[#ded1c0]">{submittedTheory.bellStrokes}</div>
              </div>
              <div className="bg-[#1c1513] p-3 rounded border border-[#2b201a]">
                <div className="font-display font-bold text-[#baa796] mb-1">Reliquary & Ledger:</div>
                <div className="text-[#ded1c0]">{submittedTheory.reliquary} • {submittedTheory.ledger}</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Note */}
      <footer className="max-w-4xl mx-auto w-full text-center border-t border-[#261b17] pt-4 text-[11px] font-mono-archive text-[#6e5849]">
        THE BLACKMOOR CHRONICLES • CASE FILE 001 ARCHIVED & PRESERVED
      </footer>
    </div>
  );
};
