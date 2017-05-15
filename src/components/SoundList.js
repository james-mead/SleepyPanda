import React, { Component } from 'react'
import {
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import soundData from '../data/sounds'
import SoundListItem from './SoundListItem'
import Player from './Player'

const Sound = require('react-native-sound')

Sound.setCategory('Playback', false) // enable background Sound but don't mix audio sessions

export default class SoundList extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
     soundDataSource: ds.cloneWithRows(soundData),
     status: 'stopped',
     loadedSound: null,
     soundIndex: null
    }

    _rowHandleClick = (sound) => {
      if (this.state.soundIndex !== null && this.state.soundIndex !== sound.id) {
        console.log('media selection has changed')
        _stopSound()
        _loadSound(sound)
        _playSound()
      } else if (this.state.status === 'stopped' || this.state.status === 'paused') {
        _loadSound(sound)
      } else {
        _pauseSound()
      }
    }

    _loadSound = (sound) => {
      console.log('loading', sound.media)
      const s = new Sound(sound.media, (e) => {
        if (e) {
          console.error('error', e)
          return
        }
        this.setState({
          loadedSound: s,
          status: 'loading',
          soundIndex: sound.id,
          soundImage: sound.image
        })
        _playSound()
      })
    }

    _playSound = () => {
      const s = this.state.loadedSound
      console.log('playing', s)
        this.setState({
          loadedSound: s.setNumberOfLoops(-1).setVolume(0.1).play(),
          status: 'playing'
        })
        // console.log('loaded sound', this.state.loadedSound)
      _fadeIn()
    }

    _fadeIn = () => {
      const s = this.state.loadedSound
      const fader = setInterval(function () {
        let volume = s.getVolume()
        s.setVolume(volume += 0.05)
        if (volume >= 1) {
          clearInterval(fader)
        }
      }, 200)
    }

    _pauseSound = () => {
      this.setState({
        status: 'paused',
        loadedSound: this.state.loadedSound.pause()
      })
      // console.log('paused', this.state.status)
    }

    _stopSound = () => {
      this.setState({
        loadedSound: this.state.loadedSound.stop().release()
      })
      this.setState({
        loadedSound: null,
        status: 'stopped',
        soundIndex: null,
        soundImage: null
      })
    }
  }

  _renderRow (sound, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight key={rowID} underlayColor="white" onPress={() => {
        highlightRow(sectionID, rowID)
        _rowHandleClick(sound)
      }}>
      <View>
        <SoundListItem sound={sound} />
      </View>
      </TouchableHighlight>
    )
  }

  _renderSeperator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={{
        height: adjacentRowHighlighted ? 3 : 1,
        backgroundColor: adjacentRowHighlighted ? '#CCCCCC' : '#CCCCCC'
      }} />
    )
  }

  render () {
    return (
      <View style={style.container}>
        <ScrollView style={this.state.status !== 'stopped'
          ? {marginBottom: 100}
          : {marginBottom: 0}
        }>
          <ListView
            dataSource={this.state.soundDataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />
        </ScrollView>
        {this.state.status !== 'stopped'
          ? <Player status={this.state.status} image={this.state.soundImage} />
          : null
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAB3BA'
  },
  scrollView: {
    marginBottom: 100
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF'
  }
})
