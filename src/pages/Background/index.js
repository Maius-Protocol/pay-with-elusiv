console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ['wallet.js'],
    });
  }
});
