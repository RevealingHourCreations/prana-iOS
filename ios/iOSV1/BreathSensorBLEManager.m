//
//  BreathSensorBLEManager.m
//  iOSV1
//
//  Created by Atul Veer on 28/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BreathSensorBLEManager.h"
#import <CoreBluetooth/CoreBluetooth.h>


@implementation BreathSensorBLEManager

@synthesize peripherals,peripheralsWithAdv,serialNumberToScan;

static  BreathSensorBLEManager *btleManager;

+ (BreathSensorBLEManager *)sharedInstance
{
    if (!btleManager) {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            btleManager = [[BreathSensorBLEManager alloc] init];
        });
        
    }
    return btleManager;
}

#pragma mark - Creation & initialization
- (void)initializeParameters {
    //    self.managerState = -1; //An invalid state
    self.isScanning = NO;
    
}

- (id)init {
    self = [super init];
    if (self) {
        
        //Initializing the CbCentralManager object
        //Setting self as CBCentralManagerDelegate
        centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
        [self initializeParameters];
        
        //Before scanning a delay allows the centralManagerDidUpdateState to update bluetooth state.
        
        NSLog(@"Bluetooth Manager created");
    }
    return self;
    
}


#pragma mark - SERVICES AND CHARACTERISTICS

- (NSDictionary *)scanOptions {
    
    //Options for scanning
    NSDictionary *options = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:NO],CBCentralManagerScanOptionAllowDuplicatesKey, nil];
    
    return options;
}


-(void)stopScanning{
    self.isScanning = NO;
    [centralManager stopScan];
    NSLog(@"Scanning Stopped");
    //Rx found Notification
  
  /*
  if(peripheralsWithAdv!=nil){
        NSDictionary *userInfo = [NSDictionary dictionaryWithObject:peripheralsWithAdv forKey:@"receivers"];
        [[NSNotificationCenter defaultCenter] postNotificationName:kFetchNearByReceviersNotificationName  object:nil userInfo:userInfo];
    }
    */
}

- (NSArray *)servicesToScan {
  
  NSArray *servicesArray = [NSArray arrayWithObjects:@"FFE1", nil];
  
  return servicesArray;
}

-(void)startScanning {
    //Set lock
    self.isScanning = YES;
    
    self.peripherals = [[NSMutableArray alloc] init];
    self.peripheralsWithAdv = [[NSMutableDictionary alloc] init];
    //Services needed
    NSArray* servicesArray = [self servicesToScan];
    //Options
    NSDictionary* options = [self scanOptions];
    
    //Begin scan
    [centralManager scanForPeripheralsWithServices:servicesArray options:options ];

  
    NSLog(@"Scanning started");
    
  /*
  //Timer for stopping scan (-1 = infinite)
    if (kScanPeripheralTimeout != -1) {
        self.scanTimeOutTimer = [NSTimer scheduledTimerWithTimeInterval:kScanPeripheralTimeout
                                                                 target:self
                                                               selector:@selector(stopScanning)
                                                               userInfo:nil
                                                                repeats:NO];
    }
    */
}

- (void)addPeripheralToScannedList:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSIValue:(NSNumber*)RSSI{
  NSLog(@"Found pripheral");
  
  [centralManager connectPeripheral:peripheral options:nil];
 

}

- (void)centralManager:(CBCentralManager *)central didFailToConnectPeripheral:(CBPeripheral *)peripheral error:(nullable NSError *)error{
  NSLog(@"error %@",error);
}
    
    
    


- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSI:(NSNumber *)RSSI
{
    NSLog(@"Found preferal %@",peripheral.name);
    NSLog(@"advertisementData:advertisementData %@",advertisementData);
  //  [self addPeripheralToScannedList:peripheral advertisementData:advertisementData RSSIValue:RSSI];
  [centralManager connectPeripheral:peripheral options:nil];
    
}

/*!
 *  @protocol CBPeripheralDelegate
 *
 *  @discussion Delegate for CBPeripheral.
 *
 */

- (void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error {
    /* Find all characteristics for all discovered services */
    NSLog(@"Services : %@",peripheral.services);
    
    for (CBService *service in peripheral.services)
    {
      //  [Utility showAlert:@"Services" message:service.description delegate:nil];
        [peripheral discoverCharacteristics:nil forService:service];
    }
}

- (void)peripheral:(CBPeripheral *)peripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error
{
    NSLog(@"Service charecteristics are %@",service.characteristics);
}

/*!
 *  @protocol CBCentralManagerDelegate
 *
 *  @discussion The delegate of a {@link CBCentralManager} object must adopt the <code>CBCentralManagerDelegate</code> protocol. The
 *              single required method indicates the availability of the central manager, while the optional methods allow for the discovery and
 *              connection of peripherals.
 *
 */

- (void)connectReceiver:(CBPeripheral *)peripheral{
    
    [centralManager connectPeripheral:peripheral options:nil];
    
    NSLog(@"connectPeripheral");
}


/*!
 *  @method centralManager:didConnectPeripheral:
 *
 *  @param central      The central manager providing this information.
 *  @param peripheral   The <code>CBPeripheral</code> that has connected.
 *
 *  @discussion         This method is invoked when a connection initiated by {@link connectPeripheral:options:} has succeeded.
 *
 */
- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral{
    NSLog(@"Success");
  //  [Utility showAlert:@"Success" message:@"Peripheral Connected" delegate:nil];
    peripheral.delegate = self;
    [peripheral discoverServices:nil];
}


/*!
 *  @method centralManagerDidUpdateState:
 *
 *  @param central  The central manager whose state has changed.
 *
 *  @discussion     Invoked whenever the central manager's state has been updated. Commands should only be issued when the state is
 *                  <code>CBCentralManagerStatePoweredOn</code>. A state below <code>CBCentralManagerStatePoweredOn</code>
 *                  implies that scanning has stopped and any connected peripherals have been disconnected. If the state moves below
 *                  <code>CBCentralManagerStatePoweredOff</code>, all <code>CBPeripheral</code> objects obtained from this central
 *                  manager become invalid and must be retrieved or discovered again.
 *
 *  @see            state
 *
 */
- (void) centralManagerDidUpdateState:(CBCentralManager *)central
{
    //static CBCentralManagerState previousState = -1;
    
    switch ([centralManager state]) {
            
        case CBCentralManagerStatePoweredOff:
        {
            //[Utility showAlert:@"WattUp" message:@"Bluetooth is Off. Please turn on Bluetooth to start discovery" delegate:nil];
            //if(_isScanning){
            //  [self stopScanning];
            //}
            
            break;
        }
            
        case CBCentralManagerStateUnauthorized:
        {
            /* Tell user the app is not allowed. */
            break;
        }
            
        case CBCentralManagerStateUnknown:
        {
            /* Bad news, let's wait for another event. */
            break;
        }
            
        case CBCentralManagerStatePoweredOn:
        {
            //if (!_isScanning) {
            [self startScanning];
            //}
            break;
        }
            
        case CBCentralManagerStateResetting:
        {
            break;
        }
        case CBCentralManagerStateUnsupported:
        {
            break;
        }
    }
    
    
}
-(void)prepareForScan{
    NSLog(@"CentralManager State %d",(int)[centralManager state]);
    if([centralManager state] == CBCentralManagerStatePoweredOn){
        [self startScanning];
    }
}







@end

