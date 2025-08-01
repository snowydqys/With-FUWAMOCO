# FUWAMOCO Everywhere

This Chrome extension adds an image to the top of YouTube video thumbnails.

This idea came from this tweet: https://x.com/paramedsz/status/1951152462393450518

## Installation

### From GitHub Releases (easier)

1. Go to the [Releases page](https://github.com/arashari/chrome-ext-with-fwmc/releases).
2. Download the `chrome-ext-with-fwmc.zip` file from the latest release.
3. Unzip the file.
4. Open Chrome and navigate to `chrome://extensions`.
5. Enable "Developer mode" in the top right corner.
6. Click "Load unpacked" and select the unzipped directory.

### From source (for developers)

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select the directory where you cloned this repository.

## Customization

### Adjusting Overlay Size

You can customize the size of the FUWAMOCO overlay by editing the `content.js` file:

```javascript
img.style.maxWidth = '55%';    // Adjust this value (e.g., '40%', '70%')
img.style.maxHeight = '41%';   // Adjust this value (e.g., '35%', '65%')
```

**How to modify:**
1. Open `content.js` in a text editor
2. Find lines 13-14 where the overlay dimensions are set
3. Change the percentage values to your preference
4. Save the file
5. Go to `chrome://extensions` and click the refresh button on the extension
6. Reload any YouTube pages to see the changes

Test different values to find your preferred balance between visibility and thumbnail coverage!
