import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'

import AddressDelivery from './addressDelivery'
import NovaPoshta from './novaPoshta'

import { getShippingMethod } from '../../../store/order/orderSelectors'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

TabPanel.propTypes = {
  values: PropTypes.number,
  index: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
}

export default function Shipping() {
  const classes = useStyles()

  const shippingMethods = ['addressDelivery', 'novaPoshta']
  const selectedShippingMethod = useSelector(getShippingMethod)
  const [tabIndex, setTabIndex] = useState(
    shippingMethods.indexOf(selectedShippingMethod.key || shippingMethods[0])
  )

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex)
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Shipping</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <Tabs
        orientation={'horizontal'}
        centered
        value={tabIndex}
        onChange={handleChangeTab}
        aria-label="Shipping method tabs"
        classes={{
          root: classes.tabs,
        }}
      >
        <Tab
          label="Address delivery"
          id="tab-0"
          aria-controls="tabpanel-0"
          classes={{
            root: classes.tabRoot,
            selected: classes.tabSelected,
          }}
        />
        <Tab
          label="Nova Poshta"
          id="tab-1"
          aria-controls="tabpanel-1"
          classes={{
            root: classes.tabRoot,
            selected: classes.tabSelected,
          }}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={classes.tabPanel}>
        <AddressDelivery />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.tabPanel}>
        <NovaPoshta />
      </TabPanel>
    </div>
  )
}
