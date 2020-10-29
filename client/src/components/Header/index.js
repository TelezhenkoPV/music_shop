import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import tabLinks from './utilities'
import Grid from '@material-ui/core/Grid'
import useStyles from './styles'
import ElevationScroll from './ElevationScroll'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import PersonIcon from '@material-ui/icons/Person'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../../store/modal/modalAction'
import Modal from '../Modal'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  // to adjust the logic for authorized
  const authorized = false

  const handleChange = (event, newValue) => setValue(newValue)

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0)
        }
        break
      case '/gitars':
        if (value !== 0) {
          setValue(0)
        }
        break
      case '/booster':
        if (value !== 1) {
          setValue(1)
        }
        break
      case '/percussion':
        if (value !== 2) {
          setValue(2)
        }
        break
      case '/bass':
        if (value !== 3) {
          setValue(3)
        }
        break
      case '/keybords':
        if (value !== 4) {
          setValue(4)
        }
        break
      case '/accessories':
        if (value !== 5) {
          setValue(5)
        }
        break
      default:
        break
    }
  }, [value])

  return (
    <>
      <ElevationScroll>
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar disableGutters={true}>
              <Grid container>
                <Grid
                  item
                  container
                  xs={12}
                  direction={'row'}
                  justify={'space-between'}
                >
                  <Grid item>
                    <Button
                      component={Link}
                      to={'/'}
                      className={classes.logoContainer}
                      onClick={() => setValue(0)}
                      disableRipple
                    >
                      <img
                        alt="company logo"
                        src={logo}
                        className={classes.logo}
                      />
                    </Button>
                  </Grid>
                  <Grid item className={classes.iconContainer}>
                    <Grid item className={classes.iconContainer}>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.iconContainer}>
                    <Grid item className={classes.iconContainer}>
                      <Button component={Link} to={'/basket'} disableRipple>
                        <ShoppingBasketIcon
                          className={classes.headerIcon}
                          onClick={() => console.log('shopping basket clicked')}
                        />
                      </Button>
                    </Grid>
                    <Grid item className={classes.iconContainer}>
                      <Button>
                        {authorized ? (
                          <FavoriteIcon
                            className={classes.headerIcon}
                            onClick={() => console.log('to add in Favorites')}
                          />
                        ) : (
                          <PersonIcon
                            className={classes.headerIcon}
                            onClick={() => dispatch(toggleModal())}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify={'center'}
                  alignItems={'center'}
                >
                  <Tabs
                    indicatorColor={'primary'}
                    onChange={handleChange}
                    value={value}
                  >
                    {tabLinks.map((tab, index) => {
                      return (
                        <Tab
                          key={`${tab}${index}`}
                          className={classes.tab}
                          component={Link}
                          to={tab.to}
                          label={tab.label}
                        />
                      )
                    })}
                  </Tabs>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
      <Modal />
    </>
  )
}

export default Header
