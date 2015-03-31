'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PickerIOS,
  StyleSheet,
  View,
} = React;
var PickerItemIOS = PickerIOS.item;

var ServerPicker = React.createClass({
  getInitialState: function() {
    return {
       server: this.props.currentServer,
    };
  },
  setCurrentChoice: function(choice) {
    this.props.setServer(choice);
    this.setState({server: choice});
  },
  render: function() {
    return (
      <View style={styles.container}>
        <PickerIOS
          selectedValue={this.state.server}
          onValueChange={this.setCurrentChoice}>
          {
            this.props.servers.map((server) =>
              <PickerItemIOS
                key={server}
                value={this.props.servers.indexOf(server)}
                label={server}/>
            )
          }
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
});

module.exports = ServerPicker;