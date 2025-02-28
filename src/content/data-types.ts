export interface LyricsPlayerEventDetail {
  currentTime: number;
  videoId: string;
  song: string;
  artist: string;
  duration: number;
  audioTrackData: any;
  browserTime: number;
  playing: boolean;
}
