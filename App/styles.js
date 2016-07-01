const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    alignItems: 'stretch',
    backgroundColor: 'white',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row'
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    width: 150
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },

  formContainer: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  backButton: {
   color: '#444',
   fontSize: 18,
   marginLeft: 10
  },
  
  statusBarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 40
  },
  
  statusBar: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20

  },
  chart: {
    flex: 1
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: "#696969",
    fontFamily: 'Cochin'
  },
  nadiTitle:{
    color: '#1E90FF',
    fontFamily: 'Cochin'
  }
})

module.exports = styles
module.exports.constants = constants;
