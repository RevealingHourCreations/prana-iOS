/**
 * Prana iOS App
 * 
 */

var Dashboard = require('./App/Components/Dashboard');


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';


function updateBreathData(){};

class iOSV1 extends React.Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.container}

      initialRoute = {{
        title: 'Prana - Feel your Breath!',
        component: Dashboard
        
      }} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});



AppRegistry.registerComponent('iOSV1', () => iOSV1);
