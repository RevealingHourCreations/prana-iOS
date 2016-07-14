
const React = require('react-native');
const ESStyles = require('../ESStyles.js')
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet,
        Text,
        View,
        TouchableHighlight,
        Image,
        ScrollView} = React;

import Communications from 'react-native-communications';
import {observer} from 'mobx-react/native'

//@observer
class Report extends React.Component {


  constructor(props){
    super(props)
    this.getSubjects()

    this.state = {
        subjectName: "",
        reportStartTime: "",
        reportEndTime: "",
        reportDuration: "",
        leftNostrilCount: "",
        rightNostrilCount: "",
        activeNadi: ""
     }

  }

  getSubjects() {

    var subjectKey =  this.props.store.activeSubject.key;
    var databaseRef = this.props.databaseRef
    var breathReadings = [];
    var thisRef = this
    var startTime = this.props.store.reportTime.startTime
    var endTime = this.props.store.reportTime.endTime
    console.log("Start end endTime ")
    console.log(startTime)
    console.log(endTime)
    //subjectKey = "-KKiXfayfFEiM5eANhTT"
    //startTime = 1466832596.267107
    //endTime =   1466832631.358009 //1466832634.433123
    databaseRef.ref("BreathReadings").orderByChild("readingDateTime")
                                     .startAt(startTime)
                                     .endAt(endTime)
                                     .on('value', function(snapshot) {
                                               snapshot.forEach((child) => {
                                                if(subjectKey == child.val().subjectKey){
                                                   breathReadings.push({
                                                      activeNadi: child.val().activeNadi,
                                                      activeTatva: child.val().activeTatva,
                                                      exhalationDirection: child.val().exhalationDirection,
                                                      leftTop: child.val().leftTop,
                                                      centerTop: child.val().centerTop,
                                                      rightTop: child.val().rightTop,
                                                      leftBottom: child.val().leftBottom,
                                                      leftMiddle: child.val().leftMiddle,
                                                      rightMiddle: child.val().rightMiddle,
                                                      rightBottom: child.val().rightBottom,
                                                      readingDateTime: child.val().readingDateTime,
                                                      subjectKey: child.val().subjectKey,
                                                      key: child.key
                                                   });
                                                  }
                                              });
                                            thisRef.generateReport(breathReadings,startTime,endTime)

                         });
   }

 generateReport(breathReadings,startTime,endTime){

      var reportTimeData = this.getReportDuration(startTime,endTime)
      reportStartTime = reportTimeData[0]
      reportEndTime = reportTimeData[1]
      reportDuration = reportTimeData[2]

      reportData = this.processBreathReadings(breathReadings)
      leftNostrilCount = reportData[0]
      rightNostrilCount = reportData[1]
      activeNadi = reportData[2]

      this.setState({
          subjectName: this.props.store.activeSubject.fullName,
          reportStartTime: reportStartTime,
          reportEndTime: reportEndTime,
          reportDuration: reportDuration,
          leftNostrilCount: leftNostrilCount,
          rightNostrilCount: rightNostrilCount,
          activeNadi: activeNadi
      })
  }

  getReportDuration(startTime,endTime){
     var reportStartTime = new Date(0);
     reportStartTime.setUTCSeconds(startTime);

     var reportEndTime = new Date(0);
     reportEndTime.setUTCSeconds(endTime);

     var duration = Math.abs(reportEndTime.getTime() - reportStartTime.getTime());
     var diffMins = Math.ceil(duration / (1000 * 60));

     return [reportStartTime,reportEndTime,diffMins]
  }

  processBreathReadings (breathReadings){
   var leftNostrilCount = 0
   var rightNostrilCount = 0
   var activeNadi = ""

   for(var i = 0; i< breathReadings.length; i++){

     if (breathReadings[i].activeNadi == "Ida"){
        leftNostrilCount += 1
     }else if(breathReadings[i].activeNadi == "Pingala")
       rightNostrilCount += 1
    }

    if(leftNostrilCount >= rightNostrilCount){
         activeNadi = "Ida"
    }else {
        activeNadi = "Pingala"
    }
      return [leftNostrilCount,rightNostrilCount, activeNadi]
  }

  emailReport = () => {
    subjectBody = "Prana Report for: " + this.state.subjectName.toString()

    reportBody = "<b>Report For:" + this.state.subjectName.toString() + "<br /></b>"
    reportBody = reportBody += "From : " + this.state.reportStartTime.toString() + "<br />"
    reportBody = reportBody += "To : " + this.state.reportEndTime.toString() + "<br />"
    reportBody = reportBody += "Duration : " + this.state.reportDuration.toString() + " mins.<br />"
    reportBody = reportBody += "Left Nostril Count : " + this.state.leftNostrilCount.toString() + "<br />"
    reportBody = reportBody += "Right Nostril Count : " + this.state.rightNostrilCount.toString() + "<br />"
    reportBody = reportBody += "Active Nadi : " + this.state.activeNadi.toString() + "<br />"

    console.log(reportBody)
    Communications.email(null,null,["atul@revelealinghour.in"],subjectBody,reportBody)
    //alert('Emailing report')
  }

  _renderBreathChart = () => {
     this.props.navigator.pop();
  }

  render = () => {
    return (
      <View style={styles.container}>

          <View style={styles.navbar}>
              <TouchableHighlight underlayColor={'#FFFF'}  onPress = { this._renderBreathChart}>
                    <Text style={styles.backButton}>
                        <Image
                          style={styles.icon}
                          source={require('../Images/back.png')}/>
                    </Text>
              </TouchableHighlight>
                  <Text style={styles.navbarTitle}>Report of {this.state.subjectName} </Text>
        </View>


         <ScrollView
            automaticallyAdjustContentInsets={true}
            rejectResponderTermination={false}
            style={ESStyles.scrollView}>

              <Text style={styles.titleText}> From:
                  <Text style={styles.normalText}>{this.state.reportStartTime.toString()}</Text>
              </Text>

              <Text style={styles.titleText}> To:
                   <Text style={styles.normalText}>{this.state.reportEndTime.toString()}</Text>
              </Text>

              <Text style={styles.titleText}> Duration:
                  <Text style={styles.normalText}>{this.state.reportDuration.toString()} mins. </Text>
              </Text>

              <Text style={styles.titleText}> Left Nostril Count:
                  <Text style={styles.normalText}>{this.state.leftNostrilCount.toString()}</Text>
              </Text>

              <Text style={styles.titleText}> Right Nostril Count:
                  <Text style={styles.normalText}>{this.state.rightNostrilCount.toString()}</Text>
               </Text>

              <Text style={styles.titleText}> Active Nadi:
                     <Text style={styles.normalText}> {this.state.activeNadi.toString()} </Text>
              </Text>

              <TouchableHighlight style={styles.action} onPress={this.emailReport} underlayColor='#99d9f4'>
                <Text style={styles.actionText}>Email Report </Text>
              </TouchableHighlight>

        </ScrollView>

      </View>
    );
  }
}

module.exports = Report;
