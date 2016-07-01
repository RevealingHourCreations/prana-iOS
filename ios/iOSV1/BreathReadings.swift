//
//  BreathData.swift
//  iOSV1
//
//  Created by Atul Veer on 25/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import Firebase

public class BreathReadings {
  
    var subjectKey: String = ""
    var readingDateTime : Double = 0
    var leftMiddle : Double = 0
    var rightMiddle : Double = 0
    var leftTop : Double = 0
    var rightTop : Double = 0
    var leftBottom : Double = 0
    var rightBottom : Double = 0
    var centerTop : Double = 0
    var activeNadi : String = ""
    var exhalationDirection : String = ""
    var activeTatva : String = ""
  
  
  //var ref = FIRDatabase.database().reference()
  
  func processBreathData(data:NSData!,appBridge: RCTBridge!) -> Void {
    
   
  /*
    NSLog("Authenticating user")
    FIRAuth.auth()?.signInAnonymouslyWithCompletion() { (user, error) in
      let uid = user!.uid
      NSLog("User id:\(uid)")
      NSLog("Error:\(error)")
    
    }*/
    
  
    let activeSubjectKey = Utility().getActiveSubject()
     NSLog("In processBreathData - Active Subject key: \(activeSubjectKey)")

    if (activeSubjectKey != ""){
      let readings = Utility().convertHexToInt(data)
     // NSLog("Readings count \(readings.count)")
      
      if (readings.count > 0) {
        
        let (readingDateTime,leftNostrilReading, rightNostrilReading, activeNadi,exhalationDirection, activeTatva) = BreathReadings().processBreathReadings(readings,activeSubjectKey: activeSubjectKey)
        
            Utility().sendProcessedBreathDataReadings(readingDateTime,
                                                      leftNostrilReading:leftNostrilReading,
                                                      rightNostrilReading: rightNostrilReading,
                                                      activeNadi: activeNadi,
                                                      exhalationDirection: exhalationDirection,
                                                      activeTatva: activeTatva,
                                                      appBridge: appBridge);
   
        /*
        
        Utility().sendLiveBreathDataReadings(readings,                                        
                                             activeNadi: activeNadi,
                                             exhalationDirection: exhalationDirection,
                                             activeTatva: activeTatva,
                                             appBridge: appBridge);
        */

       }
    }

  }
  
  func processBreathReadings(readings:Dictionary<String,Double>, activeSubjectKey: String) -> (Double,Double,Double,String,String,String) {

    let readingDateTime = readings["readingDateTime"]
    let leftNostrilReading = getLeftNostrilReading(readings)
    let rightNostrilReading = getRightNostrilReading(readings)
    let activeNadi = getActiveNadi(leftNostrilReading,rightNostrilReading: rightNostrilReading)
    let exhalationDirection = getExhalationDirection(readings,activeNadi: activeNadi)
    let activeTatva = getActiveTatva(exhalationDirection)
    
    /*
     DataBaseService().storeBreathReadings(readings,
                                             activeSubjectKey: activeSubjectKey,
                                             activeNadi: activeNadi,
                                             exhalationDirection: exhalationDirection,
                                             activeTatva: activeTatva )
 
    */
   
    
    return (readingDateTime!,leftNostrilReading,rightNostrilReading, activeNadi,exhalationDirection, activeTatva )
    
  }
  
  
  func getLeftNostrilReading(readings:Dictionary<String,Double> ) -> Double {
    
    return Double(round(((readings["leftTop"]! + readings["leftBottom"]! + readings["leftMiddle"]!)/3.0)*100)/100)
    
  }
  
  
  func getRightNostrilReading(readings:Dictionary<String,Double> ) -> Double {
    
    return  Double(round(((readings["rightTop"]! + readings["rightBottom"]! + readings["rightMiddle"]!)/3.0)*100)/100)
    
  }
  
  
  /* Placeholder to figure out active Nadi
  
   Considering body temperature is higher than outside temperature!
 
 */
  
  func getActiveNadi(leftNostrilReading: Double, rightNostrilReading: Double ) -> String {
    
    NSLog("Left Nostril: \(leftNostrilReading) Right Nostril: \(rightNostrilReading)")
    
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
  
  func getExhalationDirection(readings:Dictionary<String,Double>, activeNadi:String) -> String {
    
    let breathingPattern =  getBreathingPattern(readings,activeNadi: activeNadi)
    let breathingDirection = getBrearthDirection(breathingPattern)
    
    return breathingDirection
    
  }
  
  func getBrearthDirection(breathingPattern:Array<String>) -> String {
    
    var brearthingDirection = "Undefined"
    
    let idaEarthBrearthingPattern:[String] =  ["rightTop",
                                               "rightBottom",
                                               "leftTop",
                                               "leftBottom",
                                               "centerTop",
                                               "rightMiddle",
                                               "leftMiddle"]

    
    let pingalaEarthBrearthingPattern:[String] =  [ "leftTop",
                                                    "leftBottom",
                                                    "rightTop",
                                                    "rightBottom",
                                                    "centerTop",
                                                    "leftMiddle",
                                                    "rightMiddle"]
    


    let idaWaterBreathingPattern:[String] =  ["rightTop",
                                              "centerTop",
                                              "leftTop",
                                              "rightBottom",
                                              "rightMiddle",
                                              "leftMiddle",
                                              "leftBottom"]

    let pingalaWaterBreathingPattern:[String] =  ["leftTop",
                                                  "centerTop",
                                                  "rightTop",
                                                  "leftBottom",
                                                  "leftMiddle",
                                                  "rightMiddle",
                                                  "rightBottom"]
    
    let idaFireBreathingPattern:[String] =   ["rightBottom",
                                              "leftBottom",
                                              "rightMiddle",
                                              "leftMiddle",
                                              "rightTop",
                                              "leftTop",
                                              "centerTop"]

    let pingalaFireBreathingPattern:[String] = ["leftBottom",
                                                "rightBottom",
                                                "leftMiddle",
                                                "rightMiddle",
                                                "leftTop",
                                                "rightTop",
                                                "centerTop"]
    
    let idaAirBreathingPattern:[String] =   [ "rightTop",
                                               "rightBottom",
                                               "rightMiddle",
                                               "leftMiddle",
                                               "centerTop",
                                               "leftTop",
                                               "leftBottom"]

    let pingalaAirBreathingPattern:[String] =   [ "leftTop",
                                                  "leftBottom",
                                                  "leftMiddle",
                                                  "rightMiddle",
                                                  "centerTop",
                                                  "rightTop",
                                                  "rightBottom"]
    
    let idaEtherBreathingPattern:[String] = ["rightBottom",
                                              "rightTop",
                                              "rightMiddle",
                                              "centerTop",
                                              "leftBottom",
                                              "leftTop",
                                              "leftMiddle"]

    
    let pingalaEtherBreathingPattern:[String] = ["leftBottom",
                                                 "leftTop",
                                                 "leftMiddle",
                                                 "centerTop",
                                                 "rightBottom",
                                                 "rightTop",
                                                 "rightMiddle"]
  
    let directionBreathingPatterns: [String:Array<String>] =
      
                                                         ["Ida Earth":     idaEarthBrearthingPattern,
                                                          "Pingala Earth": pingalaEarthBrearthingPattern,
                                                          "Ida Water":     idaWaterBreathingPattern,
                                                          "Pingala Water": pingalaWaterBreathingPattern,
                                                          "Ida Fire":      idaFireBreathingPattern,
                                                          "Pingala Fire":  pingalaFireBreathingPattern,
                                                          "Ida Air":       idaAirBreathingPattern,
                                                          "Pingala Air":   pingalaAirBreathingPattern,
                                                          "Ida Ether":     idaEtherBreathingPattern,
                                                          "Pingala Ether": pingalaEtherBreathingPattern]
    
    
   
    NSLog("Breathing Pattern : \(breathingPattern)")
    

    
    for(direction,directionPattern) in directionBreathingPatterns {
    
      if (breathingPattern == directionPattern){
        
            NSLog("Found Matching breathing pattern")
            NSLog("Direction:\(direction) - Direction Pattern\(directionPattern) - Breathing pattern\(breathingPattern)")
            brearthingDirection = direction
        
      }
    }
 
    
    
    NSLog("Breathing Direction : \(brearthingDirection)")
    
    
    return brearthingDirection
  
  }
  
  
  
  /*
 
    Assumption: 
   
     - For Ida when temperatures are same; we sort keys so that keys are sorted decending (so that left and center goes to right most)
     - For Pingala when temperatures are same; we sort keys so that keys are sorted ascending (so that right and center goes to right most)
 
 
 */
  
  func getBreathingPattern(readings:Dictionary<String,Double>, activeNadi:String) -> Array<String> {
    
    var breathingPattern = [String]()
    var sensorReadings = readings
  
    sensorReadings.removeValueForKey("readingDateTime")
    
    var keySortedReturnValue =  false
    
    
    // When temperature values are same. Then Check for active nadi and then sort keys in decending order
    
    let sortedSensorReadings = sensorReadings.map { (key: $0.0, value: $0.1) }.sort {
      
                                                                  if $0.value != $1.value {
                                                                    return $0.value < $1.value
                                                                  }
                                                                  if (activeNadi == "Ida") {
                                                                    if ($0.value == $1.value){
                                                                      if ($0.key > $1.key){
                                                                        keySortedReturnValue =  true
                                                                      }else {
                                                                        keySortedReturnValue =  false
                                                                      }
                                                                    }else {
                                                                       keySortedReturnValue =  true
                                                                       }
                                                                  }else if (activeNadi == "Pingala") {
                                                                    if ($0.value == $1.value){
                                                                      if ($0.key < $1.key){
                                                                        keySortedReturnValue =  true
                                                                      }else {
                                                                        keySortedReturnValue =  false
                                                                      }
                                                                    }else {
                                                                      keySortedReturnValue =  true
                                                                    }
                                                                  }else if (activeNadi == "Sushumna") {
                                                                    if ($0.value == $1.value){
                                                                      if ($0.key < $1.key){
                                                                        keySortedReturnValue =  true
                                                                      }else {
                                                                        keySortedReturnValue =  false
                                                                      }
                                                                    }else {
                                                                      keySortedReturnValue =  true
                                                                    }
                                                                 }
      
                return keySortedReturnValue
    }
    
    
    NSLog("Sorted Sensor readings: \(sortedSensorReadings)")
    
    for(key, value) in sortedSensorReadings {
      breathingPattern.append(key)
    }
    
    return breathingPattern;
      
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
  
  
  func generateSubjectReport(subjectKey:String) {
    
    /*   Query  - start time and end time and subject key
         get Times Ida or Pingala active
         get Direction
     
     - breath and mind connection
     - Left brain and Right brain connection
     - Show ideal activities to be done for active nostrils
     - Future efforts.
     - Meditation exercises 
 
 
     
     */
    
  
  }
  
}


extension Dictionary where Value: Comparable {
  var valueSorted: [(Key, Value)] {
    return sort{ $0.1 < $1.1 }
  }
  
}

