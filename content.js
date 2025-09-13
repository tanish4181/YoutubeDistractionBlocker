function applyFocusModeStyles() {
  const defaults = {
    hideRecommendations: true,
    hideComments: true,
    hideShorts: true,
    hideFeed: false,
    hideLiveChat: false, // New feature default
    hideVideoTitle: false, // New feature default
    hideChannelName: false, // New feature default
  };

  chrome.storage.sync.get(defaults, function (settings) {
    const styleId = "youtube-focus-mode-styles";
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    let css = ` `;

    if (settings.hideRecommendations) {
      css += `
                #related { display: none !important; }
            `;
    }

    if (settings.hideComments) {
      css += `
                #comments { display: none !important; }
            `;
    }

    if (settings.hideShorts) {
      css += `
                /* 1. Hide Shorts link in the main navigation sidebar */
                ytd-guide-entry-renderer a[title="Shorts"],
                ytd-mini-guide-entry-renderer[aria-label="Shorts"] {
                    display: none !important;
                }

                /* 2. Hide Shorts shelves on homepage, subscriptions, etc. */
                ytd-rich-shelf-renderer[is-shorts] {
                    display: none !important;
                }
                /* 3. Hide the Shorts shelf in the recommendations sidebar (Watch Page) */
                ytd-reel-shelf-renderer {
                    display: none !important;
                }    

                /* 4. Hide any video item that links to a Short in any list */
                ytd-grid-video-renderer:has(a[href*="/shorts/"]),
                ytd-rich-item-renderer:has(ytd-rich-grid-media[is-short]),
                ytd-video-renderer:has(a[href*="/shorts/"]),
                ytd-compact-video-renderer:has(a[href*="/shorts/"]) {
                    display: none !important;
                }
            `;
    }

    if (settings.hideFeed) {
      css += `
                ytd-two-column-browse-results-renderer #primary { display: none !important; }
            `;
    }

    if (settings.hideLiveChat) {
      css += `
                ytd-live-chat-frame, #chat { display: none !important; }
            `;
    }
    
    if (settings.hideVideoTitle) {
      css += `
                h1.ytd-watch-metadata { display: none !important; }
            `;
    }
    
    if (settings.hideChannelName) {
      css += `
                ytd-video-owner-renderer { display: none !important; }
            `;
    }

    styleElement.textContent = css;
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateStyles") {
    applyFocusModeStyles();
  }
});

applyFocusModeStyles();