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

## ⚠️ WARNING: Extreme Bau Bau Option

There's a commented line in `content.js` (line 8) that's currently sleeping peacefully:

```javascript
// 'div#container > div.html5-video-player > div.html5-video-container', // NOTE: too powerful for now, we are not ready yet
```

**DO NOT UNCOMMENT THIS LINE** unless you want FUWAMOCO to literally take over your entire YouTube experience! 🐕‍🦺💥

If you uncomment it, here's what will happen:

- FUWAMOCO will appear on **playing video**
- They'll show up during **ads**

<table>
    <tr>
        <td>ads</td>
        <td>playing video</td>
    </tr>
    <tr>
        <td width="50%">
            <img src="images/ads.png" width="100%" alt="ads">
        </td>
        <td width="50%">
            <img src="images/playing-video.png" width="100%" alt="playing video">
        </td>
    </tr>
</table>

We've marked it as "too powerful for now" because frankly, we're not ready for that level of chaos. The world might not be ready either. Use at your own risk! 🚨

_"With great power comes great responsibility... and in this case, great amounts of FUWAMOCO everywhere."_

## Customization

### Adjusting Overlay Size

You can customize the size of the FUWAMOCO overlay by editing the `content.js` file:

```javascript
img.style.maxWidth = "55%"; // Adjust this value (e.g., '40%', '70%')
img.style.maxHeight = "41%"; // Adjust this value (e.g., '35%', '65%')
```

**How to modify:**

1. Open `content.js` in a text editor
2. Find lines 13-14 where the overlay dimensions are set
3. Change the percentage values to your preference
4. Save the file
5. Go to `chrome://extensions` and click the refresh button on the extension
6. Reload any YouTube pages to see the changes

Test different values to find your preferred balance between visibility and thumbnail coverage!
