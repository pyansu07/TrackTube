function getVideoDetails() {
    const videoId = new URL(location.href).searchParams.get('v');
    const title = document.title.replace(" - YouTube", "");
    return { id: videoId, title: title, url: location.href };
  }
  
  function checkForNewVideo() {
    if (location.pathname === "/watch" && new URLSearchParams(location.search).has('v')) {
      const video = getVideoDetails();
      chrome.runtime.sendMessage({ type: 'NEW_VIDEO', video });
    }
  }
  
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      checkForNewVideo();
    }
  }).observe(document, { subtree: true, childList: true });
  
  checkForNewVideo();
  