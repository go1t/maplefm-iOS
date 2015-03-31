'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  PixelRatio,
  View,
} = React;

var API_URL = 'http://maple.fm/api/2/';
var ItemCell = require('../components/ItemCell');
var SearchBar = require('../components/SearchBar');

var HomeScreen = React.createClass({

  getInitialState: function() {
    return {
      all: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      filter: '',
    };
  },

  componentDidMount: function() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 60000);
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.server != this.props.server) {
      this.setState({
        loaded: false,
        filter: '',
      }, function() {
        this.fetchData();
      });
    }
  },

  fetchData: function() {
    console.log(this.props.server);
    var REQUEST_URL = API_URL + 'search?server=' + this.props.server + '&stats=0&desc=0';
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          all: responseData.fm_items.sort(function(a, b) {
            if(a.name > b.name) return 1;
            else if(a.name < b.name) return -1;
            else return 0;
          }),
          lastUpdated: responseData.seconds_ago,
        });
      })
      .then(() => {
        this.filter(this.state.filter);
      })
      .then(() => {
        this.refs.listview.getScrollResponder().scrollTo(0, 0);
      })
      .done();
  },

  filter: function(query) {
    this.timeoutID = null;
    this.setState({
      filter: query
    });
    if(!query){
      this.setState({
        dataSource: this.getDataSource(this.state.all),
        loaded: true,
      });
      return;
    }
    var original = this.state.all;
    var filtered = [];
    for (var i=0; i < original.length; i++) {
      if (original[i].name.toLowerCase().indexOf(query) >= 0 ||
          original[i].character_name.toLowerCase().indexOf(query) >= 0) {
        filtered.push(original[i]);
      }
    }
    this.setState({
      dataSource: this.getDataSource(filtered),
      loaded: true,
    });
  },

  onSearchChange: function(event: Object) {
    var query = event.nativeEvent.text.toLowerCase();
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => this.filter(query), 100);
  },

  getDataSource: function(items: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(items);
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.bigcontainer}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          lastUpdated={this.state.lastUpdated}
          onFocus={() => {
            this.refs.listview.getScrollResponder().scrollTo(0, 0);
          }}
        />
        <View style={styles.separator} />
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          keyboardDismissMode="onDrag"
          keyboardShouldPersistTaps={true}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={[styles.container, {flexDirection: 'column'}]}>
        <Image
          source={require('image!logo')}
          style={
            [
              styles.icon,
              {
                resizeMode: Image.resizeMode.contain
              }
            ]}
        />
        <Text style={{fontFamily: 'Effra-Regular', fontSize: 16}}>
          Loading items
        </Text>
      </View>
    );
  },

  renderRow: function(item: Object)  {
    return (
      <ItemCell
        item={item}
      />
    );
  },

});

var styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  bigcontainer: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center'
  },
   pickerContainer: {
    flex: 1,
    fontFamily: 'Effra-Regular',
    fontSize: 14,
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  thumbnail: {
    width: 25,
    height: 25,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Effra-Regular',
    color: 'white',
  },
  listView: {
    backgroundColor: '#f8f8f8',
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eeeeee',
  },
});

module.exports = HomeScreen;