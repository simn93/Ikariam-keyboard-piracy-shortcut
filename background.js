//event loop
chrome.commands.onCommand.addListener(function(command) {
	if(command === "on_key_depreda") chrome.tabs.executeScript(null,{file: "click_script.js"},null);
	else if(command === "on_key_logout") chrome.tabs.executeScript(null, {file: "logout_query.js"},null);
	else if(command === "on_key_login") chrome.tabs.executeScript(null, {file: "login_query.js"},null);
	else if(command === "on_key_chapta") chrome.tabs.executeScript(null, {file: "chapta_check.js"},null);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendresponse) {
	if(request.what == "getdata"){
		chrome.storage.local.get('data', function(res){
			var data = JSON.parse(res.data);
			if(data != null && data != [] && data[0] != null && data[0] != [] && data[0][0] != "" && data[0][1] != "" ){
				sendresponse({login: JSON.stringify(data[0])});
				console.log("login di "+data[0][0]+". Password: "+data[0][1]);
				data.splice(0,1);
				chrome.storage.local.set({'data': JSON.stringify(data)});
			}
			else{
				alert("Raccolta terminata e/o errore nei dati");
				chrome.storage.local.set({'data': JSON.stringify(null)});
			}
		});
	}
	else if(request.what == "setdata"){
		
	}
	return true;
});

var audio = new Audio('pirate_notification_short.wav');
audio.play();