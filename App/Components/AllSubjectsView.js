var React = require('react-native');

const ActionButton = require('./ActionButton');
const AddSubjectView = require('./AddSubjectView');
const styles = require('../styles.js')
const StatusBar = require('./StatusBar');
const constants = styles.constants;


var {

  View,
  StyleSheet,
  TouchableHighlight,
  Text
} = React;



var AllSubjectsView = React.createClass({

	_handlePress() {
    this.props.navigator.push({id: 2,});
  },

  render() {
    return (
      
       <View style={styles.container}>

            <StatusBar title="Prana - Subjects" />   

             <View style={styles.action}>
                  <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this._handlePress}>
                       <Text style={styles.actionText}>Add New Subject</Text>
                  </TouchableHighlight>
          </View>       

           
            
       </View>
    );
  }
});

module.exports = AllSubjectsView;
