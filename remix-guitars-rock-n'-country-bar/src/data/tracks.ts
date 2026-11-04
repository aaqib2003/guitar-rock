import { JukeboxTrack } from './types';

export const JUKEBOX_TRACKS: JukeboxTrack[] = [
  {
    id: 'track-1',
    title: 'Midnight Highway Overdrive',
    artist: 'The 7th Street All-Stars',
    genre: 'Southern Rock',
    year: 'Roadhouse Classics',
    bpm: 124,
    riffKey: 'E Major',
    notesPattern: [164.81, 196.00, 220.00, 246.94, 329.63, 246.94, 220.00, 196.00], // E, G, A, B, E high
  },
  {
    id: 'track-2',
    title: 'Outlaw Dust & Honky Tonk Rust',
    artist: 'Jesse & The Ozark Drifters',
    genre: 'Outlaw Country',
    year: 'Country Gold',
    bpm: 110,
    riffKey: 'G Major',
    notesPattern: [196.00, 246.94, 293.66, 329.63, 392.00, 293.66, 246.94, 196.00], // G, B, D, E, G high
  },
  {
    id: 'track-3',
    title: 'Joplin Line Stomp Shuffle',
    artist: 'The Bootleg Wranglers',
    genre: 'Roadhouse Blues',
    year: 'Dancefloor Anthems',
    bpm: 130,
    riffKey: 'A Minor',
    notesPattern: [220.00, 261.63, 293.66, 311.13, 329.63, 392.00, 440.00, 329.63], // Blues scale in A
  },
  {
    id: 'track-4',
    title: 'Whiskey River Neon Glow',
    artist: 'Silver Strings Revue',
    genre: 'Classic Rock',
    year: 'Vintage Vault',
    bpm: 104,
    riffKey: 'D Major',
    notesPattern: [146.83, 185.00, 220.00, 293.66, 369.99, 293.66, 220.00, 185.00], // D arpeggio
  },
];
