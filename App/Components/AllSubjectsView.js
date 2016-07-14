
const React = require('react');
var ReactNative = require('react-native');

const ActionButton = require('./ActionButton');
const AddSubjectView = require('./AddSubjectView');
const ListItem = require('./ListItem');
const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const StatusBar = require('./StatusBar');
const constants = styles.constants;



var {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  ListView,
  NativeModules,
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
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, });
    this.state = {
      dataSource:  ds,
      activeSubject: "",
      activeSwitch: false,
      activityInprogress: true
    }
  }


 listenForSubjects = () => {
      console.log('fetching subjects')


      var thisRef = this;

    // Subjects of Current user.

   var uid = this.props.store.currentUser.uid
   var subjectsRef = this.props.databaseRef.ref("Subjects")

    subjectsRef.orderByChild('uid').equalTo(uid).on('value', function( snapshot ){
          var subjects = [];
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
   this.setState({
      dataSource: this.state.dataSource.cloneWithRows(subjects),
      activityInprogress: false
   });
}

  componentDidMount = () =>  {
    this.listenForSubjects();
  }


  _handlePress = () =>  {
        this.props.navigator.push({id: 'NewSubject',});
    }

 renderSubject = (item) =>  {

      const onPress = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.props.store.setActiveSubject( item.subjectName , item._key)
        this.props.navigator.push({id: 'BreathBarChart',});
      };

      const onSwitchChange = () => {
        ReactNative.NativeModules.Utility.setActiveSubject(item._key);
        this.props.store.setActiveSubject( item.subjectName , item._key)
        this.props.navigator.push({id: 'BreathBarChart',});
       };


    return (

        <ListItem item={item}
                  onPress={onPress}
                  onSwitchChange={onSwitchChange}
                  activeSubject={this.props.store.activeSubject.key} />
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

          <View style={styles.navbar}>
            <Text style={styles.backButton}>

            </Text>
                <Text style={styles.navbarTitle}> Prana - Subjects. </Text>
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
