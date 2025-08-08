import type { Settings } from "./config";
import { loadSettings, saveSettings } from "./config";

let settings: Settings;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    settings = await loadSettings();

    const globalToggle = document.getElementById("global_fwmc_toggle") as HTMLInputElement | null;
    if (globalToggle)
      globalToggle.checked = settings.global.enabled;
    const globalWidth = document.getElementById("global_fwmc_width") as HTMLInputElement | null;
    if (globalWidth)
      globalWidth.value = settings.global.width;
    const globalHeight = document.getElementById("global_fwmc_height") as HTMLInputElement | null;
    if (globalHeight)
      globalHeight.value = settings.global.height;
    const globalOpacity = document.getElementById("global_fwmc_opacity") as HTMLInputElement | null;
    if (globalOpacity)
      globalOpacity.value = settings.global.opacity.toString();

    const youtubeThumbnailsToggle = document.getElementById("youtube_thumbnails_toggle") as HTMLInputElement | null;
    if (youtubeThumbnailsToggle)
      youtubeThumbnailsToggle.checked = settings.youtube.enabled;
    const youtubeThumbnailsWidth = document.getElementById("youtube_thumbnails_width") as HTMLInputElement | null;
    if (youtubeThumbnailsWidth)
      youtubeThumbnailsWidth.value = settings.youtube.width;
    const youtubeThumbnailsHeight = document.getElementById("youtube_thumbnails_height") as HTMLInputElement | null;
    if (youtubeThumbnailsHeight)
      youtubeThumbnailsHeight.value = settings.youtube.height;

    const twitterToggle = document.getElementById("twitter_toggle") as HTMLInputElement | null;
    if (twitterToggle)
      twitterToggle.checked = settings.twitter.enabled;
    const twitterWidth = document.getElementById("twitter_width") as HTMLInputElement | null;
    if (twitterWidth)
      twitterWidth.value = settings.twitter.width;
    const twitterHeight = document.getElementById("twitter_height") as HTMLInputElement | null;
    if (twitterHeight)
      twitterHeight.value = settings.twitter.height;

    // const redditToggle = document.getElementById('reddit_toggle') as HTMLInputElement | null;
    // if (redditToggle) redditToggle.checked = settings.reddit.enabled;
    // const redditWidth = document.getElementById('reddit_width') as HTMLInputElement | null;
    // if (redditWidth) redditWidth.value = settings.reddit.width;
    // const redditHeight = document.getElementById('reddit_height') as HTMLInputElement | null;
    // if (redditHeight) redditHeight.value = settings.reddit.height;

    const htmlElementsToggle = document.getElementById("html_elements_toggle") as HTMLInputElement | null;
    if (htmlElementsToggle)
      htmlElementsToggle.checked = settings.htmlElements.enabled;
    const htmlElementsWidth = document.getElementById("html_elements_width") as HTMLInputElement | null;
    if (htmlElementsWidth)
      htmlElementsWidth.value = settings.htmlElements.width;
    const htmlElementsHeight = document.getElementById("html_elements_height") as HTMLInputElement | null;
    if (htmlElementsHeight)
      htmlElementsHeight.value = settings.htmlElements.height;
  }
  catch (error) {
    console.error("[With FWMC] Error in popup script:", error);
  }

  setupEventListeners();
});

/**
 * Updates the status message displayed in the settings popup.
 * @param message The message to display.
 * @param success Whether the operation was successful. If true, the message will be styled as ".success"; otherwise, it will be styled as a ".warning".
 */
function updateSettingsStatus(message?: string, success: boolean = true) {
  const statusElement = document.getElementById("settings_status") as HTMLParagraphElement | null;
  if (statusElement) {
    statusElement.textContent = message || (success ? "Settings saved successfully!" : "Failed to save settings.");
    statusElement.className = success ? "success" : "warning";
    statusElement.classList.remove("hide");

    if (success) {
      setTimeout(() => {
        statusElement.classList.add("hide");
      }, 3000);
    }
  }
}

function setupEventListeners() {
  const saveButton = document.getElementById("save_settings") as HTMLButtonElement | null;
  saveButton?.addEventListener("click", async () => {
    const NewGlobalSettings: Partial<Settings["global"]> = {};

    const global_fwmc_toggle = document.getElementById("global_fwmc_toggle") as HTMLInputElement | null;
    if (global_fwmc_toggle)
      NewGlobalSettings.enabled = global_fwmc_toggle.checked;
    const global_fwmc_width = document.getElementById("global_fwmc_width") as HTMLInputElement | null;
    if (global_fwmc_width) {
      if (CSS.supports("width", global_fwmc_width.value)) {
        NewGlobalSettings.width = global_fwmc_width.value;
      }
      else {
        updateSettingsStatus("Invalid width value for global image.", false);
        return;
      }
    }
    const global_fwmc_height = document.getElementById("global_fwmc_height") as HTMLInputElement | null;
    if (global_fwmc_height) {
      if (CSS.supports("height", global_fwmc_height.value)) {
        NewGlobalSettings.height = global_fwmc_height.value;
      }
      else {
        updateSettingsStatus("Invalid height value for global image.", false);
        return;
      }
    }
    const global_fwmc_opacity = document.getElementById("global_fwmc_opacity") as HTMLInputElement | null;
    if (global_fwmc_opacity) {
      const opacityValue = Number.parseFloat(global_fwmc_opacity.value);
      if (!Number.isNaN(opacityValue) && opacityValue >= 0 && opacityValue <= 1) {
        NewGlobalSettings.opacity = opacityValue;
      }
      else {
        updateSettingsStatus("Invalid opacity value for global image.", false);
        return;
      }
    }

    const NewYouTubeSettings: Partial<Settings["youtube"]> = {};

    const youtube_thumbnails_toggle = document.getElementById("youtube_thumbnails_toggle") as HTMLInputElement | null;
    if (youtube_thumbnails_toggle)
      NewYouTubeSettings.enabled = youtube_thumbnails_toggle.checked;

    const youtube_thumbnails_width = document.getElementById("youtube_thumbnails_width") as HTMLInputElement | null;
    if (youtube_thumbnails_width) {
      if (CSS.supports("width", youtube_thumbnails_width.value)) {
        NewYouTubeSettings.width = youtube_thumbnails_width.value;
      }
      else {
        updateSettingsStatus("Invalid width value for YouTube thumbnails.", false);
        return;
      }
    }

    const youtube_thumbnails_height = document.getElementById("youtube_thumbnails_height") as HTMLInputElement | null;
    if (youtube_thumbnails_height) {
      if (CSS.supports("height", youtube_thumbnails_height.value)) {
        NewYouTubeSettings.height = youtube_thumbnails_height.value;
      }
      else {
        updateSettingsStatus("Invalid height value for YouTube thumbnails.", false);
        return;
      }
    }

    const NewTwitterSettings: Partial<Settings["twitter"]> = {};

    const twitter_toggle = document.getElementById("twitter_toggle") as HTMLInputElement | null;
    if (twitter_toggle)
      NewTwitterSettings.enabled = twitter_toggle.checked;

    const twitter_width = document.getElementById("twitter_width") as HTMLInputElement | null;
    if (twitter_width) {
      if (CSS.supports("width", twitter_width.value)) {
        NewTwitterSettings.width = twitter_width.value;
      }
      else {
        updateSettingsStatus("Invalid width value for Twitter images.", false);
        return;
      }
    }

    const twitter_height = document.getElementById("twitter_height") as HTMLInputElement | null;
    if (twitter_height) {
      if (CSS.supports("height", twitter_height.value)) {
        NewTwitterSettings.height = twitter_height.value;
      }
      else {
        updateSettingsStatus("Invalid height value for Twitter images.", false);
        return;
      }
    }

    const NewHTMLElementsSettings: Partial<Settings["htmlElements"]> = {};

    const html_elements_toggle = document.getElementById("html_elements_toggle") as HTMLInputElement | null;
    if (html_elements_toggle)
      NewHTMLElementsSettings.enabled = html_elements_toggle.checked;

    const html_elements_width = document.getElementById("html_elements_width") as HTMLInputElement | null;
    if (html_elements_width) {
      if (CSS.supports("width", html_elements_width.value)) {
        NewHTMLElementsSettings.width = html_elements_width.value;
      }
      else {
        updateSettingsStatus("Invalid width value for HTML elements.", false);
        return;
      }
    }

    const html_elements_height = document.getElementById("html_elements_height") as HTMLInputElement | null;
    if (html_elements_height) {
      if (CSS.supports("height", html_elements_height.value)) {
        NewHTMLElementsSettings.height = html_elements_height.value;
      }
      else {
        updateSettingsStatus("Invalid height value for HTML elements.", false);
        return;
      }
    }

    settings.global = { ...settings.global, ...NewGlobalSettings };
    settings.youtube = { ...settings.youtube, ...NewYouTubeSettings };
    settings.twitter = { ...settings.twitter, ...NewTwitterSettings };
    settings.htmlElements = { ...settings.htmlElements, ...NewHTMLElementsSettings };

    await saveSettings(settings);
    updateSettingsStatus("Settings saved successfully!");
  });
}
