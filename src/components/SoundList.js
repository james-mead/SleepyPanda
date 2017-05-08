import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import soundData from '../data/sounds'
import Player from './Player'
import PlayButton from './PlayButton'

const Sound = require('react-native-sound')
Sound.setCategory('Playback', true) // true = mixWithOthers

export default class SoundList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
     soundDataSource: ds.cloneWithRows(soundData),
     status: 'stopped',
     loadedSound: null,
     soundIndex: null
    }

    _logMe = () => {
      console.log('clicked ')
    }

    _handleClick = (sound) => {
      console.log(sound)
      if (this.state.soundIndex !== null && this.state.soundIndex !== sound.id) {
        console.log('media selection has changed')
        _stopSound()
        _playSound(sound)
      } else if (this.state.status === 'stopped' || this.state.status === 'paused') {
        _playSound(sound)
      } else {
        _pauseSound()
      }
    };

    _playSound = (sound) => {
      let media = sound.media
      console.log('image', sound)
      const s = new Sound(media, (e) => {
        if (e) {
          console.error('error', e)
        }
        this.setState({
          loadedSound: s.setNumberOfLoops(-1).setVolume(0.1).play(),
          status: 'playing',
          soundIndex: sound.id,
          soundImage: sound.image
        })
        console.log('loaded sound', this.state.loadedSound)
        _fadeIn(s)
      })
    }

    _fadeIn = (s) => {
      const fader = setInterval(function() {
        let volume = s.getVolume()
        s.setVolume(volume += 0.05)
        if (volume >= 1) {
          clearInterval(fader)
        }
      }, 100)
    }

    _pauseSound = () => {
      this.setState({
        status: 'paused',
        loadedSound: this.state.loadedSound.pause()
      })
      console.log('paused', this.state.status)
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

  _renderRow(sound, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight key={rowID} underlayColor="white" onPress={() => {
        highlightRow(sectionID, rowID)
        _handleClick(sound)
      }}>
        <View key={sound.id} style={style.row}>
          <View style={style.imageContainer}>
            <Image source={sound.image} style={style.image} />
          </View>
          <Text style={style.name}>{sound.name}</Text>
          <PlayButton status={this.state.status} />
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={{
        height: adjacentRowHighlighted ? 3 : 1,
        backgroundColor: adjacentRowHighlighted ? '#CCCCCC' : '#CCCCCC',
      }} />
    )
  }

  render() {
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
          ? <Player status={this.state.status} image={this.state.soundImage}/>
          : null
        }
      </View>
    )}
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginBottom: 100,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderColor: '#64584F',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF',
  },
  name: {
    flex: 1,
    margin: 5,
    padding: 5,
    textAlign: 'left',
    fontSize: 15,
    letterSpacing: 1.5
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  imageContainer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  }
})
