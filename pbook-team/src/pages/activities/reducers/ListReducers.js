import { combineReducers } from 'redux'
import {
  GET_LIST,
  SET_VISIBILITY_FILTER,
  VisibilityFilterType,
} from '../actions/ListActions'
const { SHOW_ACTIVE } = VisibilityFilterType

const listData = (state = [], action) => {
  switch (action.type) {
    case GET_LIST:
      return action.listData
    default:
      return state
  }
}
const visibilityFilter = (state = [SHOW_ACTIVE], action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return [...state, action.visibilityFilter]
    default:
      return state
  }
}
const ListReducer = combineReducers({ listData, visibilityFilter })
export default ListReducer
