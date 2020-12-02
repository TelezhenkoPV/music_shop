export const getIsLoading = (store) => store.favorites.isProceed
export const favoriteProducts = (store) =>
  store.favorites.data ? store.favorites.data.products : []
export const getIsInFavorites = (store, id) =>
  store.favorites.data &&
  store.favorites.data.products &&
  store.favorites.data.products.map((prod) => prod._id).includes(id)
export const getTotalFavoritesCount = (store) =>
  store.favorites.data && store.favorites.data.products
    ? store.favorites.data.products.length
    : 0
