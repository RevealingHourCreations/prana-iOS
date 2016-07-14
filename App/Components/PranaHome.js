/**
 *
 *
 * Prana iOS App
 *
 *
 **/


var BreathBarChart = require('./BreathBarChart');
var Report = require('./Report');
import PranaStore from '../Store/PranaStore'
import EStyleSheet from 'react-native-extended-stylesheet';
import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel'


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Navigator
} from 'react-native';


class PranaHome extends React.Component {

  constructor(props) {
    super(props);
    this.databaseRef = this.props.databaseRef;
  }


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
                                databaseRef = {this.databaseRef}
                                store = {PranaStore}
                                title = "Prana - Feel your Breath!"/>);
      case 'Report':
        return (<Report navigator = {navigator}
                        openDrawer = {this.openDrawer}
                        closeDrawer = {this.closeDrawer}
                        store = {PranaStore}
                        databaseRef = {this.databaseRef}
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
                    <ControlPanel closeDrawer = {this.closeDrawer}
                                  databaseRef = {this.databaseRef}
                                  store = {PranaStore} />
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

module.exports = PranaHome;

AppRegistry.registerComponent('PranaHome', () => PranaHome);
