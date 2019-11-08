import { combineReducers } from 'redux'
import { SET_VISIBILITY_FILTER, VisibilityFilterType } from './AcActions'
import { GET_LIST, AC_REQUEST, AC_RECEIVE } from './AcActions'
const { SHOW_ACTIVE } = VisibilityFilterType

const listData = (state = [], action) => {
  switch (action.type) {
    case GET_LIST:
      return action.listData
    default:
      return state
  }
}
const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.visibilityFilter
    default:
      return state
  }
}

function ac(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case AC_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case AC_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.ac,
        lastUpdated: action.receivedAt,
      }
    default:
      return state
  }
}

function acData(state = [], action) {
  switch (action.type) {
    case AC_RECEIVE:
    case AC_REQUEST:
      return {
        ...state,
        [action.acType]: ac(state[action.acType], action),
      }
    default:
      return state
  }
}

const ListReducer = combineReducers({ listData, visibilityFilter, acData })
export default ListReducer
