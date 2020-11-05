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
import SearchBar from '../SearchBar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Login from '../Login'

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // to adjust the logic for authorized
  const authorized = false
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const [value, setValue] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
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

  const downTab = (
    <>
      <Grid
        className={classes.downBar}
        item
        container
        xs={12}
        justify={'center'}
        alignItems={'center'}
      >
        <Tabs indicatorColor={'primary'} onChange={handleChange} value={value}>
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
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          {tabLinks.map((tab, index) => (
            <ListItem
              key={tab + index}
              component={Link}
              to={tab.to}
              divider
              button
              onClick={() => {
                setOpenDrawer(false)
                setValue(index)
              }}
              selected={value === index}
              classes={{ selected: classes.drawerItemSelected }}
            >
              <ListItemText disableTypography className={classes.drawerItem}>
                {tab.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <Grid container className={classes.searchContainer}>
        <Grid item container xs={10} justify={'center'}>
          <SearchBar />
        </Grid>
        <Grid item xs={1} container justify={'flex-end'}>
          <Button
            style={{ padding: 0 }}
            className={classes.drawerIconContainer}
            onClick={() => {
              setOpenDrawer(!openDrawer)
            }}
            disableRipple
          >
            <MenuIcon className={classes.drawerIcon} />
          </Button>
        </Grid>
      </Grid>
    </>
  )

  return (
    <>
      <ElevationScroll>
        <div>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar disableGutters={true}>
              <Grid container>
                <Grid
                  className={classes.topBar}
                  item
                  container
                  xs={12}
                  direction={'row'}
                  justify={'space-between'}
                >
                  <Grid item>
                    <Button
                      style={{ padding: 0 }}
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
                    {matches ? null : <SearchBar />}
                  </Grid>
                  <Grid item className={classes.iconContainer}>
                    <Grid item className={classes.iconContainer}>
                      <Button
                        style={{ padding: 0 }}
                        component={Link}
                        to={'/basket'}
                        disableRipple
                      >
                        <ShoppingBasketIcon
                          className={classes.headerIcon}
                          onClick={() => console.log('shopping basket clicked')}
                        />
                      </Button>
                    </Grid>
                    <Grid item className={classes.iconContainer}>
                      <Button style={{ padding: 0 }}>
                        {authorized ? (
                          <FavoriteIcon
                            className={classes.headerIcon}
                            onClick={() => console.log('to add in Favorites')}
                          />
                        ) : (
                          <PersonIcon
                            className={classes.headerIcon}
                            onClick={() => dispatch(toggleModal(<Login />))}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {matches ? drawer : downTab}
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

export default Header
