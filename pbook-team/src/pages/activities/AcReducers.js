import { combineReducers } from 'redux'
import { SET_VISIBILITY_FILTER, VisibilityFilterType } from './AcActions'
import { SET_AC_TYPE, acTypeConst } from './AcActions'
import { AC_REQUEST, AC_RECEIVE } from './AcActions'

// visibilityFiler
const { SHOW_ACTIVE } = VisibilityFilterType
const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.visibilityFilter
    default:
      return state
  }
}
// set ac type
const { OFFLINE } = acTypeConst
const acType = (state = OFFLINE, action) => {
  switch (action.type) {
    case SET_AC_TYPE:
      return action.acType
    default:
      return state
  }
}

// fetch list data
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

let iniAcData = {
  discount: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    items: [],
  },
  offline: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    items: [],
  },
}
function acData(state = iniAcData, action) {
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

const ListReducer = { visibilityFilter, acType, acData }
export default ListReducer
