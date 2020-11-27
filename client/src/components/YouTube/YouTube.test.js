import React from 'react'
import Youtube from './index'
import { shallow } from 'enzyme'

const mockYoutube = {
  videoLink: 'https://www.someLink.ua',
}

test('Youtube is rendered', () => {
  shallow(<Youtube videoLink={mockYoutube.videoLink} />)
})

test('Youtube contains iframe', () => {
  const wrapper = shallow(<Youtube Youtube videoLink={mockYoutube.videoLink} />)

  expect(wrapper.find('iframe').exists()).toBeTruthy()
})

test('Youtube contains link in iframe', () => {
  const wrapper = shallow(<Youtube Youtube videoLink={mockYoutube.videoLink} />)

  expect(wrapper.find(`[src="${mockYoutube.videoLink}"]`).exists()).toBeTruthy()
})
