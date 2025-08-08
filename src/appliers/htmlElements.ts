import type { Settings } from "../config";
import { appendImageWithStyles } from "../helpers";

/**
 * Adds the With FUWAMOCO image to all HTML img elements on the page.
 */
export function addHTMLElements(settings: Partial<Settings["htmlElements"]>) {
  const images = [
    ...Array.from(document.querySelectorAll("img")), // all images
  ];

  images.forEach((element) => {
    try {
      let container = element.parentElement;

      // an img element can be inside a picture element
      // this is because the picture element can contain multiple sources
      // and the img element is the fallback.
      // in this case, we want to add the image to the picture's parent element
      const pictureContainer = element.closest("picture");
      if (pictureContainer) {
        container = pictureContainer.parentElement;
      }

      if (!container || !(container instanceof HTMLElement)) {
        // container is not found
        return;
      }

      let skip = false;
      // if any child of the container has a class that starts with 'fwmc-', skip this element
      if (Array.from(container.children).some(child => Array.from(child.classList).some(cls => cls.startsWith("fwmc-")))) {
        skip = true;
      }

      if (skip)
        return;

      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === "static") {
        container.style.position = "relative";
      }

      appendImageWithStyles(container, {
        className: "fwmc-html-overlay",
        width: settings.width,
        height: settings.height,
        childToInsertAfter: pictureContainer || element,
      });
    }
    catch (error) {
      console.error("[With FWMC] Error adding HTML element overlay:", error);
    }
  });
}
