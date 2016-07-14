/**
 *
 *
 * Prana iOS App
 *
 *
 **/



var Login = require('./App/Components/Login');
var Report = require('./App/Components/Report');
var BreathBarChart = require('./App/Components/BreathBarChart');
var AllSubjectsView = require('./App/Components/AllSubjectsView');
var AddSubjectView = require('./App/Components/AddSubjectView');

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
    //this.databaseRef = this.getRef();
    //this.firebaseRef = firebaseApp;
    this.state =  {
        activeComponent: 'Login',
        databaseRef: this.getRef(),
        firebaseRef: firebaseApp
     }
  }


  getRef() {
    return firebaseApp.database();
  }

  navRenderScene = (route, navigator) => {
    switch (route.id) {
      case 'Login':
         return (<Login navigator = {navigator}
                                   firebaseRef = {this.state.firebaseRef}
                                   store = {PranaStore}
                                   title = "Prana - Login."/>);
     case 'AllSubjectsView':
       return (<AllSubjectsView navigator = {navigator}
                                store = {PranaStore}
                                databaseRef = {this.state.databaseRef}
                                title = "Prana - Subjects."/>);

    case 'NewSubject':
      return (<AddSubjectView navigator = {navigator}
                             store = {PranaStore}
                             databaseRef = {this.state.databaseRef}
                             title = "Prana - Add New Subject" />);

    case 'BreathBarChart':
       return (<BreathBarChart navigator = {navigator}
                               databaseRef = {this.state.databaseRef}
                               store = {PranaStore}
                               title = "Prana - Feel your Breath!"/>);
    case 'Report':
       return (<Report navigator = {navigator}
                       store = {PranaStore}
                       databaseRef = {this.state.databaseRef}
                       title = "Prana Report - Know your Breath!" />);

    }
  };


  render() {

   return (

     <Navigator
            style={styles.container}
            initialRoute={{id: "Login"}}
            renderScene={this.navRenderScene} />

   );

  }
}


// calculate styles
EStyleSheet.build();

module.exports = iOSV1;

AppRegistry.registerComponent('iOSV1', () => iOSV1);
