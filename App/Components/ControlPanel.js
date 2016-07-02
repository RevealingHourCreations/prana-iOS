const AllSubjectsView = require('./AllSubjectsView');
const AddSubjectView = require('./AddSubjectView');
const styles = require('../styles.js')

import React, {
  Component,
  PropTypes,
  Navigator,
} from 'react-native'

var ControlPanel = React.createClass({

  navigatorRenderScene: function(route, navigator) {
    switch (route.id) {
      case 'All Subjects':            
        return (<AllSubjectsView navigator={navigator} 
                                 closeDrawer={this.props.closeDrawer} 
                                 store = {this.props.store}  
                                 title="Prana - All Subjects"/>);
      case 'New Subject':
        return (<AddSubjectView navigator={navigator} 
                               closeDrawer={this.props.closeDrawer}  
                               store = {SubjectStore} 
                               title="Prana - Add New Subject" />);
    }
  },

  render() {
    return (

           <Navigator
               style={styles.container}
               initialRoute={{id: 'All Subjects', }}
               renderScene={this.navigatorRenderScene}/>
    )
  }

});


module.exports = ControlPanel;