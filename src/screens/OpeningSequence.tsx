import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Volume2, Sparkles } from 'lucide-react';
import { OPENING_VOICEOVER_TEXT } from '../data/case001Data';
import { soundMaster } from '../utils/audioSystem';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioHandleRef = useRef<{ stop: () => void; isPlaying: () => boolean } | null>(null);

  // Auto-advance subtitles if using synthesized fallback or when line advances
  useEffect(() => {
    // Attempt to play external audio /audio/opening.mp3 if available
    audioHandleRef.current = soundMaster.playAudioTrack(
      '/audio/opening.mp3',
      () => {
        // ended naturally
        onComplete();
      },
      () => {
        // Fallback to auto-advancing timed sequence
      }
    );

    return () => {
      if (audioHandleRef.current) {
        audioHandleRef.current.stop();
      }
    };
  }, []);

  // Timer loop for sequential text progression
  useEffect(() => {
    if (!isPlaying) return;

    // Special sound cue for the 3 bells line
    if (currentLineIndex === 6) {
      soundMaster.playBellToll(3);
    }

    const timer = setTimeout(() => {
      if (currentLineIndex < OPENING_VOICEOVER_TEXT.length - 1) {
        soundMaster.playClockTick();
        setCurrentLineIndex((prev) => prev + 1);
      } else {
        // Finished all lines
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }, 3800); // 3.8s per subtitle line

    return () => clearTimeout(timer);
  }, [currentLineIndex, isPlaying, onComplete]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    soundMaster.playWaxSeal();
    setCurrentLineIndex(0);
    setIsPlaying(true);
    if (audioHandleRef.current) {
      audioHandleRef.current.stop();
      audioHandleRef.current = soundMaster.playAudioTrack('/audio/opening.mp3', onComplete);
    }
  };

  const handleSkip = () => {
    soundMaster.playWaxSeal();
    if (audioHandleRef.current) {
      audioHandleRef.current.stop();
    }
    onComplete();
  };

  return (
    <div 
      id="opening-sequence-screen" 
      className="relative min-h-screen flex flex-col justify-between archive-vignette text-[#ded7cc] p-6 sm:p-12 select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full border-b border-[#2d201a] pb-4">
        <div className="flex items-center space-x-2 text-xs font-mono-archive text-[#948171] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#823a2a] animate-pulse"></span>
          <span>PROLOGUE • CASE 001 INTRODUCTORY RECORD</span>
        </div>

        <button
          id="btn-skip-narration"
          type="button"
          onClick={handleSkip}
          className="flex items-center space-x-1.5 text-xs text-[#a69280] hover:text-[#f2e7d7] font-display uppercase tracking-widest px-3 py-1.5 rounded border border-[#3b2b23] hover:border-[#63493b] transition-colors"
        >
          <span>Skip Prologue</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Cinematic Narration Subtitles */}
      <div className="max-w-3xl mx-auto w-full text-center my-auto py-12">
        <div className="mb-6">
          <span className="text-xs font-mono-archive text-[#6e5849] tracking-widest uppercase">
            ST. AURELIUS CHAPEL • MIDNIGHT DISPATCH
          </span>
        </div>

        {/* Previous line (faded) */}
        {currentLineIndex > 0 && (
          <p className="text-sm sm:text-base text-[#615247] font-display mb-4 transition-opacity duration-700 italic">
            "{OPENING_VOICEOVER_TEXT[currentLineIndex - 1]}"
          </p>
        )}

        {/* Current prominent active line */}
        <div className="min-h-[140px] flex items-center justify-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-[#faefe1] leading-snug tracking-wide transition-all duration-500 drop-shadow">
            "{OPENING_VOICEOVER_TEXT[currentLineIndex]}"
          </h2>
        </div>

        {/* Next line anticipation indicator */}
        <div className="mt-8 flex justify-center space-x-1">
          {OPENING_VOICEOVER_TEXT.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 transition-all duration-300 rounded-full ${
                idx === currentLineIndex 
                  ? 'w-6 bg-[#b87455]' 
                  : idx < currentLineIndex 
                    ? 'w-2 bg-[#423128]' 
                    : 'w-1.5 bg-[#211713]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Transport Controls */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-t border-[#2d201a] pt-4 text-xs font-mono-archive text-[#857262]">
        <div className="flex items-center space-x-3">
          <button
            id="btn-narration-play-pause"
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1e1513] border border-[#3d2b21] hover:border-[#63493b] text-[#ded0be] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Narration' : 'Resume'}</span>
          </button>

          <button
            id="btn-narration-replay"
            type="button"
            onClick={handleReplay}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1e1513] border border-[#3d2b21] hover:border-[#63493b] text-[#ded0be] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>

        <div className="text-[11px] text-[#735e4e] hidden sm:block">
          Line {currentLineIndex + 1} of {OPENING_VOICEOVER_TEXT.length}
        </div>
      </div>
    </div>
  );
};
