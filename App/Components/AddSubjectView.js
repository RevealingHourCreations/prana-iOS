
const StatusBar = require('./StatusBar');

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
  Image
} from 'react-native'

const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const constants = styles.constants;



// For sending data to Native Apps.
// Utility is Exported Module from Native App. Its defined in Utility.swft

var Utility = require('NativeModules');

var t = require('tcomb-form-native');

var Form = t.form.Form;

// Subject Model
var Subject = t.struct({
  firstName: t.String,
  lastName: t.String,
  age: t.Number,
  dailyExercise: t.Boolean,
  sedataryLifeStyle: t.Boolean,
  smoking: t.Boolean,
  drinking: t.Boolean,
  enoughSleep: t.Boolean,
  avgWakeupTime: t.Number,
  avgSleepingTime: t.Number,
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
    var subjectData = this.refs.form.getValue();
    var uid = this.props.store.currentUser.uid
    console.log(subjectData)
    console.log(uid)
    if (subjectData) {
      this.addSubjectToDatabase(subjectData,uid)
      this.props.navigator.pop();
    }
  },

  addSubjectToDatabase: function(subjectData,uid) {
    firebase.database().ref('/Subjects/' ).push({

    firstName        : subjectData['firstName'],
    lastName         : subjectData['lastName'],
    age              : subjectData['age'],
    dailyExercise    : subjectData['dailyExercise'],
    sedataryLifeStyle: subjectData['sedataryLifeStyle'],
    regularMeals     : subjectData['regularMeals'],
    drinking         : subjectData['drinking'],
    smoking          : subjectData['smoking'],
    avgSleepingTime  : subjectData['avgSleepingTime'],
    avgWakeupTime    : subjectData['avgWakeupTime'],
    eatNonveg        : subjectData['eatNonveg'],
    enoughSleep      : subjectData['enoughSleep'],
    meditateRegulary : subjectData['meditateRegulary'],
    hypertension     : subjectData['hypertension'],
    diabetes         : subjectData['diabetes'],
    uid              : uid
    });
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

         <View style={styles.navbar}>
                  <TouchableHighlight
                    underlayColor={'#FFFF'}
                    onPress={this.goBack}>

                       <Text style={styles.backButton}>
                           <Image
                             style={styles.icon}
                             source={require('../Images/back.png')}/>
                       </Text>
                      

                  </TouchableHighlight>
                  <Text style={styles.navbarTitle}> Add New Subject </Text>
        </View>


         <ScrollView
            automaticallyAdjustContentInsets={true}
            rejectResponderTermination={false}
            style={ESStyles.scrollView}>

             <Form
               ref="form"
               type={Subject}
               options={options}/>

              <TouchableHighlight style={styles.action} onPress={this.onPress} underlayColor='#99d9f4'>
                <Text style={styles.actionText}>Save</Text>
              </TouchableHighlight>

        </ScrollView>

      </View>
    );
  }
});


module.exports = AddSubjectView;
