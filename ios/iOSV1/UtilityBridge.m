//
//  UtilityBridge.m
//  iOSV1
//
//  Created by Atul Veer on 02/05/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(Utility, NSObject)

RCT_EXTERN_METHOD(getLiveBreathReadings:(NSNumber *)reading liveDataCallback: (RCTResponseSenderBlock)callback) ;

@end