import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet } from 'react-native'

import Header from './Header'
import SoundList from './SoundList'

export default class App extends Component {
  render () {
    return (
      <View style={style.container}>
        <Header />
        <SoundList />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

// #280E0D
// #6E5745
// #AF9F95
// #DAC5B3
// #92796C
