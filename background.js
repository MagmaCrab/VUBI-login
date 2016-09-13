//Start listening for requests for information
chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
		if (request.name == 'info') {
			sendResponse({
				username: localStorage.username,
				password: localStorage.password,
				active: (localStorage.active == 1)
			});
		}	
		if (request.name == 'options') {
			chrome.tabs.create({
				url: chrome.extension.getURL("options.html")
			});
		}

	});

//Listen for click events on the extension icon	  
chrome.browserAction.onClicked.addListener(function (tab) {
	console.log(localStorage.active);
	localStorage.active = 1 - localStorage.active;
	updateIcon();
});

function updateIcon() {
	// Add a OFF tag when the status is inactive
	if (localStorage.active == 1) {
		chrome.browserAction.setBadgeText({
			text: ''
		});
	} else {
		chrome.browserAction.setBadgeText({
			text: 'off'
		});
	}
}

updateIcon();