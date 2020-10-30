import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/user/userActions'

const SignUp = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: 'ТестовоеИмя',
    lastName: 'ТестоваяФамилия',
    login: 'testtest',
    email: 'test@gmail.com',
    password: 'testtest',
    telephone: '+380121112233',
    gender: 'male',
    isAdmin: false,
  })

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
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
