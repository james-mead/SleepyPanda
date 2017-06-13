import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import { SliderVolumeController } from 'react-native-volume-controller'


export default class SoundListItem extends Component {
  render () {
    return (
      <SliderVolumeController style={style.volumeController} />
    )
  }
}

const style = StyleSheet.create({
  volumeController: {
    marginTop: 20
  }
})
