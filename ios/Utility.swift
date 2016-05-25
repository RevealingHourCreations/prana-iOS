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
    
    // NSLog("Data from BLE: \(data)")
  
    var breathReadings = [String: Double]()
    
    let dataString = String(data: data, encoding: NSUTF8StringEncoding)
    
    NSLog("Data String: \(dataString)")
    
    if (data != nil) {
      
      breathReadings["readingDateTime"] = getReadingDateTime(dataString!)
      
      let tempString = dataString![dataString!.startIndex.advancedBy(dataString!.utf8.count - 16) ..< dataString!.endIndex ]
      //NSLog("Temp String:\(tempString)")
      
      let ambientTemp = tempString[tempString.startIndex ..< tempString.endIndex.advancedBy(-14) ]
      breathReadings["ambientTemp"] = Double(ambientTemp)
      
      //NSLog(" ambientTemp:\(ambientTemp)")
      
      let leftTop = tempString[tempString.startIndex.advancedBy(2) ..< tempString.endIndex.advancedBy(-12) ]
      breathReadings["leftTop"] = Double(leftTop)
      
      let centerTop = tempString[tempString.startIndex.advancedBy(4) ..< tempString.endIndex.advancedBy(-10) ]
      breathReadings["centerTop"] = Double(centerTop)
      
      let rightTop = tempString[tempString.startIndex.advancedBy(6) ..< tempString.endIndex.advancedBy(-8) ]
      breathReadings["rightTop"] = Double(rightTop)
      
      let leftBottom = tempString[tempString.startIndex.advancedBy(8) ..< tempString.endIndex.advancedBy(-6) ]
      breathReadings["leftBottom"] = Double(leftBottom)
      
      let leftMiddle = tempString[tempString.startIndex.advancedBy(10) ..< tempString.endIndex.advancedBy(-4)]
      breathReadings["leftMiddle"] = Double(leftMiddle)
      
      let rightMiddle = tempString[tempString.startIndex.advancedBy(12) ..< tempString.endIndex.advancedBy(-2)]
      breathReadings["rightMiddle"] = Double(rightMiddle)
      
      let rightBottom = tempString[tempString.startIndex.advancedBy(14) ..< tempString.endIndex]
      breathReadings["rightBottom"] = Double(rightBottom)
      
      
      NSLog("Temperatures:\(breathReadings)")
    
      return breathReadings
      
    }else{
     return breathReadings
    }
    
  }
  
  func getReadingDateTime(dataString:String ) -> Double {
    
    var timeString = String(abs(Int(dataString[dataString.startIndex ..< dataString.endIndex.advancedBy(-16)])!))
    
    timeString = "0." + timeString
   // NSLog("Time:\(timeString)")
    
    let miliSeconds =  Double(timeString)
    
   // NSLog("Mili Seconds:\(miliSeconds)")
    
    let readingDateTime = (NSDate().timeIntervalSince1970 + miliSeconds!)
    
    return readingDateTime
    
  }
  
  // Ref: http://moduscreate.com/swift-modules-for-react-native/
  
  @objc func sendProcessedBreathDataReadings(readingDateTime:Double,
                                   leftNostrilReading:Double,
                                   rightNostrilReading:Double,
                                   activeNadi:String,
                                   exhalationDirection:String,
                                   activeTatva:String,
                                   appBridge: RCTBridge ) ->  Void {
    
    
    let breathData = [
                        "readingDateTime": readingDateTime,
                        "leftNostril": leftNostrilReading,
                        "rightNostril": rightNostrilReading,
                        "activeNadi":activeNadi,
                        "exhalationDirection": exhalationDirection,
                        "activeTatva": activeTatva
                     ]
    
    NSLog("Breath Data:\(breathData)")
    
    // Call event dispatcher
    appBridge.eventDispatcher.sendAppEventWithName("getBreathData", body: breathData)
    
    
  }
  

  @objc func sendLiveBreathDataReadings(readings:Dictionary<String,Double>,
                                        activeNadi:String,
                                        exhalationDirection:String,
                                        activeTatva:String,
                                        appBridge: RCTBridge ) ->  Void {
    
    
         let breathData = [
                            "leftTop":    readings["leftTop"]!,
                            "centerTop":  readings["centerTop"]!,
                            "rightTop":   readings["rightTop"]!,
                            "leftBottom": readings["leftBottom"]!,
                            "leftMiddle": readings["leftMiddle"]!,
                            "rightMiddle":readings["rightMiddle"]!,
                            "rightBottom":readings["rightBottom"]!,
                            "activeNadi":activeNadi,
                            "exhalationDirection": exhalationDirection,
                            "activeTatva": activeTatva
                          ]
    
        NSLog("Breath Data:\(breathData)")
    
   
        // Call event dispatcher
        appBridge.eventDispatcher.sendAppEventWithName("getLiveBreathReadings", body: breathData)
    
    
   }

  
  }


