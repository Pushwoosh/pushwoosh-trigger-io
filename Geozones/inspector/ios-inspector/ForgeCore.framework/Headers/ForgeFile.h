//
//  ForgeFile.h
//  ForgeCore
//
//  Created by Connor Dunn on 14/01/2013.
//  Copyright (c) 2013 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AssetsLibrary/AssetsLibrary.h>

typedef void (^ForgeFileExistsResultBlock)(BOOL exists);
typedef void (^ForgeFileInfoResultBlock)(NSDictionary* info);
typedef void (^ForgeFileDataResultBlock)(NSData* data);
typedef void (^ForgeFileErrorBlock)(NSError* error);
typedef void (^ForgeFileErrorDescriptionBlock)(NSString* description);

@interface ForgeFile : NSObject {
	NSDictionary* file;
}

- (ForgeFile*) initWithPath:(NSString*)path;
- (ForgeFile*) initWithAssetsPath:(NSString *)assetsPath;
- (ForgeFile*) initWithFile:(NSDictionary*)withFile;
- (ForgeFile*) initWithObject:(NSObject*)object;
- (NSString*) url;
- (void) exists:(ForgeFileExistsResultBlock)resultBlock;
- (void) info:(ForgeFileInfoResultBlock)resultBlock errorBlock:(ForgeFileErrorDescriptionBlock)errorBlock;
- (void) data:(ForgeFileDataResultBlock)resultBlock errorBlock:(ForgeFileErrorBlock)errorBlock;
- (BOOL) remove;
- (NSString*) mimeType;
- (NSString*) mimeTypeWithData:(NSData*)data;
- (NSDictionary*) toJSON;

+ (NSURL*) toAssetURL:(NSString*)uri;

@end
