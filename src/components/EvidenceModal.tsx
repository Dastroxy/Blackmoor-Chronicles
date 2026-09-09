import React from 'react';
import { X, FileText, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { EvidenceItem } from '../types';
import { INVESTIGATOR_ROLES } from '../data/case001Data';
import { soundMaster } from '../utils/audioSystem';

interface EvidenceModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ evidence, onClose }) => {
  if (!evidence) return null;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'artifact': return <ShieldAlert className="w-4 h-4 text-[#cf9b61]" />;
      case 'document': return <FileText className="w-4 h-4 text-[#8ea8bd]" />;
      case 'chronology': return <Compass className="w-4 h-4 text-[#b895c4]" />;
      case 'lore': return <Sparkles className="w-4 h-4 text-[#9fb896]" />;
      default: return <FileText className="w-4 h-4 text-[#cf9b61]" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'artifact': return 'PHYSICAL ARTIFACT';
      case 'document': return 'ARCHIVAL RECORD & DOCUMENT';
      case 'chronology': return 'CHRONOLOGICAL LOG & WITNESS';
      case 'lore': return 'PARISH LORE & TRADITION';
      default: return 'CLASSIFIED EVIDENCE';
    }
  };

  return (
    <div 
      id="evidence-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="evidence-dossier-card"
        className="relative w-full max-w-xl bg-[#14100f] border-2 border-[#45342a] rounded-lg shadow-2xl p-6 sm:p-8 text-[#dfd6c9] max-h-[90vh] overflow-y-auto parchment-border candlelight-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-[#3b2b23] pb-4 mb-5">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#2b1f1a] border border-[#634939] text-[#e8ba84] font-mono-archive font-bold text-xs">
                {evidence.code}
              </span>
              <span className="flex items-center space-x-1 text-[11px] uppercase tracking-wider text-[#9c8978] font-display">
                {getCategoryIcon(evidence.category)}
                <span>{getCategoryLabel(evidence.category)}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#f5ebd9] tracking-wide">
              {evidence.name}
            </h2>
          </div>

          <button
            id="btn-close-evidence-modal"
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

        {/* Card Body */}
        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <div className="text-xs uppercase tracking-wider font-display font-semibold text-[#a88f78] mb-1">
              Field Description
            </div>
            <p className="text-[#d8cdbd] bg-[#1a1413] p-3 rounded border border-[#2b201b]">
              {evidence.shortDesc}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-display font-semibold text-[#a88f78] mb-1">
              Archival Registry Notes
            </div>
            <p className="text-[#baa895] bg-[#1a1413] p-3 rounded border border-[#2b201b] italic">
              {evidence.catalogNotes}
            </p>
          </div>

          {/* Connected Dossier Lenses */}
          <div>
            <div className="text-xs uppercase tracking-wider font-display font-semibold text-[#a88f78] mb-1.5">
              Primary Investigation Lenses
            </div>
            <div className="flex flex-wrap gap-2">
              {evidence.relevantRoles.map((roleId) => {
                const role = INVESTIGATOR_ROLES.find(r => r.id === roleId);
                return (
                  <span 
                    key={roleId}
                    className="text-xs px-2.5 py-1 rounded bg-[#211815] border border-[#4d382d] text-[#e0cfbb] font-display"
                  >
                    † {role ? role.title : roleId}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Physical PDF Reminder */}
          <div className="mt-6 pt-4 border-t border-[#31231c] bg-[#1e1513]/60 p-3.5 rounded border border-[#422e23]">
            <div className="text-xs font-display font-semibold text-[#c79c65] uppercase tracking-wide mb-1">
              Dossier Cross-Reference Prompt
            </div>
            <p className="text-xs text-[#b8a48e]">
              {evidence.physicalDossierPrompt}
            </p>
            <p className="text-[11px] text-[#7d695b] mt-2 italic">
              *Full evidentiary analysis and photographs reside in your physical printed dossier packs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            id="btn-dismiss-evidence"
            type="button"
            onClick={() => {
              soundMaster.playPaperRustle();
              onClose();
            }}
            className="px-4 py-2 rounded bg-[#261d19] border border-[#523d30] text-[#e8dccb] hover:bg-[#3b2b23] transition-colors font-display text-xs font-semibold tracking-wider uppercase"
          >
            Return to Index
          </button>
        </div>
      </div>
    </div>
  );
};
