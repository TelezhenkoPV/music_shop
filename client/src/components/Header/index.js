import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import { Typography } from '@material-ui/core'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import logo from '../../assets/logo.svg'
import useStyles from './styles'

import { signOut } from '../../store/user/userActions'
import { openModal } from '../../store/modal/modalAction'
import { getIsAuthenticated, getUserData } from '../../store/user/userSelectors'
import { getCatalog } from '../../store/categories/categoriesSelectors'

import SearchBar from '../SearchBar'
import Login from '../Login'
import { loadCatalog } from '../../store/categories/categoriesAction'

import { totalCountSelector } from '../../store/basket/basketSelectors'
import { getTotalFavoritesCount } from '../../store/favorites/favoritesSelectors'
import { getFavorites } from '../../store/favorites/favoritesActions'

export default function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const catalog = useSelector(getCatalog)

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [searchPopperOpen, setSearchPopperOpen] = useState(false)
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  const totalCount = useSelector(totalCountSelector)
  const totalFavoriteCount = useSelector(getTotalFavoritesCount)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const { firstName: userFirstName, lastName: userLastName } = useSelector(
    getUserData
  )

  const isMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    dispatch(loadCatalog())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) dispatch(getFavorites())
  }, [dispatch, isAuthenticated])

  const handleChangeCategoryTab = (event, newValue) => {
    setValue(newValue)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickSignIn = () => {
    dispatch(openModal(<Login />))
    handleMenuClose()
  }

  const handleClickSignOut = () => {
    handleMenuClose()
    dispatch(signOut())
  }

  const handleSearchOpen = () => {
    setSearchPopperOpen(true)
  }

  const menuId = 'primary-search-account-menu'

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? (
        <div className={classes.menuCustomerTitleWrapper}>
          <Typography className={classes.customerFullName}>
            {userFirstName} {userLastName}
          </Typography>
          ,
          <Divider key="menu-user-divider" />
        </div>
      ) : null}
      <MenuItem
        key="menu-basket"
        component={Link}
        to="/basket"
        onClick={handleMenuClose}
      >
        <IconButton aria-label="show qty product in cart" color="inherit">
          <Badge badgeContent={totalCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isAuthenticated ? (
        [
          <MenuItem
            key="menu-auth-favorites"
            component={Link}
            to="/customer/profile/favorites"
            onClick={handleMenuClose}
          >
            <IconButton
              aria-label="show qty product in favorites"
              color="inherit"
            >
              <Badge badgeContent={totalFavoriteCount} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <p>Favorites</p>
          </MenuItem>,
          <MenuItem
            key="menu-auth-profile"
            component={Link}
            to="/customer/profile/user"
            onClick={handleMenuClose}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>,
          <Divider key="menu-auth-divider" />,
          <MenuItem
            key="menu-auth-signout"
            component={Link}
            to="/"
            onClick={handleClickSignOut}
          >
            <IconButton
              aria-label="SignOut for current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
            <p>SignOut</p>
          </MenuItem>,
        ]
      ) : (
        <MenuItem key="menu-auth-signin" onClick={handleClickSignIn}>
          <IconButton
            aria-label="SignIn for current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>SignIn</p>
        </MenuItem>
      )}
    </Menu>
  )
  const downTab = (
    <Tabs
      indicatorColor={'primary'}
      onChange={handleChangeCategoryTab}
      value={value}
    >
      {catalog.map((item) => {
        return (
          <Tab
            key={item._id}
            component={Link}
            to={item.url}
            label={item.name}
            classes={{
              root: classes.tab,
              selected: classes.selectedTab,
            }}
          />
        )
      })}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      variant={openDrawer ? 'permanent' : 'temporary'}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
    >
      <div className={classes.drawerHeader}>
        <p>Categories</p>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </div>
      <Divider classes={{ root: classes.dividerThik }} />
      <List component="nav" disablePadding>
        {catalog.map((item) => (
          <ListItem
            key={item.id}
            component={Link}
            to={item.url}
            divider
            button
            onClick={() => {
              setOpenDrawer(false)
              setValue(value)
            }}
            classes={{
              selected: classes.drawerItemSelected,
              divider: classes.dividerThin,
            }}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              {item.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const searchPopper = (
    <Popper
      id="search-popper-extra-small"
      open={searchPopperOpen}
      anchorEl={document.body}
      className={classes.searchPopper}
    >
      <div className={classes.searchPopperContent}>
        <ClickAwayListener onClickAway={() => setSearchPopperOpen(false)}>
          <div>
            <SearchBar close={() => setSearchPopperOpen(false)} />
          </div>
        </ClickAwayListener>
      </div>
    </Popper>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.drawerMenuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Button
            style={{ padding: 0 }}
            component={Link}
            to={'/'}
            className={classes.logoContainer}
            onClick={() => setValue(0)}
            disableRipple
          >
            <img alt="company logo" src={logo} className={classes.logo} />
          </Button>
          <div className={classes.grow} />
          <div className={classes.searchAppBar}>
            {!searchPopperOpen ? <SearchBar /> : null}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              component={Link}
              to={'/basket'}
              aria-label="show qty product in cart"
              color="inherit"
            >
              <Badge badgeContent={totalCount} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <IconButton
                component={Link}
                to={'/customer/profile/favorites'}
                aria-label="show qty product in favorites"
                color="inherit"
              >
                <Badge badgeContent={totalFavoriteCount} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            ) : null}

            <div className={classes.accountButton}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {isAuthenticated ? (
                <div className={classes.customerTitleWrapper}>
                  <Typography className={classes.customerFirstName} noWrap>
                    {userFirstName}
                  </Typography>
                  <Typography className={classes.customerLastName} noWrap>
                    {userLastName}
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.sectionExtraSmall}
              aria-label="search-popper"
              aria-controls="search-popper-extra-small"
              aria-haspopup="true"
              onClick={handleSearchOpen}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar
          variant="dense"
          className={classes.sectionDesktop}
          classes={{ root: classes.categoryToolbar }}
        >
          {downTab}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {drawer}
      {searchPopper}
    </div>
  )
}
