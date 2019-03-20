Docs
====

1. Add “Pushwoosh” module to your app as per the
[tools documentation](https://trigger.io/docs/current/tools/module_config.html).

2. Configure your project in [Firebase Console](https://console.firebase.google.com/).

3. Locate the google-services.json file to the src/ folder in your project directory.

2. Set up push notifications handler:  

		forge.internal.addEventListener("pushwoosh.pushReceived",
			function (notification) {
			    	alert('push received: ' + notification);
			}
		);

3. Set up push registration handler:  

		forge.internal.addEventListener("pushwoosh.registrationSuccess",
			function (status) {
			    	log('registered with token: ' + status['deviceToken']);
			}
		);

4. Call `onDeviceReady` method (make sure you call this method each time the app starts):

	For Android - `pw_appid` is your Pushwoosh App Id, `gcm_id` is your Sender ID you got from the Firebase Console

		forge.pushwoosh.onDeviceReady({"pw_appid":"XXXX-XXXX", "gcm_id":"123456789012"});

	For iOS - `pw_appid` is your Pushwoosh App Id

		forge.pushwoosh.onDeviceReady({"pw_appid":"XXXX-XXXX"});


5. Register for push notifications:  

		forge.pushwoosh.registerDevice();

That’s it!

**Pushwoosh:**
[http://www.pushwoosh.com](https://www.pushwoosh.com/)
