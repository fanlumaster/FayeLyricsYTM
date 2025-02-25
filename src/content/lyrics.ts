import { FayeLyricsConstants } from "./constants.ts";
import { LyricsPlayerEventDetail } from "./data-types.ts";

const { FAYE_LYRICS_SEND_PLAYER_MSG } = FayeLyricsConstants;

export class FayeLyrics {
  static initializeLyrics() {
    document.addEventListener(FAYE_LYRICS_SEND_PLAYER_MSG, ((event: CustomEvent<LyricsPlayerEventDetail>) => {
      let detail = event.detail;
      let currentVideoId = detail.videoId;
      let currentVideoDetails = detail.song + " " + detail.artist;
      console.log("currentVideoId: " + currentVideoId);
      console.log("currentVideoDetails: " + currentVideoDetails);
      let lyricsContent = document.querySelector("#contents > ytmusic-description-shelf-renderer");
      if (lyricsContent) {
        lyricsContent!.innerHTML = `<p>[00:15.49] 常請晚星請背影 不用替我太掛心</p>
<p>[00:23.32] 常勸心境應恬靜 別無事也帶淚痕</p>
<p>[00:31.18] 如近來共你相擁之時 常常略察覺你稍帶冷感</p>
<p>[00:39.05] 全因你身邊許多要事 暫時沒法興奮</p>
<p>[00:48.72] 常請眼睛不要醒 不用太過看得真</p>
<p>[00:56.61] 常勸哭聲稍冷靜 事情未算有裂痕</p>
<p>[01:04.32] 如日前為我恭祝生辰 是我冷的背影</p>
<p>[01:12.19] 全因你當天剛巧有事 辨完便送我火吻</p>
<p>[01:25.77] 常自我哄騙 也替你辛苦找藉口</p>
<p>[01:33.55] 如全沒有介意 卻暗孤單飲心裡苦酒</p>
<p>[01:41.44] 明知將分手 但若人未開口</p>
<p>[01:44.81] 我都會一再當我通通都擁有</p>
<p>[01:49.15] 仍然詐不知 雙眼內何事會濕透</p>
<p>[01:59.04]</p>
<p>[02:30.30] 常請眼睛不要醒 不用太過看得真</p>
<p>[02:38.18] 常勸哭聲稍冷靜 事情未算有裂痕</p>
<p>[02:45.96] 如日前望見她於街頭 共你靠得太緊</p>
<p>[02:53.78] 全因那一天風急雨暴 任誰亦會走近</p>
<p>[03:07.34] 常自我哄騙 也替你辛苦找藉口</p>
<p>[03:15.08] 如全沒有介意 卻暗孤單飲心裡苦酒</p>
<p>[03:22.92] 明知將分手 但若人未開口</p>
<p>[03:26.35] 我都會一再當我通通都擁有</p>
<p>[03:30.66] 我詐不知不須再過多久</p>
<p>[03:34.71] 你會走</p>
<p>[04:11.65] 尚當我擁有</p>
<p>[04:20.56]</p>`;
      }
    }) as EventListener);
  }
}

//     let currentVideoId = detail.videoId;
//     let currentVideoDetails = detail.song + " " + detail.artist;

//     if (
//       currentVideoId !== BetterLyrics.App.lastVideoId ||
//       currentVideoDetails !== BetterLyrics.App.lastVideoDetails
//     ) {
//       try {
//         if (currentVideoId === BetterLyrics.App.lastVideoId && BetterLyrics.App.areLyricsLoaded) {
//           console.log(BetterLyrics.Constants.SKIPPING_LOAD_WITH_META);
//           return; // We already loaded this video
//         }
//       } finally {
//         BetterLyrics.App.lastVideoId = currentVideoId;
//         BetterLyrics.App.lastVideoDetails = currentVideoDetails;
//       }

//       if (!detail.song || !detail.artist) {
//         console.log(BetterLyrics.Constants.LOADING_WITHOUT_SONG_META);
//       }

//       BetterLyrics.Utils.log(BetterLyrics.Constants.SONG_SWITCHED_LOG, detail.videoId);
//       BetterLyrics.App.areLyricsTicking = false;
//       BetterLyrics.App.areLyricsLoaded = false;

//       BetterLyrics.App.queueLyricInjection = true;
//       BetterLyrics.App.queueAlbumArtInjection = true;
//       BetterLyrics.App.queueSongDetailsInjection = true;
//     }

//     if (
//       BetterLyrics.App.queueSongDetailsInjection &&
//       detail.song &&
//       detail.artist &&
//       document.getElementById("main-panel")
//     ) {
//       BetterLyrics.App.queueSongDetailsInjection = false;
//       BetterLyrics.DOM.injectSongAttributes(detail.song, detail.artist);
//     }

//     if (BetterLyrics.App.queueAlbumArtInjection === true && BetterLyrics.App.shouldInjectAlbumArt === true) {
//       BetterLyrics.App.queueAlbumArtInjection = false;
//       BetterLyrics.DOM.addAlbumArtToLayout();
//     }

//     if (BetterLyrics.App.lyricInjectionFailed) {
//       const tabSelector = document.getElementsByClassName(BetterLyrics.Constants.TAB_HEADER_CLASS)[1];
//       if (tabSelector && tabSelector.getAttribute("aria-selected") !== "true") {
//         BetterLyrics.App.lyricInjectionFailed = false; //ignore failure b/c the tab isn't visible
//       }
//     }

//     if (BetterLyrics.App.queueLyricInjection || BetterLyrics.App.lyricInjectionFailed) {
//       const tabSelector = document.getElementsByClassName(BetterLyrics.Constants.TAB_HEADER_CLASS)[1];
//       if (tabSelector) {
//         BetterLyrics.App.queueLyricInjection = false;
//         BetterLyrics.App.lyricInjectionFailed = false;
//         if (tabSelector.getAttribute("aria-selected") !== "true") {
//           BetterLyrics.Settings.onAutoSwitchEnabled(() => {
//             tabSelector.click();
//             BetterLyrics.Utils.log(BetterLyrics.Constants.AUTO_SWITCH_ENABLED_LOG);
//           });
//         }
//         BetterLyrics.App.handleModifications(detail);
//       }
//     }
//     let timeOffset = Date.now() - detail.browserTime;
//     if (!detail.playing) {
//       timeOffset = 0;
//     }
//     BetterLyrics.DOM.tickLyrics(detail.currentTime + timeOffset / 1000);
//   });
// },
