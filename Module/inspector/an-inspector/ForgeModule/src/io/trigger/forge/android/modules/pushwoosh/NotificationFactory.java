package io.trigger.forge.android.modules.pushwoosh;


import android.app.Notification;

import com.pushwoosh.internal.PushManagerImpl;
import com.pushwoosh.notification.DefaultNotificationFactory;
import com.pushwoosh.notification.PushData;

import org.json.JSONObject;

public class NotificationFactory extends DefaultNotificationFactory {
	private PushData lastHandledPush;

	@Override
	public void onPushReceived(PushData pushData)
	{
		super.onPushReceived(pushData);

		JSONObject data = PushManagerImpl.bundleToJSON(pushData.getExtras());
		if (PushwooshNotifications.getInstance().handlePushReceived(data.toString()))
		{
			lastHandledPush = pushData;
		}
	}

	@Override
	public Notification onGenerateNotification(PushData pushData)
	{
		if (pushData == lastHandledPush)
		{
			// Push already handled not need to generate notificatoin
			return null;
		}

		return super.onGenerateNotification(pushData);
	}


}
