/*-----------------------------------------------------------------*/
/* On App Launch
/*-----------------------------------------------------------------*/

function updateURL(tab) {
	chrome.tabs.update(tab.id, {url: "http://www.amazon.com/?tag=oneclickamz20-20"});
}
chrome.browserAction.onClicked.addListener(function(tab){updateURL(tab)});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var $currentUrl = tab.url
	if (document.cookie.indexOf('ref-amazon=')== -1 && $currentUrl.match('amazon.com') && !$currentUrl.match('oneclickamz20-20')) {
		chrome.tabs.update(tab.id, {url: $currentUrl});
		// Set Cookie
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 17000;
		now.setTime(time);
		document.cookie =
		'ref-amazon=active; expires=' + now.toUTCString() +
		'; path=/';
	}

});
