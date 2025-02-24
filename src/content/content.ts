console.log("what");

function injectGetSongInfo() {
  let s = document.createElement("script");
  s.id = "blyrics-script";
  s.src = chrome.runtime.getURL("script.js");
  s.id = "blyrics-script";
  (document.head || document.documentElement).appendChild(s);
}

if (document.readyState !== "loading") {
  console.log("yes, loaded!");
  injectGetSongInfo();
} else {
  document.addEventListener("DOMContentLoaded", injectGetSongInfo);
}

document.addEventListener("blyrics-send-player-time", (event) => {
  const customEvent = event as CustomEvent<any>;
  const data: any = customEvent.detail;
  console.log("Current time:", data.currentTime);
  console.log("Song:", data.song);
  console.log("Playing:", data.playing);
});