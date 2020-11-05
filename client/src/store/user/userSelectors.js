export const getIsAuthenticated = (store) => !!store.user.token
export const getIsAdmin = (store) => store.user.data.isAdmin

export const getIsSignInProceed = (store) => store.user.isSignInProceed
export const getSignInError = (store) => store.user.errors.signIn

export const getIsSignUpProceed = (store) => store.user.isSignUpProceed
export const getSignUpError = (store) => store.user.errors.signUp
