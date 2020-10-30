import React, { useState } from 'react'
import SearchBar from 'material-ui-search-bar'
import useStyles from './styles'

function Search() {
  const classes = useStyles()
  const [value, setValue] = useState('')

  return (
    <SearchBar
      value={value}
      className={classes.searchBar}
      onChange={(newValue) => setValue(newValue)}
      onRequestSearch={() => console.log('onRequestSearch', value)}
    />
  )
}

export default Search
