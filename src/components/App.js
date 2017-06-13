import React, { Component } from 'react'
import {
  View,
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
