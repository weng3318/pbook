// action type
export const GET_LIST = 'GET_LIST'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
// other const
export const VisibilityFilterType = {
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMING_SOON: 'SHOW_COMING_SOON',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
}
// action creator
export const getList = listData => ({
  type: GET_LIST,
  listData: listData,
})
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  listData: filter,
})
