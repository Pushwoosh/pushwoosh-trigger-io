var success = function (d) {
		forge.logging.log('success :: '+JSON.stringify(d));
		alert(JSON.stringify(d));
	},
	errorfail = function (e) {
		forge.logging.log('errorfail :: '+JSON.stringify(e));
		alert(JSON.stringify(e));
	},
	log = function () {
		return forge.logging.log.apply(this, arguments);
	};

forge.internal.addEventListener("pushwoosh.registrationSuccess",
	function (status) {
		log('registered with token: ' + status['deviceToken']);
									
		forge.pushwoosh.getPushToken(
			function (token) {
				forge.logging.log('token : ' + token);
		});
		
		forge.pushwoosh.setTags(
			{tags : {"tag1" : ["item1", "item2"]}},
			function (e) {
				forge.pushwoosh.getTags(
					function (tags) {
						log('tags loaded: ' + JSON.stringify(tags));
					}, 
					errorfail); 
			},
			errorfail);
		});

forge.internal.addEventListener("pushwoosh.registrationFail",
    function (status) {
        log('registration failed: ' + status);
    }
);

forge.internal.addEventListener("pushwoosh.pushReceived",
	function (notification) {
		alert('push received: ' + notification);
	}
);

forge.internal.addEventListener("pushwoosh.pushAccepted",
    function (notification) {
        alert('push accepted: ' + notification);
    }
);

forge.pushwoosh.onDeviceReady({"pw_appid":"94F21-6F0D4", "gcm_id":"803445993631"});

forge.pushwoosh.registerDevice();

forge.pushwoosh.getHWID(
    function (hwid) {
        forge.logging.log('HWID : ' + hwid);
    });

// other examples:
forge.pushwoosh.setApplicationIconBadgeNumber({badge:10});

forge.pushwoosh.setForegroundAlert({alert : true});

forge.pushwoosh.setUserId({userId:"%userId"});
forge.pushwoosh.postEvent({event:"testEvent", attributes:{"attribute" : "value"}});
