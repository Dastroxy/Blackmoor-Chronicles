/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * THE BLACKMOOR CHRONICLES
 * MULTI-CASE ARCHIVE SYSTEM
 * 
 * Featuring:
 * - CASE 001: The Chapel Murder (1896, Victorian Gothic cooperative investigation for 5 players)
 * - CASE 002: The Last Bell (Modern Day, Westbridge Senior Academy physical dossier companion)
 */

import React, { useState, useEffect } from 'react';
import { 
  ActiveCase,
  ScreenState, 
  InvestigationTab, 
  InvestigatorRole, 
  TheorySubmissionData 
} from './types';
import { Case002Screen, Case002AccusationData } from './data/case002/case002Data';
import { soundMaster } from './utils/audioSystem';

// Case Archive Hub
import { CaseArchiveHub } from './screens/CaseArchiveHub';

// Case 001 Components
import { NavigationHeader } from './components/NavigationHeader';
import { GuidelinesModal } from './components/GuidelinesModal';
import { ArchiveLanding } from './screens/ArchiveLanding';
import { OpeningSequence } from './screens/OpeningSequence';
import { RoleSelection } from './screens/RoleSelection';
import { InvestigationDashboard } from './screens/InvestigationDashboard';
import { FinalReveal } from './screens/FinalReveal';

// Case 002 Components
import { Case002Landing } from './screens/case002/Case002Landing';
import { Case002Briefing } from './screens/case002/Case002Briefing';
import { Case002Investigation } from './screens/case002/Case002Investigation';
import { Case002Accusation } from './screens/case002/Case002Accusation';
import { Case002FinalReveal } from './screens/case002/Case002FinalReveal';

export default function App() {
  // Top-Level Router: Which case is currently being accessed?
  const [activeCase, setActiveCase] = useState<ActiveCase>('hub');

  // ==========================================
  // CASE 001 STATE (Victorian Gothic Inquiry)
  // ==========================================
  const [case001Screen, setCase001Screen] = useState<ScreenState>('landing');
  const [case001ActiveTab, setCase001ActiveTab] = useState<InvestigationTab>('case');
  const [case001CurrentRole, setCase001CurrentRole] = useState<InvestigatorRole | null>('sheriff');
  
  // Case 001 Timer State (30 mins = 1800 seconds)
  const [case001TimerSeconds, setCase001TimerSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('blackmoor_timer_secs');
    return saved ? parseInt(saved, 10) : 1800;
  });
  const [isCase001TimerRunning, setIsCase001TimerRunning] = useState<boolean>(false);

  // Case 001 Hints State
  const [case001UnlockedHintLevel, setCase001UnlockedHintLevel] = useState<number>(() => {
    const saved = localStorage.getItem('blackmoor_hints_level');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Case 001 Theory Submission State
  const [case001SubmittedTheory, setCase001SubmittedTheory] = useState<TheorySubmissionData | null>(() => {
    const saved = localStorage.getItem('blackmoor_submitted_theory');
    return saved ? JSON.parse(saved) : null;
  });

  // Case 001 Modals
  const [showCase001Guidelines, setShowCase001Guidelines] = useState(false);
  const [showCase001RoleModal, setShowCase001RoleModal] = useState(false);

  // Case 001 Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeCase === 'case001' && isCase001TimerRunning && case001TimerSeconds > 0) {
      interval = setInterval(() => {
        setCase001TimerSeconds((prev) => {
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
  }, [activeCase, isCase001TimerRunning, case001TimerSeconds]);

  // Case 001 Actions
  const handleCase001ToggleTimer = () => {
    setIsCase001TimerRunning(!isCase001TimerRunning);
  };

  const handleCase001ResetTimer = () => {
    setCase001TimerSeconds(1800);
    localStorage.setItem('blackmoor_timer_secs', '1800');
    setIsCase001TimerRunning(false);
  };

  const handleCase001Begin = () => {
    setCase001Screen('opening');
  };

  const handleCase001OpeningFinished = () => {
    setCase001Screen('role-selection');
  };

  const handleCase001RoleSelected = (role: InvestigatorRole) => {
    setCase001CurrentRole(role);
  };

  const handleCase001CommenceInvestigation = () => {
    setCase001Screen('investigation');
    setIsCase001TimerRunning(true);
  };

  const handleCase001UnlockNextHint = () => {
    if (case001UnlockedHintLevel < 3) {
      const nextLevel = case001UnlockedHintLevel + 1;
      setCase001UnlockedHintLevel(nextLevel);
      localStorage.setItem('blackmoor_hints_level', nextLevel.toString());
    }
  };

  const handleCase001SubmitTheory = (theory: TheorySubmissionData) => {
    setCase001SubmittedTheory(theory);
    localStorage.setItem('blackmoor_submitted_theory', JSON.stringify(theory));
  };

  const handleCase001OpenFinalRecord = () => {
    setIsCase001TimerRunning(false);
    setCase001Screen('final-reveal');
  };

  const handleCase001ReturnToLanding = () => {
    setCase001Screen('landing');
    setCase001ActiveTab('case');
  };

  const handleCase001ReturnToArchiveHub = () => {
    setIsCase001TimerRunning(false);
    setCase001Screen('landing');
    setCase001ActiveTab('case');
    setActiveCase('hub');
  };

  // ==========================================
  // CASE 002 STATE (Westbridge Academy Inquiry)
  // ==========================================
  const [case002Screen, setCase002Screen] = useState<Case002Screen>('landing');
  
  // Case 002 Timer State (60 mins = 3600 seconds)
  const [case002TimerSeconds, setCase002TimerSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('blackmoor_case002_timer');
    return saved ? parseInt(saved, 10) : 3600;
  });
  const [isCase002TimerRunning, setIsCase002TimerRunning] = useState<boolean>(false);

  // Case 002 Accusation State
  const [case002Accusation, setCase002Accusation] = useState<Case002AccusationData | null>(() => {
    const saved = localStorage.getItem('blackmoor_case002_accusation');
    return saved ? JSON.parse(saved) : null;
  });

  // Case 002 Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeCase === 'case002' && isCase002TimerRunning && case002TimerSeconds > 0) {
      interval = setInterval(() => {
        setCase002TimerSeconds((prev) => {
          const next = Math.max(0, prev - 1);
          localStorage.setItem('blackmoor_case002_timer', next.toString());
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCase, isCase002TimerRunning, case002TimerSeconds]);

  // Case 002 Actions
  const handleCase002BeginCase = () => {
    setCase002Screen('briefing');
  };

  const handleCase002StartInvestigation = () => {
    setCase002Screen('investigation');
    setIsCase002TimerRunning(true);
  };

  const handleCase002ToggleTimer = () => {
    setIsCase002TimerRunning(!isCase002TimerRunning);
  };

  const handleCase002ResetTimer = () => {
    setCase002TimerSeconds(3600);
    localStorage.setItem('blackmoor_case002_timer', '3600');
    setIsCase002TimerRunning(false);
  };

  const handleCase002GoToAccusation = () => {
    setIsCase002TimerRunning(false);
    setCase002Screen('accusation');
  };

  const handleCase002ConfirmAccusation = (data: Case002AccusationData) => {
    setCase002Accusation(data);
    localStorage.setItem('blackmoor_case002_accusation', JSON.stringify(data));
    setCase002Screen('final-reveal');
  };

  const handleCase002ReturnToHub = () => {
    // Reset Case 002 session completely
    setIsCase002TimerRunning(false);
    setCase002TimerSeconds(3600);
    setCase002Accusation(null);
    setCase002Screen('landing');
    localStorage.removeItem('blackmoor_case002_timer');
    localStorage.removeItem('blackmoor_case002_accusation');
    setActiveCase('hub');
  };

  // ==========================================
  // RENDER ROUTING
  // ==========================================

  // 1. MASTER CASE ARCHIVE HUB
  if (activeCase === 'hub') {
    return (
      <CaseArchiveHub
        onSelectCase001={() => setActiveCase('case001')}
        onSelectCase002={() => setActiveCase('case002')}
      />
    );
  }

  // 2. CASE 001 (The Chapel Murder)
  if (activeCase === 'case001') {
    return (
      <div className="min-h-screen bg-[#0d0b0b] text-[#ded7cc] flex flex-col justify-between selection:bg-[#4a1c1d] selection:text-[#f3ede2]">
        {/* Navigation Header only visible during active investigation */}
        {case001Screen === 'investigation' && (
          <NavigationHeader
            timerSeconds={case001TimerSeconds}
            isTimerRunning={isCase001TimerRunning}
            onToggleTimer={handleCase001ToggleTimer}
            onResetTimer={handleCase001ResetTimer}
            currentRole={case001CurrentRole}
            hintsUsedCount={case001UnlockedHintLevel}
            onSelectRolePrompt={() => setShowCase001RoleModal(true)}
            onOpenGuidelines={() => setShowCase001Guidelines(true)}
            onReturnToArchive={handleCase001ReturnToArchiveHub}
          />
        )}

        {/* Main View Router for Case 001 */}
        <div className="flex-1 flex flex-col">
          {case001Screen === 'landing' && (
            <ArchiveLanding 
              onBeginCase={handleCase001Begin} 
              onReturnToArchiveHub={handleCase001ReturnToArchiveHub}
              onSelectCase002={() => setActiveCase('case002')}
            />
          )}

          {case001Screen === 'opening' && (
            <OpeningSequence onComplete={handleCase001OpeningFinished} />
          )}

          {case001Screen === 'role-selection' && (
            <RoleSelection
              currentRole={case001CurrentRole}
              onRoleSelected={handleCase001RoleSelected}
              onProceedToInvestigation={handleCase001CommenceInvestigation}
            />
          )}

          {case001Screen === 'investigation' && (
            <InvestigationDashboard
              currentRole={case001CurrentRole}
              activeTab={case001ActiveTab}
              onTabChange={setCase001ActiveTab}
              unlockedHintLevel={case001UnlockedHintLevel}
              onUnlockNextHint={handleCase001UnlockNextHint}
              submittedTheory={case001SubmittedTheory}
              onSubmitTheory={handleCase001SubmitTheory}
              onOpenFinalRecord={handleCase001OpenFinalRecord}
            />
          )}

          {case001Screen === 'final-reveal' && (
            <FinalReveal
              submittedTheory={case001SubmittedTheory}
              onReturnToArchive={handleCase001ReturnToArchiveHub}
            />
          )}
        </div>

        {/* Guidelines & Rules Modal for Case 001 */}
        <GuidelinesModal
          isOpen={showCase001Guidelines}
          onClose={() => setShowCase001Guidelines(false)}
        />

        {/* Lens Switching Dialog for Group Collaboration */}
        {showCase001RoleModal && (
          <div 
            id="lens-switcher-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowCase001RoleModal(false)}
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
                      setCase001CurrentRole(r);
                      setShowCase001RoleModal(false);
                    }}
                    className={`p-3 rounded border text-left text-xs transition-colors capitalize cursor-pointer ${
                      case001CurrentRole === r
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
                  onClick={() => setShowCase001RoleModal(false)}
                  className="px-4 py-2 rounded bg-[#241a16] text-xs font-display uppercase tracking-wider text-[#d4c5b2] cursor-pointer"
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

  // 3. CASE 002 (The Last Bell)
  if (activeCase === 'case002') {
    return (
      <div className="min-h-screen bg-[#07090c] text-[#c9d1d9] flex flex-col justify-between">
        {case002Screen === 'landing' && (
          <Case002Landing
            onBeginCase={handleCase002BeginCase}
            onReturnToArchive={handleCase002ReturnToHub}
          />
        )}

        {case002Screen === 'briefing' && (
          <Case002Briefing
            onStartInvestigation={handleCase002StartInvestigation}
            onBackToLanding={handleCase002ReturnToHub}
          />
        )}

        {case002Screen === 'investigation' && (
          <Case002Investigation
            secondsRemaining={case002TimerSeconds}
            isTimerRunning={isCase002TimerRunning}
            onToggleTimer={handleCase002ToggleTimer}
            onResetTimer={handleCase002ResetTimer}
            onSubmitAccusation={handleCase002GoToAccusation}
            onReturnToLanding={handleCase002ReturnToHub}
          />
        )}

        {case002Screen === 'accusation' && (
          <Case002Accusation
            initialData={case002Accusation}
            onConfirmAccusation={handleCase002ConfirmAccusation}
            onBackToInvestigation={() => setCase002Screen('investigation')}
          />
        )}

        {case002Screen === 'final-reveal' && (
          <Case002FinalReveal
            submittedAccusation={case002Accusation}
            onReturnToArchive={handleCase002ReturnToHub}
          />
        )}
      </div>
    );
  }

  return null;
}
