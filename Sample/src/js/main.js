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
									
//									forge.pushwoosh.startLocationTracking();
                                
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

forge.internal.addEventListener("pushwoosh.pushReceived",
	function (notification) {
    	alert('push received: ' + notification);
	});

forge.pushwoosh.onDeviceReady({"pw_appid":"4FC89B6D14A655.46488481", "gcm_id":"60756016005"});

forge.pushwoosh.registerDevice();

forge.pushwoosh.getHWID(
	function (hwid) {
    	forge.logging.log('HWID : ' + hwid);
//    	alert(hwid);
	});

// other examples:
forge.pushwoosh.setApplicationIconBadgeNumber({badge:10});
forge.pushwoosh.setForegroundAlert({alert:true});

forge.pushwoosh.setUserId({userId:"%userId"});
forge.pushwoosh.postEvent({event:"buttonPressed", attributes:{ "buttonNumber" : 4, "buttonLabel" : "banner" }});
