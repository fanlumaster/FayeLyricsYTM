import { LyricsUtils } from "./utils.ts";
import { LyricsPlayerEventDetail } from "./data-types.ts";
import { FayeLyrics } from "./lyrics.ts";

function injectGetSongInfo() {
  let s = document.createElement("script");
  s.src = chrome.runtime.getURL("script.js");
  s.id = "blyrics-script";
  (document.head || document.documentElement).appendChild(s);
}

function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
#tab-renderer > tp-yt-paper-spinner-lite {
  display: none !important;
}
#contents > ytmusic-description-shelf-renderer {
  display: none !important;
}
#tab-renderer > ytmusic-message-renderer > yt-formatted-string.subtext.style-scope.ytmusic-message-renderer,
#tab-renderer > ytmusic-message-renderer > yt-formatted-string.text.style-scope.ytmusic-message-renderer {
  display: none !important;
}
/* Hide scrollbar */
#tab-renderer[page-type="MUSIC_PAGE_TYPE_TRACK_LYRICS"] {
  overflow-y: auto;
  scrollbar-width: none;
}
#tab-renderer[page-type="MUSIC_PAGE_TYPE_TRACK_LYRICS"]::-webkit-scrollbar {
  display: none;
}
#fayelyrics-content {
  font-size: 22px;
}
    `;
  document.head.appendChild(style);
}


function main() {
  injectGetSongInfo();
  LyricsUtils.enableLyricsTab();
  FayeLyrics.initializeLyrics();
  FayeLyrics.removeExsitingLyrics();
  FayeLyrics.inflateLyrics();
  injectCSS();
}

if (document.readyState !== "loading") {
  console.log("yes, loaded!");
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

document.addEventListener("faye-lyrics-send-player-msg", ((event: CustomEvent<LyricsPlayerEventDetail>) => {
  const customEvent = event as CustomEvent<any>;
  const data: any = customEvent.detail;
  console.log("Current time:", data.currentTime);
  console.log("Song:", data.song);
  console.log("Playing:", data.playing);
}) as EventListener);