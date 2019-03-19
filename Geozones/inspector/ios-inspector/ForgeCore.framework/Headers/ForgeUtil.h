//
//  ForgeUtil.h
//  ForgeCore
//
//  Created by Connor Dunn on 25/02/2013.
//  Copyright (c) 2013 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ForgeUtil : NSObject

@property (class, nonatomic, assign, readonly) BOOL isIphone;
@property (class, nonatomic, assign, readonly) BOOL isIphone_xr;
@property (class, nonatomic, assign, readonly) BOOL isIpad;
@property (class, nonatomic, assign, readonly) BOOL isDeviceWithNotch;

+ (NSString*)deviceName;

+ (BOOL)isIphone;
+ (BOOL)isIphone_xr;
+ (BOOL)isDeviceWithNotch;

+ (BOOL) url:(NSString*)url matchesPattern:(NSString*)pattern;

@end


