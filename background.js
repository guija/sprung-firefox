console.log("BACKGROUND!");

function handleRemoved(tabId, removeInfo) {
  console.log("Tab: " + tabId + " is closing");
  console.log("Window ID: " + removeInfo.windowId);
  console.log("Window is closing: " + removeInfo.isWindowClosing);  
}

// browser.tabs.onRemoved.addListener(handleRemoved);
browser.tabs.onCreated.addListener(handleTabCreated);
browser.tabs.onUpdated.addListener(handleTabUpdate);
browser.tabs.onActivated.addListener(handleTabActivated);

function handleTabActivated(activeInfo) {
	var tabId = activeInfo.tabId;
	var windowId = activeInfo.windowId;
	// TODO Get tab object if needed
	console.log("ACTIVATED")
	console.log("tabId = " + tabId);
	console.log("tabWindow = " + windowId);
}

function handleTabUpdate(tabId, changeInfo, tab) {
	logTabInfo("UPDATED", tab);
}

function handleTabCreated(tab) {
	logTabInfo("CREATED", tab);
}

function logTabInfo(action, tab) {
	console.log(action);
	console.log("tabid = " + tab.id);
	console.log("title = " + tab.title);
	console.log("url = " + tab.url);
	console.log("window id = " + tab.windowId);
}