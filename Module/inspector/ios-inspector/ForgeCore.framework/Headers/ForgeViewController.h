//
//  ForgeViewController.h
//  ForgeCore
//
//  Created by Antoine van Gelder on 8/19/14.
//  Copyright (c) 2014 Trigger Corp. All rights reserved.
//

#import <UIKit/UIKit.h>

#define withWebView(NAME, BODY) if ([[ForgeApp sharedApp] useWKWebView]) { WKWebView *(NAME) = (WKWebView*)ForgeApp.sharedApp.webView; BODY } else { UIWebView *(NAME) = (UIWebView*)ForgeApp.sharedApp.webView; BODY }

@interface ForgeViewController : UIViewController {
	BOOL hasLoaded;
	@public BOOL forcePortrait;

    UIView *_blurView;
    UIVisualEffectView *_blurViewVisualEffect;
    NSLayoutConstraint *_blurViewBottomConstraint;

    IBOutlet UINavigationBar *_navigationBar;
    IBOutlet UITabBar *_tabBar;

    UIStatusBarStyle _statusBarStyle;
    BOOL _statusBarHidden;
    BOOL _statusBarTransparent;

    BOOL _navigationBarHidden;
    BOOL _tabBarHidden;

    NSLayoutConstraint *_navigationBarTopConstraint;

    NSInteger _contentInsetAdjustmentBehavior;
}

@property (nonatomic) UIStatusBarStyle statusBarStyle;
@property (nonatomic) BOOL statusBarHidden;
@property (nonatomic) BOOL statusBarTransparent;

@property (nonatomic) BOOL navigationBarHidden;
@property (nonatomic) BOOL tabBarHidden;

@property (nonatomic) NSInteger contentInsetAdjustmentBehavior;

@property (readonly) UINavigationBar *navigationBar;
@property (readonly) UITabBar *tabBar;
@property (readonly) UIView *blurView;
@property (readonly) UIVisualEffectView *blurViewVisualEffect;

- (void)loadInitialPage;
- (void)loadURL:(NSURL*)url;
- (BOOL)shouldAllowRequest:(NSURLRequest *)request;

- (void)createNativeElements:(UIView*)theWebView;
- (void)createStatusBarVisualEffect:(UIView*)theWebView;
- (void)setupLayoutConstraints:(UIView*)theWebView;
- (void)setupLayoutConstraintsFromXIB:(UIView*)theWebView;

- (void)setStatusBarHidden:(BOOL)hidden;
- (void)setStatusBarTransparent:(BOOL)hidden;
- (void)setStatusBarStyle:(UIStatusBarStyle)style;
- (void)setNavigationBarHidden:(BOOL)hidden;
- (void)setTabBarHidden:(BOOL)hidden;

- (void)setContentInsetAdjustmentBehavior:(NSInteger)behavior;
- (void)updateContentInsets;

- (void)setLeftInset:(CGFloat) leftInset;
- (void)setRightInset:(CGFloat) rightInset;
- (void)setTopInset:(CGFloat) topInset;
- (void)setBottomInset:(CGFloat) bottomInset;

- (void)keyboardWillShow:(NSNotification*)notification;
- (void)keyboardWillHide:(NSNotification*)notification;
- (void)keyboardDidShow:(NSNotification*)notification;
- (void)keyboardDidHide:(NSNotification*)notification;

@property (class, nonatomic, assign, readonly) BOOL fromXIB;
@property (class, nonatomic, assign, readonly) BOOL isIPad; // @deprecated
@property (class, nonatomic, assign, readonly) BOOL iPad2Bug;

// so we can get these in iOS < 11 as well
typedef NS_ENUM(NSInteger, ForgeContentInsetAdjustmentBehavior) {
    ForgeContentInsetAdjustmentAutomatic,      // Not supported - behaves like "Never"
    ForgeContentInsetAdjustmentScrollableAxes, // Not supported - behaves like "Never"
    ForgeContentInsetAdjustmentNever,          // contentInset is not adjusted
    ForgeContentInsetAdjustmentAlways,         // contentInset is always adjusted by the scroll view's safeAreaInsets
};

@end
