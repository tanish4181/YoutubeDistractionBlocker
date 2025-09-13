function saveSettingsAndNotify() {
  const settings = {
    hideRecommendations: document.getElementById("hideRecommendations").checked,
    hideComments: document.getElementById("hideComments").checked,
    hideShorts: document.getElementById("hideShorts").checked,
    hideFeed: document.getElementById("hideFeed").checked,
    hideLiveChat: document.getElementById("hideLiveChat").checked, // New feature
    hideVideoTitle: document.getElementById("hideVideoTitle").checked, // New feature
    hideChannelName: document.getElementById("hideChannelName").checked, // New feature
  };

  chrome.storage.sync.set(settings, function () {
    console.log("Focus Mode settings saved.");

    chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, { action: "updateStyles" });
      });
    });
  });
}

function loadSettings() {
  const defaults = {
    hideRecommendations: true,
    hideComments: true,
    hideShorts: true,
    hideFeed: false,
    hideLiveChat: false, // New feature default
    hideVideoTitle: false, // New feature default
    hideChannelName: false, // New feature default
  };

  chrome.storage.sync.get(defaults, function (items) {
    document.getElementById("hideRecommendations").checked =
      items.hideRecommendations;
    document.getElementById("hideComments").checked = items.hideComments;
    document.getElementById("hideShorts").checked = items.hideShorts;
    document.getElementById("hideFeed").checked = items.hideFeed;
    document.getElementById("hideLiveChat").checked = items.hideLiveChat; // New feature
    document.getElementById("hideVideoTitle").checked = items.hideVideoTitle; // New feature
    document.getElementById("hideChannelName").checked = items.hideChannelName; // New feature
  });
}

function openSupportPage() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("contact.html")
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadSettings();

  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", saveSettingsAndNotify);
  });

  document.getElementById("supportBtn").addEventListener("click", function(e) {
    e.preventDefault();
    openSupportPage();
  });
});