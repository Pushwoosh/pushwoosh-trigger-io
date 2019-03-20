#import "pushwoosh_geozones_API.h"
#import "PWGeozonesManager.h"

@implementation pushwoosh_geozones_API

+ (void)startLocationTracking:(ForgeTask *)task {
    [[PWGeozonesManager sharedManager] startLocationTracking];
    [task success:nil];
}

+ (void)stopLocationTracking:(ForgeTask *)task {
    [[PWGeozonesManager sharedManager] stopLocationTracking];
    [task success:nil];
}

@end
