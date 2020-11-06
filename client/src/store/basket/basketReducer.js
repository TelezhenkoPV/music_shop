const initialStore = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
}

const getTotalPrice = (arr) =>
  arr.reduce((sum, obj) => obj.currentPrice + sum, 0)

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'SET_TOTAL_PRICE':
      return { ...store, totalPrice: action.payload }
    case 'SET_TOTAL_COUNT':
      return { ...store, totalCount: action.payload }
    case 'ADD_PRODUCT_TO_BASKET': {
      const currentProductItems = !store.items[action.payload.id]
        ? [action.payload]
        : [...store.items[action.payload.id].items, action.payload]

      const newItems = {
        ...store.items,
        [action.payload.id]: {
          items: currentProductItems,
          totalPrice: getTotalPrice(currentProductItems),
        },
      }

      const items = Object.values(newItems).map((obj) => obj.items)
      const allProducts = [].concat.apply([], items)
      const totalPrice = getTotalPrice(allProducts)

      return {
        ...store,
        items: newItems,
        totalCount: allProducts.length,
        totalPrice,
      }
    }
    case 'REMOVE_CART_ITEM':
      // eslint-disable-next-line no-case-declarations
      const newItems = {
        ...store.items,
      }
      // eslint-disable-next-line no-case-declarations
      const currentTotalPrice = newItems[action.payload].totalPrice
      // eslint-disable-next-line no-case-declarations
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload]
      return {
        ...store,
        items: newItems,
        totalPrice: store.totalPrice - currentTotalPrice,
        totalCount: store.totalCount - currentTotalCount,
      }
    default:
      return store
  }
}

export default reducer
