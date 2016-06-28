var React = require('react-native');
const styles = require('../styles.js')
const ESStyles = require('../ESStyles.js')
const { View, TouchableHighlight, Text, Switch, Dimensions } = React;


var width = Dimensions.get('window').width;

class ListItem extends React.Component {

  render() {
     var eventSwitchIsOn = false
  	 if(this.props.activeSubject === this.props.item._key){
    	eventSwitchIsOn = true
    }

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.subjectName} </Text>        

           <Switch
            onValueChange={ this.props.onSwitchChange }
            style={ESStyles.switchButton}
            value={eventSwitchIsOn} />
          
          
        </View>
   

      </TouchableHighlight>
    );
  }
}



module.exports = ListItem;

