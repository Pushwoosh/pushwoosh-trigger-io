package io.trigger.forge.android.modules.pushwoosh;

import com.pushwoosh.notification.NotificationServiceExtension;
import com.pushwoosh.notification.PushMessage;

public class PushwooshNotificationServiceExtension extends NotificationServiceExtension {

	@Override
	protected boolean onMessageReceived(final PushMessage pushMessage) {
		PushwooshNotifications.messageReceived(pushMessage.toJson().toString());
		return super.onMessageReceived(pushMessage) || (isAppOnForeground() && !PushwooshNotifications.getInstance().isForegroundAlert());
	}

	@Override
	protected void onMessageOpened(PushMessage pushMessage) {
		PushwooshNotifications.openPush(pushMessage.toJson().toString());
	}
}
