export const getUrlParams = (url) => {
  const vars = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value
  })
  return vars
}

export const objToQueryString = (obj, baseUrl) => {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => {
      return `${acc}${key}=${Array.isArray(value) ? value.toString() : value}&`
    }, baseUrl)
    .slice(0, -1)
}

export const toggleItemInArr = (item, filterName, obj) => {
  console.log('item, filterName, obj', item, filterName, obj)
  if (filterName === 'minPrice' || filterName === 'maxPrice') {
    obj[filterName] = [item]
    return obj
  }

  if (obj[filterName] === undefined) {
    obj[filterName] = [item]
  } else if (!obj[filterName].includes(item)) {
    obj[filterName].push(item)
  } else {
    const index = obj[filterName].findIndex((elem) => elem === item)
    obj[filterName].splice(index, 1)
    if (
      obj[filterName].length === 1 &&
      obj[filterName][0] === '' &&
      filterName !== 'categories'
    ) {
      console.log('obj[filterName]', obj[filterName])
      delete obj[filterName]
    }
  }
  return obj
}
