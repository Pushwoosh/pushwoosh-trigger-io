package io.trigger.forge.android.modules.pushwoosh;

import android.content.Intent;

import com.pushwoosh.internal.utils.PWLog;

import io.trigger.forge.android.core.ForgeEventListener;

public class EventListener extends ForgeEventListener {
	public EventListener() {
		super();
		PWLog.debug(API.LTAG, "EventListener()");
	}

    @Override
	public void onNewIntent(Intent intent)
	{
		super.onNewIntent(intent);

		PWLog.debug(API.LTAG, "EventListener.onNewIntent()");

		PushwooshNotifications.getInstance().checkMessage(intent);
	}

    @Override
	protected void onResume()
	{
		super.onResume();

		PWLog.debug(API.LTAG, "EventListener.onResume()");

    	PushwooshNotifications.getInstance().getPushReceiver().register();
	}

    @Override
	public void onStart()
	{
		super.onStart();

		PWLog.debug(API.LTAG, "EventListener.onStart()");

		PushwooshNotifications.getInstance().getPushReceiver().register();
		PushwooshNotifications.getInstance().getRegistrationReceiver().register();
	}

    @Override
	protected void onPause()
	{
		super.onPause();

		PWLog.debug(API.LTAG, "EventListener.onPause()");

		PushwooshNotifications.getInstance().getPushReceiver().unregister();
	}

	@Override
	public void onDestroy()
	{
		super.onDestroy();

		PWLog.debug(API.LTAG, "EventListener.onDestroy()");

		PushwooshNotifications.getInstance().getPushReceiver().unregister();
		PushwooshNotifications.getInstance().getRegistrationReceiver().unregister();
	}
}
