import React from 'react'
import NotFound from './index'
import { shallow } from 'enzyme'

test('NotFound is rendered', () => {
  shallow(<NotFound />)
})
