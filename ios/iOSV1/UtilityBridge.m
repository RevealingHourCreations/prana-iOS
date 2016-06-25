//
//  UtilityBridge.m
//  iOSV1
//
//  Created by Atul Veer on 02/05/16.
//  Copyright © 2016 Facebook. All rights reserved.
//
// Ref: http://moduscreate.com/swift-modules-for-react-native/

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(Utility, NSObject)

 // RCT_EXTERN_METHOD(getUserData:(NSString *)firstName);

   RCT_EXTERN_METHOD(getSubjectData:(NSDictionary *)subjectData);
   RCT_EXTERN_METHOD(getSubjects: callback: (RCTResponseSenderBlock)callback);

@end