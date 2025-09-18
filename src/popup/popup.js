function saveSettingsAndNotify() {
  const settings = {
    hideRecommendations: document.getElementById("hideRecommendations").checked,
    hideComments: document.getElementById("hideComments").checked,
    hideShorts: document.getElementById("hideShorts").checked,
    hideFeed: document.getElementById("hideFeed").checked,
    hideLiveChat: document.getElementById("hideLiveChat").checked,
    hideVideoTitle: document.getElementById("hideVideoTitle").checked,
    hideChannelName: document.getElementById("hideChannelName").checked,
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
    hideLiveChat: false,
    hideVideoTitle: false,
    hideChannelName: false,
  };

  chrome.storage.sync.get(defaults, function (items) {
    document.getElementById("hideRecommendations").checked =
      items.hideRecommendations;
    document.getElementById("hideComments").checked = items.hideComments;
    document.getElementById("hideShorts").checked = items.hideShorts;
    document.getElementById("hideFeed").checked = items.hideFeed;
    document.getElementById("hideLiveChat").checked = items.hideLiveChat;
    document.getElementById("hideVideoTitle").checked = items.hideVideoTitle;
    document.getElementById("hideChannelName").checked = items.hideChannelName;
  });
}

function openSupportPage() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("src/contact/contact.html")
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadSettings();

  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", saveSettingsAndNotify);
  });

  document.getElementById("contactBtn").addEventListener("click", function(e) {
    e.preventDefault();
    openSupportPage();
  });
});