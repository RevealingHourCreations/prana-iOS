/*

  Subjects view

    - create page structure just like Firebase example app 
      - Status bar
      - List of Subjects
      - Add Subject
    - create navigator view for Add Subject buttion press
    - Use https://github.com/gcanti/tcomb-form-native for creating form
    *- Send data collected to Native App
    - Send data received from React to Firebase from Native DataService
    - Call read function of Native to show added data.
    - Call Firebase retrive data function to retrive data
    - Send data received to react native
    - Update state of component to show new data.


*/


//const Firebase = require('firebase');
//const StatusBar = require('./StatusBar');
const AllSubjectsView = require('./AllSubjectsView');
const AddSubjectView = require('./AddSubjectView');
//const ListItem = require('./ListItem');
//const ActionButton = require('./ActionButton');
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


/*
// Initialize Firebase
    var config = {
      apiKey: 'AIzaSyDjYb5qDEsGtYJnYvldohcSHZtq-zOnpRc',
      authDomain: 'prana-4be90.firebaseapp.com',
      databaseURL: 'https://prana-4be90.firebaseio.com',
      storageBucket: 'prana-4be90.appspot.com'
    };
    
    firebase.initializeApp(config);
*/

//class ControlPanel extends Component {

var ControlPanel = React.createClass({

/*
constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('Users');
  }

  getRef() {
    var rootRef = firebase.database().ref();
    return rootRef;
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

*/

/*
constructor() {
   super();
    this.openAddSubjectForm = this.openAddSubjectForm.bind(this) 
  }
  */

  navigatorRenderScene: function(route, navigator) {
    switch (route.id) {
      case 1:
              //React.NativeModules.Utility.getUserData("Atul");
        return (<AllSubjectsView navigator={navigator} title="Prana - All Subjects"/>);
      case 2:
        return (<AddSubjectView navigator={navigator} title="Prana - Add New Subject" />);
    }

  },



 /*saveForm: function() {
    // call getValue() to get the values of the form
    console.log("saving form")
    console.log(this)
    console.log(this.refs)
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      //Utility.getUserData(value);
    }
  },*/

  render() {
    let {closeDrawer} = this.props
    return (

           <Navigator
               style={styles.container}
               initialRoute={{id: 1, }}
               renderScene={this.navigatorRenderScene}/>
    )
  }


/*
  _addItem() {
    AlertIOS.alert(
      'Add New Subject',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            console.log(text)
            Utility.getUserData(text);

            //this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

*/

});


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'black',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})


<Modal backdropType="blur" backdropBlur="dark" isVisible={this.state.isModalOpen} onClose={() => this.closeModal()}>
                  
                    }
                      <Form ref="form"   type={User}  options={options} />

                      <TouchableHighlight style={styles.button} onPress={this.saveForm} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}> Save </Text>
                      </TouchableHighlight>
                   
            </Modal>

*/

module.exports = ControlPanel;