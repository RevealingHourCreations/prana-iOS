
const React = require('react-native');
const ESStyles = require('../ESStyles.js')
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, 
        Text, 
        View, 
        TouchableHighlight,
        ScrollView} = React;

import Communications from 'react-native-communications';
import {observer} from 'mobx-react/native'

@observer
class Report extends React.Component {

  emailReport = () => {

    
    Communications.email(['atulveer@gmail.com'],null,null,'My Subject','My body text')
    //alert('Emailing report')
  }

  _renderBreathChart = () => {
     this.props.navigator.pop(); 
  }


  render = () => {
    console.log(this.props.store.activeSubject)
    activeSubjectName = this.props.store.activeSubject.fullName

    return (
      <View style={styles.container}>               
  
          <View style={styles.statusBar}>
              <TouchableHighlight
                    underlayColor={'#FFFF'}
                    onPress={ this._renderBreathChart}>
                  <Text style={styles.backButton}>&lt; </Text>
                  </TouchableHighlight>
              
                  <Text style={styles.statusBarTitle}>Report of {activeSubjectName} </Text>
        </View>      
         
 
         <ScrollView
            automaticallyAdjustContentInsets={true}
            rejectResponderTermination={false}
            style={ESStyles.scrollView}>

              <TouchableHighlight style={styles.button} onPress={this.emailReport} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Email Report</Text>
              </TouchableHighlight>

        </ScrollView>   

      </View>
    );
  }
}

module.exports = Report;
