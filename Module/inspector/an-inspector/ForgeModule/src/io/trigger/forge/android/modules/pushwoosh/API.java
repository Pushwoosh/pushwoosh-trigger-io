package io.trigger.forge.android.modules.pushwoosh;

import android.support.annotation.NonNull;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pushwoosh.Pushwoosh;
import com.pushwoosh.badge.PushwooshBadge;
import com.pushwoosh.exception.GetTagsException;
import com.pushwoosh.exception.PushwooshException;
import com.pushwoosh.exception.RegisterForPushNotificationsException;
import com.pushwoosh.exception.UnregisterForPushNotificationException;
import com.pushwoosh.function.Callback;
import com.pushwoosh.function.Result;
import com.pushwoosh.inapp.PushwooshInApp;
import com.pushwoosh.tags.Tags;
import com.pushwoosh.tags.TagsBundle;

import org.json.JSONException;
import org.json.JSONObject;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeParam;
import io.trigger.forge.android.core.ForgeTask;

@SuppressWarnings("unused")
public class API {
	static final String LTAG = "TriggerModule";

	private static volatile boolean deviceReady = false;

	private static void waitForDeviceReady() {
		while (!deviceReady) {
			try {
				Thread.sleep(100);
			} catch (InterruptedException ignore) {
			}
		}
	}

	public static void onDeviceReady(final ForgeTask task, @ForgeParam("pw_appid") String pushwooshAppId, @ForgeParam("gcm_id") String gcmProjectId) {
		Pushwoosh.getInstance().setAppId(pushwooshAppId);
		Pushwoosh.getInstance().setSenderId(gcmProjectId);
		PushwooshNotifications.getInstance().pushNotificationsStartup();
		task.success();

		deviceReady = true;
	}

	public static void registerDevice(final ForgeTask task) {
		waitForDeviceReady();

		Pushwoosh.getInstance().registerForPushNotifications(new Callback<String, RegisterForPushNotificationsException>() {
			@Override
			public void process(@NonNull final Result<String, RegisterForPushNotificationsException> result) {
				if (result.isSuccess()) {
					doOnRegistered(result.getData());
				} else if (result.getException() != null) {
					doOnRegisteredError(result.getException().getMessage());
				}
			}
		});

		//return success now, the event will come to event listener "pushwoosh.registrationSuccess"
		task.success();
	}

	public static void unregisterDevice(final ForgeTask task) {
		waitForDeviceReady();

		Pushwoosh.getInstance().unregisterForPushNotifications(new Callback<String, UnregisterForPushNotificationException>() {
			@Override
			public void process(@NonNull final Result<String, UnregisterForPushNotificationException> result) {
				if (result.isSuccess()) {
					doOnUnregistered(result.getData());
				} else if (result.getException() != null) {
					doOnUnregisteredError(result.getException().getMessage());
				}
			}
		});
		task.success();
	}

	public static void setTags(final ForgeTask task, @ForgeParam("tags") JsonObject tags) {
		waitForDeviceReady();

		try {
			Pushwoosh.getInstance().sendTags(Tags.fromJson(new JSONObject(tags.toString())), new Callback<Void, PushwooshException>() {
				@Override
				public void process(@NonNull final Result<Void, PushwooshException> result) {
					if (result.isSuccess()) {
						task.success();
					} else if (result.getException() != null) {
						task.error(result.getException());
					}
				}
			});
		} catch (Exception e) {
			task.error(e);
		}
	}

	public static void getTags(final ForgeTask task) {
		waitForDeviceReady();

		Pushwoosh.getInstance().getTags(new Callback<TagsBundle, GetTagsException>() {
			@Override
			public void process(@NonNull Result<TagsBundle, GetTagsException> result) {
				if (result.isSuccess() && result.getData() != null) {
					JsonParser jsonParser = new JsonParser();
					JsonObject gsonObject = (JsonObject) jsonParser.parse(result.getData().toJson().toString());
					task.success(gsonObject);
				} else {
					if (result.getException() == null) {
						task.error("Failed to getTags");
					} else {
						task.error(result.getException());
					}
				}
			}
		});

	}

	public static void getPushToken(final ForgeTask task) {
		waitForDeviceReady();

		String pushToken = Pushwoosh.getInstance().getPushToken();
		task.success(pushToken == null ? "" : pushToken);
	}

	public static void getHWID(final ForgeTask task) {
		waitForDeviceReady();

		task.success(Pushwoosh.getInstance().getHwid());
	}

	/**
	 * IOS only method
	 */
	public static void getRemoteNotificationStatus(final ForgeTask task) {
		task.success();
	}

	public static void setApplicationIconBadgeNumber(final ForgeTask task, @ForgeParam("badge") String badge) {
		try {
			PushwooshBadge.setBadgeNumber(Integer.valueOf(badge));
			task.success();
		} catch (Exception e){
			task.error(e);
		}
	}

	public static void cancelAllLocalNotifications(final ForgeTask task) {
		Pushwoosh.getInstance().clearLaunchNotification();
		task.success();
	}

	public static void setForegroundAlert(final ForgeTask task, @ForgeParam("alert") boolean alert) {
		waitForDeviceReady();

		PushwooshNotifications.getInstance().setForegroundAlert(alert);
		task.success();
	}

	public static void setUserId(ForgeTask task, @ForgeParam("userId") String userId) {
		waitForDeviceReady();

		PushwooshInApp.getInstance().setUserId(userId);

		task.success();
	}

	public static void postEvent(ForgeTask task, @ForgeParam("event") String event, @ForgeParam("attributes") JsonObject attributesJson) {
		waitForDeviceReady();

		try {
			PushwooshInApp.getInstance().postEvent(event, Tags.fromJson(new JSONObject(attributesJson.toString())));
			task.success();
		} catch (JSONException e) {
			task.error(e.getLocalizedMessage());
		}
	}

	private static void doOnRegisteredError(String message) {
		Gson gson = new Gson();
		JsonElement jsonElement = gson.toJsonTree(message);
		ForgeApp.event("pushwoosh.registrationFail", jsonElement);
	}

	private static void doOnRegistered(String token) {
		JsonObject jsonElement = new JsonObject();
		jsonElement.addProperty("deviceToken", token);
		ForgeApp.event("pushwoosh.registrationSuccess", jsonElement);
	}

	private static void doOnUnregisteredError(String message) {
		Gson gson = new Gson();
		JsonElement jsonElement = gson.toJsonTree(message);
		ForgeApp.event("pushwoosh.unRegistrationFail", jsonElement);
	}

	private static void doOnUnregistered(String data) {
		ForgeApp.event("pushwoosh.unRegistrationSuccess", null);
	}
}
