export const getIsAuthenticated = (store) => !!store.user.token
export const getIsAdmin = (store) => store.user.data.isAdmin
