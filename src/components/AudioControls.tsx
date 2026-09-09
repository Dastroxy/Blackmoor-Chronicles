import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, Bell } from 'lucide-react';
import { soundMaster } from '../utils/audioSystem';

export const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundMaster.getIsMuted());
  const [isAmbience, setIsAmbience] = useState(soundMaster.getIsAmbiencePlaying());
  const [volume, setVolume] = useState(soundMaster.getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    // Sync state
    setIsMuted(soundMaster.getIsMuted());
    setIsAmbience(soundMaster.getIsAmbiencePlaying());
  }, []);

  const handleToggleMute = () => {
    const muted = soundMaster.toggleMute();
    setIsMuted(muted);
    soundMaster.playWaxSeal();
  };

  const handleToggleAmbience = () => {
    const active = soundMaster.toggleAmbience();
    setIsAmbience(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundMaster.setVolume(val);
    if (isMuted && val > 0) {
      soundMaster.toggleMute();
      setIsMuted(false);
    }
  };

  const handleRingBell = () => {
    soundMaster.playBellToll(1);
  };

  return (
    <div id="audio-controls-container" className="flex items-center space-x-2 text-xs text-[#b8a78f]">
      {/* Ambience Toggle */}
      <button
        id="btn-toggle-ambience"
        type="button"
        onClick={handleToggleAmbience}
        className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded border transition-colors ${
          isAmbience 
            ? 'bg-[#2a1e1a] border-[#8a6845] text-[#f0e2cd]' 
            : 'bg-[#151212] border-[#362924] text-[#8c7b6c] hover:border-[#523f37]'
        }`}
        title="Toggle Chapel Wind & Room Tone"
      >
        <Wind className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Ambience</span>
      </button>

      {/* Bell toll trigger */}
      <button
        id="btn-ring-bell"
        type="button"
        onClick={handleRingBell}
        className="flex items-center space-x-1 px-2.5 py-1.5 rounded border bg-[#151212] border-[#362924] text-[#8c7b6c] hover:border-[#523f37] hover:text-[#d4c5b2] transition-colors"
        title="Toll St. Aurelius Bell"
      >
        <Bell className="w-3.5 h-3.5" />
      </button>

      {/* Volume / Mute */}
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          id="btn-toggle-mute"
          type="button"
          onClick={handleToggleMute}
          className={`p-1.5 rounded border transition-colors ${
            isMuted 
              ? 'bg-[#291717] border-[#823939] text-[#e09393]' 
              : 'bg-[#151212] border-[#362924] text-[#8c7b6c] hover:border-[#523f37] hover:text-[#d4c5b2]'
          }`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Volume popover */}
        {showVolumeSlider && (
          <div className="absolute top-full right-0 mt-1 p-2 bg-[#191515] border border-[#42322a] rounded shadow-xl z-50 flex items-center space-x-2">
            <input
              id="slider-master-volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-[#b2824e] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
