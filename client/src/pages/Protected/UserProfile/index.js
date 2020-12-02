import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom'
import useStyles from './styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AccountCircle from '@material-ui/icons/AccountCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocalMallIcon from '@material-ui/icons/LocalMall'

import PersonalInformation from '../../../components/PersonalInformation'
import OrdersList from '../../../components/Order/OrdersList'
import Favorites from '../../../components/Favorites'

import { getUserData } from '../../../store/user/userSelectors'
import { getCustomer } from '../../../store/user/userActions'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.element,
  value: PropTypes.number,
  index: PropTypes.number,
}

function UserProfile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(getCustomer())
  }, [dispatch])

  const upMD = useMediaQuery(useTheme().breakpoints.up('md'))
  const upSM = useMediaQuery('(min-width:500px)')

  const [tabIndex, setTabIndex] = useState(
    slug === 'orders' ? 1 : slug === 'favorites' ? 2 : 0
  )

  useEffect(() => {
    setTabIndex(slug === 'orders' ? 1 : slug === 'favorites' ? 2 : 0)
  }, [slug])

  const { firstName: userFirstName, lastName: userLastName } = useSelector(
    getUserData
  )
  const totalCartCount = useSelector(({ basket }) => basket.totalCount)

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex)
    history.push(
      newTabIndex === 1
        ? '/customer/profile/orders'
        : newTabIndex === 2
        ? '/customer/profile/favorites'
        : '/customer/profile/user'
    )
  }

  return (
    <Container className={classes.root}>
      <Paper>
        <Box className={classes.title_box}>
          <Typography variant="h4" style={{ marginBottom: '1%' }}>
            Personal profile
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" component={RouterLink} to="/">
              Main
            </Link>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/customer/profile"
            >
              Personal profile
            </Link>
          </Breadcrumbs>
        </Box>
      </Paper>

      <Paper className={classes.tabsRoot}>
        <div className={classes.tabsWrapper}>
          <div value={tabIndex} index={-1} className={classes.tabsTitle}>
            <div className={classes.tabsTitleNameWrapper}>
              <Typography className={classes.tabsTitleNameLabel}>
                Welcome,
              </Typography>
              <Typography className={classes.tabsTitleName}>
                {userFirstName} {userLastName}
              </Typography>
            </div>
            <div className={classes.tabsTitleCart}>
              <ShoppingBasketIcon className={classes.tabsIcon} />
              <Link color="inherit" component={RouterLink} to="/basket">
                {`${totalCartCount} products in the cart`}
              </Link>
            </div>
          </div>
          <Tabs
            orientation={upMD ? 'vertical' : 'horizontal'}
            variant="scrollable"
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="Vertical tabs"
            classes={{
              indicator: classes.tabsIndicator,
              flexContainer: classes.tabs,
            }}
          >
            <Tab
              icon={<AccountCircle className={classes.tabsIcon} />}
              label={upSM ? 'Personal Information' : null}
              id="vertical-tab-0"
              aria-controls="vertical-tabpanel-2"
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabLabelIconWrapper,
                selected: classes.tabSelected,
              }}
            />
            <Tab
              icon={<LocalMallIcon className={classes.tabsIcon} />}
              label={upSM ? 'Orders' : null}
              id="vertical-tab-1"
              aria-controls="vertical-tabpanel-2"
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabLabelIconWrapper,
                selected: classes.tabSelected,
              }}
            />
            <Tab
              icon={<FavoriteIcon className={classes.tabsIcon} />}
              label={upSM ? 'Favorites' : null}
              id="vertical-tab-1"
              aria-controls="vertical-tabpanel-2"
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabLabelIconWrapper,
                selected: classes.tabSelected,
              }}
            />
          </Tabs>
        </div>
        <TabPanel value={tabIndex} index={0} className={classes.tabPanel}>
          <PersonalInformation />
        </TabPanel>
        <TabPanel value={tabIndex} index={1} className={classes.tabPanel}>
          <OrdersList />
        </TabPanel>
        <TabPanel value={tabIndex} index={2} className={classes.tabPanel}>
          <Favorites />
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default UserProfile
