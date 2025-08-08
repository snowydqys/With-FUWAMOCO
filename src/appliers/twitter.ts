import type { Settings } from "../config";
import { appendImageWithStyles } from "../helpers";

/**
 * Adds the With FUWAMOCO image to Twitter media.
 * @description Currently wip, not perfect
 */
export function addTwitter(settings: Partial<Settings["twitter"]>) {
  const imagesAndVideos = [
    ...Array.from(document.querySelectorAll("img[src^='https://pbs.twimg.com/media']")), // images
    ...Array.from(document.querySelectorAll("video[poster^='https://pbs.twimg.com/amplify_video_thumb']")), // videos
  ];

  imagesAndVideos.forEach((media) => {
    try {
      if (!(media instanceof HTMLElement)) {
        console.warn("[With FWMC] Media is not an HTMLElement, skipping:", media);
        return;
      }

      const container = media.parentElement;

      if (!container || !(container instanceof HTMLElement) || container.querySelector(".fwmc-twitter-overlay")) {
        // container is not found or already has an overlay image
        return;
      }

      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === "static") {
        container.style.position = "relative";
      }

      appendImageWithStyles(container, {
        className: "fwmc-twitter-overlay",
        width: settings.width,
        height: settings.height,
        childToInsertAfter: media,
      });
    }
    catch (error) {
      console.error("[With FWMC] Error adding Twitter image:", error);
    }
  });
}
