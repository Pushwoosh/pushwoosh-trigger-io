package io.trigger.forge.android.modules.pushwoosh;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.pushwoosh.internal.utils.PWLog;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class FirebaseInitProvider extends ContentProvider {

    private final String TAG = FirebaseInitProvider.class.getSimpleName();

    @Override
    public boolean onCreate() {
        initFCM(getContext());
        return true;
    }

    private void initFCM(Context context) {
        if (context == null) {
            PWLog.error("context is null");
            return;
        }
        if (!FirebaseApp.getApps(context).isEmpty()) {
            PWLog.debug("Firebase already init");
            return;
        }
        String json = readGoogleServiceJsonFromAssets(context);
        PWLog.debug(TAG, "json from google-service.json:" + json);

        try {
            JSONObject jsonObject = new JSONObject(json);
            String gcmSenderId = getSenderId(jsonObject);
            String applicationId = getApplicationId(jsonObject, context);
            initFirebaseApp(context, applicationId, gcmSenderId);
        } catch (JSONException e) {
            PWLog.error(TAG, "can not parse info for GCM init:" + e);
        }
    }

    private String readGoogleServiceJsonFromAssets(Context context) {
        StringBuilder result = new StringBuilder();
        BufferedReader reader = null;
        try {
            InputStream inputStream = context.getAssets().open("src/google-services.json");
            reader = new BufferedReader(new InputStreamReader(inputStream));
            String mLine;
            while ((mLine = reader.readLine()) != null) {
                result.append(mLine);
            }
        } catch (IOException e) {
            PWLog.error(TAG, "can not read file google-services.json:" + e);

        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    PWLog.error(TAG, e);
                }
            }
        }
        return result.toString();
    }

    private void initFirebaseApp(Context context, String applicationId, String gcmSenderId) {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setApplicationId(applicationId)
                .setGcmSenderId(gcmSenderId)
                .build();

        FirebaseApp.initializeApp(context, options);
        PWLog.debug("Firebase init success");
    }

    private String getSenderId(JSONObject jsonObject) throws JSONException {
        return jsonObject
                .getJSONObject("project_info")
                .getString("project_number");
    }

    private String getApplicationId(JSONObject jsonObject, Context context) throws JSONException {
        JSONArray clientList = jsonObject
                .getJSONArray("client");
        if (clientList == null) {
            throw new JSONException("can not find client list");
        }
        for (int i = 0; i < clientList.length(); i++) {
            JSONObject client = clientList.getJSONObject(i);
            String packageName = client
                    .getJSONObject("client_info")
                    .getJSONObject("android_client_info")
                    .getString("package_name");

            String currentPackageName = context.getPackageName();
            if (currentPackageName.equals(packageName)) {
                return client
                        .getJSONArray("oauth_client")
                        .getJSONObject(0)
                        .getString("client_id");
            }
        }
        throw new JSONException("can not find client list");

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
