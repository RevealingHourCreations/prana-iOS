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
  
   var bridge: RCTBridge!  // this is synthesized. This is returning nil; hence we are passing bridge instace from view

  
  func convertHexToInt(data:NSData!) -> Array<Double> {
    print("In getBytesArray\(data)")
  
  
    var temperatures = [Double]()
    
    let dataString = String(data: data, encoding: NSUTF8StringEncoding)

    
//    In getBytesArray<2d323331 35363335 33353335 33353335 33353335>
//    NOT sure why we got -ve value when we convert to UTF8
 //   Data String: Optional("-2315635353535353535"
    
    
    print("Data String: \(dataString)")
    print("End Index: \(dataString!.endIndex)")
    
    if (data != nil) {
      
      var timeString = String (abs(Int(dataString![dataString!.startIndex ..< dataString!.endIndex.advancedBy(-14)])!))
      
      timeString = "0." + timeString
      print("Time:\(timeString)")

       let miliSeconds =  Double(timeString)

      print("Mili Seconds:\(miliSeconds)")
      
      let readingDateTime = (NSDate().timeIntervalSince1970 + miliSeconds!)
      
      temperatures.append(readingDateTime)
      
      let tempString = dataString![dataString!.startIndex.advancedBy(dataString!.utf8.count - 14) ..< dataString!.endIndex ]
      
      let leftMiddle = tempString[tempString.startIndex ..< tempString.endIndex.advancedBy(-12) ]
      
      temperatures.append(Double(leftMiddle)!)
      
      let rightMiddle = tempString[tempString.startIndex.advancedBy(2) ..< tempString.endIndex.advancedBy(-10) ]
      
      temperatures.append(Double(rightMiddle)!)
      
      let leftBottom = tempString[tempString.startIndex.advancedBy(4) ..< tempString.endIndex.advancedBy(-8) ]
      
      temperatures.append(Double(leftBottom)!)
      
      let rightBottom = tempString[tempString.startIndex.advancedBy(6) ..< tempString.endIndex.advancedBy(-6) ]
      
      temperatures.append(Double(rightBottom)!)
      
      let leftTop = tempString[tempString.startIndex.advancedBy(8) ..< tempString.endIndex.advancedBy(-4)]
      
      temperatures.append(Double(leftTop)!)
      
      let rightTop = tempString[tempString.startIndex.advancedBy(10) ..< tempString.endIndex.advancedBy(-2)]
      
      temperatures.append(Double(rightTop)!)
      
      let centerTop = tempString[tempString.startIndex.advancedBy(12) ..< tempString.endIndex]
      
      temperatures.append(Double(centerTop)!)
      
      
      print("Temperatures:\(temperatures)")
    
      return temperatures
      
    }else{
     return [Double]()
    
    }

  }
  
  
  func addReadingsInRealm(readings:Array<Double>!){
    
   
    // Get the default Realm
    let realm = try! Realm()
    //print("Realm Path \(realm.path)")
    
    let newReading = BreathReadings()
    
    newReading.readingDateTime = readings[0]
    newReading.leftMiddle = readings[1]
    newReading.rightMiddle = readings[2]
    newReading.leftBottom = readings[3]
    newReading.rightBottom = readings[4]
    newReading.leftBottom = readings[5]
    newReading.rightTop = readings[6]
    newReading.centerTop = readings[7]
    
    try! realm.write {
      realm.add(newReading)
    }
    
  }
  
  
  // Ref: http://moduscreate.com/swift-modules-for-react-native/

  @objc func getLiveBreathReadings(readings:Array<Double>! , appBridge: RCTBridge ) ->  Void {
     print("Live Breath Reading:\(readings)")
   // NSLog("Bridge: %@", appBridge);
    let liveReading = [
      "readingDateTime": readings[0],
      "leftMiddle": readings[1],
      "rightMiddle": readings[2],
      "leftBottom": readings[3],
      "rightBottom": readings[4],
      "leftTop": readings[5],
      "rightTop": readings[6],
      "centerTop": readings[7]

    ]
    
   // liveDataCallback([liveReading])
    
    // Call event dispatcher 'getLiveBreathReadings'
    appBridge.eventDispatcher.sendAppEventWithName("getLiveBreathReadings", body: liveReading)
    
    let leftNostrilReading = (readings[1]+readings[3]+readings[5])/3.0
    let rightNostrilReading = (readings[2]+readings[4]+readings[6])/3.0
    
    let avgReading = [
      "leftNostril": leftNostrilReading,
      "rightNostril": rightNostrilReading
    ]
    
    print("Avg Breath Reading:\(leftNostrilReading)")
   
    
    // Call event dispatcher 'getLiveBreathReadings'
    appBridge.eventDispatcher.sendAppEventWithName("getAvgBreathReadings", body: avgReading)

    
  }
  
  
  
}


