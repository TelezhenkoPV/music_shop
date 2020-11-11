const initialStore = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
}

const getTotalPrice = (arr) =>
  arr.reduce((sum, obj) => obj.currentPrice + sum, 0)

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.')
  return keys.reduce((val, key) => {
    return val[key]
  }, obj[firstKey])
}

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path)
    return sum + value
  }, 0)
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'SET_TOTAL_PRICE':
      return { ...store, totalPrice: action.payload }
    case 'SET_TOTAL_COUNT':
      return { ...store, totalCount: action.payload }
    case 'ADD_PRODUCT_TO_BASKET': {
      const currentProductItems = !store.items[action.payload._id]
        ? [action.payload]
        : [...store.items[action.payload._id].items, action.payload]

      const newItems = {
        ...store.items,
        [action.payload._id]: {
          items: currentProductItems,
          totalPrice: getTotalPrice(currentProductItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...store,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }
    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...store.items,
      }
      const currentTotalPrice = newItems[action.payload].totalPrice
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload]
      return {
        ...store,
        items: newItems,
        totalPrice: store.totalPrice - currentTotalPrice,
        totalCount: store.totalCount - currentTotalCount,
      }
    }
    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...store.items[action.payload].items,
        store.items[action.payload].items[0],
      ]
      const newItems = {
        ...store.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...store,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }
    case 'MINUS_CART_ITEM': {
      const oldItems = store.items[action.payload].items
      const newObjItems =
        oldItems.length > 1
          ? store.items[action.payload].items.slice(1)
          : oldItems
      const newItems = {
        ...store.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = getTotalSum(newItems, 'items.length')
      const totalPrice = getTotalSum(newItems, 'totalPrice')

      return {
        ...store,
        items: newItems,
        totalCount,
        totalPrice,
      }
    }
    default:
      return store
  }
}

export default reducer
