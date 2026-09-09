import React, { useState } from 'react';
import { Shield, Search, Stethoscope, Microscope, Sparkles, Check, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { INVESTIGATOR_ROLES } from '../data/case001Data';
import { InvestigatorRole } from '../types';
import { soundMaster } from '../utils/audioSystem';

interface RoleSelectionProps {
  currentRole: InvestigatorRole | null;
  onRoleSelected: (role: InvestigatorRole) => void;
  onProceedToInvestigation: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  currentRole,
  onRoleSelected,
  onProceedToInvestigation
}) => {
  const [selectedRole, setSelectedRole] = useState<InvestigatorRole | null>(currentRole || 'sheriff');

  const getRoleIcon = (roleId: InvestigatorRole) => {
    switch (roleId) {
      case 'sheriff': return <Shield className="w-5 h-5 text-[#d4995f]" />;
      case 'investigator': return <Search className="w-5 h-5 text-[#86a8c4]" />;
      case 'mortician': return <Stethoscope className="w-5 h-5 text-[#c48686]" />;
      case 'forensics': return <Microscope className="w-5 h-5 text-[#86c496]" />;
      case 'shaman': return <Sparkles className="w-5 h-5 text-[#b986c4]" />;
    }
  };

  const handleSelect = (roleId: InvestigatorRole) => {
    soundMaster.playPaperRustle();
    setSelectedRole(roleId);
    onRoleSelected(roleId);
  };

  const handleConfirm = () => {
    soundMaster.playWaxSeal();
    soundMaster.playBellToll(1);
    onProceedToInvestigation();
  };

  return (
    <div 
      id="role-selection-screen" 
      className="relative min-h-screen flex flex-col justify-between archive-vignette text-[#ded7cc] px-4 py-8 sm:px-8"
    >
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full text-center mb-8 border-b border-[#30221c] pb-6">
        <div className="text-xs font-mono-archive tracking-widest text-[#947e6d] uppercase mb-2">
          BLACKMOOR PARISH ARCHIVES • DOSSIER ALLOCATION
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#f5ebd9] tracking-wide mb-3">
          Select Your Investigative Lens
        </h1>
        <p className="text-sm text-[#baa996] max-w-2xl mx-auto leading-relaxed">
          Each player holds a different physical dossier. There are no redundant lenses and no traitors.
          Select the role matching your printed dossier before the team enters the investigation chamber.
        </p>
      </header>

      {/* 5 Role Cards Grid */}
      <main className="max-w-5xl mx-auto w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {INVESTIGATOR_ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                id={`card-role-${role.id}`}
                onClick={() => handleSelect(role.id)}
                className={`group relative p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#211613] border-[#966344] shadow-[0_0_25px_rgba(150,99,68,0.3)] scale-[1.02]'
                    : 'bg-[#140e0d] border-[#2d201a] hover:border-[#523a2e] hover:bg-[#1a1210]'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#966344] text-[#fff] text-[10px] font-mono-archive font-bold flex items-center space-x-1 shadow">
                    <Check className="w-3 h-3" />
                    <span>ASSIGNED</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded border border-[#3b2a22] bg-[#1a1210] flex items-center justify-center">
                      {getRoleIcon(role.id)}
                    </div>
                    <span className="text-[10px] font-mono-archive text-[#786455] font-semibold">
                      {role.dossierCode.replace('DOSSIER ', '')}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-[#f5ebd9] tracking-wide mb-1">
                    {role.title}
                  </h3>
                  <div className="text-xs text-[#a69280] mb-4 italic">
                    {role.subtitle}
                  </div>

                  <div className="text-xs text-[#baa794] leading-relaxed mb-4">
                    {role.description}
                  </div>
                </div>

                <div className="border-t border-[#2d201a] pt-3 mt-2">
                  <div className="text-[10px] uppercase font-mono-archive text-[#857161] mb-1.5 font-semibold">
                    Core Focus:
                  </div>
                  <ul className="text-[11px] text-[#9c8978] space-y-1">
                    {role.focus.map((item, i) => (
                      <li key={i} className="flex items-center space-x-1">
                        <span className="text-[#8c674b]">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Dossier Warning Callout */}
        <div className="mt-8 bg-[#1a1210] border border-[#4a3429] rounded-lg p-5 max-w-3xl mx-auto flex items-start space-x-4 shadow-lg">
          <AlertCircle className="w-6 h-6 text-[#d4995f] shrink-0 mt-0.5" />
          <div className="text-xs text-[#c4b3a1] leading-relaxed">
            <div className="font-display font-bold text-[#f0e3d2] text-sm mb-1 uppercase tracking-wide">
              MANDATORY INVESTIGATION DIRECTIVE
            </div>
            <p className="mb-1 text-[#d8cab9]">
              "You are responsible for one lens of the investigation. Do not attempt to solve the case alone. Read your assigned physical dossier before continuing."
            </p>
            <p className="text-[#968372] text-[11px]">
              The web archive acts solely as the neutral moderator, timer, and theory repository. All underlying records, witness logs, and crime scene schematics reside strictly within your printed physical booklets.
            </p>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-[#30221c] pt-5 gap-4">
        <div className="text-xs text-[#8c7766] font-mono-archive">
          ROLE SELECTED: <span className="text-[#ebdcc9] font-bold uppercase">{selectedRole}</span>
        </div>

        <button
          id="btn-commence-investigation"
          type="button"
          onClick={handleConfirm}
          className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#331c19] border-2 border-[#804b38] hover:border-[#b87455] text-[#f7efe4] font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(184,116,85,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Commence Investigation</span>
          <ArrowRight className="w-4 h-4 text-[#dfa47c]" />
        </button>
      </footer>
    </div>
  );
};
