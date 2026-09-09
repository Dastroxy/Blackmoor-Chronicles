import React from 'react';
import { X, Users, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { INVESTIGATOR_ROLES } from '../data/case001Data';
import { soundMaster } from '../utils/audioSystem';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="guidelines-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="guidelines-card"
        className="relative w-full max-w-2xl bg-[#14100f] border-2 border-[#45342a] rounded-lg shadow-2xl p-6 sm:p-8 text-[#dfd6c9] max-h-[90vh] overflow-y-auto parchment-border candlelight-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#3b2b23] pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded border border-[#694c39] bg-[#211714] flex items-center justify-center text-[#c29b62]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono-archive uppercase tracking-widest text-[#a8927e]">
                Investigative Protocol
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#f5ebd9]">
                Rules of the Archive
              </h2>
            </div>
          </div>

          <button
            id="btn-close-guidelines"
            type="button"
            onClick={() => {
              soundMaster.playPaperRustle();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-[#2e211b] text-[#9c8978] hover:text-[#f5ebd9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-[#cebfad] leading-relaxed">
          {/* Core premise */}
          <div className="bg-[#1c1513] p-4 rounded border border-[#3b2a22]">
            <h3 className="text-sm font-display font-bold text-[#e6b980] mb-1.5 flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#c79c65]" />
              <span>COOPERATIVE, MODERATOR-FREE INQUIRY</span>
            </h3>
            <p className="text-xs text-[#b8a48e]">
              There is <strong>no traitor</strong>, <strong>no murderer among the players</strong>, and <strong>no elimination</strong>.
              All five of you are official investigators working collaboratively. The truth is distributed across your five physical dossiers.
            </p>
          </div>

          {/* The 5 Lenses */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-display font-semibold text-[#a88f78] mb-3 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#9c826e]" />
              <span>The Five Physical Dossiers</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {INVESTIGATOR_ROLES.map((role) => (
                <div key={role.id} className="p-3 bg-[#171211] border border-[#2e221c] rounded">
                  <div className="text-xs font-display font-bold text-[#e0cfbb]">{role.title}</div>
                  <div className="text-[11px] text-[#8e7b6c] mt-0.5">{role.subtitle}</div>
                  <div className="text-[11px] text-[#b09e8d] mt-1.5">
                    Focus: {role.focus.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rule of Information Sharing */}
          <div className="bg-[#1c1513] p-4 rounded border border-[#3b2a22]">
            <h3 className="text-sm font-display font-bold text-[#e6b980] mb-1.5 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#c79c65]" />
              <span>THE FIVE-LENS PRINCIPLE</span>
            </h3>
            <p className="text-xs text-[#b8a48e] mb-2">
              No single investigator holds enough evidence to reconstruct the night alone.
              A clue only becomes conclusive when combined with another investigator’s lens.
            </p>
            <ul className="text-xs text-[#9c8978] list-disc list-inside space-y-1">
              <li>Read your assigned physical printed dossier thoroughly.</li>
              <li>Communicate your findings verbally. Do not simply swap papers.</li>
              <li>Cross-reference the stopped watch and bell against biological time of death.</li>
              <li>Distinguish ancient parish folklore from deliberate physical staging.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            id="btn-dismiss-guidelines"
            type="button"
            onClick={() => {
              soundMaster.playPaperRustle();
              onClose();
            }}
            className="px-5 py-2.5 rounded bg-[#2e211b] border border-[#523d30] text-[#e8dccb] hover:bg-[#3b2b23] transition-colors font-display text-xs font-semibold tracking-wider uppercase"
          >
            Close Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
