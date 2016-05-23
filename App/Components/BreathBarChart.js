
var React  = require('react-native');
var { BarChart } = require('react-native-ios-charts');

var {
   
  View,
  StyleSheet,
  NativeAppEventEmitter,
  Text
} = React;

// Import Swift Class which is exported to ReactNative.
// Demand in the auto-generated JavaScript class for our Swift class

var {
    
    Utility
} = require('NativeModules');



function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}


var BreathBarChart = React.createClass({


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

                               labelsData.push("i")
                                
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



  getInitialState: function () {
      
        return{
          leftNostrilData: [30],
          rightNostrilData: [30],
          activeNadi:  "",
          activeTatva:  "",
          exhalationDirection: "",
          labelsData: ["i"]
       };


    
  },

  componentDidMount: function() {
     this.realTimeBreathReading();   
  },

   componentWillUnmount: function(){
      subscription.remove();
   },

  render() {
    const config = {
      dataSets: [{
        values: this.state.leftNostrilData,
        drawValues: false,
        colors: ['rgb(0,128,0)'],
        label: 'Left Nostril'
       
      }, {
        values: this.state.rightNostrilData,
        drawValues: false,
        colors: ['rgb(255,165,0)'],
        label: 'Right Nostril'
      }],
      backgroundColor: 'transparent',
      labels: this.state.labelsData,
     // minOffset: 20,
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
   
    return (
      
      <View style={styles.container}>
        <BarChart config={config} style={styles.chart}/>
        <Text style={styles.baseText}>
            <Text style={styles.titleText} >
                Active Nadi: {this.state.activeNadi + '\n\n'}
           </Text> 
       </Text>
      </View>
    );
  }
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  chart: {
    flex: 1
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});



module.exports = BreathBarChart;
