/**
 * Prana iOS App
 * 
 */

//var BreathChart = require('./App/Components/BreathChart');

var BreathBarChart = require('./App/Components/BreathBarChart');

// app.js
import EStyleSheet from 'react-native-extended-stylesheet';



//var AllSensorsBreathBarChart = require('./App/Components/AllSensorsBarChart');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import Drawer from 'react-native-drawer'
import ControlPanel from './App/Components/ControlPanel'



class iOSV1 extends React.Component {
  
 state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="static"
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        acceptDoubleTap={true}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        captureGestures={true}
        tweenDuration={80}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 3
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        negotiatePan
        >        

           <NavigatorIOS
            style={styles.container}

            initialRoute = {{
              title: 'Prana - Feel your Breath!',
              component: BreathBarChart
            }} />

       </Drawer>     
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

// calculate styles
EStyleSheet.build();

module.exports = iOSV1;

AppRegistry.registerComponent('iOSV1', () => iOSV1);
