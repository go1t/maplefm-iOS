'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  PickerIOS,
  StyleSheet,
  View,
} = React;

var HomeScreen = require('./components/HomeScreen');

var PickerItemIOS = PickerIOS.item;

var FMSERVERS = ["Scania", "Windia", "Bera", "Broa", "Khaini", "Ymck", "Gazed", "Bellonova", "Renegades"];

var topServer = 0;

var App = React.createClass({

  getInitialState: function(){
    return {
      server: 8,
    };
  },

  topRoute: function(num){
    return {
          title: FMSERVERS[num].toUpperCase(),
          component: HomeScreen,
          rightButtonTitle: 'Change Server',
          backButtonTitle: 'Cancel',
          passProps: {
            server: num,
          },
          onRightButtonPress: () => {
              this.refs.nav.push(
                this.chooseServer()
              );
          },
    };
  },

  setServer: function(serverIndex){
      this.setState({server: serverIndex});
  },

  chooseServer: function(){
    return {
          title: 'CHOOSE SERVER',
          component: ServerPicker,
          rightButtonTitle: 'Done',
          backButtonTitle: 'Change',
          onRightButtonPress: () => {
            console.log("SERVER WOY " + this.state.server );
            this.refs.nav.resetTo(this.topRoute(this.state.server));
          },
          passProps: {
             setServer: this.setServer,
             currentServer: this.state.server,
          }
    };
  },

  render: function() {

    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        itemWrapperStyle={styles.wrapperStyle}
        initialRoute={this.topRoute(8)}
      />
    );
  }
});

var ServerPicker = React.createClass({

  getInitialState: function(){
    return {
       server: this.props.currentServer,
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <PickerIOS
          selectedValue={this.state.server}
          onValueChange={(serverNum) => { this.props.setServer(serverNum); this.setState({server: serverNum});}} >
          {FMSERVERS.map((server) =>
              <PickerItemIOS
                key={server}
                value={FMSERVERS.indexOf(server)}
                label={server}
              />
          )}
        </PickerIOS>
      </View>
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
  }
});

AppRegistry.registerComponent('AwesomeProject', () => App);

module.exports = App;
