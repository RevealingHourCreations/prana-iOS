/**
 *
 *
 * Prana iOS App
 * 
 *
 **/



var BreathBarChart = require('./App/Components/BreathBarChart');
var Report = require('./App/Components/Report');
var ContextProvider = require('./App/Components/ContextProvider');

import EStyleSheet from 'react-native-extended-stylesheet';
import Drawer from 'react-native-drawer'
import ControlPanel from './App/Components/ControlPanel'
const { observable } = require('mobx')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Navigator
} from 'react-native';



const context = {
    // An observable mobx object
    state: observable({
        activeSubject: ''
    }),
    store: {
     
        setActiveSubject(subjectKey) {
            context.state.activeSubjectKey = subjectKey;
        },
        getActiveSubject() {
            return context.state.activeSubjectKey;
        }
    }
}


class iOSV1 extends React.Component {
  
 state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  


  navRenderScene = (route, navigator) => {
    switch (route.id) {
      case 'Breath Bar Chart':            
        return (<BreathBarChart navigator={navigator} 
                                openDrawer={this.openDrawer} 
                                closeDrawer={this.closeDrawer} 
                                title="Prana - Feel your Breath!"/>);
      case 'Report':
        return (<Report navigator={navigator}  
                        openDrawer= {this.openDrawer} 
                        closeDrawer={this.closeDrawer} 
                        title="Prana Report - Know your Breath!" />);
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
            <ContextProvider context={context}>
                  <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="displace"
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
                    captureGestures={false}
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


                      <Navigator
                           style={styles.container}
                           initialRoute={{id: 'Breath Bar Chart', }}
                           renderScene={this.navRenderScene} />

                   </Drawer>  
              </ContextProvider>        
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
