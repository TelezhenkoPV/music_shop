export const getIsAuthenticated = (store) => store.user.isAuthenticated
export const getIsAdmin = (store) => store.user.data.isAdmin
export const getUserData = (store) => store.user.data

export const getIsSignInProceed = (store) => store.user.isSignInProceed
export const getSignInError = (store) => store.user.errors.signIn

export const getIsSignUpProceed = (store) => store.user.isSignUpProceed
export const getSignUpError = (store) => store.user.errors.signUp
export const getIsSignUpSuccessful = (store) =>
  store.user.errors.signUp === null

export const getIsProfileEdit = (store) => store.user.isProfileEdit

export const getIsUpdateProceed = (store) => store.user.isUpdateProceed
export const getUpdateError = (store) => store.user.errors.update
export const getIsUpdateSuccessful = (store) =>
  store.user.errors.update === null

export const getIsChangePasswordProceed = (store) =>
  store.user.isChangePasswordProceed
export const getChangePasswordError = (store) =>
  store.user.errors.changePassword
export const getIsChangePasswordSuccessful = (store) =>
  store.user.errors.changePassword === null
