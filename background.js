chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ videos: [] });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'NEW_VIDEO') {
      chrome.storage.local.get('videos', (data) => {
        let videos = data.videos || [];
        videos.unshift(message.video);
        if (videos.length > 5) {
          videos.pop();
        }
        chrome.storage.local.set({ videos });
      });
    }
  });
  