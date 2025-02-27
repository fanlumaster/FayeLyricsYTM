import { FayeLyricsConstants } from "./constants.ts";
import { LyricsPlayerEventDetail } from "./data-types.ts";

const { FAYE_LYRICS_SEND_PLAYER_MSG } = FayeLyricsConstants;

export class FayeLyrics {
  static removeExsitingLyrics() {
    // Remove msg when there is no lyrics provided by YTM
    const noneLyricsMsg = document.querySelector("#tab-renderer > ytmusic-message-renderer > yt-formatted-string.text.style-scope.ytmusic-message-renderer")?.parentElement;
    if (noneLyricsMsg) {
      noneLyricsMsg.style.display = "";
    }
    // Remove default lyrics provided by YTM
    const existingLyrics = document.getElementsByClassName("description style-scope ytmusic-description-shelf-renderer");
    if (existingLyrics.length > 0) {
      for (let each of existingLyrics) {
        (each as HTMLElement).style.display = "";
      }
    }
    // Romove default footer
    const existingFooter = document.getElementsByClassName("footer style-scope ytmusic-description-shelf-renderer");
    if (existingFooter.length > 0) {
      for (let each of existingFooter) {
        (each as HTMLElement).style.display = "";
      }
    }
  }

  static createLyricContainer() {
    const tabRenderer = document.querySelector("#tab-renderer");
    const existingContainer = document.getElementById("fayelyrics-container");
    if (existingContainer) {
      existingContainer.innerHTML = "";
      existingContainer.style.top = "";
      existingContainer.style.transition = "";
      return existingContainer;
    }
    const container = document.createElement("div");
    container.id = "fayelyrics-container";
    tabRenderer?.appendChild(container);
    return container;
  }

  static inflateLyrics() {
    const container = this.createLyricContainer();
    const lyricContent = document.createElement("div");
    lyricContent.id = "fayelyrics-content";
    let hardCodeLyrics = `<p>[00:15.49] 常請晚星請背影 不用替我太掛心</p>
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
    lyricContent.innerHTML = hardCodeLyrics;
    container.appendChild(lyricContent);
  }

  static initializeLyrics() {
    document.addEventListener(FAYE_LYRICS_SEND_PLAYER_MSG, ((event: CustomEvent<LyricsPlayerEventDetail>) => {
      let detail = event.detail;
      let currentVideoId = detail.videoId;
      let currentVideoDetails = detail.song + " " + detail.artist;
      console.log("currentVideoId: " + currentVideoId);
      console.log("currentVideoDetails: " + currentVideoDetails);
    }) as EventListener);
  }
}