function updatePage(settings) {
  chrome.tabs.query({url: "*://*.youtube.com/*"}, function(tabs) {
      tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, {
              action: "update",
              settings: settings
          });
      });
  });
}

function saveAndAndUpdate() {
const settings = {
  hideRecommendations: document.getElementById('hideRecommendations').checked,
  hideComments: document.getElementById('hideComments').checked,
  hideEndScreen: document.getElementById('hideEndScreen').checked,
  hideMeta: document.getElementById('hideMeta').checked,
  hideShorts: document.getElementById('hideShorts').checked
};

chrome.storage.sync.set(settings, function() {
  console.log('Settings saved');
  updatePage(settings);
});
}

function loadSettings() {
const defaults = {
  hideRecommendations: true,
  hideComments: true,
  hideEndScreen: false,
  hideMeta: false,
  hideShorts: true 
};

chrome.storage.sync.get(defaults, function(items) {
  document.getElementById('hideRecommendations').checked = items.hideRecommendations;
  document.getElementById('hideComments').checked = items.hideComments;
  document.getElementById('hideEndScreen').checked = items.hideEndScreen;
  document.getElementById('hideMeta').checked = items.hideMeta;
  document.getElementById('hideShorts').checked = items.hideShorts;
});
}

document.addEventListener('DOMContentLoaded', function () {
loadSettings();

const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', saveAndAndUpdate);
});
});
