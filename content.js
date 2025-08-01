function addImageToThumbnails() {
  const thumbnails = document.querySelectorAll('ytd-thumbnail');
  thumbnails.forEach(thumbnail => {
    if (thumbnail.querySelector('.overlay-image')) {
      return;
    }

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('with-fwmc.png');
    img.style.position = 'absolute';
    img.style.bottom = '0';
    img.style.right = '0';
    img.style.width = '50%';
    img.style.height = '50%';
    img.style.zIndex = '10';
    img.classList.add('overlay-image');

    thumbnail.appendChild(img);
  });
}

const observer = new MutationObserver(addImageToThumbnails);
observer.observe(document.body, { childList: true, subtree: true });

addImageToThumbnails();
