var currentTabId = undefined;
var currentWindowTitle = undefined;
var SPRUNG_REST_API = "http://localhost:1234";

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
	currentTabId = tabId;
	updateTabList();
}

function handleTabUpdate(tabId, changeInfo, tab) {
	logTabInfo("UPDATED", tab);
	if (tabId == currentTabId) {
		currentWindowTitle = changeInfo.title;
	}
	updateTabList();
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

function updateTabList() {
  var queryInfo = { currentWindow: true };
  var querying = browser.tabs.query(queryInfo);
  querying.then(handleUpdateTabs, handleUpdateTabListError);
}

function handleUpdateTabListError(error) {
	console.log(error);
}

function handleUpdateTabs(tabs) {

  console.log("HANDLEUPDATETABS");

  var customTabList = [];

  for(var i = 0; i < tabs.length; i++) {

    var tab = tabs[i];
    var isCurrent = currentTabId == tab.id;

    logTabInfo("HANDLEUPDATETABS", tab);

    // Moeglicherweise stimmt der neue Tabtitel nicht. Falls er nicht stimmt muss man 
    // den Wert aus onUpdated param changeInfo.title verwenden
    customTabList.push({
      index: i,
      id: tab.id,
      title: tab.title,
      isCurrent: isCurrent,
      windowId: tab.windowId
    });

  }
  
  console.log(customTabList);

  $.post(
    SPRUNG_REST_API + "/firefox", 
    JSON.stringify(customTabList), 
    function(response) { console.log(response) }, 
    "json"
  );
}
