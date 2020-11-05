export const getIsAuthenticated = (store) => !!store.user.token
export const getIsSignInProceed = (store) => store.user.isSignInProceed
export const getSignInError = (store) => store.user.errors.signIn
export const getIsAdmin = (store) => store.user.data.isAdmin
