//
//  BreathData.swift
//  iOSV1
//
//  Created by Atul Veer on 25/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

public class BreathReadings: Object {
  //var reading_datetime : NSInteger = 0
  
   dynamic var readingDateTime : Double = 0
   dynamic var leftMiddle : Double = 0
   dynamic var rightMiddle : Double = 0
   dynamic var leftTop : Double = 0
   dynamic var rightTop : Double = 0
   dynamic var leftBottom : Double = 0
   dynamic var rightBottom : Double = 0
   dynamic var centerTop : Double = 0
   dynamic var activeNadi : String = ""
   dynamic var breathExalationDirection : String = ""
   dynamic var activeTatva : String = ""
  
  
  
  func processBreathData(data:NSData!,appBridge: RCTBridge!) -> Void {
  
    let readings = Utility().convertHexToInt(data)
    NSLog("Readings count \(readings.count)")
    
    if (readings.count > 0) {
      
      let (leftNostrilReading, rightNostrilReading, activeNadi,breathExalationDirection, activeTatva) = BreathReadings().processBreathReadings(readings)
    
      Utility().getLiveBreathReadings(leftNostrilReading,
                                      rightNostrilReading: rightNostrilReading,
                                      activeNadi: activeNadi,
                                      breathExalationDirection: breathExalationDirection,
                                      activeTatva: activeTatva,
                                      appBridge: appBridge);
    }

  }
  
  func processBreathReadings(readings:Dictionary<String,Double>) -> (Double,Double,String,String,String) {

    let leftNostrilReading = getLeftNostrilReading(readings)
    let rightNostrilReading = getRightNostrilReading(readings)
    let activeNadi = getActiveNadi(leftNostrilReading,rightNostrilReading: rightNostrilReading)
    let breathExalationDirection = getBreathExalationDirection(readings)
    let activeTatva = getActiveTatva(breathExalationDirection)
    
    addReadingsInRealm(readings,activeNadi: activeNadi,breathExalationDirection: breathExalationDirection,activeTatva: activeTatva )
    
    return (leftNostrilReading,rightNostrilReading, activeNadi,breathExalationDirection, activeTatva )
    
  }
  
  
  func addReadingsInRealm(readings:Dictionary<String,Double>, activeNadi:String, breathExalationDirection:String, activeTatva:String ){
    
    // Get the default Realm
    let realm = try! Realm()
    // NSLog("Realm Path \(realm.configuration.fileURL)")
    
    let newReading = BreathReadings()
    
    newReading.readingDateTime = readings["readingDateTime"]!
    newReading.leftTop = readings["leftTop"]!
    newReading.centerTop = readings["centerTop"]!
    newReading.rightTop = readings["rightTop"]!
    newReading.leftBottom = readings["leftBottom"]!
    newReading.leftMiddle = readings["leftMiddle"]!
    newReading.rightMiddle = readings["rightMiddle"]!
    newReading.rightBottom = readings["rightBottom"]!
    
    newReading.activeNadi = activeNadi
    newReading.breathExalationDirection = breathExalationDirection
    newReading.activeTatva = activeTatva
    
    try! realm.write {
      realm.add(newReading)
    }
    
  }
  
  
  func getLeftNostrilReading(readings:Dictionary<String,Double> ) -> Double {
    
    return (readings["leftTop"]!+readings["leftBottom"]!+readings["leftMiddle"]!)/3.0
    
  }
  
  
  func getRightNostrilReading(readings:Dictionary<String,Double> ) -> Double {
    
    return(readings["rightTop"]!+readings["rightBottom"]!+readings["rightMiddle"]!)/3.0
    
  }
  
  func getActiveNadi(leftNostrilReading: Double, rightNostrilReading: Double ) -> String {
    
    if (leftNostrilReading == leftNostrilReading){
      
      return "Sushumna"
      
    }else if (leftNostrilReading > leftNostrilReading) {
      
      return "Ida"
      
    }else {
      
      return "Pingala"
      
    }
    
  }
  
  func getBreathExalationDirection(readings:Dictionary<String,Double>) -> String {
    
    return("Upward")
    
  }
  
  
  func getActiveTatva(breathExalationDirection:String) -> String {
    
    // To identify Active Tatva we need 4 criteria - Direction, Duration for which direction is active, Length of breath, Sequence
    // For now we are using only Direction to find out active Tatva for POC.
    
    var element = "Undefined"
    
    if (breathExalationDirection == "Upward"){
      element = "Fire"
    }else if (breathExalationDirection == "Downward"){
      element = "Water"
    }else if(breathExalationDirection == "Center"){
      element =  "Earth"
    }else if(breathExalationDirection == "Slanting"){
      element =  "Air"
    }else if(breathExalationDirection == "Slanting"){
      element =  "Ether"
    }
    
    return element
    
  }

  
  
  
}





/*
 
  Make this the main class to do data processing.
 
   - Store data in DB
   - 
 
 
 */
