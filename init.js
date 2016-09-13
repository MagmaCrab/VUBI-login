//Send request for settings and start working
chrome.extension.sendRequest({
	name: "info"
}, function (settings) {
	if (!settings.active) {
		return;
	}

	// No credentials were filled in yet, inform user
	if (settings.username == null || settings.username == '') {
		alert("Couldn't find your username. Try to save your credentials again.");
		// Request background script to open extensions tab.
		chrome.extension.sendRequest({
			name: "options"
		});
		return;
	}

	// Try to login only on the correct page. Since we don't know this from the URL, we're going to search for
	// specific strings.
	var text = document.getElementsByTagName('html')[0].innerHTML;
	if (text.search("invalid username or password") > -1) {
		alert("Can't login with given username and password, you probably used the wrong credentials.");
		return;
	} else if (text.search("Please log on") > -1) {
		try {
			login(document, settings);
		} catch (err) {
			alert("Error: something went wrong. Contact the developer if you keep experiencing this problem.");
			console.log("error: " + err.message);
		}
	}
});

// document: javascript document element
// settings: a map containing at least username and password
function login(document, settings) {
	var usernameField = document.getElementsByName('username')[0];
	var passwordField = document.getElementsByName('password')[0];

	usernameField.value = settings.username;
	passwordField.value = settings.password;
	document.forms["sendin"].submit();
}