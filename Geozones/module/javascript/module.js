//Class: forge.pushwoosh_geozones
//Class to interact with Pushwoosh Geozones plugin
//Expose the native API to javascript
forge.pushwoosh_geozones = {
    
//Function: startLocationTracking
//Starts geolocation based push notifications. You need to configure Geozones in Pushwoosh Control panel.
//
//Example:
//(start code)
//  forge.pushwoosh_geozones.startLocationTracking();
//(end)
    startLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh_geozones.startLocationTracking', {}, success, error);
    },

//Function: stopLocationTracking
//Stops geolocation based push notifications
    stopLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh_geoznes.stopLocationTracking', {}, success, error);
    }
};
