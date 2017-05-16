import React, { Component } from 'react'
import {
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import MusicControl from 'react-native-music-control'

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
     playing: false,
     muted: false,
     loadedSound: null,
     soundIndex: null,
     soundName: null,
     soundImage: null
    }

    rowHandleClick = (sound) => {
      if (this.state.soundIndex !== null && this.state.soundIndex !== sound.id) {
        console.log('changing media')
        unloadSound(function () {
          stopSound(function () {
            loadSound(sound, function () {
              playSound()
            })
          })
        })
      } else if (!this.state.playing) {
        loadSound(sound, function () {
          playSound()
        })
      } else {
        pauseSound()
      }
    }

    unloadSound = (cb) => {
      console.log('unloading media')
      this.setState({
        loadedSound: this.state.loadedSound.stop().release()
      })
      cb()
    }

    stopSound = (cb) => {
      this.setState({
        loadedSound: null,
        playing: false,
        soundIndex: null,
        soundName: null,
        soundImage: null
      })
      cb()
    }

    loadSound = (sound, cb) => {
      console.log('loading media: ', sound.name)
      const s = new Sound(sound.media, (e) => {
        if (e) {
          console.error('error', e)
          return
        }
        this.setState({
          loadedSound: s,
          soundIndex: sound.id,
          soundName: sound.name,
          soundImage: sound.image
        })
        cb()
      })
    }

    playSound = () => {
      console.log('playing: ', this.state.soundName)
      const s = this.state.loadedSound
        this.setState({
          loadedSound: s.setNumberOfLoops(-1).setVolume(0.1).play(),
          playing: true
        })
        MusicControl.setNowPlaying({
          title: this.state.soundName,
          color: 0xFFFFFF, // Notification Color - Android Only
        })
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

    pauseSound = () => {
      console.log('pausing: ', this.state.soundName)
      this.setState({
        playing: false,
        loadedSound: this.state.loadedSound.pause()
      })
    }
  }

  componentDidMount () {
      console.log('Mounted')
      MusicControl.enableControl('play', true)
      MusicControl.enableControl('pause', true)
      MusicControl.enableBackgroundMode(true)
      MusicControl.on('play', ()=> {
        playSound()
      })
      MusicControl.on('pause', ()=> {
        pauseSound()
      })
    }

    componentDidUpdate() {
      let status = null
      if (this.state.loadedSound) {
        if (this.state.playing) {
          status = MusicControl.STATE_PLAYING
        } else {
          status = MusicControl.STATE_PAUSED
        }
      } else {
        status = MusicControl.STATE_STOPPED
      }
      MusicControl.updatePlayback({
        state: status, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
        elapsedTime: 103, // (Seconds)
    })
  }

  _renderRow (sound, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight key={rowID} underlayColor="white" onPress={() => {
        highlightRow(sectionID, rowID)
        rowHandleClick(sound)
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
        <ScrollView style={this.state.playing
          ? {marginBottom: 100}
          : {marginBottom: 0}
        }>
          <ListView
            dataSource={this.state.soundDataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />
        </ScrollView>
        {this.state.loadedSound && <Player status={this.state.playing} image={this.state.soundImage} />}
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
