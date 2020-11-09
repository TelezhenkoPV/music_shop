import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getIsAuthenticated } from '../../store/user/userSelectors'

import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import logo from '../../assets/logo.svg'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  accountButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  customerTitle: {
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // width: 'auto',
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingLeft: '7px',
  },
  customerFirstName: {
    fontSize: '0.6rem',
  },
  customerLastName: {
    fontSize: '0.7rem',
  },
  search: {
    flexGrow: 2,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
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
  logo: {
    height: '72px',
    padding: theme.spacing(1),
  },
}))

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  //   const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const totalCartCount = useSelector(({ basket }) => basket.totalCount)
  const totalFavoriteCount = useSelector(({ favorite }) => 0)
  const isAuthenticated = useSelector(getIsAuthenticated)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
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
        <p>Cart</p>
      </MenuItem>
      {isAuthenticated ? (
        <>
          <MenuItem>
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
            <p>Favorites</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>SignOut</p>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
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

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
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
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {isAuthenticated ? (
                <div className={classes.customerTitle}>
                  <Typography className={classes.customerFirstName} noWrap>
                    Михаил
                  </Typography>
                  <Typography className={classes.customerLastName} noWrap>
                    Щербина
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
