'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
} = React;

var Constants = require('./utilities/Constants');
var HomeScreen = require('./components/HomeScreen');
var ServerPicker = require('./components/ServerPicker');

var FMSERVERS = Constants.SERVERS;
var START_SERVER = Constants.START_SERVER;

var App = React.createClass({
  getInitialState: function() {
    return {
      server: START_SERVER,
    };
  },
  setServerState: function(serverIndex) {
    this.setState({
      server: serverIndex
    });
  },
  getHomeScreenRoute: function(serverIndex) {
    return {
      title: FMSERVERS[serverIndex].toUpperCase(),
      component: HomeScreen,
      rightButtonTitle: 'Change Server',
      backButtonTitle: 'Cancel',
      passProps: {
        server: serverIndex,
      },
      onRightButtonPress: () => {
        this.refs.nav.push(
          this.getChooseServerRoute()
        );
      },
    };
  },
  getChooseServerRoute: function() {
    return {
      title: 'CHOOSE SERVER',
      component: ServerPicker,
      rightButtonTitle: 'Done',
      backButtonTitle: 'Change',
      passProps: {
        servers: FMSERVERS,
        setServer: this.setServerState,
        currentServer: this.state.server,
      },
      onRightButtonPress: () => {
        this.refs.nav.resetTo(
          this.getHomeScreenRoute(this.state.server)
        );
      },
    };
  },
  render: function() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        itemWrapperStyle={styles.wrapperStyle}
        initialRoute={this.getHomeScreenRoute(this.state.server)}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Effra-Regular',
    fontSize: 14,
    color: 'white',
  },
  wrapperStyle: {
    fontFamily: 'Effra-Regular',
    fontSize: 14,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => App);

module.exports = App;
