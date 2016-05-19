//
//  Utility.swift
//  
//
//  Created by Atul Veer on 01/06/15.
//  Copyright (c) 2015 RHC. All rights reserved.
//


import Foundation
import UIKit
import RealmSwift



@objc(Utility)

class Utility : NSObject{
  
  
  func convertHexToInt(data:NSData!) -> Dictionary<String,Double>{
    
    NSLog("Data from BLE: \(data)")
  
    var breathReadings = [String: Double]()
    
    let dataString = String(data: data, encoding: NSUTF8StringEncoding)

    
//    In getBytesArray<2d323331 35363335 33353335 33353335 33353335>
//    NOT sure why we got -ve value when we convert to UTF8
 //   Data String: Optional("-2315635353535353535"
    
    
    NSLog("Data String: \(dataString)")
    NSLog("End Index: \(dataString!.endIndex)")
    
    if (data != nil) {
      
      var timeString = String (abs(Int(dataString![dataString!.startIndex ..< dataString!.endIndex.advancedBy(-14)])!))
      
      timeString = "0." + timeString
      NSLog("Time:\(timeString)")

      let miliSeconds =  Double(timeString)

      NSLog("Mili Seconds:\(miliSeconds)")
      
      let readingDateTime = (NSDate().timeIntervalSince1970 + miliSeconds!)
      
      breathReadings["readingDateTime"] = readingDateTime
     
      
      let tempString = dataString![dataString!.startIndex.advancedBy(dataString!.utf8.count - 14) ..< dataString!.endIndex ]
      
      let leftTop = tempString[tempString.startIndex ..< tempString.endIndex.advancedBy(-12) ]
      breathReadings["leftTop"] = Double(leftTop)
      
      let centerTop = tempString[tempString.startIndex.advancedBy(2) ..< tempString.endIndex.advancedBy(-10) ]
      
      breathReadings["centerTop"] = Double(centerTop)
      
      let rightTop = tempString[tempString.startIndex.advancedBy(4) ..< tempString.endIndex.advancedBy(-8) ]
      
      breathReadings["rightTop"] = Double(rightTop)
      
      let leftBottom = tempString[tempString.startIndex.advancedBy(6) ..< tempString.endIndex.advancedBy(-6) ]
      
      breathReadings["leftBottom"] = Double(leftBottom)
      
      let leftMiddle = tempString[tempString.startIndex.advancedBy(8) ..< tempString.endIndex.advancedBy(-4)]
      
      breathReadings["leftMiddle"] = Double(leftMiddle)
      
      let rightMiddle = tempString[tempString.startIndex.advancedBy(10) ..< tempString.endIndex.advancedBy(-2)]
      
      breathReadings["rightMiddle"] = Double(rightMiddle)
      
      let rightBottom = tempString[tempString.startIndex.advancedBy(12) ..< tempString.endIndex]
      
      breathReadings["rightBottom"] = Double(rightBottom)
      
      
      NSLog("Temperatures:\(breathReadings)")
    
      return breathReadings
      
    }else{
     return breathReadings
    }

  }
  
  
  func addReadingsInRealm(readings:Dictionary<String,Double>){
    
   
    // Get the default Realm
    let realm = try! Realm()
    NSLog("Realm Path \(realm.configuration.fileURL)")
    
    let newReading = BreathReadings()
    
    newReading.readingDateTime = readings["readingDateTime"]!
    newReading.leftTop = readings["leftTop"]!
    newReading.centerTop = readings["centerTop"]!
    newReading.rightTop = readings["rightTop"]!
    newReading.leftBottom = readings["leftBottom"]!
    newReading.leftMiddle = readings["leftMiddle"]!
    newReading.rightMiddle = readings["rightMiddle"]!
    newReading.rightBottom = readings["rightBottom"]!
    
    try! realm.write {
      realm.add(newReading)
    }
    
  }
  
  
  // Ref: http://moduscreate.com/swift-modules-for-react-native/

  @objc func getLiveBreathReadings(readings:Dictionary<String,Double> , appBridge: RCTBridge ) ->  Void {
  
    
    let leftNostrilReading = (readings["leftTop"]!+readings["leftBottom"]!+readings["leftMiddle"]!)/3.0
    let rightNostrilReading = (readings["rightTop"]!+readings["rightBottom"]!+readings["rightMiddle"]!)/3.0
    
    let avgReading = [
      "leftNostril": leftNostrilReading,
      "rightNostril": rightNostrilReading
    ]
    
    print("Avg Breath Reading:\(leftNostrilReading)")
   
    
    // Call event dispatcher 'getAvgBreathReadings'
    appBridge.eventDispatcher.sendAppEventWithName("getAvgBreathReadings", body: avgReading)

    
  }
  
  
  
}


