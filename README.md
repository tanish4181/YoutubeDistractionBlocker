# YouTube Focus Mode

**YouTube Focus Mode** is a simple, lightweight **browser extension** designed to help you reclaim your focus on YouTube by removing distracting elements from the user interface.  

Tired of falling down the rabbit hole of recommended videos or getting drawn into comment section debates? YouTube Focus Mode cleans up your viewing experience, allowing you to watch what you came for without the digital noise.

---

## Features

This extension gives you control over the most common distractions on YouTube.



You can turn these features on or off from the extension's popup menu:

- **Hide Recommendations:** Removes the entire "Up next" sidebar on video watch pages.  
- **Hide Comments:** Removes the entire comments section below videos.  
- **Hide All Shorts:** Removes YouTube Shorts from all parts of the site, including:  
  - The "Shorts" link in the main navigation menu  
  - The "Shorts" shelf on the homepage and in the recommendations sidebar  
  - Any video that is a "Short" in search results, subscription feeds, or channel pages  

---

## Installation

Since this extension is **not on the Chrome Web Store**, you need to load it manually:

1. **Download the Files:** Make sure you have all the extension files (`manifest.json`, `popup.html`, `popup.js`, `content.js`, and the `images` folder) in a single folder on your computer.  
2. **Open Chrome Extensions:** Navigate to `chrome://extensions` in your Google Chrome browser.  
3. **Enable Developer Mode:** In the top-right corner of the Extensions page, turn on the "Developer mode" switch.  
4. **Load the Extension:** Click the "Load unpacked" button.  
5. **Select the Folder:** Choose the folder where you saved the extension files.  

The **YouTube Focus Mode** extension icon should now appear in your browser's toolbar.

---

## How to Use

1. Go to any page on `youtube.com`.  
2. Click the **YouTube Focus Mode** icon in your browser's toolbar.  
3. A popup window will appear with toggles for:  
   - "Hide Recommendations"  
   - "Hide Comments"  
   - "Hide All Shorts"  
4. Click any toggle to turn a feature on or off. The changes will apply instantly to your current tab and all future ones. Your choices are saved automatically.

---

## Project Files

- **manifest.json:** Core file that tells Chrome what the extension is, the permissions it needs, and how it works.  
- **popup.html:** HTML structure for the small window that appears when you click the extension icon.  
- **popup.js:** JavaScript for the popup; saves settings and tells the YouTube page when to update.  
- **content.js:** Main JavaScript file injected into YouTube pages to apply CSS rules hiding distracting elements.  

---

## Future Plans

I plan to **add more features in the future** to make the extension even more useful.  

If you like it, please **give it a ⭐** on GitHub: [Tab Tammer](https://github.com/tanish4181/TabTammer)  

