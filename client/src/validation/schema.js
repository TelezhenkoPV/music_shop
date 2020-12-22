import * as Yup from 'yup'

export const luhnCheck = (val) => {
  let sum = 0
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1))
    if (i % 2 === 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return sum % 10 === 0
}

export const creditCardExpireDateCheck = (expirationDate) => {
  if (!expirationDate) {
    return false
  }

  const today = new Date()
  const monthToday = today.getMonth() + 1
  const yearToday = today.getFullYear().toString().substr(-2)

  const [expMonth, expYear] = expirationDate.split('/')

  if (Number(expMonth) > 12) {
    return false
  }

  if (Number(expYear) < Number(yearToday)) {
    return false
  } else if (
    Number(expMonth) < monthToday &&
    Number(expYear) === Number(yearToday)
  ) {
    return false
  }

  return true
}

export const schemaSignIn = Yup.object().shape({
  loginOrEmail: Yup.string()
    .required('Please provide Login or Email')
    .min(3, 'Min length of login or email is 3 char'),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password min length 7 chars')
    .max(30, 'Password max length 30 chars')
    .matches(/^[a-zA-Z0-9]+$/, 'Permitted chars: a-z, A-Z, 0-9'),
})

export const schemaSignUp = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must have at least 2 chars')
    .max(25, 'Max length of first name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must have at least 2 chars')
    .max(25, 'Max length of last name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  middleName: Yup.string()
    .min(2, 'Middle name must have at least 2 chars')
    .max(25, 'Max length of middle name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  telephone: Yup.string().matches(
    /^\+380\d{3}\d{2}\d{2}\d{2}$/,
    'Use template +380XXXXXXXXX'
  ),
  email: Yup.string().required('Email is required').email('Email is incorrect'),
  login: Yup.string()
    .required('Login is required')
    .min(3, 'Login min length 3 chars')
    .max(10, 'Login max length 10 chars')
    .matches(/^[a-zA-Z0-9]+$/, 'Permitted chars: a-z, A-Z, 0-9'),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password min length 7 chars')
    .max(30, 'Password max length 30 chars')
    .matches(/^[a-zA-Z0-9]+$/, 'Permitted chars: a-z, A-Z, 0-9'),
  confirmPassword: Yup.string()
    .required('Confirm password')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
})

export const schemaChangePassword = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password min length 7 chars')
    .max(30, 'Password max length 30 chars')
    .matches(/^[a-zA-Z0-9]+$/, 'Permitted chars: a-z, A-Z, 0-9'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(7, 'Password min length 7 char')
    .max(30, 'Password max length 30 chars')
    .matches(/^[a-zA-Z0-9]+$/, 'Permitted chars: a-z, A-Z, 0-9'),
  confirmPassword: Yup.string()
    .required('Confirm password')
    .oneOf([Yup.ref('newPassword'), null], 'Password does not match'),
})

export const schemaPersonalInformation = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must have at least 2 chars')
    .max(25, 'Max length of first name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must have at least 2 chars')
    .max(25, 'Max length of last name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  middleName: Yup.string()
    .min(2, 'Middle name must have at least 2 chars')
    .max(25, 'Max length of middle name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  telephone: Yup.string().matches(
    /^\+380\d{3}\d{2}\d{2}\d{2}$/,
    'Use template +380XXXXXXXXX'
  ),
  email: Yup.string().required('Email is required').email('Email is incorrect'),
  creditCard: Yup.array().of(
    Yup.object().shape({
      cardNumber: Yup.string()
        .required('Card number is required')
        .test(
          'test-credit-card-number',
          'Credit Card number is invalid',
          (value) => luhnCheck(value.replace(/\s/g, ''))
        ),
      expiryDate: Yup.string()
        .required('Credit Card expiration date is required')
        .test(
          'test-credit-card-expiration-date',
          'Invalid Expiration Date',
          (expirationDate) => creditCardExpireDateCheck(expirationDate)
        ),
    })
  ),
})

export const schemaOrderCustomer = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must have at least 2 chars')
    .max(25, 'Max length of first name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  lastName: Yup.string()
    .min(2, 'Last name must have at least 2 chars')
    .max(25, 'Max length of last name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  middleName: Yup.string()
    .max(25, 'Max length of middle name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Permitted chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  telephone: Yup.string().matches(
    /^\+380\d{3}\d{2}\d{2}\d{2}$/,
    'Use template +380XXXXXXXXX'
  ),
  email: Yup.string().email('Email is incorrect'),
})

export const schemaOrderShippingAddress = Yup.object().shape({
  address: Yup.string().required('Please provide delivery address'),
})
