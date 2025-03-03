import { FayeLyricsConstants } from "./constants.ts";
import { LyricsPlayerEventDetail } from "./data-types.ts";
import { hardcodeLyrics } from "./mockdata.ts";
import { CommonUtils } from "./utils.ts";

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

  static parseLyrics(lyrics: string): string {
    const lines = lyrics.trim().split('\n');
    let html = '<div id="fayelyrics-content" class="" style="top: 0px;">';
    const timePattern = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
    let prevTimeSeconds = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const match = line.match(timePattern);
      if (!match) continue;
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const currentTimeSeconds = minutes * 60 + seconds + milliseconds / 100;
      let duration = 5;
      if (i < lines.length - 1) {
        const nextLine = lines[i + 1];
        const nextMatch = nextLine.match(timePattern);
        if (nextMatch) {
          const nextMinutes = parseInt(nextMatch[1], 10);
          const nextSeconds = parseInt(nextMatch[2], 10);
          const nextMilliseconds = parseInt(nextMatch[3], 10);
          const nextTimeSeconds = nextMinutes * 60 + nextSeconds + nextMilliseconds / 100;
          duration = nextTimeSeconds - currentTimeSeconds;
        }
      }

      const lyricText = line.replace(timePattern, '').trim();

      html += `<div data-time="${currentTimeSeconds}" data-scrolled="false" `;
      html += `style="--fayelyrics-duration: ${duration}s;" class="">`;

      if (lyricText) {
        html += `<span style="transition-delay: 0s; animation-delay: 0s;">${lyricText}</span>`;
      } else {
        html += `<span style="transition-delay: 0s; animation-delay: 0s;"></span>`;
      }

      html += `</div>`;

      prevTimeSeconds = currentTimeSeconds;
    }

    html += `</div>`;
    return html;
  }

  static inflateLyrics() {
    const container = this.createLyricContainer();
    const content = this.parseLyrics(hardcodeLyrics);
    container.innerHTML = content;
  }

  static updateLyricsState(currentTime: number) {
    const lyricsContainer = document.getElementById('fayelyrics-content');
    const lyricLines = lyricsContainer?.querySelectorAll('div[data-time]');

    let activeLine;
    if (lyricLines) {
      for (const line of lyricLines) {
        const data_time = line.getAttribute('data-time');
        if (data_time) {
          const time = parseFloat(data_time);
          if (time < currentTime) {
            activeLine = line;
            line.classList.remove('fayelyrics-active');
          }
        }
      }
    }
    if (activeLine) {
      activeLine.classList.add('fayelyrics-active');
      let tabRenderer = document.getElementById("tab-renderer");
      CommonUtils.scrollDivToCenter(activeLine as HTMLDivElement, tabRenderer as HTMLDivElement);
    }
  }

  static tickLyrics() {
    document.addEventListener(FAYE_LYRICS_SEND_PLAYER_MSG, ((event: CustomEvent<LyricsPlayerEventDetail>) => {
      let detail = event.detail;
      const currentTime = detail.currentTime;
      this.updateLyricsState(currentTime);
    }) as EventListener);
  }
}