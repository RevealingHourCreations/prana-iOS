'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import Button from './Button';
import Header from './Header';
const styles = require('../styles.js')
var PranaHome = require('./PranaHome');

var t = require('tcomb-form-native');

var Form = t.form.Form;

// Subject Model
var User = t.struct({
  email: t.String,
  password: t.String
});

var options = {
  auto: 'placeholders',
  fields: {
      email: {
        // you can use strings or JSX
        error: 'Please enter valid email!'
      },
      password: {
        // you can use strings or JSX
        secureTextEntry: true
      }
    }

};


 class Login extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      loaded: true

    }
  }

  render(){
    return (
      <View style={styles.container}>
      <View style={styles.navbar}>
         <Text style={styles.navbarTitle}> Prana Login </Text>
       </View>

         <Form
           ref="form"
           type={User}
           options={options}/>

         <TouchableHighlight style={styles.action} onPress={this.login} underlayColor='#99d9f4'>
           <Text style={styles.actionText}>Login</Text>
         </TouchableHighlight>

        <Text style={styles.notice}>* Please contact admin for credentails.</Text>
      </View>
    );
  }

  login = () => {

   console.log("Inside Login");
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null

      this.setState({
        loaded: false
      });

      var email =  value.email
      var password = value.password
      var firebaseRef = this.props.firebaseRef


        // [START authwithemail]
      firebaseRef.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }

        });

   }
}

 checkAuthChanges = () => {

   var firebaseRef = this.props.firebaseRef
   var thisRef = this;

   firebaseRef.auth().onAuthStateChanged(function(user) {
      if (user) {
        var email = user.email
        var uid = user.uid
        console.log(uid)
        thisRef.props.store.setCurrentUser(uid,email);
        thisRef.props.navigator.push({id: 'AllSubjectsView'});
      }

    });

 }

  componentDidMount = () => {
      this.checkAuthChanges();
  }

}

module.exports = Login;
