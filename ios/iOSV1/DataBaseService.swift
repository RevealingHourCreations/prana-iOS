//
//  DataBaseService.swift
//  iOSV1
//
//  Created by Atul Veer on 13/06/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

/*

import Foundation
import Firebase

class DataBaseService: NSObject {
  
  var ref = FIRDatabase.database().reference()

  func storeBreathReadings(readings:Dictionary<String,Double>,
                         activeNadi:String,
                         exhalationDirection:String,
                         activeTatva:String){
  
    // [START create_database_reference]
    self.ref = FIRDatabase.database().reference()
    // [END create_database_reference]
    
    FIRAuth.auth()?.signInAnonymouslyWithCompletion() { (user, error) in
      /* let isAnonymous = user!.anonymous  // true
       let uid = user!.uid
       NSLog("User id:\(uid)")
       NSLog("Is Anonymous:\(isAnonymous)")*/
    }
    
    let key = ref.child("BreathReadings").childByAutoId().key
    NSLog("key:\(key)")
    
    let breathReading = ["uid": 1,
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
  
  func addData(){
  
  
  }

  func updateData(){
    
    
  }
  
  func deleteData(){
    
    
  }
  
  func queryData(){
  
  
  }

}
 */