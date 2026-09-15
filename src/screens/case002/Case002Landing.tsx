import React from 'react';
import { ArrowLeft, ChevronRight, School, ShieldAlert, Video } from 'lucide-react';
import { CASE_002_DOSSIERS } from '../../data/case002/case002Data';
import { soundMaster } from '../../utils/audioSystem';
import { AudioControls } from '../../components/AudioControls';

interface Case002LandingProps {
  onBeginCase: () => void;
  onReturnToArchive: () => void;
}

export const Case002Landing: React.FC<Case002LandingProps> = ({
  onBeginCase,
  onReturnToArchive
}) => {
  const handleStart = () => {
    soundMaster.playDoorClick();
    soundMaster.playSchoolBell();
    onBeginCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between academy-backdrop text-[#c9d1d9] px-4 py-8 sm:px-8 overflow-hidden">
      {/* Background CCTV scanlines */}
      <div className="absolute inset-0 pointer-events-none cctv-scanline opacity-30 z-0" />

      {/* Header bar */}
      <header className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#21262d] pb-4">
        <div className="flex items-center space-x-3">
          <button
            id="back-to-archive-landing-btn"
            type="button"
            onClick={onReturnToArchive}
            className="p-2 rounded bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
            title="Return to Master Case Archive"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#58a6ff] shadow font-mono-code font-bold text-sm">
            02
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-[#8b949e] uppercase font-mono-code flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              INCIDENT LOG • WESTBRIDGE SENIOR ACADEMY
            </div>
            <div className="text-xs tracking-wider text-[#f0f6fc] font-semibold uppercase">
              THE BLACKMOOR CHRONICLES
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-[#161b22] border border-[#30363d] rounded text-[11px] font-mono-code text-[#8b949e]">
            <Video className="w-3.5 h-3.5 text-red-400" />
            <span>CAM-04 • 21:45:00</span>
          </div>
          <AudioControls />
        </div>
      </header>

      {/* Main Atmospheric Hero */}
      <main className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center py-10 sm:py-16">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-mono-code mb-8 tracking-wider shadow-sm">
          <School className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span>WESTBRIDGE SENIOR ACADEMY • HOMICIDE INQUIRY</span>
        </div>

        {/* Title */}
        <div className="space-y-4 mb-8">
          <p className="text-xs sm:text-sm font-mono-code tracking-[0.25em] text-[#8b949e] uppercase">
            THE BLACKMOOR CHRONICLES
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f0f6fc] uppercase font-display">
            CASE 002
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-red-400/90 uppercase font-mono-code">
            THE LAST BELL
          </h2>
        </div>

        {/* Atmospheric Quote */}
        <div className="max-w-2xl mx-auto mb-10 p-6 rounded-lg bg-[#161b22]/70 border border-[#30363d] backdrop-blur-sm text-center shadow-lg">
          <p className="text-lg sm:text-xl text-[#f0f6fc] font-normal leading-relaxed">
            “A student is dead inside Westbridge Senior Academy.
            <br />
            Four investigators. Four different files.
            <br />
            <span className="text-red-400 font-semibold">One truth.</span>”
          </p>
          <div className="mt-4 pt-4 border-t border-[#21262d] flex items-center justify-center space-x-2 text-xs text-[#8b949e] font-mono-code">
            <ShieldAlert className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>PHYSICAL DOSSIER SYSTEM • COMPANION MODERATOR</span>
          </div>
        </div>

        {/* Central Action Button */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            id="open-case-button"
            type="button"
            onClick={handleStart}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-md bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-base tracking-wider uppercase shadow-lg shadow-red-950/50 hover:shadow-red-900/60 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>OPEN CASE</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-[#8b949e] font-mono-code">
            Press to review investigation directives and start timer
          </p>
        </div>
      </main>

      {/* Footer / Dossier Indicators */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full border-t border-[#21262d] pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {CASE_002_DOSSIERS.map((dossier) => (
            <div
              key={dossier.id}
              className="p-3 rounded bg-[#161b22]/60 border border-[#21262d] text-xs space-y-1"
            >
              <div className="text-[10px] font-mono-code text-[#58a6ff] uppercase tracking-wider">
                {dossier.tag}
              </div>
              <div className="font-semibold text-[#f0f6fc]">
                {dossier.title}
              </div>
              <div className="text-[11px] text-[#8b949e] line-clamp-1">
                Printed physical file
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-[11px] text-[#8b949e] font-mono-code">
          All case evidence resides exclusively inside your four printed files.
        </div>
      </footer>
    </div>
  );
};
