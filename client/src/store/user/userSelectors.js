export const tokenSelector = (store) => store.user.token
export const isAuthenticatedSelector = (store) => store.user.isAutenticated
export const isAdminSelector = (store) => store.user.data.isAdmin
