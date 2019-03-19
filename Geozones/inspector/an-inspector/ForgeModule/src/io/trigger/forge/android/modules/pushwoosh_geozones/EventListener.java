package io.trigger.forge.android.modules.pushwoosh_geozones;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeEventListener;

public class EventListener extends ForgeEventListener {
	@Override
	public void onRestart() {
		ForgeApp.event("pushwoosh_geozones.resume", null);
	}
}
