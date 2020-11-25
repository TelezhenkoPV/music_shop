import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import SearchBar from 'material-ui-search-bar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ClearIcon from '@material-ui/icons/Clear'
import { search, clearSearch } from '../../store/search/searchActions'
import { searchIsLoading, searchData } from '../../store/search/searchSelectors'

export default function Search() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const anchorRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [searchWidth, setSearchWidth] = useState('auto')

  const isLoading = useSelector(searchIsLoading)
  const searchResult = useSelector(searchData)

  const handleClose = () => {
    setInputValue('')
    dispatch(clearSearch())
  }

  const handleClickItem = (item) => {
    handleClose()
    history.push(`/product/${item.itemNo}`)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue && inputValue.length > 2) dispatch(search(inputValue))
    }, 500)
    setSearchWidth(anchorRef.current.clientWidth)
    return () => clearTimeout(timeout)
  }, [dispatch, inputValue])

  const items = searchResult.slice(0, 10).map((item, id) => {
    return (
      <MenuItem
        style={{ width: searchWidth }}
        key={id}
        onClick={() => handleClickItem(item)}
      >
        <div className={classes.searchResult}>
          {item.imageUrls.length > 0 ? (
            <div
              className={classes.searchResultImage}
              style={{ backgroundImage: `url(${item.imageUrls[0]})` }}
            />
          ) : null}
          <div className={classes.searchResultData}>
            <span>Category: {item.categories}</span>
            <span>Product: : {item.name}</span>
          </div>
        </div>
      </MenuItem>
    )
  })

  return (
    <div className={classes.searchWrapper} ref={anchorRef}>
      <SearchBar
        style={{ margin: '0' }}
        color="secondary"
        value={inputValue}
        className={classes.searchBar}
        onChange={(query) => setInputValue(query)}
        onRequestSearch={(query) =>
          query !== '' ? dispatch(search(query)) : null
        }
        closeIcon={
          isLoading ? (
            <CircularProgress size={20} className={classes.iconButton} />
          ) : (
            <ClearIcon className={classes.iconButton} />
          )
        }
        classes={{ input: classes.input, searchIconButton: classes.iconButton }}
      />
      <Menu
        className={classes.searchDropDown}
        anchorEl={anchorRef.current}
        // keepMounted
        open={searchResult.length > 0}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {items}
      </Menu>
    </div>
  )
}
