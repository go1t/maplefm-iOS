'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var SearchBar = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange = {this.props.onSearchChange}
          placeholder="Search items"
          onFocus={this.props.onFocus}
          clearButtonMode="while-editing"
          style={styles.searchBarInput}
        />
        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>
               {Math.round(parseInt(this.props.lastUpdated)/60)+' min. ago'}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  lastUpdated: {
    height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#97c4eb",
  },
  lastUpdatedText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Effra-Regular',
    color: 'white',
  },
  searchBar: {
    marginTop: 64,
    padding: 7,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 14,
    fontFamily: 'Effra-Regular',
    textAlign: 'right',
    flex: 3,
    height: 35,
    paddingLeft: 13,
    backgroundColor: 'white'//'#5b565d',
  },
});

module.exports = SearchBar;