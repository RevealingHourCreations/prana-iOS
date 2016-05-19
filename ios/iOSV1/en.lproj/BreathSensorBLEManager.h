//
//  BreathSensorBLEManager.h
//  iOSV1
//
//  Created by Atul Veer on 28/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

@interface BreathSensorBLEManager : NSObject<CBCentralManagerDelegate,CBPeripheralDelegate>{
    CBCentralManager    *centralManager;
}

+ (BreathSensorBLEManager *)sharedInstance;

//General
@property (assign) BOOL isScanning;
@property (nonatomic, strong) NSString* serialNumberToScan;
@property (nonatomic, strong) NSMutableArray* peripherals;
@property (nonatomic, strong) NSMutableDictionary* peripheralsWithAdv;
@property (strong) NSTimer* scanTimeOutTimer;

- (void)startScanning;
-(void)prepareForScan:(NSString*)numberToScan;
- (void)addPeripheralToScannedList:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSIValue:(NSNumber*)RSSI;
- (void)connectReceiver:(CBPeripheral *)peripheral;
-(void)stopScanning;

@end
