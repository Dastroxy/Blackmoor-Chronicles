import React from 'react';
import { ArrowLeft, Play, ShieldAlert, CheckCircle, EyeOff, Users, AlertTriangle, FileText } from 'lucide-react';
import { CASE_002_DOSSIERS } from '../../data/case002/case002Data';
import { soundMaster } from '../../utils/audioSystem';
import { AudioControls } from '../../components/AudioControls';

interface Case002BriefingProps {
  onStartInvestigation: () => void;
  onBackToLanding: () => void;
}

export const Case002Briefing: React.FC<Case002BriefingProps> = ({
  onStartInvestigation,
  onBackToLanding
}) => {
  const handleProceed = () => {
    soundMaster.playDoorClick();
    soundMaster.playSchoolBell();
    onStartInvestigation();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between academy-backdrop text-[#c9d1d9] px-4 py-8 sm:px-8">
      {/* Header bar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-[#21262d] pb-4">
        <button
          id="back-to-landing-btn"
          type="button"
          onClick={onBackToLanding}
          className="inline-flex items-center space-x-2 text-xs font-mono-code text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div className="text-center hidden sm:block">
          <span className="text-xs font-mono-code text-[#58a6ff] tracking-widest uppercase">
            CASE BRIEFING • MODERATOR GUIDELINES
          </span>
        </div>

        <AudioControls />
      </header>

      {/* Main Briefing Content */}
      <main className="max-w-4xl mx-auto w-full my-auto py-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-mono-code uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CRITICAL INVESTIGATOR PROTOCOL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] uppercase tracking-tight font-display">
            CASE BRIEFING
          </h1>
          <p className="text-base text-[#8b949e] max-w-xl mx-auto">
            You have been given four separate investigation dossiers.
          </p>
        </div>

        {/* 4 Dossiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CASE_002_DOSSIERS.map((dossier) => (
            <div
              key={dossier.id}
              className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/50 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono-code text-[#58a6ff] uppercase px-2 py-0.5 rounded bg-[#0d1117] border border-[#21262d]">
                    {dossier.tag}
                  </span>
                  <FileText className="w-4 h-4 text-[#8b949e]" />
                </div>
                <h3 className="text-base font-bold text-[#f0f6fc] uppercase tracking-wide mb-1 font-mono-code">
                  {dossier.title}
                </h3>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                  {dossier.subtitle}
                </p>
              </div>
              <div className="text-[11px] font-mono-code text-[#58a6ff]/80 pt-2 border-t border-[#21262d]">
                PRINTED PHYSICAL FILE
              </div>
            </div>
          ))}
        </div>

        {/* Rules of Engagement */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#161b22]/90 border border-[#30363d] shadow-lg mb-8 space-y-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-[#f0f6fc] uppercase font-mono-code">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>RULES OF ENGAGEMENT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start space-x-3 p-3 rounded bg-[#0d1117]/80 border border-[#21262d]">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#f0f6fc]">
                  Physical Records Only
                </div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  Everything needed to solve the case is inside the printed dossiers.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded bg-[#0d1117]/80 border border-[#21262d]">
              <EyeOff className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#f0f6fc]">
                  No Online Searching
                </div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  Do not use the website to search for evidence.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded bg-[#0d1117]/80 border border-[#21262d]">
              <Users className="w-5 h-5 text-[#58a6ff] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#f0f6fc]">
                  Cross-Communicate
                </div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  Share information with the other investigators.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded bg-[#0d1117]/80 border border-[#21262d]">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[#f0f6fc]">
                  Corroborate Contradictions
                </div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  Do not make your final accusation based on motive alone.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start button */}
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <button
            id="start-investigation-btn"
            type="button"
            onClick={handleProceed}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-md bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-base tracking-wider uppercase shadow-lg shadow-red-950/50 hover:shadow-red-900/60 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START INVESTIGATION</span>
          </button>
          <p className="text-xs text-[#8b949e] font-mono-code">
            Begins the official 60-minute investigation countdown
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-[#21262d] pt-4 text-center text-xs text-[#8b949e] font-mono-code">
        WESTBRIDGE SENIOR ACADEMY • OFFICIAL MODERATOR DESK
      </footer>
    </div>
  );
};
