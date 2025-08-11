function saveSettingsAndNotify() {
  const settings = {
    hideRecommendations: document.getElementById("hideRecommendations").checked,
    hideComments: document.getElementById("hideComments").checked,
    hideShorts: document.getElementById("hideShorts").checked,
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
  };

  chrome.storage.sync.get(defaults, function (items) {
    document.getElementById("hideRecommendations").checked =
      items.hideRecommendations;
    document.getElementById("hideComments").checked = items.hideComments;
    document.getElementById("hideShorts").checked = items.hideShorts;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadSettings();

  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", saveSettingsAndNotify);
  });
});
