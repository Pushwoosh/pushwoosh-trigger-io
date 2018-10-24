//
//  ForgeConstant.h
//  ForgeCore
//
//  Created by Antoine van Gelder on 2017/09/29.
//  Copyright © 2017 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Things are added here in the hopes that, one day, we no longer need them.
 */
@interface ForgeConstant : NSObject

@property (class, nonatomic, assign, readonly) CGFloat statusBarHeightStatic;
@property (class, nonatomic, assign, readonly) CGFloat statusBarHeightDynamic;
@property (class, nonatomic, assign, readonly) CGFloat navigationBarHeightStatic;
@property (class, nonatomic, assign, readonly) CGFloat navigationBarHeightDynamic;
@property (class, nonatomic, assign, readonly) CGFloat tabBarHeightStatic;
@property (class, nonatomic, assign, readonly) CGFloat screenHeight;
@property (class, nonatomic, assign, readonly) CGFloat screenWidth;

// auto layout is only 1/3 of a solution until it can also manage insets
+ (CGFloat)statusBarHeightStatic;
+ (CGFloat)statusBarHeightDynamic;
+ (CGFloat)navigationBarHeightStatic;
+ (CGFloat)navigationBarHeightDynamic;
+ (CGFloat)tabBarHeightStatic;
+ (CGFloat)screenWidth;
+ (CGFloat)screenHeight;

@end

