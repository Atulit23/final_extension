chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "capture") {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      sendResponse({ dataUrl: dataUrl });
    });
  }
  return true;
});
