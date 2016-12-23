//Class: forge.pushwoosh
//Class to interact with Pushwoosh Push Notifications plugin
//
//Example:
//(start code)
//                forge.internal.addEventListener("pushwoosh.pushReceived",
//                    function (notification) {
//                            alert('push received: ' + notification);
//                    }
//                );
//
//                forge.internal.addEventListener("pushwoosh.registrationSuccess",
//                    function (status) {
//                            log('registered with token: ' + status['deviceToken']);
//                    }
//                );
//
//                forge.internal.addEventListener("pushwoosh.registrationFail",
//                    function (error) {
//                            log('Failed to register: ' + error);
//                    }
//                );
//
//                forge.pushwoosh.onDeviceReady({"pw_appid":"XXXXX-XXXXX", "gcm_id":"XXXXXXXXXXXX"});
//                forge.pushwoosh.registerDevice();
//(end)
// Expose the native API to javascript
forge.pushwoosh = {

//Function: onDeviceReady
//Call this first thing with your Pushwoosh App ID (pw_appid parameter) and Google Project ID for Android (gcm_id parameter)
//
//Example:
//(start code)
//  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", gcm_id : "PUSHWOOSH_APP_ID". This will also trigger all pending push notifications on start.
//  forge.pushwoosh.onDeviceReady({"pw_appid":"XXXXX-XXXXX", "gcm_id":"XXXXXXXXXXXX"});
//(end)
    onDeviceReady: function (params, success, error) {
        forge.internal.call('pushwoosh.onDeviceReady', params, success, error);
    },

//Function: registerDevice
//Call this to register for push notifications and retreive a push token via callbacks
//
//Example:
//(start code)
//  forge.pushwoosh.registerDevice();
//(end)
    registerDevice: function (success, error) {
        forge.internal.call('pushwoosh.registerDevice', {}, success, error);
    },

//Function: unregisterDevice
//Unregisters device from push notifications
//
//Example:
//(start code)
//  forge.pushwoosh.unregisterDevice();
//(end)
    unregisterDevice: function (success, error) {
        forge.internal.call('pushwoosh.unregisterDevice', {}, success, error);
    },

//Function: startLocationTracking
//Starts geolocation based push notifications. You need to configure Geozones in Pushwoosh Control panel.
//
//Example:
//(start code)
//  forge.pushwoosh.startLocationTracking();
//(end)
    startLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh.startLocationTracking', {}, success, error);
    },

//Function: stopLocationTracking
//Stops geolocation based push notifications
    stopLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh.stopLocationTracking', {}, success, error);
    },

//Function: setTags
//Call this to set tags for the device
//
//Example:
//sets the following tags: "deviceName" with value "hello" and "deviceId" with value 10
//(start code)
//  forge.pushwoosh.setTags({tags : {deviceName:"hello", deviceId:10}},
//      function(status) {
//          forge.logging.log('setTags success');
//      },
//      function(status) {
//          forge.logging.log('setTags failed');
//      }
//  );
//
//  //setings list tags "tag1" with values (array) "item1", "item2"
//  forge.pushwoosh.setTags({tags : {"tag1" : ["item1", "item2"]}},
//    function (status) {
//        forge.logging.log('set tags success');
//    },
//    function(status) {
//        forge.logging.log('setTags failed');
//    }
//  );
//(end)
    setTags: function (params, success, error) {
        forge.internal.call('pushwoosh.setTags', params, success, error);
    },

//Function: getTags
//Call this to get tags for the device
//
//Example:
//(start code)
//  forge.pushwoosh.getTags(
//    function (tags) {
//        log('tags loaded: ' + JSON.stringify(tags));
//    },
//    function(status) {
//        forge.logging.log('getTags failed');
//    }
//  );
//(end)
    getTags: function (success, error) {
        forge.internal.call('pushwoosh.getTags', {}, success, error);
    },

//Function: getPushToken
//Call this to get push token if it is available. Note the token also comes in "pushwoosh.registrationSuccess" function callback.
//
//Example:
//(start code)
//  forge.pushwoosh.getPushToken(
//    function (token) {
//        forge.logging.log('token : ' + token);
//  });
//(end)
    getPushToken: function (success, error) {
        forge.internal.call('pushwoosh.getPushToken', {}, success, error);
    },

//Function: getHWID
//Call this to get Pushwoosh HWID used for communications with Pushwoosh API
//
//Example:
//(start code)
//  forge.pushwoosh.getHWID(
//    function (hwid) {
//        forge.logging.log('HWID : ' + hwid);
//  });
//(end)
    getHWID: function (success, error) {
        forge.internal.call('pushwoosh.getHWID', {}, success, error);
    },

//Function: getRemoteNotificationStatus
//iOS only,
//Call this to get a detailed status of push notification permissions.
//
//Returns array with the following items:
//
//"enabled" - if push notificaions enabled.
//"pushBadge" -  badges permission granted.
//"pushAlert" -  alert permission granted.
//"pushSound" -  sound permission granted.
    getRemoteNotificationStatus: function (success, error) {
        forge.internal.call('pushwoosh.getRemoteNotificationStatus', {}, success, error);
    },

//Function: setApplicationIconBadgeNumber
//iOS only,
//Call this to set the application icon badge   
//
//Example:
//(start code)
//  forge.pushwoosh.setApplicationIconBadgeNumber({badge:10});
//(end)
    setApplicationIconBadgeNumber: function (params, success, error) {
        forge.internal.call('pushwoosh.setApplicationIconBadgeNumber', params, success, error);
    },

//Function: cancelAllLocalNotifications
//iOS only,
//Call this to clear all notifications from the notification center
    cancelAllLocalNotifications: function (success, error) {
        forge.internal.call('pushwoosh.cancelAllLocalNotifications', {}, success, error);
    },

//Function: setForegroundAlert
//Set to true to disable automatic push handing in foreground
//By default is set to true on iOS and false on Android
//
//Example:
//(start code)
//  forge.pushwoosh.setForegroundAlert({alert:true});
//(end)
    setForegroundAlert: function(params, success, error) {
        forge.internal.call('pushwoosh.setForegroundAlert', params, success, error);
    },

//Function: setUserId
//Set User indentifier. This could be Facebook ID, username or email, or any other user ID.
//This allows data and events to be matched across multiple user devices.
    setUserId: function(params, success, error) {
        forge.internal.call('pushwoosh.setUserId', params, success, error);
    },

//Function: postEvent
//Post events for In-App Messages. This can trigger In-App message display as specified in Pushwoosh Control Panel.
//
//Parameters:
// "event" - event to trigger
// "attributes" - object with additional event attributes
// 
// Example:
//(start code)
// forge.pushwoosh.postEvent({event:"buttonPressed", attributes:{ "buttonNumber" : 4, "buttonLabel" : "banner" }});
//(end)
    postEvent: function(params, success, error) {
        forge.internal.call('pushwoosh.postEvent', params, success, error);
    }
};

