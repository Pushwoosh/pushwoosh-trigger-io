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
forge.pushwoosh_geozones = {

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
    }
};

