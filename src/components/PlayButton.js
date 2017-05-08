import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class PlayButton extends Component {
  constructor() {
    super()
    console.log(this.props)
  }
  render() {
    return (
      <View className="player" style={style.container}>
        <TouchableHighlight underlayColor="white" onPress={() => {
          _logMe()
        }}>
        {this.props.status === 'playing'
          ? <Text style={style.button}>Pause</Text>
          : <Text style={style.button}>Play</Text>
        }
        </TouchableHighlight>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // padding: 10,
    // height: 100,
    // backgroundColor: '#FFF5E8',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10
  },
  // image: {
  //   height: 70,
  //   width: 70,
  //   borderRadius: 35
  // },
  // imageContainer: {
  //   position: 'absolute',
  //   left: 10,
  //   alignItems: 'center',
  //   height: 70,
  //   width: 70,
  //   borderRadius: 35,
  //   shadowColor: '#000000',
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   shadowOffset: {
  //     height: 2,
  //     width: 2
  //     }
    // },
    button: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});
