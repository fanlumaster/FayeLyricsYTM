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

export class CommonUtils {
  static scrollDivToCenter(targetDiv: HTMLDivElement, parent: HTMLDivElement) {
    if (!targetDiv || !parent) return;

    const divRect = targetDiv.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const parentHeight = parentRect.height;
    const divHeight = divRect.height;

    const scrollTarget =
      targetDiv.offsetTop -
      (parentHeight / 2) +
      (divHeight / 2);

    parent.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  }
}
