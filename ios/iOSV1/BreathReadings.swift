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
   dynamic var exhalationDirection : String = ""
   dynamic var activeTatva : String = ""
  
  
  
  func processBreathData(data:NSData!,appBridge: RCTBridge!) -> Void {
  
    let readings = Utility().convertHexToInt(data)
    NSLog("Readings count \(readings.count)")
    
    if (readings.count > 0) {
      
      let (leftNostrilReading, rightNostrilReading, activeNadi,exhalationDirection, activeTatva) = BreathReadings().processBreathReadings(readings)
    
      Utility().getLiveBreathReadings(leftNostrilReading,
                                      rightNostrilReading: rightNostrilReading,
                                      activeNadi: activeNadi,
                                      exhalationDirection: exhalationDirection,
                                      activeTatva: activeTatva,
                                      appBridge: appBridge);
    }

  }
  
  func processBreathReadings(readings:Dictionary<String,Double>) -> (Double,Double,String,String,String) {

    let leftNostrilReading = getLeftNostrilReading(readings)
    let rightNostrilReading = getRightNostrilReading(readings)
    let activeNadi = getActiveNadi(leftNostrilReading,rightNostrilReading: rightNostrilReading)
    let exhalationDirection = getExhalationDirection(readings)
    let activeTatva = getActiveTatva(exhalationDirection)
    
    addReadingsInRealm(readings,activeNadi: activeNadi,exhalationDirection: exhalationDirection,activeTatva: activeTatva )
    
    return (leftNostrilReading,rightNostrilReading, activeNadi,exhalationDirection, activeTatva )
    
  }
  
  
  func addReadingsInRealm(readings:Dictionary<String,Double>, activeNadi:String, exhalationDirection:String, activeTatva:String ){
    
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
    newReading.exhalationDirection = exhalationDirection
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
  
  
  /* Placeholder to figure out active Nadi
  
   Considering body temperature is higher than outside temperature!
 
 */
  
  func getActiveNadi(leftNostrilReading: Double, rightNostrilReading: Double ) -> String {
    
    NSLog("Left Nostril\(leftNostrilReading) Right Nostril \(rightNostrilReading)")
    
    if (leftNostrilReading == rightNostrilReading){
      
      return "Sushumna"
      
    }else if (leftNostrilReading > rightNostrilReading) {
      
      return "Ida"
      
    }else {
      
      return "Pingala"
      
    }
    
  }
  
  /* Place holder for finding out direction of breath
   
      To identify direction we need to match the sensors temperature patterns with the patterns described in Swara Yoga and then do fine tuning before we conclude about direction. For that we need to play a lot with permutation combination of 
   
   1. Sensor Pattern matching with Element
   2. Distance from nose to sensors.
   3. 
 
 */
  
  func getExhalationDirection(readings:Dictionary<String,Double>) -> String {
    
    return("Undefined")
    
  }
  
  
  /*
  
   Place holder for finding out Active element
   
   To identify Active Tatva we need 4 criteria - Direction, Duration for which direction is active, Length of breath, Sequence
   For now we are using only Direction to find out active Tatva for POC.
  
  */
  func getActiveTatva(exhalationDirection:String) -> String {
    
    var activeTatva = "Undefined"
    
    if (exhalationDirection == "Upward"){
      activeTatva = "Fire"
    }else if (exhalationDirection == "Downward"){
      activeTatva = "Water"
    }else if(exhalationDirection == "Center"){
      activeTatva =  "Earth"
    }else if(exhalationDirection == "Slanting"){
      activeTatva =  "Air"
    }else if(exhalationDirection == "Diffused"){
      activeTatva =  "Ether"
    }
    
    return activeTatva
    
  }

  
  
}



/*
 
  Make this the main class to do data processing.
 
   - Store data in DB
   - 
 
 
 */
