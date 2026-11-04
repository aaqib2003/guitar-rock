import React, { useState, useEffect } from 'react';
import { JUKEBOX_TRACKS } from '../data/tracks';
import { JukeboxTrack } from '../data/types';
import { riffAudio } from '../utils/audioPlayer';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  Minimize2,
  Maximize2,
  Radio,
} from 'lucide-react';

interface JukeboxPlayerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const JukeboxPlayer: React.FC<JukeboxPlayerProps> = ({ isOpen, onToggle }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const currentTrack: JukeboxTrack = JUKEBOX_TRACKS[currentTrackIndex];

  useEffect(() => {
    riffAudio.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      riffAudio.stop();
    };
  }, []);

  const handlePlayTrack = (track: JukeboxTrack, index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    riffAudio.playTrack(
      track.notesPattern,
      track.bpm,
      track.genre,
      (step) => setActiveStep(step)
    );
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      riffAudio.stop();
      setIsPlaying(false);
    } else {
      handlePlayTrack(currentTrack, currentTrackIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % JUKEBOX_TRACKS.length;
    handlePlayTrack(JUKEBOX_TRACKS[nextIdx], nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + JUKEBOX_TRACKS.length) % JUKEBOX_TRACKS.length;
    handlePlayTrack(JUKEBOX_TRACKS[prevIdx], prevIdx);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full transition-all duration-300">
      {/* Minimized floating pill bar */}
      {!isOpen ? (
        <div className="bg-[#1c1816] border-2 border-[#B08B50] rounded-xs shadow-2xl p-3 flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className={`p-2 bg-[#2A1C15] rounded-xs text-[#B08B50] ${isPlaying ? 'animate-spin' : ''}`}>
              <Disc3 className="w-5 h-5" />
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-display font-bold uppercase tracking-wider text-[#F1E7D5] truncate">
                {currentTrack.title}
              </p>
              <p className="text-[10px] text-[#B08B50] truncate">{currentTrack.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlayPause}
              type="button"
              className="p-2 bg-[#9C2529] hover:bg-[#BF2A30] text-white rounded-xs transition-colors"
              aria-label={isPlaying ? 'Pause Jukebox' : 'Play Jukebox'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggle}
              type="button"
              className="p-1.5 text-[#B08B50] hover:text-[#F1E7D5] transition-colors"
              title="Expand Jukebox"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Vintage Roadhouse Jukebox Interface */
        <div className="bg-[#181514] border-2 border-[#B08B50] rounded-xs shadow-2xl overflow-hidden backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200">
          {/* Jukebox Arch Header */}
          <div className="bg-gradient-to-r from-[#2A1C15] via-[#493225] to-[#2A1C15] px-4 py-2.5 border-b border-[#B08B50]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#B08B50]" />
              <span className="font-display text-sm font-bold uppercase tracking-wider text-[#F1E7D5]">
                GUITARS ROADHOUSE JUKEBOX
              </span>
            </div>
            <button
              onClick={onToggle}
              type="button"
              className="text-[#F1E7D5]/70 hover:text-white p-1"
              title="Minimize Jukebox"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Jukebox Dial & Vinyl Rotating Display */}
          <div className="p-4 bg-wood-pattern">
            <div className="flex items-center gap-4 bg-[#151515] p-3 rounded-xs border border-[#493225]">
              {/* Spinning Vinyl Record */}
              <div
                className={`relative w-16 h-16 rounded-full bg-gradient-to-tr from-black via-neutral-900 to-black border-2 border-[#B08B50] flex items-center justify-center shrink-0 shadow-lg ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#9C2529] border border-[#B08B50] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#151515]" />
                </div>
              </div>

              {/* Track Title & Genre */}
              <div className="overflow-hidden flex-1">
                <div className="text-[10px] font-semibold tracking-widest text-[#B08B50] uppercase">
                  NOW PREVIEWING · {currentTrack.riffKey}
                </div>
                <h4 className="font-display text-base font-bold uppercase text-[#F1E7D5] truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-[#F1E7D5]/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Note & Riff Equalizer Graphic */}
            <div className="mt-3 flex items-center justify-between gap-1 px-1 h-6">
              {currentTrack.notesPattern.map((note, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-xs transition-all duration-100 ${
                    isPlaying && activeStep === idx
                      ? 'bg-[#9C2529] h-6 shadow-[0_0_8px_#9C2529]'
                      : isPlaying
                      ? 'bg-[#B08B50]/60 h-3'
                      : 'bg-[#493225]/60 h-1.5'
                  }`}
                />
              ))}
            </div>

            {/* Playback Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  type="button"
                  className="p-2 text-[#F1E7D5]/80 hover:text-white bg-[#2A1C15] border border-[#493225] rounded-xs"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={togglePlayPause}
                  type="button"
                  className="px-4 py-2 bg-[#9C2529] hover:bg-[#BF2A30] text-white font-bold rounded-xs flex items-center gap-1.5 text-xs font-display tracking-wider uppercase shadow-md"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>PLAY RIFF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className="p-2 text-[#F1E7D5]/80 hover:text-white bg-[#2A1C15] border border-[#493225] rounded-xs"
                  aria-label="Next track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  type="button"
                  className="p-1.5 text-[#B08B50] hover:text-[#F1E7D5]"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 accent-[#B08B50] cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>
            </div>

            {/* Track Selector List */}
            <div className="mt-4 pt-3 border-t border-[#493225]/60 space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {JUKEBOX_TRACKS.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => handlePlayTrack(t, index)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xs flex items-center justify-between transition-colors ${
                    currentTrackIndex === index
                      ? 'bg-[#2A1C15] text-[#B08B50] border-l-2 border-[#9C2529] font-semibold'
                      : 'text-[#F1E7D5]/70 hover:bg-[#2A1C15]/50 hover:text-[#F1E7D5]'
                  }`}
                >
                  <span className="truncate">{t.title}</span>
                  <span className="text-[10px] text-[#B08B50]/80 shrink-0 ml-2">{t.genre}</span>
                </button>
              ))}
            </div>

            <p className="mt-2 text-[10px] text-[#F1E7D5]/50 text-center">
              Synthesized roadhouse audio engine · Rock & Country Classics
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
