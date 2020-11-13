export const createPathnameFromFiltersData = (
  history,
  filtersCategories,
  filtersColors,
  minPrice,
  maxPrice
) => {
  if (filtersCategories.length === 0) {
    filtersCategories = ['emptyCategory']
  }

  const categoriesPath = filtersCategories.join(',')

  if (filtersColors.length > 0) {
    const colorsPath = filtersColors.join(',')

    return history.push({
      pathname: `/products/${categoriesPath}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${colorsPath}`,
    })
  } else {
    return history.push({
      pathname: `/products/${categoriesPath}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    })
  }
}
