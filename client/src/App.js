import React from 'react'
import Header from './components/Header'
import { ProductCard } from './components/ProductCard/ProductCard'

const getData = (
  title,
  img,
  status,
  price,
  rating,
  type,
  body,
  griff,
  fretboard,
  availableColors
) => {
  return {
    title,
    img,
    status,
    price,
    rating,
    type,
    body,
    griff,
    fretboard,
    availableColors,
  }
}

const data = [
  getData(
    'Гитара',
    '/guitar.jpg',
    'New',
    2500,
    [1, 2, 3],
    'Гриф на болтах',
    'Дерево',
    'Клен',
    'Палисангдр',
    ['red', 'blue']
  ),
  getData(
    'Гитара',
    '/guitar.jpg',
    'New',
    2500,
    [1, 2, 3],
    'Гриф на болтах',
    'Дерево',
    'Клен',
    'Палисангдр',
    ['red', 'blue', 'black']
  ),
  getData(
    'Гитара',
    '/guitar.jpg',
    'New',
    2500,
    [1, 2, 3],
    'Гриф на болтах',
    'Дерево',
    'Клен',
    'Палисангдр',
    ['red', 'blue', 'green']
  ),
  getData(
    'Гитара',
    '/guitar.jpg',
    'New',
    2500,
    [1, 2, 3],
    'Гриф на болтах',
    'Дерево',
    'Клен',
    'Палисангдр',
    ['red', 'blue']
  ),
  getData(
    'Гитара',
    '/guitar.jpg',
    'New',
    2500,
    [1, 2, 3, 4],
    'Гриф на болтах',
    'Дерево',
    'Клен',
    'Палисангдр',
    ['red', 'blue']
  ),
]

function App() {
  return (
    <div>
      <Header />
      {data && data.map((e) => <ProductCard guitar={e} />)}
    </div>
  )
}

export default App
