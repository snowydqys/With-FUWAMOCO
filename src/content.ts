import type { Settings } from "./config";
import { addGlobalImage } from "./appliers/global";
import { addHTMLElements } from "./appliers/htmlElements";
import { addTwitter } from "./appliers/twitter";
import { addYouTubeThumbnails } from "./appliers/youtube";
import { loadSettings } from "./config";
import { createFunctionWithSettings } from "./helpers";

let currentSettings: Settings;
/**
 * Current function to apply settings based on the current page.
 * This is used to reapply settings when the page changes or new elements are added.
 */
let currentFunction: (() => void) | undefined;

async function main() {
  try {
    if (document.contentType !== "text/html") {
      console.warn("[With FWMC] Not an HTML document, stopping execution");
      return;
    }

    currentSettings = await loadSettings();
    if (currentSettings.global.enabled) {
      console.log("[With FWMC] Global image enabled, adding to page");
      addGlobalImage(currentSettings.global);
    }

    switch (window.location.hostname) {
      case "youtube.com":
      case "www.youtube.com":
      case "m.youtube.com":
      case "music.youtube.com":
        if (currentSettings.youtube.enabled) {
          console.log("[With FWMC] YouTube thumbnails enabled, adding to all thumbnails");
          currentFunction = createFunctionWithSettings<"youtube">(addYouTubeThumbnails, currentSettings.youtube);
        }
        break;

      case "twitter.com":
      case "x.com":
        if (currentSettings.twitter.enabled) {
          console.log("[With FWMC] Twitter images enabled, adding to all images");
          currentFunction = createFunctionWithSettings<"twitter">(addTwitter, currentSettings.twitter);
        }
        break;

      default:
        if (currentSettings.htmlElements.enabled) {
          // by putting this in the default case, we ensure it only runs on non-specific sites
          // this is because we dont want this to conflict with other specific site handlers.
          // if the user wants it on those sites, they should enable the specific handlers instead.
          console.log("[With FWMC] HTML elements enabled, adding to all images and videos");
          currentFunction = createFunctionWithSettings<"htmlElements">(addHTMLElements, currentSettings.htmlElements);
        }
        break;
    }
    if (currentFunction) {
      currentFunction();
    }
    else {
      console.warn("[With FWMC] No applicable function found for the current page");
    }
  }
  catch (error) {
    console.error("[With FWMC] Error in main function:", error);
  }
}

main();

const observer = new MutationObserver(() => {
  if (currentFunction) {
    currentFunction();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
