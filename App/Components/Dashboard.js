var React = require('react-native');
var BreathChart = require('./BreathChart');
var AllSensorsChart = require('./AllSensorsChart');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component{
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }
  goToAllSensorsChart(){
    this.props.navigator.push({
      component: AllSensorsChart,
      title: 'All Sensors Chart',
      onLeftButtonPress: () => this.props.navigator.popToTop()
    })
  }
  
  goToBreathChart(){
    this.props.navigator.push({
      component: BreathChart,
      title: 'Breath Chart',
      onLeftButtonPress: () => this.props.navigator.popToTop()
    })
  }
  
  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToAllSensorsChart.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>All sensors chart</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToBreathChart.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>Live Breath (Line Chart)</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Dashboard;