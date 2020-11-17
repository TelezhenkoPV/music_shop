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

export const toggleItemInArr = (item, arrNameInObj, obj) => {
  console.log('item, arrNameInObj, obj', item, arrNameInObj, obj)
  if (!arrNameInObj.includes(item)) {
    arrNameInObj.push(item)
  } else {
    const index = arrNameInObj.findIndex((elem) => elem === item)
    arrNameInObj.splice(index, 1)
  }
  return obj
}
