import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductCard } from '../ProductCard/ProductCard'

import { filtersCategoriesSelector } from '../../store/filters/filtersSelectors'
import { createUrlWithManyValues } from '../../func'

export default function ProductsScroll(props) {
  const { onClickAddProduct } = props
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const filtersCategories = useSelector(filtersCategoriesSelector)
  const [filteredProductsQuantity, setFilteredProductsQuantity] = useState(0)

  const { categoryName, colors, minPrice, maxPrice } = useParams()

  useEffect(() => {
    setPage(1)
    setData([])
  }, [categoryName, filtersCategories, colors, minPrice, maxPrice])

  const LoadMorePosts = () => {
    setPage(1 + page)
  }

  useEffect(() => {
    const url = createUrlWithManyValues(
      filtersCategories,
      minPrice,
      maxPrice,
      'http://localhost:5000/api/products/filter?categories',
      colors,
      page
    )

    if (data.length <= filteredProductsQuantity) {
      setTimeout(() => {
        axios(url)
          .then((resp) => {
            setData((oldData) => [...oldData, ...resp.data.products])
            setFilteredProductsQuantity(resp.data.productsQuantity)
          })
          .catch((e) => console.log(e))
      }, 300)
    }
    // eslint-disable-next-line
  }, [page, categoryName, filtersCategories, colors, minPrice, maxPrice])

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={LoadMorePosts}
      hasMore={data.length !== filteredProductsQuantity}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.map((item) => (
        <ProductCard
          key={item._id}
          element={item}
          onClickAddProduct={onClickAddProduct}
        />
      ))}
    </InfiniteScroll>
  )
}
