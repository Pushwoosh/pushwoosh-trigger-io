package io.trigger.forge.android.modules.pushwoosh;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.JsonReader;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.gson.internal.StringMap;
import com.pushwoosh.internal.utils.PWLog;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class PushwooshFirebaseInitProvider extends ContentProvider {
    private final String TAG = PushwooshFirebaseInitProvider.class.getSimpleName();

    @Override
    public boolean onCreate() {
        initFirebaseApp(getContext());
        return true;
    }

    private void initFirebaseApp(Context context) {
        if (!FirebaseApp.getApps(context).isEmpty()) {
            PWLog.debug("FirebaseApp is already init");
            return;
        }
        JSONObject json = readGoogleServiceJsonFromAssets(context);

        if (json != null) {
            FirebaseOptions.Builder optionsBuilder = new FirebaseOptions.Builder();

            try {
                JSONObject projectInfo = json.getJSONObject("project_info");
                handleProjectInfo(projectInfo, optionsBuilder);

                JSONObject client = getClient(json, getContext().getPackageName());
                if (client != null) {
                    handleClient(client, optionsBuilder);
                }
            }
            catch (Exception e) {
                PWLog.error(TAG, "can not parse google-services.json: " + e);
            }

            try {
                FirebaseApp.initializeApp(context, optionsBuilder.build());
                PWLog.info(TAG, "FirebaseApp initialization successful");
            }
            catch (Exception e) {
                PWLog.error(TAG, "FirebaseApp initialization unsuccessful /", e);
            }

        }
    }

    private void handleProjectInfo(JSONObject projectInfo, FirebaseOptions.Builder optionsBuilder) throws JSONException {
        optionsBuilder.setGcmSenderId(projectInfo.getString("project_number"));
        optionsBuilder.setProjectId(projectInfo.getString( "project_id"));
        optionsBuilder.setStorageBucket(projectInfo.optString("storage_bucket"));
        optionsBuilder.setDatabaseUrl(projectInfo.optString("firebase_url"));
    }

    private JSONObject getClient(JSONObject rootObject, String packageName) throws JSONException {
        JSONArray array = rootObject.getJSONArray("client");
        if (array != null) {
            for (int i = 0; i < array.length(); i++) {
                JSONObject clientObject = array.getJSONObject(i);
                String clientPackageName = optStringAtPath(clientObject, "client_info.android_client_info.package_name");
                if (packageName.equals(clientPackageName)) {
                    return clientObject;
                }
            }
        }
        return null;
    }

    private void handleClient(JSONObject client, FirebaseOptions.Builder optionsBuilder) throws JSONException {
        //handle analytics service
        JSONObject analyticsService = optJSONObjectAtPath(client, "services.analytics_service");
        if ("2".equals(optStringAtPath(analyticsService, "status"))) {
            optionsBuilder.setGaTrackingId(optStringAtPath(analyticsService, "analytics_property.tracking_id"));
        }

        //handle api key
        JSONArray array = client.optJSONArray("api_key");
        if (array != null) {
            for (int i = 0; i < array.length(); i++) {
                String currentKey = array.getJSONObject(i).optString("current_key");
                if (currentKey != null) {
                    optionsBuilder.setApiKey(currentKey);
                    break;
                }
            }
        }

        //handle google app id
        optionsBuilder.setApplicationId(optStringAtPath(client, "client_info.mobilesdk_app_id"));
    }

    private JSONObject readGoogleServiceJsonFromAssets(Context context) {
        try {
            InputStream inputStream = context.getAssets().open("src/google-services.json");
            byte[] buffer = new byte[inputStream.available()];
            inputStream.read(buffer);
            return new JSONObject(new String(buffer));
        } catch (Exception e) {
            PWLog.error(TAG, "can not read google-services.json: " + e);
        }
        return null;
    }

    private Object optAtPath(JSONObject object, String path) {
        int index = path.indexOf(".");
        if (object == null)
            return null;
        if (index == -1) {
            return object.opt(path);
        }
        String component = path.substring(0, index);
        return optAtPath(object.optJSONObject(component), path.substring(index + 1));
    }

    private String optStringAtPath(JSONObject object, String path) {
        Object obj = optAtPath(object, path);
        return obj == null ? null : obj.toString();
    }

    private JSONObject optJSONObjectAtPath(JSONObject object, String path) {
        Object obj = optAtPath(object, path);
        return obj instanceof JSONObject ? (JSONObject)obj : null;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        return null;
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        return null;
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }
}
