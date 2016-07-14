
var React  = require('react-native');
var { BarChart } = require('react-native-ios-charts');

const styles = require('../styles.js')
const constants = styles.constants;
const StatusBar = require('./StatusBar');
var Utility = require('NativeModules');

import EStyleSheet from 'react-native-extended-stylesheet';
import Drawer from 'react-native-drawer'

const AllSubjectsView = require('./AllSubjectsView');

var {

  View,
  StyleSheet,
  NativeAppEventEmitter,
  Text,
  Alert,
  TouchableHighlight,
  NativeModules,
  Image,
  Component
} = React;

var Utility = require('NativeModules');

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

class BreathBarChart extends React.Component {

    constructor(props){
         super(props);
         this.state = {
           leftNostrilData: [0],
           rightNostrilData: [0],
           activeNadi:  "",
           activeTatva:  "",
           exhalationDirection: "",
           labelsData: ["i"],
           startRecording: false,
           activeSubject: "",
           drawerOpen: false,
           drawerDisabled: false,
         }
    }


  toggleRecordingAction = () => {

    if(this.state.startRecording == true && this.props.store.activeSubject.key ){
       this.setState({
        startRecording: false
     })
      startTime = this.props.store.reportTime.startTime
      endTime = new Date() / 1000;
     this.props.store.setReportTime(startTime, endTime )

     // stop collecting data
     var subjectKey = ""
     React.NativeModules.Utility.setActiveSubject(subjectKey);

     this.props.navigator.push({id: 'Report'});

    }else if( this.state.startRecording == false  && this.props.store.activeSubject.key){
       this.setState({
          startRecording: true
       })

      startTime = new Date() / 1000;
      endTime = 0
      this.props.store.setReportTime(startTime, endTime )

      var subjectKey = this.props.store.activeSubject.key
      React.NativeModules.Utility.setActiveSubject(subjectKey);
      this.realTimeBreathReading();
   }
  }

// Function to load live data from BLE

  realTimeBreathReading = () => {
     this.getChartData()
     this.getBreathReadings()

  }

  // Get processed breath readings and show them on Chart.

  getChartData = () => {

      subscription = NativeAppEventEmitter.addListener(
                     'getBreathChartData',
                       (breathData) => {

                      leftNostrilData = this.state.leftNostrilData
                      rightNostrilData = this.state.rightNostrilData
                      labelsData = this.state.labelsData

                     leftNostrilData.push(parseInt(breathData.leftNostril))
                     rightNostrilData.push(parseInt(breathData.rightNostril))

                     var d = new Date(0);
                     d.setUTCSeconds(parseInt(breathData.readingDateTime),
                                              breathData.readingDateTime%1)

                     //console.log("readingDateTime")
                     //console.log(d)
                     labelsData.push(String(d))

                      // Give some time for chart loading
                      sleepFor(100)

                       if(this.state.startRecording == true){

                            this.setState({
                                         leftNostrilData:     leftNostrilData ,
                                         rightNostrilData:    rightNostrilData,
                                         activeNadi:          breathData.activeNadi,
                                         activeTatva:         breathData.activeTatva,
                                         exhalationDirection: breathData.exhalationDirection,
                                         labelsData:          labelsData,
                                        })
                        }

       })
  }


// Get RAW breath readings and save them on Firebase

  getBreathReadings = () => {

    subscription = NativeAppEventEmitter.addListener(
                   'getBreathReadings',
                     (breathData) => {

                       if(this.state.startRecording == true){
                          this.saveRawBreathReadings(breathData)
                        }

                  })

  }

   saveRawBreathReadings = (breathData) => {

     this.props.databaseRef.ref('/BreathReadings/' ).push({
           subjectKey          : this.props.store.activeSubject.key,
           readingDateTime     : breathData.readingDateTime,
           leftTop             : breathData.leftTop,
           centerTop           : breathData.centerTop,
           rightTop            : breathData.rightTop,
           leftBottom          : breathData.leftBottom,
           leftMiddle          : breathData.leftMiddle,
           rightMiddle         : breathData.rightMiddle,
           rightBottom         : breathData.rightBottom,
           activeNadi          : breathData.activeNadi,
           exhalationDirection : breathData.exhalationDirection,
           activeTatva         : breathData.activeTatva
     })

   }

  _renderBreathChart = () => {
     this.props.navigator.pop();
  }

   componentWillUnmount = () => {
    //  subscription.remove();
   }

  render = () => {
    const config = {
      dataSets: [{
        values: this.state.leftNostrilData,
        drawValues: false,
        colors: ['rgb(50,205,50)'],
        label: 'Left Nostril'

      }, {
        values: this.state.rightNostrilData,
        drawValues: false,
        colors: ['rgb(255,127,80)'],
        label: 'Right Nostril'
      }],
      backgroundColor: 'transparent',
      labels: this.state.labelsData,
      setDescription: "Chart shows Temperature of Exaled air.",
      setTouchEnabled: true,
      setScaleEnabled: true,
      setPinchZoom: true,
      setGranularityEnabled: true,
      setGranularity: 10.0,
    legend: {
        textSize: 12,
        setWordWrapEnabled: true
      },
      xAxis: {
        axisLineWidth: 0,
        drawLabels: false,
        position: 'bottom',
        drawGridLines:  false,

      },
      leftAxis: {
        labelCount: 11,
        drawGridLines: true,
        setAxisMinValue: 30,
        setAxisMaxValue: 50,
        spaceTop: 0.18
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        maximumDecimalPlaces: 1
      }
    };

      if(this.state.startRecording == true){
          recordingText = "Stop Recording & show report."
      }else if(this.props.store.activeSubject.key){
         recordingText = "Start Recording."
      }


  return (
    <View style={styles.container}>

           <View style={styles.navbar}>
                      <TouchableHighlight
                        underlayColor={'#FFFF'}
                        onPress={ this._renderBreathChart}>

                           <Text style={styles.backButton}>
                              <Image
                                style={styles.icon}
                                source={require('../Images/back.png')}/>
                            </Text>
                      </TouchableHighlight>
                      <Text style={styles.navbarTitle}> Prana - Feel your Breath! </Text>
            </View>



            <BarChart config={config} style={styles.chart}/>

              <Text style={styles.titleText} >
                  Active Nadi: <Text style={styles.nadiTitle}>  {this.state.activeNadi + '\n'} </Text>
              </Text>

              <TouchableHighlight style={styles.action}
                                  onPress={this.toggleRecordingAction}
                                  underlayColor='#99d9f4'>
                <Text style={styles.actionText}> {recordingText}</Text>
              </TouchableHighlight>


       </View>
  );
  }
};


module.exports = BreathBarChart;
