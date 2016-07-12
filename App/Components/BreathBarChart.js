
var React  = require('react-native');
var { BarChart } = require('react-native-ios-charts');

const styles = require('../styles.js')
const constants = styles.constants;
const StatusBar = require('./StatusBar');
var Utility = require('NativeModules');

import EStyleSheet from 'react-native-extended-stylesheet';
import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel'

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


  closeDrawer = () => {
    this._drawer.close()
    this.setState({drawerOpen: false})
  }
  openDrawer = () => {
    this._drawer.open()
  };


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

  // Added for testing to simulate BLE data input remove
     /*
     this.setState({
          leftNostrilData: [30],
          rightNostrilData: [30],
          activeNadi:  "",
          activeTatva:  "",
          exhalationDirection: "",
          labelsData: ["i"],
      })*/

   }
  }

// Function to load live data from BLE

  realTimeBreathReading = () => {


// Event Listener receving live breath data

     subscription = NativeAppEventEmitter.addListener(
                       'getBreathData',
                         (breathData) => {

                                //console.log("avgReading")
                                //console.log(breathData.leftNostril)
                                //console.log(breathData.rightNostril)

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

                                this.setState({
                                               leftNostrilData:     leftNostrilData ,
                                               rightNostrilData:    rightNostrilData,
                                               activeNadi:          breathData.activeNadi,
                                               activeTatva:         breathData.activeTatva,
                                               exhalationDirection: breathData.exhalationDirection,
                                               labelsData:          labelsData,
                                              })
 

         })


  }

  componentDidMount = () => {
    console.log("Mounted BreathBarChart")
  }

   componentWillUnmount = () => {
      subscription.remove();
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
      }else if(!(this.props.store.activeSubject.key)){
         recordingText = "Slide Right to Choose Subject."
      }

    return (


  <View style={styles.container}>
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="displace"
        content={
          <ControlPanel closeDrawer = {this.closeDrawer}
                        databaseRef = {this.props.databaseRef}
                        store = {this.props.store} />
        }
        acceptDoubleTap = {true}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        captureGestures = {false}
        tweenDuration = {80}
        panThreshold = {0.08}
        disabled = {this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 3
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.0}
        negotiatePan
        >


           <View style={styles.statusBar}>
                      <TouchableHighlight
                        underlayColor={'#FFFF'}
                        onPress={this.openDrawer}>
                           <Text style={styles.backButton}>
                              <Image
                                style={styles.icon}
                                source={require('../Images/menu-bars.png')}/>
                            </Text>
                      </TouchableHighlight>
                      <Text style={styles.statusBarTitle}> Prana - Feel your Breath! </Text>
            </View>


            <BarChart config={config} style={styles.chart}/>

              <Text style={styles.titleText} >
                  Active Nadi: <Text style={styles.nadiTitle}>  {this.state.activeNadi + '\n'} </Text>
              </Text>

              <TouchableHighlight style={styles.button}
                                  onPress={this.toggleRecordingAction}
                                  underlayColor='#99d9f4'>
                <Text style={styles.buttonText}> {recordingText}</Text>
              </TouchableHighlight>

       </Drawer>
   </View>
    );
  }
};


module.exports = BreathBarChart;
