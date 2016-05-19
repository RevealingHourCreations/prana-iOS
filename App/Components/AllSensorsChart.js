
var React  = require('react-native');
var { LineChart } = require('react-native-ios-charts');


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


var AllSensorsChart = React.createClass({


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
                                
                                sleepFor(2500)

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
          centerTop: [32],
          rightTop: [34],
          leftBottom: [31],
          leftMiddle: [33],
          rightMiddle: [35],
          rightBottom: [36],          
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
        drawValues: true,
        colors: ['rgb(76, 0, 153)'],
        label: 'Left Top',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }, {
        values: this.state.centerTop,
        drawValues: true,
        colors: ['rgb(75,0,130)'],
        label: 'Center',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }

      , {
        values: this.state.rightTop,
        drawValues: true,
        colors: ['rgb(0,0,255)'],
        label: 'Right Top',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }, {
        values: this.state.leftBottom,
        drawValues: true,
        colors: ['rgb(0,128,0)'],
        label: 'Left Bottom',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }, {
        values: this.state.leftMiddle,
        drawValues: true,
        colors: ['rgb(255,255,0)'],
        label: 'Left Middle',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }, {
        values: this.state.rightMiddle,
        drawValues: true,
        colors: ['rgb(255,165,0)'],
        label: 'Right Middle',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
      }, {
        values: this.state.rightBottom,
        drawValues: true,
        colors: ['rgb(255,0,0)'],
        label: 'Right Bottom',
        drawCubic: true,
        drawCircles: false,
        lineWidth: 2
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
        drawGridLines:  false
      },
      leftAxis: {
        labelCount: 11,
        drawGridLines: true,
        setAxisMinValue: 30,
        setAxisMaxValue: 50,
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
        <LineChart config={config} style={styles.chart}/>
      </View>
    );
  }
});




var styles = StyleSheet.create({
  chart: {
    width: 400,
    height: 400,
    padding: 10
  }
})

module.exports = AllSensorsChart;
