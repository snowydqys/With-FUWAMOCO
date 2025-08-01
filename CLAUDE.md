# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension called "FUWAMOCO Everywhere" that adds overlay images to YouTube video thumbnails. The extension is a simple Manifest V3 Chrome extension with minimal dependencies.

## Architecture

The extension consists of:
- `manifest.json`: Chrome extension manifest defining permissions, content scripts, and web accessible resources
- `content.js`: Main content script that injects overlay images onto YouTube thumbnails
- `with-fwmc.png`: Static image asset used as the overlay
- `README.md`: User-facing documentation with installation instructions

### Core Functionality

The extension works by:
1. Running as a content script on `https://www.youtube.com/*`
2. Using `MutationObserver` to detect dynamically loaded YouTube thumbnails
3. Adding overlay images positioned at bottom-right of each thumbnail
4. Preventing duplicate overlays with CSS class checking

## Development

### Testing the Extension

Since this is a Chrome extension without a build process:

1. Load the extension in Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this directory

2. Test on YouTube:
   - Go to `https://www.youtube.com`
   - Verify overlay images appear on video thumbnails
   - Check that overlays persist when navigating between pages

### File Structure

- Root directory contains all extension files (no src/ or build/ directories)
- Static assets are web-accessible resources loaded via `chrome.runtime.getURL()`
- No package.json or build tools - this is a vanilla JavaScript extension

### Making Changes

When modifying the extension:
- Changes to `content.js` require reloading the extension in `chrome://extensions`
- Changes to `manifest.json` require reloading the extension
- Image assets must be declared in `web_accessible_resources` to be accessible to content scripts
- Content script runs in isolated context - use `chrome.runtime.getURL()` for asset access

## Extension Permissions

- `activeTab`: Required for content script injection on YouTube
- Content script matches: `https://www.youtube.com/*`
- Web accessible resources: `with-fwmc.png` (available only to YouTube pages)