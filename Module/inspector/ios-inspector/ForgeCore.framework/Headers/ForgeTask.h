//
//  ForgeTask.h
//  Forge
//
//  Created by Connor Dunn on 01/11/2011.
//  Copyright (c) 2011 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ForgeTask : NSObject
{
	UIBackgroundTaskIdentifier bgTask;
	UIView* webView;
}

@property (readonly) NSString *callid;
@property (readonly) NSDictionary *params;

- (ForgeTask*) initWithID:(NSString*)newcallid andParams:(NSDictionary*)newparams andWebView:(UIView *)newWebView;
- (void) success:(id)result;
- (void) error:(id)e;
- (void) error:(NSString*)message type:(NSString*)type subtype:(NSString*)subtype;
- (void) errorDict:(NSDictionary*)result;
- (void) errorString:(NSString*)message;
- (void) errorThrown:(NSException*)e;
- (void) runInBackground;


@end
