
var React  = require('react-native');
var { BarChart } = require('react-native-ios-charts');


var {
   
  View,
  StyleSheet,
  NativeAppEventEmitter
} = React;



// Demand in the auto-generated JavaScript class for our ObjC class
var {
    
    Utility
} = require('NativeModules');



function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}


var AllSensorsBarChart = React.createClass({


// Function to load live data from BLE

  realTimeBreathReading: function(){ 


// Event Listener receving live breath data 

     subscription = NativeAppEventEmitter.addListener(
                       'getLiveBreathReadings',
                         (liveReading) => {

                                leftTopData = this.state.leftTop
                                centerTopData = this.state.centerTop
                                rightTopData = this.state.rightTop
                                leftBottomData = this.state.leftBottom
                                leftMiddleData = this.state.leftMiddle
                                rightMiddleData = this.state.rightMiddle
                                rightBottomData = this.state.rightBottom

                                labelsData = this.state.labelsData

                               leftTopData.push(parseInt(liveReading.leftTop))
                               centerTopData.push(parseInt(liveReading.centerTop))
                               rightTopData.push(parseInt(liveReading.rightTop))
                               leftBottomData.push(parseInt(liveReading.leftBottom))
                               leftMiddleData.push(parseInt(liveReading.leftMiddle))
                               rightMiddleData.push(parseInt(liveReading.rightMiddle))
                               rightBottomData.push(parseInt(liveReading.rightBottom))

                               labelsData.push("i")
                                
                                sleepFor(2000)

                                this.setState({
                                               leftTop: leftTopData ,
                                               centerTop: centerTopData,  
                                               rightTop: rightTopData,
                                               leftBottom: leftBottomData,
                                               leftMiddle: leftMiddleData,
                                               rightMiddle: rightMiddleData,
                                               rightBottomD: rightBottomData,
                                               labelsData: labelsData      
                                              })

         })

      
  },

  getInitialState: function () {
      
        return{
          leftTop: [30],
          centerTop: [30],
          rightTop: [30],
          leftBottom: [30],
          leftMiddle: [30],
          rightMiddle: [30],
          rightBottom: [30],          
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
        values: this.state.leftTop,
        drawValues: false,
        colors: ['rgb(76, 0, 153)'],
        label: 'Left Top'
      }, {
        values: this.state.centerTop,
        drawValues: false,
        colors: ['rgb(75,0,130)'],
        label: 'Center'
      }
      , {
        values: this.state.rightTop,
        drawValues: false,
        colors: ['rgb(0,0,255)'],
        label: 'Right Top'
      }, {
        values: this.state.leftBottom,
        drawValues: false,
        colors: ['rgb(0,128,0)'],
        label: 'Left Bottom'
      }, {
        values: this.state.leftMiddle,
        drawValues: false,
        colors: ['rgb(255,255,0)'],
        label: 'Left Middle'
      }, {
        values: this.state.rightMiddle,
        drawValues: false,
        colors: ['rgb(255,165,0)'],
        label: 'Right Middle'
      }, {
        values: this.state.rightBottom,
        drawValues: false,
        colors: ['rgb(255,0,0)'],
        label: 'Right Bottom'
      }],
      backgroundColor: 'transparent',
      labels: this.state.labelsData,

      noDataText: "Please check device sensors!"
      setDescription: "Chart shows Temperature of Exaled air.",
      setTouchEnabled: true,  
      setScaleEnabled: true,
      setPinchZoom: true,
      setGranularityEnabled: true,
      setGranularity: 10.0,
    legend: {
        textSize: 9.5,
        wordWrap: true,        
      },
      xAxis: {
        axisLineWidth: 0,
        drawLabels: false,
        position: 'bottom',
        drawGridLines:  false
      },
      leftAxis: {
        labelCount: 11,
        drawGridLines: true,
        setSpaceTop: 5,
        setPosition: "OUTSIDE_CHART"
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
    justifyContent: 'center'
  },
});

module.exports = AllSensorsBarChart;
