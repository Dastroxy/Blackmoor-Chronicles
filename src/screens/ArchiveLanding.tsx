import React from 'react';
import { Shield, Lock, ChevronRight, FileText, Sparkles, BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { CASE_001_INFO } from '../data/case001Data';
import { soundMaster } from '../utils/audioSystem';
import { AudioControls } from '../components/AudioControls';

interface ArchiveLandingProps {
  onBeginCase: () => void;
  onReturnToArchiveHub?: () => void;
  onSelectCase002?: () => void;
}

export const ArchiveLanding: React.FC<ArchiveLandingProps> = ({ 
  onBeginCase, 
  onReturnToArchiveHub,
  onSelectCase002 
}) => {
  const handleStart = () => {
    soundMaster.playWaxSeal();
    soundMaster.playBellToll(1);
    soundMaster.startAmbience();
    onBeginCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between archive-vignette text-[#ded7cc] px-4 py-8 sm:px-8">
      {/* Top Bar / Seal Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#30231d] pb-4">
        <div className="flex items-center space-x-3">
          {onReturnToArchiveHub && (
            <button
              id="btn-back-to-archive-hub"
              type="button"
              onClick={onReturnToArchiveHub}
              className="p-2 rounded bg-[#1a1311] border border-[#4a3429] hover:border-[#b88c52] text-[#8c7766] hover:text-[#f5ebd9] transition-colors cursor-pointer mr-1"
              title="Return to Master Case Archive"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-9 h-9 rounded-full border border-[#6b4e39] bg-[#1a1311] flex items-center justify-center text-[#c29b62] shadow font-display font-black text-base">
            †
          </div>
          <div>
            <div className="text-[10px] tracking-widest text-[#8c7766] uppercase font-mono-archive">
              CONFIDENTIAL ARCHIVE • EST. 1896
            </div>
            <div className="text-xs font-display tracking-wider text-[#dfd0bd] font-semibold">
              THE BLACKMOOR REGISTRY
            </div>
          </div>
        </div>

        <AudioControls />
      </header>

      {/* Main Cinematic Hero */}
      <main className="max-w-4xl mx-auto w-full my-auto text-center py-10 sm:py-16">
        {/* Archival Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1b1413]/80 border border-[#4a3429] text-[#c9a473] text-xs font-mono-archive mb-6 shadow-inner tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#b88c52]" />
          <span>COOPERATIVE INVESTIGATION • EXACTLY 5 PLAYERS</span>
        </div>

        {/* Grand Title */}
        <div className="space-y-3 mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-wider text-[#f5ebd9] uppercase drop-shadow-md">
            The Blackmoor Chronicles
          </h1>
          <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm font-mono-archive text-[#b89f88] tracking-widest uppercase">
            <span>{CASE_001_INFO.caseNumber}</span>
            <span>•</span>
            <span className="text-[#e2b77d] font-semibold">{CASE_001_INFO.title}</span>
            <span>•</span>
            <span>{CASE_001_INFO.date}</span>
          </div>
        </div>

        {/* Location & Atmosphere quote */}
        <div className="max-w-xl mx-auto mb-10 text-sm sm:text-base text-[#bdae9c] leading-relaxed italic border-y border-[#2b1f1a] py-4 bg-[#140e0d]/50">
          "At the edge of the valley stands St. Aurelius Chapel. Shortly after midnight, Lord Alistair Blackmoor was found dead within its secured walls. Three bell strokes broke the silence."
        </div>

        {/* Central Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            id="btn-begin-investigation"
            type="button"
            onClick={handleStart}
            className="group relative px-8 py-4 rounded bg-[#331c19] border-2 border-[#804b38] hover:border-[#b87455] text-[#f7efe4] font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(184,116,85,0.4)] flex items-center space-x-3 cursor-pointer"
          >
            <span>Begin Investigation</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfa47c]" />
          </button>
        </div>

        {/* The 5 Lenses Feature Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-w-3xl mx-auto text-left">
          <div className="p-3 bg-[#16100f] border border-[#2e211b] rounded">
            <div className="text-[10px] font-mono-archive text-[#857161]">PLAYER 1</div>
            <div className="text-xs font-display font-bold text-[#ddccb8]">Sheriff</div>
            <div className="text-[10px] text-[#968474] mt-1">Chronology & Sites</div>
          </div>
          <div className="p-3 bg-[#16100f] border border-[#2e211b] rounded">
            <div className="text-[10px] font-mono-archive text-[#857161]">PLAYER 2</div>
            <div className="text-xs font-display font-bold text-[#ddccb8]">Investigator</div>
            <div className="text-[10px] text-[#968474] mt-1">Motives & Ledgers</div>
          </div>
          <div className="p-3 bg-[#16100f] border border-[#2e211b] rounded">
            <div className="text-[10px] font-mono-archive text-[#857161]">PLAYER 3</div>
            <div className="text-xs font-display font-bold text-[#ddccb8]">Mortician</div>
            <div className="text-[10px] text-[#968474] mt-1">Body & Pathology</div>
          </div>
          <div className="p-3 bg-[#16100f] border border-[#2e211b] rounded">
            <div className="text-[10px] font-mono-archive text-[#857161]">PLAYER 4</div>
            <div className="text-xs font-display font-bold text-[#ddccb8]">Forensics</div>
            <div className="text-[10px] text-[#968474] mt-1">Traces & Residues</div>
          </div>
          <div className="p-3 bg-[#16100f] border border-[#2e211b] rounded col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono-archive text-[#857161]">PLAYER 5</div>
            <div className="text-xs font-display font-bold text-[#ddccb8]">Shaman</div>
            <div className="text-[10px] text-[#968474] mt-1">Lore & Rituals</div>
          </div>
        </div>
      </main>

      {/* Case Vault Directory / Future Cases */}
      <footer className="max-w-6xl mx-auto w-full pt-8 border-t border-[#261c17]">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-display tracking-widest text-[#8a7667] uppercase flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blackmoor Parish Archives • Case Files</span>
          </div>
          <div className="text-[11px] text-[#6b584a] font-mono-archive">
            SYSTEM VERSION 1.0
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Case 001 Active Card */}
          <div className="p-4 rounded border-2 border-[#543b2f] bg-[#1a1210] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[#2e1d17] border border-[#6b4736] flex items-center justify-center text-[#df9a75] font-display font-bold text-xs">
                001
              </div>
              <div>
                <div className="text-xs font-display font-bold text-[#f0e4d2]">
                  The Chapel Murder
                </div>
                <div className="text-[11px] text-[#968372]">
                  St. Aurelius • Active Case
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-[#331c19] text-[#e8a381] border border-[#6b352e]">
              UNSEALED
            </span>
          </div>

          {/* Case 002 Active Card */}
          <div 
            onClick={onSelectCase002}
            className={`p-4 rounded border transition-colors flex items-center justify-between ${
              onSelectCase002 
                ? 'border-[#2b4263] bg-[#0f141d] hover:border-[#58a6ff] cursor-pointer' 
                : 'border-[#241a16] bg-[#120d0c]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[#162235] border border-[#2b4263] flex items-center justify-center text-[#58a6ff] font-mono-code text-xs">
                002
              </div>
              <div>
                <div className="text-xs font-bold text-[#f0f6fc]">
                  The Last Bell
                </div>
                <div className="text-[11px] text-[#8b949e]">
                  Westbridge Senior Academy
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#162235] text-[#58a6ff] border border-[#2b4263]">
              AVAILABLE
            </span>
          </div>

          {/* Case 003 Locked Card */}
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
                  Pending Excavation
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-[#1c1412] text-[#786455] border border-[#33231d] flex items-center space-x-1">
              <Lock className="w-2.5 h-2.5" />
              <span>LOCKED</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
