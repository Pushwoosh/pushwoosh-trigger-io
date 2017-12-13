package io.trigger.forge.android.modules.pushwoosh.internal;

import com.pushwoosh.internal.PluginProvider;

public class TriggerPluginProvider implements PluginProvider {
	@Override
	public String getPluginType() {
		return "Trigger.io";
	}

	@Override
	public int richMediaStartDelay() {
		return DEFAULT_RICH_MEDIA_START_DELAY;
	}
}
