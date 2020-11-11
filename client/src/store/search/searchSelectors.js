export const searchData = (store) => store.search.searchData
export const searchDataShort = (store) =>
  store.search.searchData.map((item) => item.name)
export const searchIsLoading = (store) => store.search.isLoading
