import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatalog } from '../../store/categories/categoriesSelectors'
import { loadCatalog } from '../../store/categories/categoriesAction'
import { Box, Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import { Link } from 'react-router-dom'

const Categories = () => {
  const dispatch = useDispatch()
  const catalog = useSelector(getCatalog)
  const style = useStyles()

  useEffect(() => {
    dispatch(loadCatalog())
  }, [dispatch])

  return (
    <div className={style.root}>
      <Box className={style.categoriesTitle}>
        <hr className={style.line} />
        <h1 style={{ padding: '10px' }}>Categories</h1>
        <hr className={style.line} />
      </Box>
      <Grid container>
        {catalog.map((item) => {
          if (item.imgUrl && item.imgUrl !== 'null') {
            return (
              <Grid
                item
                sm={12}
                md={6}
                key={item.id}
                style={{ margin: '0 auto' }}
              >
                <Link style={{ textDecoration: 'none' }} to={item.url}>
                  <Box zIndex="tooltip" className={style.titleBox}>
                    <Typography className={style.title}>{item.name}</Typography>
                  </Box>
                  <Box zIndex="modal" className={style.img}>
                    {' '}
                    <img
                      className={style.img}
                      alt={item.name}
                      src={item.imgUrl}
                    />
                  </Box>
                  <Box zIndex="tooltip" className={style.goToBox}>
                    <Typography className={style.goTo}>Go to</Typography>
                  </Box>
                </Link>
              </Grid>
            )
          }
          return null
        })}
      </Grid>
    </div>
  )
}

export default Categories
