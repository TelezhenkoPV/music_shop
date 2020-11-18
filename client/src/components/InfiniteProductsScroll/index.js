import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductCard } from '../ProductCard/ProductCard'

import CircularProgress from '@material-ui/core/CircularProgress'

import { getUrlParams, objToQueryString } from '../Filter/utils'
import { setFilterActualFiltersParamsAction } from '../../store/filters/filtersAction'

export default function ProductsScroll(props) {
  const { onClickAddProduct } = props
  const { params } = useParams()

  const dispatch = useDispatch()

  const [page, setPage] = useState(0)
  const [cards, setCards] = useState([])
  const [filteredProductsQuantity, setFilteredProductsQuantity] = useState(0)

  useEffect(() => {
    setPage(1)
    setCards([])
    getMoreData()
    // eslint-disable-next-line
  }, [params])

  useEffect(() => {
    getMoreData()
    // eslint-disable-next-line
  }, [page])

  const getMoreData = () => {
    const urlData = getUrlParams(params)

    for (const key in urlData) {
      urlData[key] = urlData[key].split(',')
    }

    urlData.startPage = page
    urlData.perPage = 2

    dispatch(setFilterActualFiltersParamsAction(urlData))

    const queryString = objToQueryString(
      urlData,
      'http://localhost:5000/api/products/filter?'
    )

    setTimeout(() => {
      axios(queryString)
        .then((response) => {
          setCards((oldCards) => [...oldCards, ...response.data.products])
          setFilteredProductsQuantity(response.data.productsQuantity)
        })
        .catch((e) => console.log(e))
    }, 200)
  }

  const LoadMorePosts = () => {
    setPage(1 + page)
  }

  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={LoadMorePosts}
      hasMore={filteredProductsQuantity > cards.length}
      loader={<CircularProgress />}
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
