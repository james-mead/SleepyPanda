import React, { Component } from 'react'
import {
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter
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
      loadedSound: new Sound(soundData[0].soundLabel, Sound.MAIN_BUNDLE),
      soundIndex: soundData[0].id,
      soundName: soundData[0].name,
      soundImageThumbnail: soundData[0].imageThumbnail
    }

    rowHandleClick = (sound) => {
        if (this.state.soundIndex === sound.id) {
          // toggle current sound
          if (this.state.playing) {
            pauseSound()
          } else {
            playSound()
          }
        } else {
          // change media
          console.log('changing media')
          stopSound(function () {
            releaseSound(function () {
              loadSound(sound, function () {
                playSound()
              })
            })
          })
      }
    }

    stopSound = (cb) => {
      this.setState({
        loadedSound: this.state.loadedSound.stop(),
        playing: false,
      })
      MusicControl.updatePlayback({
        state: MusicControl.STATE_STOPPED,
        elapsedTime: 103, // (Seconds)
      })
      cb()
    }

    releaseSound = (cb) => {
      console.log('releasing media')
      this.setState({
        loadedSound: this.state.loadedSound.release(),
        soundIndex: null,
        soundName: null,
        soundImageThumbnail: null
      })
      MusicControl.resetNowPlaying()
      cb()
    }

    loadSound = (sound, cb) => {
      console.log('loading media: ', sound.name)
      const s = new Sound(sound.soundLabel, Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.error('error', e)
          return
        }
        this.setState({
          loadedSound: s,
          soundIndex: sound.id,
          soundName: sound.name,
          soundImageThumbnail: sound.imageThumbnail
        })
        cb()
      })
    }

    playSound = () => {
      console.log('playing: ', this.state.soundName)
        this.setState({
          loadedSound: this.state.loadedSound.setNumberOfLoops(-1).setVolume(0.1).play(),
          playing: true
        })
        MusicControl.setNowPlaying({
          title: this.state.soundName,
          color: 0xFFFFFF // Notification Color - Android Only
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
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
        elapsedTime: 103 // (Seconds)
      })
    }
  }

  componentDidMount () {
      console.log('Mounted')
      this.subscription = DeviceEventEmitter.addListener('audioEvent', (evt) => {
        console.log('audio interruption event:', evt.status)
        if (evt.status === 'started') {
          this.setState({
            loadedSound: this.state.loadedSound.stop(),
            playing: false
          })
          MusicControl.updatePlayback({
            state: MusicControl.STATE_STOPPED,
            elapsedTime: 103 // (Seconds)
          })
        } else if (evt.status === 'ended') {
          playSound()
        }
      })
      MusicControl.enableBackgroundMode(true)
      MusicControl.enableControl('play', true)
      MusicControl.enableControl('pause', true)
      MusicControl.on('play', ()=> {
        playSound()
      })
      MusicControl.on('pause', ()=> {
        pauseSound()
      })
    }

  componentWillUnmount() {
    this.subscription.remove()
    console.log('Unmounted')
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
        <ScrollView style={this.state.loadedSound
          ? {marginBottom: 100}
          : {marginBottom: 0}
        }>
          <ListView
            dataSource={this.state.soundDataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />
        </ScrollView>
        <Player status={this.state.playing}
          play={() => playSound()}
          pause={() => pauseSound()}
          image={this.state.soundImageThumbnail}
        />
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