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

   RCT_EXTERN_METHOD(getSubjectData:(NSDictionary *)subjectData uid:(NSString *));
   RCT_EXTERN_METHOD(setActiveSubject:(NSString *)subjectKey);
   RCT_EXTERN_METHOD(generateReport:(NSString *)subjectKey);


@end