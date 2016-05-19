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
  
}





