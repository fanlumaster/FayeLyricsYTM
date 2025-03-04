import { FayeLyricsConstants } from "./constants.ts";
import { LyricsPlayerEventDetail } from "./data-types.ts";

const { FAYE_LYRICS_SEND_PLAYER_MSG } = FayeLyricsConstants;

(function () {
  let tickLyricsInterval: any;
  const startLyricsTick = () => {
    stopLyricsTick();

    tickLyricsInterval = setInterval(function () {
      const player = document.getElementById("movie_player") as any;
      if (player) {
        try {
          const currentTime = player.getCurrentTime();
          const { video_id, title, author } = player.getVideoData();
          const audioTrackData = player.getAudioTrack();
          const duration = player.getDuration();
          const { isPlaying } = player.getPlayerStateObject();
          document.dispatchEvent(
            new CustomEvent<LyricsPlayerEventDetail>(
              FAYE_LYRICS_SEND_PLAYER_MSG,
              {
                detail: {
                  currentTime: currentTime,
                  videoId: video_id,
                  song: title,
                  artist: author,
                  duration: duration,
                  audioTrackData: audioTrackData,
                  browserTime: Date.now(),
                  playing: isPlaying,
                },
              }
            )
          );
        } catch (e) {
          console.log(e);
          stopLyricsTick();
        }
      }
    }, 50);
  };

  const stopLyricsTick = () => {
    if (tickLyricsInterval) {
      clearInterval(tickLyricsInterval);
      tickLyricsInterval = null;
    }
  };

  window.addEventListener("unload", stopLyricsTick);

  startLyricsTick();
})();
