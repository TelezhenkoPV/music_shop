import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductCard } from '../ProductCard/ProductCard'

import { getUrlParams, objToQueryString } from '../Filter/utils'
import { setFilterActualFiltersParamsAction } from '../../store/filters/filtersAction'

export default function ProductsScroll(props) {
  const { onClickAddProduct } = props
  const { params } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [cards, setCards] = useState([])
  // const [filteredProductsQuantity, setFilteredProductsQuantity] = useState(0)

  useEffect(() => {
    const urlData = getUrlParams(params)

    for (const key in urlData) {
      urlData[key] = urlData[key].split(',')
    }

    dispatch(setFilterActualFiltersParamsAction(urlData))

    setPage(1)

    const queryString = objToQueryString(
      urlData,
      'http://localhost:5000/api/products/filter?'
    )

    axios(queryString)
      .then((response) => {
        setCards(response.data.products)
        // setFilteredProductsQuantity(response.data.productsQuantity)
      })
      .catch((e) => console.log(e))
  }, [dispatch, params])

  const LoadMorePosts = () => {
    setPage(1 + page)
    console.log(page)
  }

  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={LoadMorePosts}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {cards.map((item) => (
        <ProductCard
          key={item._id}
          element={item}
          onClickAddProduct={onClickAddProduct}
        />
      ))}
    </InfiniteScroll>
  )
}
