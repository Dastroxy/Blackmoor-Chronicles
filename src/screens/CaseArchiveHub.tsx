import React from 'react';
import { BookOpen, ChevronRight, Lock, Sparkles, Users, Clock, School, Shield } from 'lucide-react';
import { CASE_001_INFO } from '../data/case001Data';
import { CASE_002_INFO } from '../data/case002/case002Data';
import { soundMaster } from '../utils/audioSystem';
import { AudioControls } from '../components/AudioControls';

interface CaseArchiveHubProps {
  onSelectCase001: () => void;
  onSelectCase002: () => void;
}

export const CaseArchiveHub: React.FC<CaseArchiveHubProps> = ({
  onSelectCase001,
  onSelectCase002
}) => {
  const handlePickCase001 = () => {
    soundMaster.playWaxSeal();
    soundMaster.playBellToll(1);
    onSelectCase001();
  };

  const handlePickCase002 = () => {
    soundMaster.playDoorClick();
    soundMaster.playSchoolBell();
    onSelectCase002();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between archive-vignette text-[#ded7cc] px-4 py-8 sm:px-8 overflow-hidden">
      {/* Top Bar / Registry Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#30231d] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full border border-[#6b4e39] bg-[#1a1311] flex items-center justify-center text-[#c29b62] shadow font-display font-black text-base">
            †
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-[#8c7766] uppercase font-mono-archive">
              CONFIDENTIAL VAULT • MASTER REGISTRY
            </div>
            <div className="text-xs font-display tracking-wider text-[#dfd0bd] font-semibold">
              THE BLACKMOOR CHRONICLES
            </div>
          </div>
        </div>

        <AudioControls />
      </header>

      {/* Main Archive Hub Hero */}
      <main className="max-w-5xl mx-auto w-full my-auto py-10 sm:py-16">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1b1413]/90 border border-[#4a3429] text-[#c9a473] text-xs font-mono-archive tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#b88c52]" />
            <span>INVESTIGATIVE CASE ARCHIVE • ACTIVE DOSSIERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-wider text-[#f5ebd9] uppercase drop-shadow-md">
            The Blackmoor Chronicles
          </h1>
          <p className="text-sm sm:text-base font-mono-archive text-[#a6917e] tracking-widest uppercase">
            CASE ARCHIVE REGISTRY
          </p>
          <p className="text-xs sm:text-sm text-[#8c7a6b] max-w-xl mx-auto italic">
            Select an active case dossier from the registry below to commence your team's inquiry.
          </p>
        </div>

        {/* Primary Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* CASE 001 CARD */}
          <div 
            id="card-case-001"
            className="group relative rounded-xl border-2 border-[#543b2f] bg-gradient-to-b from-[#1c1412] to-[#120d0c] p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#8f5d44] transition-all duration-300 hover:shadow-[0_0_35px_rgba(184,116,85,0.25)]"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded bg-[#2e1d17] border border-[#6b4736] flex items-center justify-center text-[#df9a75] font-display font-bold text-xs">
                    01
                  </span>
                  <span className="text-xs font-mono-archive text-[#c9a473] uppercase tracking-wider font-semibold">
                    {CASE_001_INFO.caseNumber}
                  </span>
                </div>
                <span className="text-[10px] font-mono-archive px-2.5 py-1 rounded bg-[#2e1814] text-[#e8a381] border border-[#6b352e] uppercase font-bold tracking-wider">
                  STATUS: AVAILABLE
                </span>
              </div>

              {/* Title & Setting */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5ebd9] tracking-wide group-hover:text-[#f8d7b0] transition-colors">
                  {CASE_001_INFO.title}
                </h2>
                <div className="text-xs font-mono-archive text-[#a38c78] mt-1 flex items-center space-x-2">
                  <span>ST. AURELIUS CHAPEL</span>
                  <span>•</span>
                  <span className="text-[#df9a75] font-semibold">{CASE_001_INFO.date}</span>
                </div>
              </div>

              {/* Atmosphere description */}
              <p className="text-xs sm:text-sm text-[#b5a492] leading-relaxed italic border-l-2 border-[#804b38] pl-3 py-1">
                "A locked chapel. A dead lord. A town full of secrets. Shortly after midnight, Lord Alistair Blackmoor was found dead within its secured walls. Three bell strokes broke the silence."
              </p>

              {/* Format features */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono-archive text-[#968372]">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#b88c52]" />
                  <span>5 Investigator Lenses</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#b88c52]" />
                  <span>30-Min Deliberation</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#b88c52]" />
                  <span>Evidence & Ledger Pack</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#b88c52]" />
                  <span>Victorian Gothic Inquiry</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-8 pt-6 border-t border-[#30231d]">
              <button
                id="btn-play-case-001"
                type="button"
                onClick={handlePickCase001}
                className="w-full group/btn inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded bg-[#331c19] border border-[#804b38] hover:border-[#b87455] hover:bg-[#422420] text-[#f7efe4] font-display font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 shadow-lg cursor-pointer"
              >
                <span>OPEN CASE 001</span>
                <ChevronRight className="w-4 h-4 text-[#dfa47c] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CASE 002 CARD */}
          <div 
            id="card-case-002"
            className="group relative rounded-xl border-2 border-[#26354a] bg-gradient-to-b from-[#0f141d] to-[#0a0d14] p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#388bfd] transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,139,253,0.2)]"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded bg-[#162235] border border-[#2b4263] flex items-center justify-center text-[#58a6ff] font-mono-code font-bold text-xs">
                    02
                  </span>
                  <span className="text-xs font-mono-code text-[#58a6ff] uppercase tracking-wider font-semibold">
                    {CASE_002_INFO.caseNumber}
                  </span>
                </div>
                <span className="text-[10px] font-mono-code px-2.5 py-1 rounded bg-[#13233a] text-[#58a6ff] border border-[#2b4770] uppercase font-bold tracking-wider">
                  STATUS: AVAILABLE
                </span>
              </div>

              {/* Title & Setting */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-wide uppercase font-display group-hover:text-red-300 transition-colors">
                  {CASE_002_INFO.title}
                </h2>
                <div className="text-xs font-mono-code text-[#8b949e] mt-1 flex items-center space-x-2">
                  <span>WESTBRIDGE SENIOR ACADEMY</span>
                  <span>•</span>
                  <span className="text-red-400 font-semibold">{CASE_002_INFO.date}</span>
                </div>
              </div>

              {/* Atmosphere description */}
              <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed italic border-l-2 border-red-500/80 pl-3 py-1 font-sans">
                "A student is dead inside Westbridge Senior Academy. Four investigators. Four different files. One truth. Everyone has something to hide."
              </p>

              {/* Format features */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono-code text-[#8b949e]">
                <div className="flex items-center space-x-1.5">
                  <School className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>4 Physical Dossiers</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>60-Min Countdown</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Printed Dossiers Only</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Academy Companion</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-8 pt-6 border-t border-[#21262d]">
              <button
                id="btn-play-case-002"
                type="button"
                onClick={handlePickCase002}
                className="w-full group/btn inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-mono-code font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-red-950/50 cursor-pointer"
              >
                <span>OPEN CASE 002</span>
                <ChevronRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Locked Registry Vault Items */}
        <div className="pt-6 border-t border-[#261c17]">
          <div className="text-xs font-display tracking-widest text-[#8a7667] uppercase mb-4 flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Future Blackmoor Archives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-[#241a16] bg-[#120d0c] opacity-60 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-[#17110f] border border-[#2e201b] flex items-center justify-center text-[#6e5a4b] font-display text-xs">
                  003
                </div>
                <div>
                  <div className="text-xs font-display font-semibold text-[#8a7767]">
                    The High Moor Foundry
                  </div>
                  <div className="text-[11px] text-[#5e4f42]">
                    Pending Excavation • 1902
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-[#1c1412] text-[#786455] border border-[#33231d] flex items-center space-x-1">
                <Lock className="w-2.5 h-2.5" />
                <span>LOCKED</span>
              </span>
            </div>

            <div className="p-4 rounded border border-[#241a16] bg-[#120d0c] opacity-60 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-[#17110f] border border-[#2e201b] flex items-center justify-center text-[#6e5a4b] font-display text-xs">
                  004
                </div>
                <div>
                  <div className="text-xs font-display font-semibold text-[#8a7767]">
                    The Raven Codicil
                  </div>
                  <div className="text-[11px] text-[#5e4f42]">
                    Sealed In Chancery
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-[#1c1412] text-[#786455] border border-[#33231d] flex items-center space-x-1">
                <Lock className="w-2.5 h-2.5" />
                <span>LOCKED</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full pt-4 border-t border-[#261c17] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b584a] font-mono-archive gap-2">
        <span>THE BLACKMOOR CHRONICLES • CASE ARCHIVE REGISTRY</span>
        <span>VERSION 2.0 • COOPERATIVE & PHYSICAL DOSSIER PLATFORM</span>
      </footer>
    </div>
  );
};
