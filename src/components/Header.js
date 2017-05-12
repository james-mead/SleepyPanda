import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet } from 'react-native'

export default class Header extends Component {
  render () {
    return (
      <View className="header" style={style.header}>
        <Image source={require('../images/sleepypanda.png')} style={style.appLogo} />
        <Text style={style.appTitle}>
          Sleepy Panda
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#3D5667',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    padding: 10
  },
  appTitle: {
    // flex: 1,
    color: '#f0f8ff',
    fontFamily: 'AmericanTypewriter-Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    textAlign: 'left'
  },
  appLogo: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent'
  }
})
