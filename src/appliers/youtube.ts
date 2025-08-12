import type { Settings } from "../config";
import { appendImageWithStyles } from "../helpers";

/**
 * Adds the With FUWAMOCO image to YouTube thumbnails.
 * @description Thank you to the chrome-ext-with-fwmc and MrBeastify extension for the ~~shamelessly code stealing I did~~ inspiration!
 * @see https://github.com/arashari/chrome-ext-with-fwmc
 * @see https://github.com/MagicJinn/MrBeastify-Youtube
 */
export function addYouTubeThumbnails(settings: Partial<Settings["youtube"]>) {
  const thumbnailImages = [
    ...Array.from(document.querySelectorAll("ytd-thumbnail a > yt-image > img.yt-core-image")), // general video
    ...Array.from(document.querySelectorAll("img.style-scope.yt-img-shadow[width=\"86\"]")), // notfication thumbnails
    // ...document.querySelectorAll('ytm-shorts-lockup-view-model > a > div.shortsLockupViewModelHostThumbnailContainer'), // short video
    ...Array.from(document.querySelectorAll(".yt-core-image.shortsLockupViewModelHostThumbnail")), // short video
    ...Array.from(document.querySelectorAll("yt-thumbnail-view-model > div.yt-thumbnail-view-model__image > img.yt-core-image")), // general video
    ...Array.from(document.querySelectorAll("yt-image-banner-view-model > img.yt-core-image")), // channel banner images
    ...Array.from(document.querySelectorAll("ytm-thumbnail-cover img.yt-core-image")), // youtube mobile thumbnail
  ];

  thumbnailImages.forEach((thumbnail) => {
    try {
      if (!(thumbnail instanceof HTMLElement)) {
        console.warn("[With FWMC] Thumbnail is not an HTMLElement, skipping:", thumbnail);
        return;
      }

      const container = thumbnail.closest("ytd-thumbnail") || thumbnail.parentElement;

      if (!container || !(container instanceof HTMLElement) || container.querySelector(".fwmc-youtube-overlay")) {
        // container is not found or already has an overlay image
        return;
      }

      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === "static") {
        container.style.position = "relative";
      }

      appendImageWithStyles(container, {
        className: "fwmc-youtube-overlay",
        width: settings.width,
        height: settings.height,
        childToInsertAfter: thumbnail,
      });
    }
    catch (error) {
      console.error("[With FWMC] Error adding YouTube thumbnail:", error);
    }
  });
}

/**
 * Adds the With FUWAMOCO image to YouTube Music thumbnails.
 */
export function addYouTubeMusicThumbnails(settings: Partial<Settings["youtube"]>) {
  const thumbnailImages = [
    ...Array.from(document.querySelectorAll("ytmusic-thumbnail-renderer > yt-img-shadow > img")), // general thumbnails
    ...Array.from(document.querySelectorAll("ytmusic-player-bar img.ytmusic-player-bar")), // player bar thumbnail
    ...Array.from(document.querySelectorAll("div.ytmusic-player-queue-item > yt-img-shadow > img")), // queue thumbnails
  ];

  thumbnailImages.forEach((thumbnail) => {
    try {
      if (!(thumbnail instanceof HTMLElement)) {
        console.warn("[With FWMC] Thumbnail is not an HTMLElement, skipping:", thumbnail);
        return;
      }

      const container = thumbnail.closest("ytmusic-thumbnail-renderer") || thumbnail.parentElement;

      if (!container || !(container instanceof HTMLElement) || container.querySelector(".fwmc-youtube-overlay")) {
        // container is not found or already has an overlay image
        return;
      }

      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === "static") {
        container.style.position = "relative";
      }

      appendImageWithStyles(container, {
        className: "fwmc-youtube-overlay",
        width: settings.width,
        height: settings.height,
        childToInsertAfter: thumbnail,
        zIndex: "0", // prevents video controls from being behind the image
      });
    }
    catch (error) {
      console.error("[With FWMC] Error adding YouTube Music thumbnail:", error);
    }
  });
}
