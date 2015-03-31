'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var ICON_URL = 'http://maple.fm/static/image/icon/';

var digits = function(number){
    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

var ItemCell = React.createClass({
  render: function() {

    var cellstyle = (this.props.item.quantity > 0) ?
        styles.row : [styles.row, styles.emptyCell];

    var titlestyle = (this.props.item.quantity > 0) ?
        styles.movieTitle : [styles.movieTitle, styles.emptyText];

    var pricestyle = (this.props.item.quantity > 0) ?
        styles.movieYear : styles.unit;

    var badgestyle = (this.props.item.quantity > 0) ?
        { marginLeft: -35, marginTop: 18, height: 19,backgroundColor: '#487ba7', borderWidth: 2, borderColor: 'white', borderRadius: 8}
        :
        { marginLeft: -35, marginTop: 18, height: 19,backgroundColor: '#f28383', borderWidth: 2, borderColor: 'white', borderRadius: 8}

    return (
      <View>
        <TouchableHighlight>
          <View style={cellstyle}>
            <View style={{flexDirection: 'row', width: 70, height: 35}}>
              <Image
                source={{uri: ICON_URL + this.props.item.icon + '.png'}}
                style={[
                  styles.cellImage,
                  {resizeMode: Image.resizeMode.contain}
                ]}
              />
              <View style={badgestyle}>
                <Text style={{fontFamily: 'EffraMedium-Regular', color: 'white', fontSize: 11, textAlign: 'center', paddingLeft: 2, paddingRight: 2}}>
                  x{this.props.item.quantity}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={titlestyle} numberOfLines={2} lineHeight={1}>
                {this.props.item.name.trim()}
              </Text>
              <Text>
                <Text style={pricestyle}>
                  {digits(this.props.item.price)}
                </Text>
                <Text style={styles.unit}>
                  {'  meso   '}
                  &bull;{'   FM'}
                  {this.props.item.room}
                  {'  -  '+this.props.item.character_name}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 15,
    //fontFamily: 'Roboto-Light',
    fontFamily: 'Effra-Regular',
    marginBottom: 2,
  },
  movieYear: {
    color: '#488AC7',
    fontSize: 12,
    //fontFamily: 'Roboto-Regular',
    fontFamily: 'Effra-Regular',
  },
  unit: {
    color: '#7e7e7e',
    fontSize: 12,
    //fontFamily: 'Roboto-Light',
    fontFamily: 'Effra-Regular',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
  },
  cellImage: {
    height: 32,
    padding: 15,
    width: 32,
    marginLeft: 5,
    marginRight: 25,
  },
  emptyCell: {
    backgroundColor: '#f4f4f4',
  },
  emptyText: {
    color: '#6f6f6f',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
});

module.exports = ItemCell;
