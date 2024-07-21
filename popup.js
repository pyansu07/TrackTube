document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('videoList');
  
    chrome.storage.local.get('videos', (data) => {
      const videos = data.videos || [];
      videos.forEach(video => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = video.url;
        a.textContent = video.title;
        a.target = '_blank';
        li.appendChild(a);
        videoList.appendChild(li);
      });
    });
  });
  