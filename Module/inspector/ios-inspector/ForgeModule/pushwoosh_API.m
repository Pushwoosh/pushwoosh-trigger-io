#import "pushwoosh_API.h"

#import <UserNotifications/UserNotifications.h>

static NSString *const KeyShowAlert = @"PWTriggerShowAlert";

@interface PWInternalDelegate : NSObject <PushNotificationDelegate> {
    BOOL _deviceReady;
    NSString *_startPushData;
}

@property (nonatomic, strong) NSString *startPushData;
@property (nonatomic, assign) BOOL deviceReady;

@end

@implementation PWInternalDelegate

+ (instancetype)shared {
    static PWInternalDelegate *instance = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        
        instance = [[[self class] alloc] init];
    });
    
    return instance;
}

- (NSMutableDictionary *)getRemoteNotificationStatus {
    NSMutableDictionary *results = [NSMutableDictionary dictionary];
    
    NSInteger type = 0;
    // Set the defaults to disabled unless we find otherwise...
    NSString *pushBadge = @"0";
    NSString *pushAlert = @"0";
    NSString *pushSound = @"0";
    NSString *pushEnabled = @"0";
    
    // Check what Notifications the user has turned on.  We registered for all three, but they may have manually disabled some or all of them.
    if([[UIApplication sharedApplication] isRegisteredForRemoteNotifications])
        pushEnabled = @"1";
    
    UIUserNotificationSettings * settings = [[UIApplication sharedApplication] currentUserNotificationSettings];
    type = settings.types;
    if(type & UIUserNotificationTypeBadge){
        pushBadge = @"1";
    }
    if(type & UIUserNotificationTypeAlert) {
        pushAlert = @"1";
    }
    if(type & UIUserNotificationTypeSound) {
        pushSound = @"1";
    }
    
    // Affect results
    [results setValue:[NSString stringWithFormat:@"%ld", (long)type] forKey:@"type"];
    [results setValue:pushEnabled forKey:@"enabled"];
    [results setValue:pushBadge forKey:@"pushBadge"];
    [results setValue:pushAlert forKey:@"pushAlert"];
    [results setValue:pushSound forKey:@"pushSound"];
    
    return results;
}

- (void)onDidRegisterForRemoteNotificationsWithDeviceToken:(NSString *)token {
    NSMutableDictionary *results = [self getRemoteNotificationStatus];
    [results setObject:token forKey:@"deviceToken"];
    
    [[ForgeApp sharedApp] event:@"pushwoosh.registrationSuccess" withParam:results];
}

- (void)onDidFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    [[ForgeApp sharedApp] event:@"pushwoosh.registrationFail" withParam:error.localizedDescription];
}

- (void)onPushAccepted:(PushNotificationManager *)pushManager withNotification:(NSDictionary *)pushNotification onStart:(BOOL)onStart {
    if (_deviceReady){
        [[ForgeApp sharedApp] event:@"pushwoosh.pushAccepted" withParam:[self pushContentFromDictionary:pushNotification onStart:onStart]];
    }
}

- (void)onPushReceived:(PushNotificationManager *)pushManager withNotification:(NSDictionary *)pushNotification onStart:(BOOL)onStart {
    NSString *jsonString = [self pushContentFromDictionary:pushNotification onStart:onStart];
    
    if (!_deviceReady){
        //the webview is not loaded yet, keep it for the callback
        _startPushData = jsonString;
    } else {
        [[ForgeApp sharedApp] event:@"pushwoosh.pushReceived" withParam:jsonString];
    }
}

- (NSString *)pushContentFromDictionary:(NSDictionary *)dictionary onStart:(BOOL)onStart {
    NSMutableDictionary *pn = [NSMutableDictionary dictionaryWithDictionary:dictionary];
    
    //pase JSON string in custom data to JSON Object
    NSString* u = [dictionary objectForKey:@"u"];
    
    if (u) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[u dataUsingEncoding:NSUTF8StringEncoding] options:0 error:nil];
        
        if (dict) {
            [pn setObject:dict forKey:@"u"];
        }
    }
    
    [pn setValue:[NSNumber numberWithBool:onStart] forKey:@"onStart"];
    
    NSData *json = [NSJSONSerialization dataWithJSONObject:pn options:NSJSONWritingPrettyPrinted error:nil];
    NSString *jsonString = [[NSString alloc] initWithData:json encoding:NSUTF8StringEncoding];
    return jsonString;
}

+ (NSString *)readAppName {
    NSString *appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
    
    if(!appName)
        appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleName"];
    
    if(!appName) {
        appName = @"";
    }
    
    return appName;
}

@end

@implementation pushwoosh_API

//
// Here you can implement your API methods which can be called from JavaScript
// an example method is included below to get you started.
//

+ (void)onDeviceReady:(ForgeTask *)task pw_appid:(NSString *)pwAppId {
    
    if(!pwAppId) {
        NSLog(@"PushNotification.registerDevice: Missing Pushwoosh App ID");
        return;
    }
    
    [PushNotificationManager initializeWithAppCode:pwAppId appName:[PWInternalDelegate readAppName]];
    
    PushNotificationManager *pushManager = [PushNotificationManager pushManager];
    [pushManager sendAppOpen];
    pushManager.delegate = [PWInternalDelegate shared];
    [UNUserNotificationCenter currentNotificationCenter].delegate = [PushNotificationManager pushManager].notificationCenterDelegate;
    
    [PWInternalDelegate shared].deviceReady = YES;
    
    NSNumber* showAlert = [[NSUserDefaults standardUserDefaults] objectForKey:KeyShowAlert];
    if (showAlert) {
        [PushNotificationManager pushManager].showPushnotificationAlert = [showAlert boolValue];
    }
    
    if ([PWInternalDelegate shared].startPushData) {
        [[ForgeApp sharedApp] event:@"pushwoosh.pushReceived" withParam:[PWInternalDelegate shared].startPushData];
        [[ForgeApp sharedApp] event:@"pushwoosh.pushAccepted" withParam:[PWInternalDelegate shared].startPushData];
        [PWInternalDelegate shared].startPushData = nil;
    }
}

+ (void)registerDevice:(ForgeTask *)task {
    [[PushNotificationManager pushManager] registerForPushNotifications];
    [task success:nil];
}

+ (void)unregisterDevice:(ForgeTask *)task {
    [[PushNotificationManager pushManager] unregisterForPushNotificationsWithCompletion:^(NSError *error) {
        if (!error) {
            [task success:nil];
        } else {
            [task error:error.localizedDescription];
        }
    }];
}

+ (void)setTags:(ForgeTask *)task tags:(NSDictionary *)tags {
    [[PushNotificationManager pushManager] setTags:tags];
    [task success:nil];
}

+ (void)getTags:(ForgeTask *)task {
    [[PushNotificationManager pushManager] loadTags:^(NSDictionary *tags) {
        [task success:tags];
    } error:^(NSError *error) {
        [task error:error.localizedDescription];
    }];
}

+ (void)getPushToken:(ForgeTask *)task {
    [task success:[[PushNotificationManager pushManager] getPushToken]];
}

+ (void)getHWID:(ForgeTask *)task {
    [task success:[[PushNotificationManager pushManager] getHWID]];
}


+ (void)getRemoteNotificationStatus:(ForgeTask *)task {
    NSMutableDictionary *results = [[PWInternalDelegate shared] getRemoteNotificationStatus];
    
    [task success:results];
}

+ (void)setApplicationIconBadgeNumber:(ForgeTask *)task badge:(NSNumber *)badge {
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:[badge integerValue]];
    
    [task success:nil];
}

+ (void)cancelAllLocalNotifications:(ForgeTask *)task {
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
    
    [task success:nil];
}

+ (void)setForegroundAlert:(ForgeTask *)task alert:(NSNumber*)alert {
    [PushNotificationManager pushManager].showPushnotificationAlert = [alert boolValue];
    [[NSUserDefaults standardUserDefaults] setObject:alert forKey:KeyShowAlert];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    [task success:nil];
}

+ (void)setUserId:(ForgeTask*)task userId:(NSString*)userId {
    [[PWInAppManager sharedManager] setUserId:userId];
    
    [task success:nil];
}

+ (void)postEvent:(ForgeTask*)task event:(NSString*)event attributes:(NSDictionary*)attributes {
    if (![event isKindOfClass:[NSString class]]) {
        NSLog(@"Invalid \"event\" parameter passed, expected parameter of type NSString");
        [task error:nil];
        return;
    }
    
    if (![attributes isKindOfClass:[NSDictionary class]]) {
        NSLog(@"Invalid \"attributes\" parameter passed, expected paramter of type NSDictionary");
        [task error:nil];
        return;
    }
    
    [[PWInAppManager sharedManager] postEvent:event withAttributes:attributes];
}

@end

@implementation UIApplication(InternalPushRuntime)

- (BOOL) pushwooshUseRuntimeMagic {
    return YES;
}

- (NSObject<PushNotificationDelegate> *)getPushwooshDelegate {
    return [PWInternalDelegate shared];
}

@end
