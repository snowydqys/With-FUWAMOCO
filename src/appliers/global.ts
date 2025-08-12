import type { Settings } from "../config";
import { appendImageWithStyles } from "../helpers";

/**
 * Adds the With FUWAMOCO image to the document body.
 * @description This is the bottom right corner image that is always visible.
 */
export function addGlobalImage(settings: Partial<Settings["global"]>) {
  if (document.querySelector(".fwmc-global-image")) {
    return;
  }

  try {
    const body = document.body;
    if (!body || !(body instanceof HTMLElement)) {
      console.warn("[With FWMC] Body element not found, cannot add global image");
      return;
    }

    if (body.querySelector(".fwmc-global-image")) {
      return;
    }

    appendImageWithStyles(body, {
      className: "fwmc-global-image",
      width: settings.width,
      height: settings.height,
      position: "fixed",
      zIndex: "0",
    });
  }
  catch (error) {
    console.error("[With FWMC] Error adding global image:", error);
  }
}
