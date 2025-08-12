import { runtime } from "./helpers";

/**
 * Configuration for the With-FUWAMOCO extension.
 */
const settings = {
  /** Currently only applies to htmlElements */
  blockedDomains: {
    mode: "blacklist" as "whitelist" | "blacklist", // can be "whitelist" or "blacklist"
    list: [] as string[],
  },
  global: {
    enabled: true,
    width: "auto",
    height: "10vh",
    opacity: 1,
  },
  youtube: {
    enabled: true,
    width: "55%",
    height: "41%",
  },
  twitter: {
    enabled: false,
    width: "55%",
    height: "41%",
  },
  reddit: {
    enabled: false,
    width: "55%",
    height: "41%",
  },
  htmlElements: {
    // all html images and videos
    enabled: false,
    width: "55%",
    height: "41%",
  },
};

/**
 * Type definition for the settings object.
 */
export type Settings = typeof settings;

/**
 * Loads the current settings from sync storage.
 * @returns The saved settings or default settings if not found.
 * @throws Logs an error if there is an issue loading the settings, and returns default settings.
 */
export async function loadSettings(): Promise<Settings> {
  try {
    const result = await runtime.storage.sync.get(settings);
    console.debug("[With FWMC] Settings loaded successfully", result);
    return { ...settings, ...result };
  }
  catch (error) {
    console.error("[With FWMC] Error loading settings:", error);
    return settings; // return default settings on error
  }
}

/**
 * Saves the current settings to sync storage.
 * @param newSettings Partial settings to update. This can include any subset of the settings.
 * @returns void
 * @throws Logs an error if there is an issue saving the settings, and rethrows the error for further handling if needed.
 */
export async function saveSettings(newSettings: Partial<Settings>): Promise<void> {
  try {
    await runtime.storage.sync.set({ ...settings, ...newSettings });
    console.debug("[With FWMC] Settings saved successfully", newSettings);
  }
  catch (error) {
    console.error("[With FWMC] Error saving settings:", error);
    throw error; // rethrow the error for further handling if needed
  }
}
