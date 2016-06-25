
const StatusBar = require('./StatusBar');

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native'

// For sending data to Native Apps.
// Utility is Exported Module from Native App. Its defined in Utility.swft

var Utility = require('NativeModules');

var t = require('tcomb-form-native');

var Form = t.form.Form;

// User Model
var User = t.struct({
  firstName: t.String,             
  lastName: t.String,  
  age: t.Number,
  dailyExercise: t.Boolean,
  sedataryLifeStyle: t.Boolean,
  smoking: t.Boolean,
  drinking: t.Boolean,
  enoughSleep: t.Boolean,
  avgWakeupTIme: t.Number,
  avgSleepingTIme: t.Number,
  meditateRegulary: t.Boolean,
  eatNonveg: t.Boolean,
  regularMeals: t.Boolean,
  hypertension: t.Boolean,
  diabetes: t.Boolean

});

var options = {}; 


var AddSubjectView = React.createClass({

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null    
      React.NativeModules.Utility.getSubjectData(value);
      this.props.navigator.pop(); 
    }
  
  },

  render: function() {
    return (

      <View style={styles.container}>
        
        <StatusBar title="Add New Subject" />   
 
         <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollView}>

             <Form
               ref="form"
               type={User}
               options={options}/>

              <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>

        </ScrollView>   
        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  scrollView: {
    height: 350,
  }
});

module.exports = AddSubjectView;