package io.trigger.forge.android.modules.pushwoosh;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeParam;
import io.trigger.forge.android.core.ForgeTask;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import android.location.Location;

import com.pushwoosh.PushManager;
import com.pushwoosh.SendPushTagsCallBack;
import com.pushwoosh.inapp.InAppFacade;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class API
{
	private static volatile boolean deviceReady = false;
	
	private static void waitForDeviceReady()
	{
		while(!deviceReady)
		{
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public static void onDeviceReady(final ForgeTask task, @ForgeParam("pw_appid") String pushwooshAppId, @ForgeParam("gcm_id") String gcmProjectId)
	{
		PushManager.initializePushManager(ForgeApp.getActivity(), pushwooshAppId, gcmProjectId);
		PushwooshNotifications.getInstance().pushNotificationsStartup();
		task.success();
		
		deviceReady = true;
	}

	public static void registerDevice(final ForgeTask task)
	{
		waitForDeviceReady();
		
		PushManager.getInstance(ForgeApp.getActivity()).registerForPushNotifications();

		//return success now, the event will come to event listener "pushwoosh.registrationSuccess"
		task.success();
	}

	public static void unregisterDevice(final ForgeTask task)
	{
		waitForDeviceReady();
		
		PushManager.getInstance(ForgeApp.getActivity()).unregisterForPushNotifications();
		task.success();
	}

	public static void startLocationTracking(final ForgeTask task)
	{
		waitForDeviceReady();
		
		PushManager.startTrackingGeoPushes(ForgeApp.getActivity());
		task.success();
	}

	public static void stopLocationTracking(final ForgeTask task)
	{
		waitForDeviceReady();
		
		PushManager.stopTrackingGeoPushes(ForgeApp.getActivity());
		task.success();
	}

	public static void setTags(final ForgeTask task, @ForgeParam("tags") JsonObject tags)
	{
		waitForDeviceReady();
		
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		
		Gson gson = new Gson();
		paramsMap = (Map<String, Object>) gson.fromJson(tags, paramsMap.getClass());

		try {
			PushManager.sendTags(ForgeApp.getActivity(), paramsMap, new SendPushTagsCallBack() {

				@Override
				public void onSentTagsError(Exception e) {
					task.error(e);
				}

				@Override
				public void onSentTagsSuccess(Map<String, String> arg0) {
					task.success();
				}

				@Override
				public void taskStarted() {
				}
			});
		} catch (Exception e) {
			task.error(e);
		}
	}

	public static void getTags(final ForgeTask task)
	{
		waitForDeviceReady();
		
		PushManager.getTagsAsync(ForgeApp.getActivity(), new PushManager.GetTagsListener() {
			@Override
			public void onTagsReceived(java.util.Map<java.lang.String,java.lang.Object> tags) {
				final JsonObject jsonElement = new JsonObject();
				Iterator<Entry<String, Object>> it = tags.entrySet().iterator();
				while (it.hasNext())
				{
					Map.Entry<String, Object> pairs = it.next();
					jsonElement.addProperty(pairs.getKey(), pairs.getValue().toString());
				}
				task.success(jsonElement);
			}

			@Override
			public void onError(java.lang.Exception e) {
				task.error(e);
			}
		});
		
	}

	public static void getPushToken(final ForgeTask task)
	{
		waitForDeviceReady();
		
		task.success(PushManager.getPushToken(ForgeApp.getActivity()));
	}

	public static void getHWID(final ForgeTask task)
	{
		waitForDeviceReady();

		task.success(PushManager.getPushwooshHWID(ForgeApp.getActivity()));
	}

	/**
	 * IOS only method
	 */
	public static void getRemoteNotificationStatus(final ForgeTask task)
	{
		task.success();
	}

	/**
	 * IOS only method
	 */
	public static void setApplicationIconBadgeNumber(final ForgeTask task, @ForgeParam("badge") String badge)
	{
		task.success();
	}

	public static void cancelAllLocalNotifications(final ForgeTask task)
	{
		PushManager.clearLocalNotifications(ForgeApp.getActivity());
		task.success();
	}

	public static void setForegroundAlert(final ForgeTask task, @ForgeParam("alert") boolean alert)
	{
		waitForDeviceReady();

		PushwooshNotifications.getInstance().setForegroundAlert(alert);
		task.success();
	}

	public static void setUserId(ForgeTask task, @ForgeParam("userId") String userId)
	{
		waitForDeviceReady();

		PushManager pushManager = PushManager.getInstance(ForgeApp.getActivity());
		pushManager.setUserId(ForgeApp.getActivity(), userId);

		task.success();
	}

	public static void postEvent(ForgeTask task, @ForgeParam("event") String event, @ForgeParam("attributes") JsonObject attributesJson)
	{
		waitForDeviceReady();

		Map<String, Object> attributes = new HashMap<String, Object>();

		Gson gson = new Gson();
		attributes = (Map<String, Object>) gson.fromJson(attributesJson, attributes.getClass());

		InAppFacade.postEvent(ForgeApp.getActivity(), event, attributes);
		task.success();
	}

/*	public static void setSimpleNotificationMode(final ForgeTask task)
	{
		PushManager.setSimpleNotificationMode(ForgeApp.getActivity());
	}

	public static void setSoundNotificationType(final ForgeTask task, @ForgeParam("soundType") final SoundType soundType)
	{
		PushManager.setSoundNotificationType(ForgeApp.getActivity(), soundType);
	}

	public static void setVibrateNotificationType(final ForgeTask task, @ForgeParam("vibrateType") final VibrateType vibrateType)
	{
		PushManager.setVibrateNotificationType(ForgeApp.getActivity(), vibrateType);
	}

	public static void setLightScreenOnNotification(final ForgeTask task, @ForgeParam("b") final boolean b)
	{
		PushManager.setLightScreenOnNotification(ForgeApp.getActivity(), b);
	}



	public static void getBeacons(final ForgeTask task, @ForgeParam("getBeaconsListener") final GetBeaconsListener getBeaconsListener)
	{
		PushManager.getBeacons(ForgeApp.getActivity(), getBeaconsListener);
	}

	public static void scheduleLocalNotification(final ForgeTask task, @ForgeParam("string") final String string,
			@ForgeParam("integer") final int integer)
	{
		PushManager.scheduleLocalNotification(ForgeApp.getActivity(), string, integer);
	}

	public static void scheduleLocalNotification(final ForgeTask task, @ForgeParam("string") final String string,
			@ForgeParam("bundle") final Bundle bundle, @ForgeParam("integer") final int integer)
	{
		PushManager.scheduleLocalNotification(ForgeApp.getActivity(), string, bundle, integer);
	}

	public static void incrementalTag(final ForgeTask task, @ForgeParam("integer") final int integer)
	{
		PushManager.incrementalTag(integer);
	}
	*/
}
