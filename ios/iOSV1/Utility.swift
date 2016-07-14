//
//  Utility.swift
//  
//
//  Created by Atul Veer on 01/06/15.
//  Copyright (c) 2015 RHC. All rights reserved.
//


import Foundation
import UIKit

private var breathData = ""
 var activeSubjectKey = ""

@objc(Utility)

class Utility : NSObject{
  
  
  
  func convertHexToInt(data:NSData!) -> Dictionary<String,Double>{
    
    // NSLog("Data from BLE: \(data)")
    
    var breathReadings = [String: Double]()
    
    let (validBreathData,dataString) = getBreathData(data)
    
    if (dataString != "" && validBreathData ) {
      
      // Reset Breath Data
      breathData = ""

      NSLog("Count:\(dataString.utf8.count)")
      breathReadings["readingDateTime"] = getReadingDateTime(dataString)
      
      
      let tempString = dataString[dataString.startIndex.advancedBy(3) ..< dataString.endIndex.advancedBy(-36) ]
      NSLog("Temp String:\(tempString)")
      
      let leftTop = tempString[tempString.startIndex ..< tempString.endIndex.advancedBy(-31) ]
      breathReadings["leftTop"] = Double(leftTop)!
      
      let centerTop = tempString[tempString.startIndex.advancedBy(5) ..< tempString.endIndex.advancedBy(-26) ]
      breathReadings["centerTop"] = Double(centerTop)!
      
      let rightTop = tempString[tempString.startIndex.advancedBy(10) ..< tempString.endIndex.advancedBy(-21) ]
      breathReadings["rightTop"] =  Double(rightTop)!
      
      let leftBottom = tempString[tempString.startIndex.advancedBy(15) ..< tempString.endIndex.advancedBy(-16) ]
      breathReadings["leftBottom"] = Double(leftBottom)!
      
      let leftMiddle = tempString[tempString.startIndex.advancedBy(20) ..< tempString.endIndex.advancedBy(-11)]
      breathReadings["leftMiddle"] = Double(leftMiddle)!
      
      let rightMiddle = tempString[tempString.startIndex.advancedBy(25) ..< tempString.endIndex.advancedBy(-6)]
      breathReadings["rightMiddle"] = Double(rightMiddle)!
      
      let rightBottom = tempString[tempString.startIndex.advancedBy(30) ..< tempString.endIndex.advancedBy(-1)]
      breathReadings["rightBottom"] = Double(rightBottom)
      

      
      
      
      let ambientTempString = dataString[dataString.startIndex.advancedBy(38) ..< dataString.endIndex.advancedBy(-1) ]
      NSLog("Ambient Temp String:\(ambientTempString)")
      
      let leftTopAmbient = ambientTempString[ambientTempString.startIndex ..< ambientTempString.endIndex.advancedBy(-31) ]
      breathReadings["leftTopAmbient"] = Double(leftTopAmbient)!
      
      let centerTopAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(5) ..< ambientTempString.endIndex.advancedBy(-26) ]
      breathReadings["centerTopAmbient"] = Double(centerTopAmbient)!
      
      let rightTopAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(10) ..< ambientTempString.endIndex.advancedBy(-21) ]
      breathReadings["rightTopAmbient"] =  Double(rightTopAmbient)!
      
      let leftBottomAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(15) ..< ambientTempString.endIndex.advancedBy(-16) ]
      breathReadings["leftBottomAmbient"] = Double(leftBottomAmbient)!
      
      let leftMiddleAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(20) ..< ambientTempString.endIndex.advancedBy(-11)]
      breathReadings["leftMiddleAmbient"] = Double(leftMiddleAmbient)!
      
      let rightMiddleAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(25) ..< ambientTempString.endIndex.advancedBy(-6)]
      breathReadings["rightMiddleAmbient"] = Double(rightMiddleAmbient)!
      
      let rightBottomAmbient = ambientTempString[ambientTempString.startIndex.advancedBy(30) ..< ambientTempString.endIndex.advancedBy(-1)]
      breathReadings["rightBottomAmbient"] = Double(rightBottomAmbient)
      
      
      NSLog("Temperatures:\(breathReadings)")
      
      
      return breathReadings
      
    }else{
      return breathReadings
    }
    
  }
  
  
  func getBreathData(data:NSData!) -> (Bool, String){
    let dataString = String(data: data, encoding: NSUTF8StringEncoding)
    let lastChar = dataString!.characters.last!
    let firstChar = dataString!.characters.first!
    NSLog("Data String: \(dataString)")
     NSLog("First Char: \(firstChar)")
     NSLog("Last Char: \(lastChar)")
    if(lastChar != ","){
      breathData = breathData + dataString!
      return (false,breathData)
    }else{
      breathData = breathData + dataString!
      NSLog("2: \(breathData)")
      return (true,breathData)

    }

  }
  
  func getReadingDateTime(dataString:String ) -> Double {
    
    var timeString = String(abs(Int(dataString[dataString.startIndex ..< dataString.endIndex.advancedBy(-70)])!))
    
    timeString = "0." + timeString
   // NSLog("Time:\(timeString)")
    
    let miliSeconds =  Double(timeString)
    let readingDateTime = (NSDate().timeIntervalSince1970 + miliSeconds!)
    
     //NSLog( "Reading data time\(readingDateTime)")
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
    appBridge.eventDispatcher.sendAppEventWithName("getBreathChartData", body: breathData)
    
    
  }
  

  @objc func sendLiveBreathDataReadings(readings:Dictionary<String,Double>,
                                        activeNadi:String,
                                        exhalationDirection:String,
                                        activeTatva:String,
                                        appBridge: RCTBridge ) ->  Void {
    
    
         let breathData = [

                    "readingDateTime":    readings["readingDateTime"]!,          
                            "leftTop":    readings["leftTop"]!,
                            "centerTop":  readings["centerTop"]!,
                            "rightTop":   readings["rightTop"]!,
                            "leftBottom": readings["leftBottom"]!,
                            "leftMiddle": readings["leftMiddle"]!,
                            "rightMiddle":readings["rightMiddle"]!,
                            "rightBottom":readings["rightBottom"]!,

                            "leftTopAmbient":    readings["leftTopAmbient"]!,
                            "centerTopAmbient":  readings["centerTopAmbient"]!,
                            "rightTopAmbient":  readings["rightTopAmbient"]!,
                            "leftBottomAmbient":  readings["leftBottomAmbient"]!,
                            "leftMiddleAmbient":  readings["leftMiddleAmbient"]!,
                            "rightMiddleAmbient":  readings["rightMiddleAmbient"]!,
                            "rightBottomAmbient":  readings["rightBottomAmbient"]!,

                            "activeNadi":activeNadi,
                            "exhalationDirection": exhalationDirection,
                            "activeTatva": activeTatva
                          ]
    
        NSLog("Breath Data:\(breathData)")
    
   
        // Call event dispatcher
        appBridge.eventDispatcher.sendAppEventWithName("getBreathReadings", body: breathData)
    
    
    }
  
  
  @objc func getSubjectData(subjectData:NSDictionary, uid:String)  -> Void {
    NSLog("User data:at IOS Side: \(subjectData)")
    DataBaseService().addNewSubject(subjectData,uid: uid);
  }

  @objc func setActiveSubject(subjectKey:NSString)  -> Void {
     NSLog("In Set - Active Subject key: \(subjectKey)")
    activeSubjectKey = subjectKey as String;
   }
  
  func getActiveSubject() -> String {
    NSLog("In Get - Active Subject key: \(activeSubjectKey)")
    return activeSubjectKey
  }
  
  func generateReport(subjectKey:NSString) -> Void {
    NSLog("In generateReport -  Subject key: \(subjectKey)")
    BreathReadings().generateSubjectReport(subjectKey as String)
  
  }
  
 }




