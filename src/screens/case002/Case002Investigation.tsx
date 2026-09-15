import React from 'react';
import { ArrowLeft, Clock, Pause, Play, RotateCcw, AlertCircle, Video, FileText } from 'lucide-react';
import { soundMaster } from '../../utils/audioSystem';
import { AudioControls } from '../../components/AudioControls';

interface Case002InvestigationProps {
  secondsRemaining: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSubmitAccusation: () => void;
  onReturnToLanding: () => void;
}

export const Case002Investigation: React.FC<Case002InvestigationProps> = ({
  secondsRemaining,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onSubmitAccusation,
  onReturnToLanding
}) => {
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isExpired = secondsRemaining === 0;

  const handleToggle = () => {
    soundMaster.playLockerLatch();
    onToggleTimer();
  };

  const handleReset = () => {
    soundMaster.playPaperRustle();
    onResetTimer();
  };

  const handleAccuse = () => {
    soundMaster.playDoorClick();
    onSubmitAccusation();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between academy-backdrop text-[#c9d1d9] px-4 py-8 sm:px-8">
      {/* Header bar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-[#21262d] pb-4">
        <button
          id="moderator-back-btn"
          type="button"
          onClick={onReturnToLanding}
          className="inline-flex items-center space-x-2 text-xs font-mono-code text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono-code">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#f0f6fc] font-semibold">SESSION ACTIVE</span>
        </div>

        <AudioControls />
      </header>

      {/* Main Moderator Canvas */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8 text-center">
        <div className="space-y-2 mb-6">
          <div className="text-xs font-mono-code tracking-[0.2em] text-[#8b949e] uppercase">
            CASE 002
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f6fc] uppercase font-display">
            THE LAST BELL
          </h1>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#161b22] border border-[#30363d] text-xs font-mono-code text-[#58a6ff]">
            <Clock className="w-3.5 h-3.5" />
            <span>INVESTIGATION IN PROGRESS</span>
          </div>
        </div>

        {/* Large Countdown Timer Box */}
        <div className="my-8 p-8 sm:p-12 rounded-2xl bg-[#161b22]/90 border border-[#30363d] shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-4 right-5 flex items-center space-x-2 text-[11px] font-mono-code text-[#8b949e]">
            <Video className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>REC • [ROOM B-204]</span>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono-code tracking-widest text-[#8b949e] uppercase">
              OFFICIAL COUNTDOWN
            </div>
            <div
              id="countdown-timer-display"
              className={`text-6xl sm:text-8xl md:text-9xl font-mono-code font-bold tracking-wider select-none ${
                isExpired
                  ? 'text-red-400 animate-pulse'
                  : isTimerRunning
                    ? 'text-[#f0f6fc]'
                    : 'text-[#8b949e]'
              }`}
            >
              {formatTime(secondsRemaining)}
            </div>

            <div className="pt-2">
              {isExpired ? (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs font-mono-code">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>TIME EXPIRED • PROCEED TO FINAL ACCUSATION</span>
                </div>
              ) : isTimerRunning ? (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-xs font-mono-code">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>TIMER RUNNING</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-800/60 text-amber-400 text-xs font-mono-code">
                  <span>TIMER PAUSED</span>
                </div>
              )}
            </div>
          </div>

          {/* Timer Controls */}
          <div className="mt-8 pt-6 border-t border-[#21262d] flex flex-wrap items-center justify-center gap-3">
            <button
              id="toggle-timer-button"
              type="button"
              onClick={handleToggle}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-md font-mono-code text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                isTimerRunning
                  ? 'bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] border border-[#30363d]'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              }`}
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>PAUSE TIMER</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>RESUME TIMER</span>
                </>
              )}
            </button>

            <button
              id="reset-timer-button"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] font-mono-code text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET TIMER</span>
            </button>
          </div>
        </div>

        {/* Submit Accusation Button */}
        <div className="space-y-4">
          <button
            id="submit-accusation-btn"
            type="button"
            onClick={handleAccuse}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-md bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-base tracking-wider uppercase shadow-xl shadow-red-950/60 hover:shadow-red-900/80 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <FileText className="w-5 h-5" />
            <span>SUBMIT FINAL ACCUSATION</span>
          </button>
          <div className="text-xs text-[#8b949e] font-mono-code">
            When all investigators have agreed on a theory, proceed to record your accusation
          </div>
        </div>

        {/* Directives */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
          <div className="p-3.5 rounded bg-[#161b22]/70 border border-[#21262d] text-xs space-y-1">
            <div className="text-[#58a6ff] font-mono-code font-semibold uppercase text-[11px]">
              DIRECTIVE 1
            </div>
            <div className="text-[#f0f6fc]">
              “Use the printed dossiers. Build one complete timeline together.”
            </div>
          </div>
          <div className="p-3.5 rounded bg-[#161b22]/70 border border-[#21262d] text-xs space-y-1">
            <div className="text-amber-400 font-mono-code font-semibold uppercase text-[11px]">
              DIRECTIVE 2
            </div>
            <div className="text-[#f0f6fc]">
              “Test every contradiction before making your accusation.”
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full border-t border-[#21262d] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8b949e] font-mono-code gap-2">
        <span>WESTBRIDGE SENIOR ACADEMY • SESSION MODERATOR</span>
        <span>NO WEBSITE EVIDENCE — USE PRINTED DOSSIERS</span>
      </footer>
    </div>
  );
};
