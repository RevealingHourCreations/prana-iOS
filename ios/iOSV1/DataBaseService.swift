//
//  DataBaseService.swift
//  iOSV1
//
//  Created by Atul Veer on 13/06/16.
//  Copyright © 2016 Facebook. All rights reserved.
//


import Foundation
import Firebase

class DataBaseService: NSObject {
  
    // [START create_database_reference]
  var ref = FIRDatabase.database().reference()
  // [END create_database_reference]
  
  var refHandle: FIRDatabaseHandle?
  var subjectRef: FIRDatabaseReference!
  
  func storeBreathReadings(readings:Dictionary<String,Double>,
                           activeSubjectKey: String,
                           activeNadi:String,
                           exhalationDirection:String,
                           activeTatva:String){
  
  
    
  
    
    let key = ref.child("BreathReadings").childByAutoId().key
    NSLog("key:\(key)")
    
    let breathReading = ["subjectKey": activeSubjectKey,
                         "readingDateTime": readings["readingDateTime"]!,
                         "leftTop":  readings["leftTop"]!,
                         "centerTop":  readings["centerTop"]!,
                         "rightTop":  readings["rightTop"]!,
                         "leftBottom":  readings["leftBottom"]!,
                         "leftMiddle":  readings["leftMiddle"]!,
                         "rightMiddle":  readings["rightMiddle"]!,
                         "rightBottom":  readings["rightBottom"]!,
                         "activeNadi":  activeNadi,
                         "exhalationDirection": exhalationDirection,
                         "activeTatva":  activeTatva
      
    ]
    let childUpdates = ["/BreathReadings/\(key)": breathReading]
    NSLog("childUpdates:\(childUpdates)")
    ref.updateChildValues(childUpdates)
  }
  
  
  func addNewSubject(readings:NSDictionary,uid:String){
    
   let key = ref.child("Subjects").childByAutoId().key
    NSLog("key:\(key)")

    
    let subjectData =    [
                         "firstName" : readings["firstName"]!,
                         "lastName"  :  readings["lastName"]!,
                         "age"       :  readings["age"]!,
                         "dailyExercise":  readings["dailyExercise"]!,
                         "sedataryLifeStyle":  readings["sedataryLifeStyle"]!,
                         "regularMeals":  readings["regularMeals"]!,
                         "drinking":  readings["drinking"]!,
                         "smoking":  readings["smoking"]!,
                         "avgSleepingTIme":  readings["avgSleepingTIme"]!,
                         "avgWakeupTIme":  readings["avgWakeupTIme"]!,
                         "eatNonveg":  readings["eatNonveg"]!,
                         "enoughSleep":  readings["enoughSleep"]!,
                         "meditateRegulary":  readings["meditateRegulary"]!,
                         "hypertension":  readings["hypertension"]!,
                         "diabetes":  readings["diabetes"]!,
                         "uid":      uid
                        ]
    
    let childUpdates = ["/Subjects/\(key)": subjectData]
    NSLog("childUpdates:\(childUpdates)")
    ref.updateChildValues(childUpdates)
  }
 
  
  func getSubjects() -> (NSDictionary){
      let postKey = ""
      let postDict = NSDictionary()
      subjectRef = ref.child("posts").child(postKey)
    
    // [START post_value_event_listener]
    refHandle = subjectRef.observeEventType(FIRDataEventType.Value, withBlock: { (snapshot) in
      let postDict = snapshot.value as! NSDictionary
      NSLog("Subjects \(postDict)")
     
    })
     return postDict;
    // [END post_value_event_listener]
  }
  
}
