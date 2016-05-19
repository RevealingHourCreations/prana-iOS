//
//  Utility.swift
//  WattUp
//
//  Created by Atul Veer on 01/06/15.
//  Copyright (c) 2015 RHC. All rights reserved.
//

import Foundation
import UIKit
import RealmSwift




class Utility{
  
  
  func getBytesArray(data:NSData!) -> [UInt8]{
    
    let count = data.length / sizeof(UInt8)
    // create array of appropriate length:
    var array = [UInt8](count: count, repeatedValue: 0)
    // copy bytes into array
    data.getBytes(&array, length:count * sizeof(UInt8))
    
    return array
  }
  
  
  
  func loadSampleBreathReadingsinRealm() {
    print("Inside LoadSample Breath Readings ------------")
    let realm = try! Realm(fileURL: NSURL(fileURLWithPath: "/Users/atulveer/Desktop/TestRealm.realm"))
    //let realm = try! Realm();
    
    for i in 0...1000 {
      let reading = BreathReadings()
      
      reading.id = i
      reading.c = randomInt(30, max: 40);
      reading.lb = randomInt(30, max: 40);
      reading.rb = randomInt(30, max:40);
      reading.lm = randomInt(30, max:40);
      reading.rm = randomInt(30, max:40);
      reading.lt = randomInt(30, max:40);
      reading.rt = randomInt(30, max:40);
      
      try! realm.write {
        realm.add(reading)
      }
      
    }
  }
  
  func randomInt(min: Int, max:Int) -> Int {
    return min + Int(arc4random_uniform(UInt32(max - min + 1)))
  }


  /*  func createByteArrayForSetTxInfo(txName :String ,zoneName :String) -> NSData{
   let data:NSData!;
   return data!
   }
   
   func pad(string : String, toSize: Int) -> String {
   var padded = string
   for i in 0..<toSize - count(string) {
   padded = "0" + padded
   }
   return padded
   }
   
   
   func getBinaryArray(response :[UInt8]) -> [Int] {
   let lsb = Array(pad(String(response[0], radix: 2), toSize: 8)).map{String($0).toInt()!}
   let middleBits = Array(pad(String(response[1], radix: 2), toSize: 8)).map{String($0).toInt()!}
   let msb = Array(pad(String(response[2], radix: 2), toSize: 8)).map{String($0).toInt()!}
   return (msb + middleBits + lsb).reverse()
   }
   
   
   
   func createByteArrayForSchedule(schedulesArray:[[Int]]) -> [UInt8]{
   var byteArray = [UInt8]()
   for(var i = 0; i<schedulesArray.count ; i++){
   let dayArray = schedulesArray[i].reverse()
   
   let msbArray = Array(dayArray[0...7])
   var msbString = ""
   for value in msbArray{
   msbString += String(value)
   }
   var numberMsb = strtoul(msbString, nil, 2)
   let msbHex = String(strtoul(msbString, nil, 2),radix:16)
   println("msb bit is \(msbHex)")
   
   let bitsArray = Array(dayArray[8...15])
   var bitString = ""
   for value in bitsArray{
   bitString += String(value)
   }
   var numberBit = strtoul(bitString, nil, 2)
   var bitHex = String(strtoul(bitString, nil, 2),radix:16)
   println("middle bit is \(bitHex)")
   
   let lsbArray = Array(dayArray[16...23])
   var lsbString = ""
   for value in lsbArray{
   lsbString += String(value)
   }
   var numberLsb = strtoul(lsbString, nil, 2)
   var lsbHex = String(strtoul(lsbString, nil, 2),radix:16)
   println("lsb is \(lsbHex)")
   
   
   byteArray.append(UInt8(strtoul(lsbHex, nil, 16)))
   byteArray.append(UInt8(strtoul(bitHex, nil, 16)))
   byteArray.append(UInt8(strtoul(msbHex, nil, 16)))
   
   println(byteArray);
   
   }
   return byteArray;
   }*/
}