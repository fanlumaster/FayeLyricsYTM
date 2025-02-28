import { FayeLyricsConstants } from "./constants.ts";

export class LyricsUtils {
  /**
   * Enable Lyrics tab forcelly
   * @returns void
   */
  static enableLyricsTab(): void {
    const tabSelector = document.getElementsByClassName(
      FayeLyricsConstants.TAB_HEADER_CLASS
    )[1] as HTMLElement;

    if (!tabSelector) {
      setTimeout(() => {
        LyricsUtils.enableLyricsTab();
      }, 1000);
      return;
    }

    tabSelector.removeAttribute("disabled");
    tabSelector.setAttribute("aria-disabled", "false");

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.attributeName === "disabled") {
          tabSelector.removeAttribute("disabled");
          tabSelector.setAttribute("aria-disabled", "false");
        }
      });
    });

    observer.observe(tabSelector, { attributes: true });
  }
}
