const AllSubjectsView = require('./AllSubjectsView');
const AddSubjectView = require('./AddSubjectView');
const styles = require('../styles.js')

import React, {
  Component,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListView,
  Navigator,
  NativeModules
} from 'react-native'

var ControlPanel = React.createClass({

  navigatorRenderScene: function(route, navigator) {
    switch (route.id) {
      case 1:            
        return (<AllSubjectsView navigator={navigator} closeDrawer={this.props.closeDrawer}   title="Prana - All Subjects"/>);
      case 2:
        return (<AddSubjectView navigator={navigator} closeDrawer={this.props.closeDrawer}  title="Prana - Add New Subject" />);
    }

  },

  render() {
    return (

           <Navigator
               style={styles.container}
               initialRoute={{id: 1, }}
               renderScene={this.navigatorRenderScene}/>
    )
  }

});


module.exports = ControlPanel;