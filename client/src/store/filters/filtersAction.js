import { FILTERS_SET_PARSED_FILTERS_PARAMS } from '../actionTypes'

export const setFilterActualFiltersParamsAction = (filtersParams) => (
  dispatch
) => {
  dispatch({ type: FILTERS_SET_PARSED_FILTERS_PARAMS, payload: filtersParams })
}
