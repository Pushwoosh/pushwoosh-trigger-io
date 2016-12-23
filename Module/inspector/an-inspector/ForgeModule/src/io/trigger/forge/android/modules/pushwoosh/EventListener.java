package io.trigger.forge.android.modules.pushwoosh;

import android.content.Intent;
import io.trigger.forge.android.core.ForgeEventListener;

public class EventListener extends ForgeEventListener {
    @Override
	public void onNewIntent(Intent intent)
	{
		super.onNewIntent(intent);
		
		PushwooshNotifications.getInstance().checkMessage(intent);
	}

    @Override
	protected void onResume()
	{
    	PushwooshNotifications.getInstance().getPushReceiver().register();
		super.onResume();
	}

    @Override
	public void onStart()
	{
		PushwooshNotifications.getInstance().getPushReceiver().register();
		PushwooshNotifications.getInstance().getRegistrationReceiver().register();
		super.onStart();
	}

    @Override
	protected void onPause()
	{
		PushwooshNotifications.getInstance().getPushReceiver().unregister();
		super.onPause();
	}

	@Override
	public void onDestroy()
	{
		PushwooshNotifications.getInstance().getPushReceiver().unregister();
		PushwooshNotifications.getInstance().getRegistrationReceiver().unregister();
		super.onDestroy();
	}
}
