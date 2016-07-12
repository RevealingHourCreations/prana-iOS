
const React = require('react');
var ReactNative = require('react-native');

const ActionButton = require('./ActionButton');
const AddSubjectView = require('./AddSubjectView');
const ListItem = require('./ListItem');
const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const StatusBar = require('./StatusBar');
const constants = styles.constants;
import {observer} from 'mobx-react/native'


var {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  ListView,
  NativeModules,
  NativeAppEventEmitter,
  AlertIOS,
  ActivityIndicatorIOS,
  Component,
  Image
} = ReactNative;

var Utility = require('NativeModules');


//@observer
class AllSubjectsView extends Component{

  constructor(props) {
    super(props);
    databaseRef = this.props.databaseRef
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, });
    this.state = {
      dataSource:  ds,
      subjectsRef: databaseRef.ref("Subjects"),
      activeSubject: "",
      activeSwitch: false,
      activityInprogress: true,
    }

  }


 listenForSubjects = () => {
      console.log('fetching subjects')

      var subjects = [];
      var thisRef = this;

// All subjects

/*
    	this.state.subjectsRef.on('value', function(snap) {
			      snap.forEach((child) => {
			        subjects.push({
			          subjectName: child.val().firstName + " " + child.val().lastName,
			          _key: child.key
			        });
			      });
        thisRef.loadSubjects(subjects)
    });
*/


// Subjects of Current user.

     uid = this.props.store.currentUser.uid
     console.log(uid)
    this.state.subjectsRef.orderByChild('uid').equalTo(uid).on('value', function( snapshot ){
          snapshot.forEach((child) => {
            subjects.push({
              subjectName: child.val().firstName + " " + child.val().lastName,
              _key: child.key
            });
          });
        thisRef.loadSubjects(subjects)
    });


}

loadSubjects = (subjects) => {
  //console.log('loading subjcts')
  console.log(subjects)

   this.setState({
      dataSource: this.state.dataSource.cloneWithRows(subjects),
      activityInprogress: false
   });
}

  componentDidMount = () =>  {
    this.listenForSubjects();
  }

  _handlePress = () =>  {
        this.props.navigator.push({id: 'New Subject',});
    }

 renderSubject = (item) =>  {

      const onPress = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.props.store.setActiveSubject( item.subjectName , item._key)
        this.setState({activeSubject: item._key});
      };

      const onSwitchChange = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.props.store.setActiveSubject( item.subjectName  , item._key)
        this.setState({activeSubject: item._key});
       };


    return (

        <ListItem item={item}
                  onPress={onPress}
                  onSwitchChange={onSwitchChange}
                  activeSubject={this.state.activeSubject} />
    );
  }

 render = () => {


   var activityIndicator  = this.state.activityInprogress ? <ActivityIndicatorIOS
                                                                  style={ESStyles.activityIndicator}
                                                                  animating={this.state.activityInprogress}
                                                                  size={'small'}
                                                                  color={'black'}/>
                                                          : null;
    return (

       <View style={styles.container}>
          <View style={styles.statusBar}>
                  <TouchableHighlight
                    underlayColor={'#FFFF'}
                    onPress={this.props.closeDrawer}>
                       <Text style={styles.backButton}>
                       <Image
                            style={styles.icon}
                            source={require('../Images/menu-bars.png')}/>
                        </Text>

                  </TouchableHighlight>
                  <Text style={styles.statusBarTitle}> Prana - Subjects. </Text>
          </View>

              {activityIndicator}

             <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderSubject} />


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
};

module.exports = AllSubjectsView;
