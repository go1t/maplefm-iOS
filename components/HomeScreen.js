'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  PickerIOS,
  PixelRatio,
  View,
} = React;


var FMSERVERS = ["Scania", "Windia", "Bera", "Broa", "Khaini", "Ymck", "Gazed", "Bellonova", "Renegades"];

var PickerItemIOS = PickerIOS.item;
var SERVER = '8';
var API_URL = 'http://maple.fm/api/2/';
var PAGE_SIZE = 25;
var PARAMS = 'search?server=' + SERVER + '&stats=0&desc=0';

var ICON_URL = 'http://maple.fm/static/image/icon/';

var ItemCell = require('../components/ItemCell');

var HomeScreen = React.createClass({

  ref: "home",

  timeoutID: (null:any),

  getInitialState: function() {
    return {
      all: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      pageSize: 15,
      input: '',
      server: 8,
      focusing: false,
      size: 10,
    };
  },

  componentDidMount: function() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 60000);
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.server != this.props.server){
        this.setState({
          loaded: false,
          input: '',
        }, function(){
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
                  if(a.name > b.name)
                    return 1;
                  if(a.name < b.name)
                    return -1;
                  return 0;
               }),
          lastUpdated: responseData.seconds_ago,
        });
      })
      .then( () => {
         this.filter(this.state.input);
      })
      .then( () => { this.refs.listview.getScrollResponder().scrollTo(0, 0); } )
      .done();
  },

  filter: function(query){
      this.timeoutID = null;

      this.setState({input: query});

      if(!query){

          this.setState({
            dataSource: this.getDataSource(this.state.all),
            loaded: true,
          });
          return ;
      }

      var original = this.state.all;
      var filtered = [];
      for(var i=0; i < original.length; i++){
          if( original[i].name.toLowerCase().indexOf(query) >= 0 ||
              original[i].character_name.toLowerCase().indexOf(query) >= 0
            )
              filtered.push(original[i]);
      }

      this.setState({
        dataSource: this.getDataSource(filtered),
        loaded: true,
      });
  },

  onSearchChange: function(event: Object){
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

    if(this.props.choosing) {
      return (<ServerPicker/>);
    }

    return (
      <View style={styles.bigcontainer}>
        <SearchBar
           onSearchChange={this.onSearchChange}
           lastUpdated={this.state.lastUpdated}
           onFocus={() => {
              this.refs.listview.getScrollResponder().scrollTo(0, 0);
              this.setState({focusing: true});
           }}
           onBlur={() => {
              this.setState({focusing: false});
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

  renderLoadingView: function(){
    return (
      <View style={[styles.container, {flexDirection: 'column'}]}>
        <Image
          source={require('image!logo')}
          style={[
                  styles.icon,
                  {resizeMode: Image.resizeMode.contain}
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
        onSelect={() => dummy}
        item={item}
      />
    );
  },

  dummy: function(){

  },

});

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
  }
});

var ServerPicker = React.createClass({

  getInitialState: function(){
    return {
       server: 8,
    };
  },

  render: function() {
    return (
      <View style={styles.pickerContainer}>
        <PickerIOS
          selectedValue={this.state.server}
          onValueChange={(server) => this.setState({server})}>
          {FMSERVERS.map((server) =>
              <PickerItemIOS
                key={server}
                value={server}
                label={server}
              />
          )}
        </PickerIOS>
      </View>
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
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eeeeee',
  },
});

module.exports = HomeScreen;