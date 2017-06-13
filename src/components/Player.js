import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SliderVolumeController } from 'react-native-volume-controller'

export default class Player extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={style.container}>
        <View style={style.imageContainer}>
          <Image source={this.props.image} style={style.image} />
        </View>
        {this.props.status
          ? <TouchableHighlight underlayColor="white" onPress={() => { this.props.pause() }}>
              <Icon className="icon" style={style.icon} name="pause" size={30} color="#FFF" />
            </TouchableHighlight>
          : <TouchableHighlight underlayColor="white" onPress={() => { this.props.play() }}>
              <Icon className="icon" style={style.icon} name="play" size={30} color="#FFF" />
            </TouchableHighlight>
        }
        <SliderVolumeController style={style.volumeController} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#7A8B98',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    height: 100
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    height: 50,
    width: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
      }
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 10
    },
    icon: {
      marginTop: 10
    },
    volumeController: {
      marginTop: 20
    }
});
