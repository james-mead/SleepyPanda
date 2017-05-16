import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Player extends Component {
  render () {
    return (
      <View style={style.container}>
        <View style={style.imageContainer}>
          <Image source={this.props.image} style={style.image} />
        </View>
        {this.props.status
        ? <TouchableHighlight underlayColor="white" onPress={() => { pauseSound() }}>
            <Icon className="icon" name="pause" size={30} color="#FFF" />
          </TouchableHighlight>
        : <TouchableHighlight underlayColor="white" onPress={() => { playSound() }}>
            <Icon className="icon" name="play" size={30} color="#FFF" />
          </TouchableHighlight>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7A8B98',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 100
  },
  imageContainer: {
    backgroundColor: 'gray',
    borderRadius: 10,
    position: 'absolute',
    left: 10,
    alignItems: 'center',
    height: 70,
    width: 70,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
      }
    },
    image: {
      height: 70,
      width: 70,
      borderRadius: 10
    },
    playButton: {
      alignItems: 'center',
      color: '#f0f8ff'
    }
});
