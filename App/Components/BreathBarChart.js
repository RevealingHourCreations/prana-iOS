
var React  = require('react-native');
var { BarChart } = require('react-native-ios-charts');

const styles = require('../styles.js')
const constants = styles.constants;
const StatusBar = require('./StatusBar');
var Utility = require('NativeModules');

var {
   
  View,
  StyleSheet,
  NativeAppEventEmitter,
  Text,
  Alert,
  TouchableHighlight,
  Image
} = React;


function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

var BreathBarChart = React.createClass({

  getInitialState: function () {
      
        return{
          leftNostrilData: [0],
          rightNostrilData: [0],
          activeNadi:  "",
          activeTatva:  "",
          exhalationDirection: "",
          labelsData: ["i"],
          startRecording: false
       };


    
  },

  toggleRecordingAction: function(){

    if(this.state.startRecording == true){
       this.setState({
        startRecording: false
     })  
     this.props.navigator.push({id: 'Report'});

    }else{
     this.setState({
        startRecording: true
     })

    this.realTimeBreathReading();  

  // Added for testing remove
     this.setState({

          leftNostrilData: [30],
          rightNostrilData: [30],
          activeNadi:  "",
          activeTatva:  "",
          exhalationDirection: "",
          labelsData: ["i"],
      })
     
   }
  },

// Function to load live data from BLE

  realTimeBreathReading: function(){ 


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
                               d.setUTCSeconds(parseInt(breathData.readingDateTime),breathData.readingDateTime%1)

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

      
  },

  componentDidMount: function() {
    
  },

   componentWillUnmount: function(){
      subscription.remove();
   },

  render() {
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
      }else{
         recordingText = "Start Recording."
      }
      
    return (
      <View style={styles.container}>
       <View style={styles.statusBar}>
                  <TouchableHighlight
                    underlayColor={'#FFFF'}
                    onPress={this.props.openDrawer}>
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
         
            <TouchableHighlight style={styles.button} onPress={this.toggleRecordingAction} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}> {recordingText}</Text>
            </TouchableHighlight>
       
      </View>
    );
  }
});


module.exports = BreathBarChart;
