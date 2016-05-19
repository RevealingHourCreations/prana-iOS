//
//  BTLEManager.swift
//  TahBLE
//
//  Created by Atul Veer on 23/04/16.
//  Copyright © 2016 RHC. All rights reserved.
//

import Foundation
import CoreBluetooth
import RealmSwift

@objc class BTLEManager:NSObject,CBCentralManagerDelegate,CBPeripheralDelegate {
  // BLE
  
  var centralManager:CBCentralManager!
  var discoveredPeripherals:[CBPeripheral]
  var discoveredCharacteristics:[CBCharacteristic]
  var activePeripheral:CBPeripheral!
  var datas = [String : String]()
  // Since we are getting nil when we try to get bridge instance we are passing this from view
  var appBridge:RCTBridge!
  
  private var _ble_ready: Bool = false
  private var scanOption:Dictionary<String, AnyObject> = [:]
  private var scanTimer:NSTimer?
  
  override init() {
    self.discoveredPeripherals = [CBPeripheral]()
    self.discoveredCharacteristics = [CBCharacteristic]()
    super.init()
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }
  
  
  class var sharedInstance : BTLEManager {
    struct Singleton {
      static let instance = BTLEManager()
    }
    return Singleton.instance
  }
  
  func scan(timeout: Double = 10.0, allowDuplicated: Bool = false , appBridge: RCTBridge) {
    self.scanOption[CBCentralManagerScanOptionAllowDuplicatesKey] = allowDuplicated
    self.scanOption[CBCentralManagerScanOptionSolicitedServiceUUIDsKey] = []
    self.appBridge = appBridge

    centralManager!.scanForPeripheralsWithServices(nil, options: self.scanOption)
  }
  
  
  // Check status of BLE hardware
  func centralManagerDidUpdateState(central: CBCentralManager) {
    if central.state == CBCentralManagerState.PoweredOn {
      // Scan for peripherals if BLE is turned on
      central.scanForPeripheralsWithServices(nil, options: nil)
      print("Searching for BLE Devices")
      
    }
    else {
      // Can have different conditions for all states if needed - print generic message for now
      print("Bluetooth switched off or not initialized")
    }
  }
  
  func addPeripheralsToList(peripheral:CBPeripheral){
    
    discoveredPeripherals.append(peripheral)
    connectToPeripheral(peripheral)
  }
  
  
  // Check out the discovered peripherals to find Sensor Tag
  func centralManager(central: CBCentralManager, didDiscoverPeripheral peripheral: CBPeripheral, advertisementData: [String : AnyObject], RSSI: NSNumber)
    
  {
    print("In Scan")
    if(peripheral.name != nil){
      addPeripheralsToList(peripheral)
    }
    
  }
  
  func connectToPeripheral(peripheral: CBPeripheral){
    self.centralManager.connectPeripheral(peripheral, options: nil)
  }
  
  // Discover services of the peripheral
  func centralManager(central: CBCentralManager, didConnectPeripheral peripheral: CBPeripheral) {
    //  peripheral.delegate = self
    //  peripheral.discoverServices(nil)
    print("Connected")
    self.activePeripheral = peripheral
    self.activePeripheral.delegate = self
    self.activePeripheral.discoverServices(nil)
  }
  
  
  
  // Check if the service discovered is a valid IR Temperature Service
  func peripheral(peripheral: CBPeripheral, didDiscoverServices error: NSError?) {
    for servicePeripheral in peripheral.services!
    {
      print("Service: \(servicePeripheral.UUID)")
      peripheral.discoverCharacteristics([CBUUID(string: "0xFFE1")], forService: servicePeripheral)
    }
    
  }
  
  func addCharacteristicsToList(characteristic:CBCharacteristic){
    
    self.discoveredCharacteristics.append(characteristic)
    notifyForEventCharacteristic()
    
  }
  
  func notifyForEventCharacteristic(){
    for characteristic in self.discoveredCharacteristics{
      self.activePeripheral.setNotifyValue(true, forCharacteristic: characteristic)
    }
  }
  
  
  
  
  // Enable notification and sensor for each characteristic of valid service
  func peripheral(peripheral: CBPeripheral, didDiscoverCharacteristicsForService service: CBService, error: NSError?) {
    for characteristic in service.characteristics!
    {
      self.addCharacteristicsToList(characteristic)
    }
    
  }
  
  func disconnectPeripheral(){
    if(self.activePeripheral.state == CBPeripheralState.Connected){
      self.centralManager.cancelPeripheralConnection(self.activePeripheral)
    }
  }
  
  // If disconnected, start searching again
  func centralManager(central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: NSError?) {
    print("Disconnected")
  }
  
  func peripheral(peripheral: CBPeripheral, didUpdateNotificationStateForCharacteristic characteristic: CBCharacteristic, error: NSError?){
    // if(characteristic.isNotifying){
    //   print("Notification began on \(characteristic)")
    //  }
    if((error) != nil){
      print("Error in didUpdateNotificationStateForCharacteristic \(error)")
    }
    print("didUpdateNotificationStateForCharacteristic Updated \(peripheral) : \(characteristic)")
  }
  

  
  //Calleed on read and notify callback
  func peripheral(peripheral: CBPeripheral, didUpdateValueForCharacteristic characteristic: CBCharacteristic, error: NSError?){
  
   // print(" didUpdateValueForCharacteristic Updated \(peripheral) : \(characteristic)")
    if((characteristic.value) != nil){
      let data = characteristic.value as NSData!
      let readings = Utility().convertHexToInt(data)
      if readings.count > 0 {
       // Utility().addReadingsInRealm(readings)
        Utility().getLiveBreathReadings(readings, appBridge: appBridge);
      }
    }
  }

  
  func peripheral(peripheral: CBPeripheral, didWriteValueForCharacteristic characteristic: CBCharacteristic, error: NSError?){
    if((error) != nil){
      print("Write Error is \(error)")
    }
    print(" didWriteValueForCharacteristic  \(peripheral) : \(characteristic) : \(characteristic.value)")
    self.activePeripheral.readValueForCharacteristic(characteristic)
    
  }
  
}