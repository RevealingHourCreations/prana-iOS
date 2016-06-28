
const StatusBar = require('./StatusBar');

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native'

const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const constants = styles.constants;

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

var options = {
  auto: 'placeholders'}; 


var AddSubjectView = React.createClass({

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null    
      React.NativeModules.Utility.getSubjectData(value);
      this.props.navigator.pop(); 
    }
  
  },

  goBack: function () {   
      this.props.navigator.pop(); 
  },

  componentDidMount: function (){

   this.refs.form.getComponent('firstName').refs.input.focus();
  },



  render: function() {
    return (

      <View style={styles.formContainer}>
        
         <View style={styles.statusBar}>
                  <TouchableHighlight
                    underlayColor={'#FFFF'}
                    onPress={this.goBack}>
                       <Text style={styles.backButton}>  &lt; </Text>
                        
                  </TouchableHighlight>
                  <Text style={styles.statusBarTitle}> Add New Subject </Text>
        </View>      
        
 
         <ScrollView
            automaticallyAdjustContentInsets={true}
            rejectResponderTermination={false}
            style={ESStyles.scrollView}>

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

/*
var styles = StyleSheet.create({
  
  
});*/

module.exports = AddSubjectView;