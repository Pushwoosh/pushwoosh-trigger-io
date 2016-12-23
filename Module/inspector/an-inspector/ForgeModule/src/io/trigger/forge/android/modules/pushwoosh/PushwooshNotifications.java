package io.trigger.forge.android.modules.pushwoosh;

import io.trigger.forge.android.core.ForgeApp;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Debug;

import com.pushwoosh.BasePushMessageReceiver;
import com.pushwoosh.PushManager;
import com.pushwoosh.BaseRegistrationReceiver;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class PushwooshNotifications
{
	private static PushwooshNotifications instance = null;

	private static final String PREFERENCE = "io.trigger.forge.android.modules.pushwoosh";
	private static final String PROPERTY_FOREGROUND_ALERT = "foreground_alert";

	private boolean mForegroundAlert = false;

	private PushwooshNotifications()
	{}

	public static PushwooshNotifications getInstance()
	{
		//Debug.waitForDebugger();
		
		if (instance == null)
		{

			instance = new PushwooshNotifications();
		}
		return instance;
	}

	public void pushNotificationsStartup()
	{
		Activity activity = ForgeApp.getActivity();

		SharedPreferences prefs = activity.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE);
		mForegroundAlert = prefs.getBoolean(PROPERTY_FOREGROUND_ALERT, false);

		// Register receivers
		mPushReceiver.register();
		mRegistrationReceiver.register();

		// Create and start push manager
		PushManager pushManager = PushManager.getInstance(activity);

		// Start push manager, this will count app open for Pushwoosh stats as
		// well
		try
		{
			pushManager.onStartup(activity);
		}
		catch (Exception e)
		{
			// push notifications are not available or AndroidManifest.xml is
			// not configured properly
		}

		checkMessage(activity.getIntent());
	}

	public void setForegroundAlert(boolean alert)
	{
		if (alert) {
			mPushReceiver.unregister();
		}

		mForegroundAlert = alert;
		SharedPreferences.Editor editor = ForgeApp.getActivity().getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).edit();
		editor.putBoolean(PROPERTY_FOREGROUND_ALERT, alert);
		editor.commit();
	}

	public class PushMessageReceiver extends BasePushMessageReceiver
	{
		@Override
		protected void onMessageReceive(Intent intent)
		{
			// JSON_DATA_KEY contains JSON payload of push notification.
			String eventString = intent.getExtras().getString(JSON_DATA_KEY);
			Gson gson = new Gson();
			JsonElement jsonElement = gson.toJsonTree(eventString);
			ForgeApp.event("pushwoosh.pushReceived", jsonElement);
		}

		public void register()
		{
			unregister();

			// do not register
			if (mForegroundAlert)
				return;

			Context context = ForgeApp.getActivity();

			IntentFilter intentFilter = new IntentFilter(context.getPackageName() + ".action.PUSH_MESSAGE_RECEIVE");
			context.registerReceiver(this, intentFilter);
		}

		public void unregister()
		{
			Context context = ForgeApp.getActivity();

			try
			{
				context.unregisterReceiver(this);
			}
			catch (Exception e)
			{
				// pass.
			}
		}
	}

	private PushMessageReceiver mPushReceiver = new PushMessageReceiver();

	public PushMessageReceiver getPushReceiver()
	{
		return mPushReceiver;
	}

	public class RegistrationReceiver extends BaseRegistrationReceiver
	{
		@Override
		public void onRegisterActionReceive(Context context, Intent intent)
		{
			checkMessage(intent);
		}

		public void register()
		{
			unregister();

			Context context = ForgeApp.getActivity();

			IntentFilter intentFilter = new IntentFilter(context.getPackageName() + "." + PushManager.REGISTER_BROAD_CAST_ACTION);
			context.registerReceiver(this, intentFilter);
		}

		public void unregister()
		{
			Context context = ForgeApp.getActivity();
			try
			{
				context.unregisterReceiver(this);
			}
			catch (Exception e)
			{
				// pass.
			}
		}
	}

	private RegistrationReceiver mRegistrationReceiver = new RegistrationReceiver();

	public RegistrationReceiver getRegistrationReceiver()
	{
		return mRegistrationReceiver;
	}

	public void checkMessage(Intent intent)
	{
		if (null != intent)
		{
			if (intent.hasExtra(PushManager.PUSH_RECEIVE_EVENT))
			{
				String eventString = intent.getStringExtra(PushManager.PUSH_RECEIVE_EVENT);
				Gson gson = new Gson();
				JsonElement jsonElement = gson.toJsonTree(eventString);
				ForgeApp.event("pushwoosh.pushReceived", jsonElement);
			}
			else if (intent.hasExtra(PushManager.REGISTER_EVENT))
			{
				JsonObject jsonElement = new JsonObject();
				jsonElement.addProperty("deviceToken", intent.getStringExtra(PushManager.REGISTER_EVENT));
				ForgeApp.event("pushwoosh.registrationSuccess", jsonElement);
			}
			else if (intent.hasExtra(PushManager.UNREGISTER_EVENT))
			{
				ForgeApp.event("pushwoosh.unRegistrationSuccess", null);
			}
			else if (intent.hasExtra(PushManager.REGISTER_ERROR_EVENT))
			{
				String eventString = intent.getStringExtra(PushManager.REGISTER_ERROR_EVENT);
				Gson gson = new Gson();
				JsonElement jsonElement = gson.toJsonTree(eventString);
				ForgeApp.event("pushwoosh.registrationFail", jsonElement);
			}
			else if (intent.hasExtra(PushManager.UNREGISTER_ERROR_EVENT))
			{
				String eventString = intent.getStringExtra(PushManager.UNREGISTER_ERROR_EVENT);
				Gson gson = new Gson();
				JsonElement jsonElement = gson.toJsonTree(eventString);
				ForgeApp.event("pushwoosh.unRegistrationFail", jsonElement);
			}

			resetIntentValues();
		}
	}

	/**
	 * Will check main Activity intent and if it contains any PushWoosh data,
	 * will clear it
	 */
	private void resetIntentValues()
	{
		Activity activity = null;

		if ((activity = ForgeApp.getActivity()) == null)
		{
			return;
		}
		Intent mainAppIntent = activity.getIntent();

		if (mainAppIntent.hasExtra(PushManager.PUSH_RECEIVE_EVENT))
		{
			mainAppIntent.removeExtra(PushManager.PUSH_RECEIVE_EVENT);
		}
		else if (mainAppIntent.hasExtra(PushManager.REGISTER_EVENT))
		{
			mainAppIntent.removeExtra(PushManager.REGISTER_EVENT);
		}
		else if (mainAppIntent.hasExtra(PushManager.UNREGISTER_EVENT))
		{
			mainAppIntent.removeExtra(PushManager.UNREGISTER_EVENT);
		}
		else if (mainAppIntent.hasExtra(PushManager.REGISTER_ERROR_EVENT))
		{
			mainAppIntent.removeExtra(PushManager.REGISTER_ERROR_EVENT);
		}
		else if (mainAppIntent.hasExtra(PushManager.UNREGISTER_ERROR_EVENT))
		{
			mainAppIntent.removeExtra(PushManager.UNREGISTER_ERROR_EVENT);
		}

		activity.setIntent(mainAppIntent);
	}

}
