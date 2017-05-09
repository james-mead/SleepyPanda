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
        <Text style={style.pageTitle}>
          Sleepy Panda
        </Text>
        <Image source={require('../images/sleepypanda.png')} style={style.brandLogo} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#3D5667',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    padding: 10
  },
  pageTitle: {
    flex: 1,
    color: '#f0f8ff',
    fontSize: 30,
    letterSpacing: 1.5,
    textAlign: 'left'
  },
  brandLogo: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent'
  }
})
