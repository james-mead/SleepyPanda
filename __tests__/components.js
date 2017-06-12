import React from 'react'
import {
  Text,
  View,
  ListView
} from 'react-native'
import renderer from 'react-test-renderer'

import Header from '../src/components/Header.js'
import Player from '../src/components/Player.js'

describe('Header (Snapshot)', () => {
  it('Renders the Header Component', () => {
    const component = renderer.create(<Header />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})

describe('Player (Snapshot)', () => {
  it('Renders the Player Component', () => {
    const component = renderer.create(<Player />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})

describe('Confirms Sound Data is loaded', () => {
  it('renders the name of each sound file', () => {
  const soundData = require('../src/data/sounds')
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  }).cloneWithRows(soundData)
  const component = renderer
    .create(
      <ListView
        dataSource={dataSource}
        renderRow={rowData => <Text>{rowData.name}</Text>}
      />
    )
    const json = component.toJSON()
  expect(component).toMatchSnapshot()
  })
})
