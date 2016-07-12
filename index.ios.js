/**
 *
 *
 * Prana iOS App
 *
 *
 **/



var Login = require('./App/Components/Login');
var BreathBarChart = require('./App/Components/BreathBarChart');
var PranaHome = require('./App/Components/PranaHome');
import PranaStore from './App/Store/PranaStore'
const styles = require('./App/styles.js')
import EStyleSheet from 'react-native-extended-stylesheet';

import React, {
  AsyncStorage,
  AppRegistry,
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Navigator
} from 'react-native';


const Firebase = require('firebase');
var config = {
  apiKey: 'AIzaSyDjYb5qDEsGtYJnYvldohcSHZtq-zOnpRc',
  authDomain: 'prana-4be90',
  databaseURL: 'https://prana-4be90.firebaseio.com',
  storageBucket: 'prana-4be90.appspot.com'
};

const firebaseApp = Firebase.initializeApp(config);


class iOSV1 extends React.Component {

  constructor (props){
    super(props);
    this.databaseRef = this.getRef();
    this.firebaseRef = firebaseApp;
    this.state =  {
        activeComponent: 'Login'
     }
  }


  getRef() {
    return firebaseApp.database();
  }

  navRenderScene = (route, navigator) => {
    switch (route.id) {
      case 'Login':
         return (<Login navigator = {navigator}
                                   databaseRef = {this.databaseRef}
                                   firebaseRef = {this.firebaseRef}
                                   store = {PranaStore}
                                   title = "Prana - Login!"/>);

     case 'BreathBarChart':
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


  authChanges = () => {

    console.log("Inside onAuthStateChanged")

      //var firebaseRef = this.props.firebaseRef
      var thisRef = this;

      firebaseApp.auth().onAuthStateChanged(function(user) {
         if (user) {
             console.log("User is logged in")
           var email = user.email
           var uid = user.uid

          PranaStore.setCurrentUser(uid,email);
           //thisRef.props.navigator.push({id: 'BreathBarChart'});
           this.setState({activeComponent: 'BreathBarChart'})

         } else {
            //thisRef.props.navigator.push({id: 'Login',});
            //this.setState({activeComponent: 'BreathBarChart'})
            console.log("User has logged out")
            this.setState({activeComponent: 'Login'})

         }

       });
       // [END authstatelistener]
  }

  componentDidMount = () => {
    this.authChanges();
  }

  render() {

   return (

     <Navigator
            style={styles.container}
            initialRoute={{id: this.state.activeComponent }}
            renderScene={this.navRenderScene} />

   );

  }
}


// calculate styles
EStyleSheet.build();

module.exports = iOSV1;

AppRegistry.registerComponent('iOSV1', () => iOSV1);
