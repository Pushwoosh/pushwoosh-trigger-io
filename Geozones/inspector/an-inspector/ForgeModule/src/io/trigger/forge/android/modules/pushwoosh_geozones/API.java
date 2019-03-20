package io.trigger.forge.android.modules.pushwoosh_geozones;

import io.trigger.forge.android.core.ForgeTask;

import com.pushwoosh.location.PushwooshLocation;

public class API {
	public static void startLocationTracking(final ForgeTask task) {
		PushwooshLocation.startLocationTracking();
		task.success();
	}

	public static void stopLocationTracking(final ForgeTask task) {
		PushwooshLocation.stopLocationTracking();
		task.success();
	}
}
