import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'
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

import { getUserData } from '../../../store/user/userSelectors'

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

function UserProfile() {
  const classes = useStyles()

  const [tabIndex, setTabIndex] = useState(0)

  const { firstName: userFirstName, lastName: userLastName } = useSelector(
    getUserData
  )
  const totalCartCount = useSelector(({ basket }) => basket.totalCount)

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex)
  }

  return (
    <Container className={classes.root}>
      <Paper>
        <Box className={classes.title_box}>
          <Typography variant="h4" style={{ marginBottom: '1%' }}>
            Personal profile
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Main
            </Link>
            <Link color="textPrimary" aria-current="page">
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
              <Link color="inherit" href="/basket">
                {`${totalCartCount} products in the cart`}
              </Link>
            </div>
          </div>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="Vertical tabs"
            className={classes.tabs}
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              icon={<AccountCircle className={classes.tabsIcon} />}
              label="Personal Information"
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
              label="Orders"
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
              label="Favorites"
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
          My orders
        </TabPanel>
        <TabPanel value={tabIndex} index={2} className={classes.tabPanel}>
          Favorites
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default UserProfile
