// import { combineReducers } from 'redux'
import { SET_VISIBILITY_FILTER, VisibilityFilterType } from './AcActions'
import { SET_AC_TYPE, acTypeConst } from './AcActions'
// import { AC_REQUEST, AC_RECEIVE } from './AcActions'
import { AC_LIST_ACTION_TYPE } from './AcActions'
const {
  AC_LIST_REQUEST,
  AC_LIST_SUCCESS,
  AC_LIST_FAILURE,
} = AC_LIST_ACTION_TYPE

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
// function ac(
//   state = {
//     isFetching: false,
//     didInvalidate: false,
//     items: [],
//   },
//   action
// ) {
//   switch (action.type) {
//     case AC_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         didInvalidate: false,
//       }
//     case AC_RECEIVE:
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.ac,
//         lastUpdated: action.receivedAt,
//       }
//     default:
//       return state
//   }
// }
// function acData(state = iniAcData, action) {
//   switch (action.type) {
//     case AC_RECEIVE:
//     case AC_REQUEST:
//       return {
//         ...state,
//         [action.acType]: ac(state[action.acType], action),
//       }
//     default:
//       return state
//   }
// }

// middleware 版本 ac_list fetch
function acData(state = iniAcData, action) {
  switch (action.type) {
    case AC_LIST_REQUEST:
    case AC_LIST_SUCCESS:
      return {
        ...state,
        [action.acType]: acListFetch(state[action.acType], action),
      }
    default:
      return state
  }
}
function acListFetch(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case AC_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case AC_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt,
      }
    default:
      return state
  }
}

const ListReducer = { visibilityFilter, acType, acData }
export default ListReducer
