
function applyStyles(settings) {
    const styleId = 'youtube-focus-mode-styles';
    let style = document.getElementById(styleId);
  
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
  
    let css = '';
  
    if (settings.hideRecommendations) {
      css += `
        #related { 
          display: none !important; 
        }
      `;
    }
  
    if (settings.hideComments) {
      css += `
        #comments { 
          display: none !important; 
        }
      `;
    }
  
    if (settings.hideEndScreen) {
      css += `
        .ytp-endscreen-content { 
          display: none !important; 
        }
      `;
    }
    
    if (settings.hideMeta) {
      css += `
        #info.ytd-watch-flexy, #meta.ytd-watch-flexy {
          display: none !important;
        }
      `;
    }
  
    if (settings.hideShorts) {

      css += `
        ytd-rich-shelf-renderer[is-shorts], 
        ytd-grid-video-renderer:has(a[href*="/shorts/"]) {
          display: none !important;
        }
      `;
    }
  
    style.textContent = css;
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "update") {
      applyStyles(request.settings);
    }
  });
  
  chrome.storage.sync.get(
    {
      hideRecommendations: true,
      hideComments: true,
      hideEndScreen: false,
      hideMeta: false,
      hideShorts: true
    },
    function (items) {
      applyStyles(items);
    }
  );
  