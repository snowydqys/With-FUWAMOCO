import type { Settings } from "./config";

/** Firefox and Chrome-compatible runtime */
export const runtime = (typeof browser !== "undefined") ? browser : chrome;
/** Extension source URL for the With-FWMC image */
export const imgSrc = runtime.runtime.getURL("assets/images/With-FWMC.webp");

/**
 * Appends an image with specific styles to a container.
 * @param container The container element to append the image to.
 * @param options The options for the image, including class name, width, height, child to insert after, position, and z-index.
 */
export function appendImageWithStyles(container: HTMLElement, options: ImageWithStylesOptions) {
  const withFWMCImage = document.createElement("img");
  withFWMCImage.src = imgSrc;
  withFWMCImage.alt = "With FUWAMOCO";
  withFWMCImage.style.position = options.position ?? "absolute";
  withFWMCImage.style.setProperty("visibility", "visible", "important"); // this has to be important since some sites set visibility to hidden
  withFWMCImage.style.bottom = "0";
  withFWMCImage.style.right = "0";
  withFWMCImage.style.maxWidth = options.width || "auto";
  withFWMCImage.style.maxHeight = options.height || "auto";
  withFWMCImage.style.zIndex = options.zIndex || "100";
  withFWMCImage.style.opacity = options.opacity ? options.opacity.toString() : "1";
  withFWMCImage.style.pointerEvents = "none";
  withFWMCImage.style.margin = "auto 0 0 auto";
  withFWMCImage.style.backgroundColor = "transparent";
  withFWMCImage.classList.add(options.className || "");
  if (options.childToInsertAfter) {
    container.insertBefore(withFWMCImage, options.childToInsertAfter.nextSibling);
  }
  else {
    container.appendChild(withFWMCImage);
  }
}

/**
 * The options for the image.
 */
interface ImageWithStylesOptions {
  /** The class name to apply to the image. */
  className?: string
  /** The max-width of the image. Defaults to "auto". */
  width?: string
  /** The max-height of the image. Defaults to "auto". */
  height?: string
  /** The opacity of the image. Defaults to "1". */
  opacity?: number
  /** The child element to insert the image after. If not provided, the image will be appended to the container. */
  childToInsertAfter?: HTMLElement
  /** The position of the image. Defaults to "absolute". */
  position?: "absolute" | "fixed"
  /** The z-index of the image. Defaults to "100". */
  zIndex?: string
}

/**
 * Creates a function that applies settings to the site-specific function.
 * @description This is used to create a function that can be called later with the current settings.
 */
export function createFunctionWithSettings<K extends keyof Settings>(func: (settings: Partial<Settings[K]>) => void, settings: Partial<Settings[K]>) {
  return () => {
    func(settings);
  };
}
