import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
// import { shallow } from 'enzyme'

import Header from '../src/components/Header.js'
import Player from '../src/components/Player.js'
// import SoundList from '../src/components/SoundList.js'

// function MyComponent() {
//   return <div />
// }
//
// const renderer = createRenderer()
//
// const tree = renderer.render(<MyComponent />)
// expect(isDOMComponent(tree)).toBe(true)

// describe('Foo component', function() {
//   it('renders 3 Image components with the right props', function() {
//     const renderer = TestUtils.createRenderer()
//     renderer.render(<Header />)
//     const result = renderer.getRenderOutput()
//     const sources = map(findAllWithType(result, Image),
//                         'props.source')
//     expect(sources).toDeepEqual([
//       '../images/Logo.png'
//     ])
//   })
// })

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
  const ListView = require('ListView')
  const Text = require('Text')
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
