/**
 *
 *
 * Prana iOS App
 * 
 *
 **/



var BreathBarChart = require('./App/Components/BreathBarChart');
var Report = require('./App/Components/Report');
import SubjectStore from './App/Store/SubjectStore'

import EStyleSheet from 'react-native-extended-stylesheet';
import Drawer from 'react-native-drawer'
import ControlPanel from './App/Components/ControlPanel'


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Navigator
} from 'react-native';


class iOSV1 extends React.Component {
  
 state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  


  navRenderScene = (route, navigator) => {
    switch (route.id) {
      case 'Breath Bar Chart':            
        return (<BreathBarChart navigator = {navigator} 
                                openDrawer = {this.openDrawer} 
                                closeDrawer = {this.closeDrawer} 
                                store = {SubjectStore}
                                title = "Prana - Feel your Breath!"/>);
      case 'Report':
        return (<Report navigator = {navigator}  
                        openDrawer = {this.openDrawer} 
                        closeDrawer = {this.closeDrawer} 
                        store = {SubjectStore}
                        title = "Prana Report - Know your Breath!" />);
    }
  };

  closeDrawer = () => {
    this._drawer.close()
    this.setState({drawerOpen: false})
  };
  openDrawer = () => {
    this._drawer.open()
  };


  render() {    


    return (
        
                <Drawer
                  ref={(ref) => this._drawer = ref}
                  type="displace"
                  content={
                    <ControlPanel closeDrawer = {this.closeDrawer} store = {SubjectStore} />
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
                  panOpenMask={0.2}
                  negotiatePan
                  >        


                    <Navigator
                         style={styles.container}
                         initialRoute={{id: 'Breath Bar Chart', }}
                         renderScene={this.navRenderScene} />

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
