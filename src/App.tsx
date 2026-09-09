/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * THE BLACKMOOR CHRONICLES
 * CASE 001 — THE CHAPEL MURDER
 * A cooperative, moderator-free gothic murder mystery for exactly 5 players.
 */

import React, { useState, useEffect } from 'react';
import { 
  ScreenState, 
  InvestigationTab, 
  InvestigatorRole, 
  TheorySubmissionData 
} from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { GuidelinesModal } from './components/GuidelinesModal';
import { ArchiveLanding } from './screens/ArchiveLanding';
import { OpeningSequence } from './screens/OpeningSequence';
import { RoleSelection } from './screens/RoleSelection';
import { InvestigationDashboard } from './screens/InvestigationDashboard';
import { FinalReveal } from './screens/FinalReveal';
import { soundMaster } from './utils/audioSystem';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [activeTab, setActiveTab] = useState<InvestigationTab>('case');
  const [currentRole, setCurrentRole] = useState<InvestigatorRole | null>('sheriff');
  
  // Timer State (30 minutes default = 1800 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('blackmoor_timer_secs');
    return saved ? parseInt(saved, 10) : 1800;
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Hints State
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(() => {
    const saved = localStorage.getItem('blackmoor_hints_level');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Theory Submission State
  const [submittedTheory, setSubmittedTheory] = useState<TheorySubmissionData | null>(() => {
    const saved = localStorage.getItem('blackmoor_submitted_theory');
    return saved ? JSON.parse(saved) : null;
  });

  // Modals
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showRoleSelectModal, setShowRoleSelectModal] = useState(false);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev - 1;
          localStorage.setItem('blackmoor_timer_secs', next.toString());
          if (next === 600 || next === 300) {
            soundMaster.playBellToll(1);
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setTimerSeconds(1800);
    localStorage.setItem('blackmoor_timer_secs', '1800');
    setIsTimerRunning(false);
  };

  const handleBeginCase = () => {
    setScreen('opening');
  };

  const handleOpeningFinished = () => {
    setScreen('role-selection');
  };

  const handleRoleSelected = (role: InvestigatorRole) => {
    setCurrentRole(role);
  };

  const handleCommenceInvestigation = () => {
    setScreen('investigation');
    setIsTimerRunning(true);
  };

  const handleUnlockNextHint = () => {
    if (unlockedHintLevel < 3) {
      const nextLevel = unlockedHintLevel + 1;
      setUnlockedHintLevel(nextLevel);
      localStorage.setItem('blackmoor_hints_level', nextLevel.toString());
    }
  };

  const handleSubmitTheory = (theory: TheorySubmissionData) => {
    setSubmittedTheory(theory);
    localStorage.setItem('blackmoor_submitted_theory', JSON.stringify(theory));
  };

  const handleOpenFinalRecord = () => {
    setIsTimerRunning(false);
    setScreen('final-reveal');
  };

  const handleReturnToArchive = () => {
    setScreen('landing');
    setActiveTab('case');
  };

  return (
    <div className="min-h-screen bg-[#0d0b0b] text-[#ded7cc] flex flex-col justify-between selection:bg-[#4a1c1d] selection:text-[#f3ede2]">
      {/* Navigation Header only visible during active investigation */}
      {screen === 'investigation' && (
        <NavigationHeader
          timerSeconds={timerSeconds}
          isTimerRunning={isTimerRunning}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
          currentRole={currentRole}
          hintsUsedCount={unlockedHintLevel}
          onSelectRolePrompt={() => setShowRoleSelectModal(true)}
          onOpenGuidelines={() => setShowGuidelines(true)}
        />
      )}

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {screen === 'landing' && (
          <ArchiveLanding onBeginCase={handleBeginCase} />
        )}

        {screen === 'opening' && (
          <OpeningSequence onComplete={handleOpeningFinished} />
        )}

        {screen === 'role-selection' && (
          <RoleSelection
            currentRole={currentRole}
            onRoleSelected={handleRoleSelected}
            onProceedToInvestigation={handleCommenceInvestigation}
          />
        )}

        {screen === 'investigation' && (
          <InvestigationDashboard
            currentRole={currentRole}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            unlockedHintLevel={unlockedHintLevel}
            onUnlockNextHint={handleUnlockNextHint}
            submittedTheory={submittedTheory}
            onSubmitTheory={handleSubmitTheory}
            onOpenFinalRecord={handleOpenFinalRecord}
          />
        )}

        {screen === 'final-reveal' && (
          <FinalReveal
            submittedTheory={submittedTheory}
            onReturnToArchive={handleReturnToArchive}
          />
        )}
      </div>

      {/* Guidelines & Rules Modal */}
      <GuidelinesModal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />

      {/* Lens Switching Dialog for Group Collaboration */}
      {showRoleSelectModal && (
        <div 
          id="lens-switcher-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowRoleSelectModal(false)}
        >
          <div 
            className="w-full max-w-xl bg-[#171110] border-2 border-[#45342a] rounded-lg p-6 text-[#ded7cc] parchment-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-display font-bold text-[#f5ebd9] mb-2">
              Active Investigation Lens
            </h3>
            <p className="text-xs text-[#9c8978] mb-4">
              Select which physical dossier perspective you are reviewing at this moment:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {(['sheriff', 'investigator', 'mortician', 'forensics', 'shaman'] as InvestigatorRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    soundMaster.playPaperRustle();
                    setCurrentRole(r);
                    setShowRoleSelectModal(false);
                  }}
                  className={`p-3 rounded border text-left text-xs transition-colors capitalize ${
                    currentRole === r
                      ? 'bg-[#3b2a22] border-[#804b38] text-[#f5ebd9] font-bold'
                      : 'bg-[#140e0d] border-[#2b1f1a] text-[#a69280] hover:text-[#d6c4b2]'
                  }`}
                >
                  † {r} Dossier
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowRoleSelectModal(false)}
                className="px-4 py-2 rounded bg-[#241a16] text-xs font-display uppercase tracking-wider text-[#d4c5b2]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
