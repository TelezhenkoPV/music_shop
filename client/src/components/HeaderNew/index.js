import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import Popper from '@material-ui/core/Popper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import tabLinks from '../Header/utilities'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchBar from '../SearchBar'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getIsAuthenticated, getUserData } from '../../store/user/userSelectors'
import { signOut } from '../../store/user/userActions'

import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import logo from '../../assets/logo.svg'
import Login from '../Login'
import { openModal } from '../../store/modal/modalAction'

const useStyles = makeStyles((theme) => ({
  appBar: {
    minWidth: '320px',
    backgroundColor: theme.palette.primary.dark,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  accountButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  customerTitle: {
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingLeft: '7px',
  },
  menuCustomerTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
  },
  customerFirstName: {
    fontSize: '0.6rem',
  },
  customerLastName: {
    fontSize: '0.7rem',
  },
  customerName: {
    fontSize: '0.8rem',
  },
  search: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      margin: theme.spacing(0, 3),
      width: 'auto',
      flexGrow: 2,
      position: 'relative',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '50ch',
  //   },
  // },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionExtraSmall: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    height: '72px',
    padding: theme.spacing(1),
    flexShrink: 0,
  },

  categoryToolbar: {
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    minWidth: 0,
    width: '150px',
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.dark,
  },
  searchPopper: {
    width: 'calc(100vw - 50px)',
    height: '62px',
    backgroundColor: theme.palette.primary.dark,
  },
}))

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [searchPopperOpen, setSearchPopperOpen] = useState(false)
  const handleChange = (event, newValue) => setValue(newValue)

  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  const totalCartCount = useSelector(({ basket }) => basket.totalCount)
  const totalFavoriteCount = useSelector(({ favorite }) => 0)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const { firstName: userFirstName, lastName: userLastName } = useSelector(
    getUserData
  )

  const isMenuOpen = Boolean(anchorEl)

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

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickProfile = (event) => {
    history.push('/profile')
    handleMenuClose()
  }

  const handleClickCart = () => {
    history.push('/basket')
    handleMenuClose()
  }

  const handleClickFavorites = () => {
    history.push('/favorites')
    handleMenuClose()
  }

  const handleClickSignIn = () => {
    dispatch(openModal(<Login />))
    handleMenuClose()
  }

  const handleClickSignOut = () => {
    dispatch(signOut())
    handleMenuClose()
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
        <div className={classes.menuCustomerTitle}>
          <Typography className={classes.customerName}>
            {userFirstName} {userLastName}
          </Typography>
          ,
          <Divider key="menu-user-divider" />
        </div>
      ) : null}
      <MenuItem onClick={handleClickCart}>
        <IconButton aria-label="show qty product in cart" color="inherit">
          <Badge badgeContent={totalCartCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isAuthenticated ? (
        [
          <MenuItem key="menu-auth-favorites" onClick={handleClickFavorites}>
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
          <MenuItem key="menu-auth-profile" onClick={handleClickProfile}>
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
          <MenuItem key="menu-auth-signout" onClick={handleClickSignOut}>
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
    <Tabs indicatorColor={'primary'} onChange={handleChange} value={value}>
      {tabLinks.map((tab, index) => {
        return (
          <Tab
            key={`${tab}${index}`}
            component={Link}
            to={tab.to}
            label={tab.label}
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
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        className={classes.sectionMobile}
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
    </>
  )

  const searchPopper = (
    <Popper
      id="search-extra-small"
      open={searchPopperOpen}
      anchorEl={document.body}
    >
      <div className={classes.searchPopper}>
        <ClickAwayListener onClickAway={() => setSearchPopperOpen(false)}>
          <div>
            <SearchBar />
          </div>
        </ClickAwayListener>
      </div>
    </Popper>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
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
          <div className={classes.search}>
            <SearchBar />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              component={Link}
              to={'/basket'}
              aria-label="show qty product in cart"
              color="inherit"
            >
              <Badge badgeContent={totalCartCount} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <IconButton
                component={Link}
                to={'/favorites'}
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
                <div className={classes.customerTitle}>
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
              aria-label="search"
              aria-controls="search-extra-small"
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
