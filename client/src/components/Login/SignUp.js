import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// import * as yup from 'yup'
// import { Formik, Form, Field } from 'formik'
// import { TextField, CheckboxWithLabel } from 'formik-material-ui'

// import { makeStyles } from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'
// import Button from '@material-ui/core/Button'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import LinearProgress from '@material-ui/core/LinearProgress'
// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { signUp } from '../../store/user/userActions'
// import { closeModal } from '../../store/modal/modalAction'

// import {
//   getIsSignUpProceed,
//   getSignUpError,
// } from '../../store/user/userSelectors'

const SignUp = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    password: '',
    telephone: '',
    gender: '',
    isAdmin: false,
  })

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setUserData({ ...userData, [event.target.name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(signUp(userData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up For An Account</h1>

      <label>FirstName</label>
      <input
        name="firstName"
        placeholder="firstName"
        value={userData.firstName}
        onChange={handleChange}
      />
      <br />

      <label>LastName</label>
      <input
        name="lastName"
        placeholder="lastName"
        value={userData.lastName}
        onChange={handleChange}
      />
      <br />

      <label>Login</label>
      <input
        name="login"
        placeholder="login"
        value={userData.login}
        onChange={handleChange}
      />
      <br />

      <label>Email</label>
      <input
        name="email"
        placeholder="email"
        value={userData.email}
        onChange={handleChange}
      />
      <br />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
      />
      <br />

      <label>Telephone</label>
      <input
        name="telephone"
        placeholder="telephone"
        value={userData.telephone}
        onChange={handleChange}
      />
      <br />

      <label>Gender</label>
      <input
        name="gender"
        placeholder="gender"
        value={userData.gender}
        onChange={handleChange}
      />
      <br />

      <label>isAdmin</label>
      <input
        type="checkbox"
        checked={userData.isAdmin}
        name="isAdmin"
        placeholder="isAdmin"
        onChange={handleChange}
      />
      <br />

      <input type="submit" />
    </form>
  )
}

export default SignUp
