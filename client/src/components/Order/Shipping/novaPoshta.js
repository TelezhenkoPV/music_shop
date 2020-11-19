import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './novaPoshtaStyles'

import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import getNovaposhtaAPI from './novaPoshtaAPI'

import {
  getActiveStep,
  getIsNovaPoshtaSet as getIsShippingSet,
  getNovaPoshtaData as getShippingData,
} from '../../../store/order/orderSelectors'

import {
  setActiveStep,
  saveShippingData,
} from '../../../store/order/orderActions'

export default function NovaPoshta() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [loadingCity, setLoadingCity] = useState(false)
  const [loadingWarehouse, setLoadingWarehouse] = useState(false)

  const [optionsCity, setOptionsCity] = useState([''])
  const [optionsWarehouse, setOptionsWarehouse] = useState([''])

  const [inputCity, setInputCity] = useState('')
  const [inputWarehouse, setInputWarehouse] = useState('')

  const [city, setCity] = useState(optionsCity[0])
  const [warehouse, setWarehouse] = useState(optionsWarehouse[0])

  const activeStep = useSelector(getActiveStep)

  const isShippingSet = useSelector(getIsShippingSet)
  const shipping = useSelector(getShippingData)

  const back = () => {
    handleSubmit()
    dispatch(setActiveStep(activeStep - 1))
  }

  const next = () => {
    handleSubmit()
    dispatch(setActiveStep(activeStep + 1))
  }

  useEffect(() => {
    if (isShippingSet) {
      setCity(shipping.city)
      setWarehouse(shipping.warehouse)
      setOptionsCity([shipping.city])
      setOptionsWarehouse([shipping.warehouse])
    }
  }, [isShippingSet, shipping.city, shipping.warehouse])

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      getNovaposhtaAPI({
        type: 'city',
        filter: inputCity,
        setOptions: setOptionsCity,
        setLoading: setLoadingCity,
        dispatch,
      })
      if (city !== '' && city !== null)
        getNovaposhtaAPI({
          type: 'warehouse',
          filter: city,
          setOptions: setOptionsWarehouse,
          setLoading: setLoadingWarehouse,
          dispatch,
        })
    }, 500)
    return () => clearTimeout(searchTimeout)
  }, [dispatch, city, inputCity])

  const handleSubmit = () => {
    dispatch(
      saveShippingData({ type: 'novaPoshta', data: { city, warehouse } })
    )
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.marginBottom}
        value={city}
        onChange={(event, newValue) => {
          setCity(newValue)
          setWarehouse('')
          setInputWarehouse('')
          setOptionsWarehouse([''])
        }}
        inputValue={inputCity}
        onInputChange={(event, newInputValue) => {
          setInputCity(newInputValue)
        }}
        id="city"
        options={optionsCity}
        getOptionSelected={(option, value) => option === value || option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingCity ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Autocomplete
        className={classes.marginBottom}
        value={warehouse}
        onChange={(event, newValue) => {
          setWarehouse(newValue)
        }}
        inputValue={inputWarehouse}
        onInputChange={(event, newInputValue) => {
          setInputWarehouse(newInputValue)
        }}
        id="warehouse"
        options={optionsWarehouse}
        disabled={!city || city === ''}
        getOptionSelected={(option, value) => option === value || option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Warehouse"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingWarehouse ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={activeStep === 0}
          onClick={back}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!city || !warehouse}
          onClick={next}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
