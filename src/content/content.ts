import { LyricsUtils } from "./utils.ts";

function injectGetSongInfo() {
  let s = document.createElement("script");
  s.src = chrome.runtime.getURL("script.js");
  s.id = "blyrics-script";
  (document.head || document.documentElement).appendChild(s);
}

function main() {
  injectGetSongInfo();
  LyricsUtils.enableLyricsTab();
}

if (document.readyState !== "loading") {
  console.log("yes, loaded!");
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}

document.addEventListener("blyrics-send-player-time", (event) => {
  const customEvent = event as CustomEvent<any>;
  const data: any = customEvent.detail;
  console.log("Current time:", data.currentTime);
  console.log("Song:", data.song);
  console.log("Playing:", data.playing);
});