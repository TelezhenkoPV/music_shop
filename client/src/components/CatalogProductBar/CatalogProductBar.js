import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TocIcon from '@material-ui/icons/Toc'
import GridOnIcon from '@material-ui/icons/GridOn'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const CatalogProductBar = () => {
  const classes = useStyles()
  const [sortType, setSortType] = React.useState('По возврастанию цены')

  const handleChange = (event) => {
    setSortType(event.target.value)
  }

  return (
    <AppBar
      position="static"
      className={classes.root}
      style={{ background: '#F0F0FF', color: 'black' }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <GridOnIcon />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <TocIcon />
        </IconButton>
        <Typography variant="body2" className={classes.title}>
          9 едениц товара
        </Typography>
        <Typography variant="body2" className={classes.title}>
          Сортировать по:
        </Typography>
        <Select
          labelId="sort"
          id="sort"
          value={sortType}
          onChange={handleChange}
        >
          <MenuItem value={'По возврастанию цены'}>
            По возврастанию цены
          </MenuItem>
          <MenuItem value={'По убыванию цены'}>По убыванию цены</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  )
}

export default CatalogProductBar
