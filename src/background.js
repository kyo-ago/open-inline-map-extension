chrome.contextMenus.create({
  id: "open",
  title: 'Open "%s" on map',
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab) {
    return;
  }
  chrome.tabs.executeScript(tab.id, {
    file: "content_scripts.js",
  });
});
