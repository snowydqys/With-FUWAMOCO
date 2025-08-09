import type { Settings } from "../config";
import { appendImageWithStyles } from "../helpers";

/**
 * Adds the With FUWAMOCO image to Twitter/X media.
 * @description Currently wip, not perfect
 */
export function addTwitter(settings: Partial<Settings["twitter"]>) {
  const imagesAndVideos = [
    // general tweets
    ...Array.from(document.querySelectorAll("article div[data-testid='tweetPhoto'] img")), // images
    ...Array.from(document.querySelectorAll("article div[data-testid='videoComponent'] video")), // videos
    ...Array.from(document.querySelectorAll("div[data-testid='swipe-to-dismiss'] img")), // fullscreen image

    // For You page
    ...Array.from(document.querySelectorAll("div[data-testid='eventHero'] img")), // image in hero
    ...Array.from(document.querySelectorAll("div[data-testid='trend'] img")), // images in trends

    // profile specific
    ...Array.from(document.querySelectorAll("img[src^='https://pbs.twimg.com/profile_banners']")), // profile banners
  ];

  imagesAndVideos.forEach((media) => {
    try {
      if (!(media instanceof HTMLElement)) {
        console.warn("[With FWMC] Media is not an HTMLElement, skipping:", media);
        return;
      }

      let container = media.parentElement;

      if (!container || !(container instanceof HTMLElement) || container.querySelector(".fwmc-twitter-overlay")) {
        // container is not found or already has an overlay image
        return;
      }

      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === "static") {
        container.style.position = "relative";
      }
      if (container.ariaLabel === "trend-image") {
        // trend images are special since the img element itself extends to the full height of the image
        // meanwhile the container is a max-height of 80px.
        // this causes the image to be cut off at the bottom, or completely hidden
        //
        // to account for this, instead of trying to find that container div, since its up in the tree
        // (and the css is a mess)
        // we will just create a wrapper div that will contain the image
        // this wrapper will have a fixed height of 80px
        // and will be positioned relative to the container
        const wrapperDiv = document.createElement("div");
        wrapperDiv.style.position = "relative";
        wrapperDiv.style.maxHeight = "80px";
        wrapperDiv.style.height = "100%";
        wrapperDiv.style.overflow = "hidden";
        // we want this wrapper to be positioned at the top left of the container
        // so that the overlay can be positioned at the bottom right
        wrapperDiv.style.top = "0";
        wrapperDiv.style.left = "0";
        // add a class to the wrapper for preventing conflicts as well
        wrapperDiv.classList.add("fwmc-twitter-overlay", "fwmc-twitter-overlay-trend");
        container.appendChild(wrapperDiv);
        container = wrapperDiv; // use the wrapper as the container
      }

      appendImageWithStyles(container, {
        className: "fwmc-twitter-overlay",
        width: settings.width,
        height: settings.height,
        childToInsertAfter: container.classList.contains("fwmc-twitter-overlay-trend") ? undefined : media,
        zIndex: "0", // overlay has to be 0 or else video controls will be behind the image
      });
    }
    catch (error) {
      console.error("[With FWMC] Error adding Twitter/X image:", error);
    }
  });
}
