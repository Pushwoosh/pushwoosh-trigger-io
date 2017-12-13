package io.trigger.forge.android.modules.pushwoosh;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.pushwoosh.internal.utils.PWLog;

import java.util.concurrent.atomic.AtomicBoolean;

import io.trigger.forge.android.core.ForgeApp;

class PushwooshNotifications {
	private static PushwooshNotifications instance = null;

	private static final String PREFERENCE = "io.trigger.forge.android.modules.pushwoosh";
	private static final String PROPERTY_FOREGROUND_ALERT = "foreground_alert";

	private static final Object sStartPushLock = new Object();

	private static String sStartPushData;
	private static String sReceivedPushData;

	private static AtomicBoolean sAppReady = new AtomicBoolean();

	private boolean foregroundAlert = false;

	private PushwooshNotifications() {
	}

	static PushwooshNotifications getInstance() {
		//Debug.waitForDebugger();

		if (instance == null) {

			instance = new PushwooshNotifications();
		}
		return instance;
	}

	void pushNotificationsStartup() {
		Activity activity = ForgeApp.getActivity();

		SharedPreferences prefs = activity.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE);
		foregroundAlert = prefs.getBoolean(PROPERTY_FOREGROUND_ALERT, false);

		synchronized (sStartPushLock) {
			if (sReceivedPushData != null) {
				doOnPushReceived(sReceivedPushData);
			}

			if (sStartPushData != null) {
				doOnPushOpened(sStartPushData);
			}
		}

		sAppReady.set(true);
	}

	void setForegroundAlert(boolean alert) {
		foregroundAlert = alert;
		ForgeApp.getActivity()
				.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE)
				.edit()
				.putBoolean(PROPERTY_FOREGROUND_ALERT, alert)
				.apply();
	}

	boolean isForegroundAlert() {
		return foregroundAlert;
	}

	private void doOnPushOpened(String message) {
		PWLog.debug(API.LTAG, "doOnPushReceived: " + message);

		Gson gson = new Gson();
		JsonElement jsonElement = gson.toJsonTree(message);
		ForgeApp.event("pushwoosh.pushAccepted", jsonElement);
	}

	private void doOnPushReceived(String message) {
		PWLog.debug(API.LTAG, "doOnPushReceived: " + message);

		Gson gson = new Gson();
		JsonElement jsonElement = gson.toJsonTree(message);
		ForgeApp.event("pushwoosh.pushReceived", jsonElement);
	}

	static void openPush(String pushData) {
		try {
			synchronized (sStartPushLock) {
				sStartPushData = pushData;
				if (sAppReady.get() && instance != null) {
					instance.doOnPushOpened(pushData);
				}
			}
		} catch (Exception e) {
			// React Native is highly unstable
			PWLog.exception(e);
		}
	}

	static void messageReceived(String pushData) {
		try {
			synchronized (sStartPushLock) {
				sReceivedPushData = pushData;
				if (sAppReady.get() && instance != null) {
					instance.doOnPushReceived(pushData);
				}
			}
		} catch (Exception e) {
			// React Native is highly unstable
			PWLog.exception(e);
		}
	}
}
