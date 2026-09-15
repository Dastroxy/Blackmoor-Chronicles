import React from 'react';
import { Timer, Clock, AlertTriangle, ScrollText, UserCheck, Pause, Play, RotateCcw, ArrowLeft } from 'lucide-react';
import { AudioControls } from './AudioControls';
import { InvestigatorRole } from '../types';
import { INVESTIGATOR_ROLES } from '../data/case001Data';
import { soundMaster } from '../utils/audioSystem';

interface NavigationHeaderProps {
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  currentRole: InvestigatorRole | null;
  hintsUsedCount: number;
  onSelectRolePrompt: () => void;
  onOpenGuidelines: () => void;
  onReturnToArchive?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  currentRole,
  hintsUsedCount,
  onSelectRolePrompt,
  onOpenGuidelines,
  onReturnToArchive
}) => {
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timerSeconds <= 300 && timerSeconds > 0; // <= 5 mins
  const isMediumTime = timerSeconds <= 600 && timerSeconds > 300; // <= 10 mins
  const isExpired = timerSeconds === 0;

  const roleData = currentRole ? INVESTIGATOR_ROLES.find(r => r.id === currentRole) : null;

  return (
    <header 
      id="main-navigation-header" 
      className="w-full border-b border-[#2d221e] bg-[#0e0c0c]/90 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg"
    >
      {/* Brand & Case Identification */}
      <div className="flex items-center space-x-3">
        {onReturnToArchive && (
          <button
            id="btn-nav-return-archive"
            type="button"
            onClick={onReturnToArchive}
            className="p-1.5 rounded bg-[#151212] border border-[#362924] text-[#8c7b6c] hover:border-[#523f37] hover:text-[#d4c5b2] transition-colors cursor-pointer"
            title="Return to Master Case Archive"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <div className="w-8 h-8 rounded border border-[#523e32] bg-[#1a1413] flex items-center justify-center text-[#c29b62] shadow-inner font-display font-bold text-sm">
          †
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xs tracking-widest text-[#a3907c] uppercase font-display font-semibold">
              The Blackmoor Chronicles
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#291717] border border-[#5e2727] text-[#df9a9a] font-mono-archive">
              CASE 001
            </span>
          </div>
          <div className="text-xs sm:text-sm font-display text-[#ebdcc9] font-medium tracking-wide">
            The Chapel Murder
          </div>
        </div>
      </div>

      {/* Center: Timer & Alerts */}
      <div className="flex items-center space-x-2 sm:space-x-3 order-last md:order-none w-full md:w-auto justify-between md:justify-center pt-2 md:pt-0 border-t md:border-t-0 border-[#221b18]">
        {/* Timer Box */}
        <div 
          id="investigation-timer-display"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded border font-mono-archive transition-all ${
            isExpired 
              ? 'bg-[#291717] border-[#8a3333] text-[#f29696]'
              : isLowTime 
                ? 'bg-[#261513] border-[#914532] text-[#f49f87] animate-pulse' 
                : isMediumTime
                  ? 'bg-[#211a13] border-[#7d562b] text-[#f1c990]'
                  : 'bg-[#151212] border-[#382b26] text-[#dfd4c5]'
          }`}
        >
          <Timer className="w-4 h-4 text-[#ab8a66]" />
          <span className="text-sm font-bold tracking-wider">
            {formatTime(timerSeconds)}
          </span>

          {/* Pause / Resume button */}
          <button
            id="btn-toggle-timer"
            type="button"
            onClick={() => {
              soundMaster.playClockTick();
              onToggleTimer();
            }}
            className="p-1 hover:text-white transition-colors ml-1 text-[#968271]"
            title={isTimerRunning ? "Pause timer" : "Resume timer"}
          >
            {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          {/* Reset button */}
          <button
            id="btn-reset-timer"
            type="button"
            onClick={() => {
              soundMaster.playWaxSeal();
              onResetTimer();
            }}
            className="p-1 hover:text-white transition-colors text-[#968271]"
            title="Reset timer to 30:00"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Status Warning badges */}
        {isLowTime && (
          <div className="hidden lg:flex items-center space-x-1 text-[11px] text-[#f49f87] font-display">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>5 Minutes Remaining</span>
          </div>
        )}
        {isMediumTime && !isLowTime && (
          <div className="hidden lg:flex items-center space-x-1 text-[11px] text-[#f1c990] font-display">
            <Clock className="w-3.5 h-3.5" />
            <span>10 Minutes Warning</span>
          </div>
        )}
        {isExpired && (
          <div className="hidden lg:flex items-center space-x-1 text-[11px] text-[#f29696] font-display">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Time Expired — Deliberation Continues</span>
          </div>
        )}

        {/* Hints counter */}
        <div 
          id="badge-hints-counter"
          className="flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded bg-[#161313] border border-[#302521] text-[#b39b85]"
          title="Hints accessed across the investigation"
        >
          <span className="text-[#7d695b] font-display">HINTS:</span>
          <span className="font-mono-archive font-bold text-[#e0cfbd]">
            {hintsUsedCount} / 3
          </span>
        </div>
      </div>

      {/* Right Controls: Role Badge, Rules & Audio */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Role Lens Button / Indicator */}
        <button
          id="btn-current-role-indicator"
          type="button"
          onClick={onSelectRolePrompt}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-[#1b1513] border border-[#4a362d] text-[#cfbca8] hover:border-[#856144] hover:text-[#f3ede4] transition-colors text-xs"
          title="Switch active role perspective or review physical dossier assignment"
        >
          <UserCheck className="w-3.5 h-3.5 text-[#bfa075]" />
          <span className="font-display font-medium max-w-[120px] truncate">
            {roleData ? roleData.title : 'Select Lens'}
          </span>
        </button>

        {/* Instructions / Protocol */}
        <button
          id="btn-open-guidelines"
          type="button"
          onClick={onOpenGuidelines}
          className="p-1.5 rounded bg-[#151212] border border-[#362924] text-[#8c7b6c] hover:border-[#523f37] hover:text-[#d4c5b2] transition-colors"
          title="Review 5-Lens Investigation Rules"
        >
          <ScrollText className="w-3.5 h-3.5" />
        </button>

        {/* Atmospheric Sound Engine */}
        <AudioControls />
      </div>
    </header>
  );
};
