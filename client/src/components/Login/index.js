import React from 'react'
import useStyles from './styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import InputIcon from '@material-ui/icons/Input'
import PersonPinIcon from '@material-ui/icons/PersonPin'

import SignUp from './SignUp'
import SignIn from './SignIn'

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
      {value === index && <Box mx="auto">{children}</Box>}
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
            labelIcon: classes.labelIcon,
          }}
          variant="contained"
          icon={<InputIcon className={classes.tabIcon} />}
          label="SIGNIN"
        />
        <Tab
          classes={{
            root: classes.Tab,
            selected: classes.selectedTab,
            wrapper: classes.iconLabelWrapper,
            labelIcon: classes.labelIcon,
          }}
          variant="contained"
          icon={<PersonPinIcon className={classes.tabIcon} />}
          label="SIGNUP"
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
