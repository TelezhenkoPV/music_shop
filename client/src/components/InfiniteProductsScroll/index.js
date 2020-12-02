import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductCard } from '../ProductCard/ProductCard'
import PropTypes from 'prop-types'

import { useStyles } from './styles'

import CircularProgress from '@material-ui/core/CircularProgress'

import { getUrlParams, objToQueryString } from '../Filter/utils'
import { setFilterActualFiltersParamsAction } from '../../store/filters/filtersAction'
import { notificate } from '../../store/notification/notificationActions'

export default function ProductsScroll(props) {
  const { onClickAddProduct } = props
  const { params } = useParams()

  const dispatch = useDispatch()
  const classes = useStyles()

  const [page, setPage] = useState(0)
  const [cards, setCards] = useState([])
  const [filteredProductsQuantity, setFilteredProductsQuantity] = useState(0)

  useEffect(() => {
    setPage(1)
    setCards([])
    page !== 0 && getMoreData()
    // eslint-disable-next-line
  }, [params])

  useEffect(() => {
    page !== 0 && getMoreData()
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

    const queryString = objToQueryString(urlData, '/api/products/filter?')

    setTimeout(() => {
      axios(queryString)
        .then((response) => {
          setCards((oldCards) => [...oldCards, ...response.data.products])
          setFilteredProductsQuantity(response.data.productsQuantity)
          dispatch(
            notificate({
              variant: 'success',
              data: 'Products data loaded!',
            })
          )
        })
        .catch((e) => {
          dispatch(
            notificate({
              variant: 'error',
              data: e,
            })
          )
        })
    }, 200)
  }

  const LoadMorePosts = () => {
    setPage(1 + page)
  }

  return (
    <InfiniteScroll
      className={classes.root}
      style={{ overflow: 'unset' }}
      dataLength={cards.length}
      next={LoadMorePosts}
      hasMore={filteredProductsQuantity > cards.length}
      loader={<CircularProgress />}
      endMessage={
        <p className={classes.noItems_text}>
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

ProductsScroll.propTypes = {
  onClickAddProduct: PropTypes.func,
}
