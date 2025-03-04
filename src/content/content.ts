import { LyricsUtils } from "./utils.ts";
import { FayeLyrics } from "./lyrics.ts";

function injectGetSongInfo() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("script.js");
  s.id = "blyrics-script";
  (document.head || document.documentElement).appendChild(s);
}

function main() {
  injectGetSongInfo();
  LyricsUtils.enableLyricsTab();
  FayeLyrics.removeExsitingLyrics();
  FayeLyrics.inflateLyrics();
  FayeLyrics.tickLyrics();
}

if (document.readyState !== "loading") {
  console.log("yes, loaded!");
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}