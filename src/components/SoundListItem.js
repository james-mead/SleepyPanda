import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native'

export default class SoundListItem extends Component {
  render () {
    return (
      <View key={this.props.sound.id} style={style.row}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={this.props.sound.image} />
        </View>
        <Text style={style.name}>{this.props.sound.name}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderColor: '#64584F'
  },
  name: {
    flex: 1,
    marginLeft: 20,
    padding: 5,
    textAlign: 'left',
    fontFamily: (Platform.OS === 'ios') ? 'GillSans-Light' : 'sans-serif-light',
    fontSize: 15,
    letterSpacing: 1.5
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10
  },
  imageContainer: {
    borderRadius: 10,
    backgroundColor: '#AAB3BA',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  }
})
