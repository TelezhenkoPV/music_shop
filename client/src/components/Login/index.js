import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import InputIcon from '@material-ui/icons/Input'
import PersonPinIcon from '@material-ui/icons/PersonPin'

import SignUp from './SignUp'
import SignIn from './SignIn'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: '0px 0px 0px 0px',
    width: '100%',
  },
  Tab: {
    color: theme.palette.grays.black,
    flexDirection: 'row',
    boxShadow: 'inset 0px -6px 8px -5px rgba(0,0,0,1)',
    fontWeight: 'bold',
  },
  iconLabelWrapper: {
    flexDirection: 'row',
  },
  tabIcon: {
    marginRight: theme.spacing(1),
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mx="auto" p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

function Login() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="icon label tabs"
      >
        <Tab
          classes={{
            root: classes.Tab,
            selected: classes.selectedTab,
            wrapper: classes.iconLabelWrapper,
          }}
          variant="contained"
          icon={<InputIcon className={classes.tabIcon} />}
          label="ВХОД"
        />
        <Tab
          classes={{
            root: classes.Tab,
            selected: classes.selectedTab,
            wrapper: classes.iconLabelWrapper,
          }}
          variant="contained"
          icon={<PersonPinIcon className={classes.tabIcon} />}
          label="РЕГИСТРАЦИЯ"
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <SignIn />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp />
      </TabPanel>
    </div>
  )
}

export default Login
