var username;
var password;
var saveButton;
var resetButton;

var status;

//Load settings from localStorage and fill them in in the form
function init() {
	username = document.getElementById("username");
	password = document.getElementById("password");
	saveButton = document.getElementById("save-button");
	resetButton = document.getElementById("reset-button");

	username.value  = localStorage.username || "";
	password.value  = localStorage.password || "";
	
	if(localStorage.active == 1){
		status = "active";
	}else{
		status = "inactive";
	}
	document.getElementById("activeStatus").innerHTML = "Current status: "+status;
	markClean();
}

//Save settings in localStorage
function save() {
	localStorage.username = username.value;
	localStorage.password = password.value;
	localStorage.active = 1;
	markClean();
}

function cancel() {
	window.close();
}

function markDirty() {
	saveButton.disabled = false;
}

function markClean() {
	saveButton.disabled = true;
}

//Add event listeners once the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
	init();

	username.addEventListener('input', markDirty);
	password.addEventListener('input', markDirty);
	saveButton.addEventListener('click', save);
	resetButton.addEventListener('click', cancel);
});
