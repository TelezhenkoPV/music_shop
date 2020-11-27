import React from 'react'
import { shallow } from 'enzyme'
import BasketCard from './index'

const mockBasketCardProps = {
  id: '12345',
  img: ['img1', 'img2'],
  name: 'some name',
  price: 100,
  color: 'red',
  totalPrice: 200,
  totalCount: 2,
  onRemove: () => {},
  onPlus: () => {},
  onMinus: () => {},
}

test('BasketCard is rendered', () => {
  shallow(<BasketCard img={mockBasketCardProps.img} />)
})

test('BasketCard is rendered not empty', () => {
  const wrapper = shallow(<BasketCard img={mockBasketCardProps.img} />)

  expect(wrapper.find('[aria-label="delete"]').exists()).toBeTruthy()
})

test('BasketCard called onRemove func', () => {
  const mockOnRemoveFunc = jest.fn()
  const wrapper = shallow(
    <BasketCard onRemove={mockOnRemoveFunc} img={mockBasketCardProps.img} />
  )

  wrapper.find('[aria-label="delete"]').simulate('click')

  expect(mockOnRemoveFunc).toHaveBeenCalled()
})

test('BasketCard called onPlus func', () => {
  const mockOnPlusFunc = jest.fn()
  const wrapper = shallow(
    <BasketCard onPlus={mockOnPlusFunc} img={mockBasketCardProps.img} />
  )

  wrapper.find('[aria-label="add"]').simulate('click')

  expect(mockOnPlusFunc).toHaveBeenCalled()
})
