
const React = require('react');
var ReactNative = require('react-native');

const ActionButton = require('./ActionButton');
const AddSubjectView = require('./AddSubjectView');
const ListItem = require('./ListItem');
const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const StatusBar = require('./StatusBar');
const constants = styles.constants;
const Firebase = require('firebase');
const FirebaseUrl = 'https://prana-4be90.firebaseio.com';



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
} = ReactNative;

var Utility = require('NativeModules');



class AllSubjectsView extends Component{


constructor(props) {
  super(props);
  var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, });  
  this.state = {
    dataSource:  ds,
    subjectsRef: this.getFBRef().child("Subjects"),
    activeSubject: "",
    activeSwitch: false,
    activityInprogress: true,
  }
}

 getFBRef = () => {
       return new Firebase(FirebaseUrl);
     }

 listenForSubjects = () => {

    	this.state.subjectsRef.on('value', (snap) => {

			      // get children as an array
			      var subjects = [];
			      snap.forEach((child) => {
			        subjects.push({
			          subjectName: child.val().firstName + " " + child.val().lastName,
			          _key: child.key()
			        });
			      });

			      this.setState({
			        dataSource: this.state.dataSource.cloneWithRows(subjects),
              activityInprogress: false
			      });

         });

      
     }

  componentDidMount = () =>  {
       this.listenForSubjects();
     }

  _handlePress = () =>  {
        this.props.navigator.push({id: 2,});
    }

 renderSubject = (item) =>  {

      const onPress = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.setState({activeSubject: item._key});  
        this.props.closeDrawer
      };

      const onSwitchChange = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.setState({activeSubject: item._key});   
        this.props.closeDrawer   
       };
 

    return (
     
        <ListItem item={item} 
                  onPress={onPress} 
                  onSwitchChange={onSwitchChange} 
                  activeSubject={this.state.activeSubject}/>
    );
  }

 render = () => {

   var activityIndicator  = this.state.activityInprogress ? <ActivityIndicatorIOS
                                                                  style={ESStyles.activityIndicator}
                                                                  animating={this.state.activityInprogress}
                                                                  size={'small'}
                                                                  color={'black'}/>   : null;
    return (
        
       <View style={styles.container}>  
            <StatusBar title="Prana - Subjects" />       

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
