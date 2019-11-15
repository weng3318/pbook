// import { combineReducers } from 'redux'
import { SET_VISIBILITY_FILTER, VisibilityFilterType } from './AcActions'
import { SET_AC_TYPE, acTypeConst } from './AcActions'
// import { AC_REQUEST, AC_RECEIVE } from './AcActions'
import { FETCH_AC_LIST_BASIC_NAME } from './AcActions'
import { GET_DISCOUNT_BOOKS_BASIC_NAME } from './AcActions'

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
let initAcData = {
  discount: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    data: [],
  },
  offline: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    data: [],
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

// function acData(state = initAcData, action) {
//   switch (action.type) {
//     case AC_LIST_REQUEST:
//     case AC_LIST_SUCCESS:
//       return {
//         ...state,
//         [action.acType]: acListFetch(state[action.acType], action),
//       }
//     default:
//       return state
//   }
// }

// function acListFetch(
//   state = {
//     isFetching: false,
//     didInvalidate: false,
//     items: [],
//   },
//   action
// ) {
//   switch (action.type) {
//     case AC_LIST_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         didInvalidate: false,
//       }
//     case AC_LIST_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.data,
//         lastUpdated: action.receivedAt,
//       }
//     default:
//       return state
//   }
// }

// fetch reducer creator
const acData = fetchReducetCreator(FETCH_AC_LIST_BASIC_NAME, initAcData)
const discountBooks = fetchReducetCreator(GET_DISCOUNT_BOOKS_BASIC_NAME)

function fetchReducetCreator(basicActionName, initState = {}) {
  const actionRequest = basicActionName + '_REQUEST'
  const actionSuccess = basicActionName + '_SUCCESS'
  const actionFailure = basicActionName + '_FAILURE'
  const fetchReducer = (state = initState, action) => {
    if (action.rootName) {
      return {
        ...state,
        [action.rootName]: fetchReducerHelper(state[action.rootName], action),
      }
    }
    return {
      ...state,
      ...fetchReducerHelper(state, action),
    }
  }

  const fetchReducerHelper = (state, action) => {
    switch (action.type) {
      case actionRequest:
        return {
          ...state,
          isFetching: true,
          didInvalidate: false,
        }
      case actionSuccess:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          lastUpdated: action.receivedAt,
          data: action.data !== undefined ? action.data : null,
        }
      case actionFailure:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          error: action.error.toString(),
        }
      default:
        return state
    }
  }
  return fetchReducer
}

const ListReducer = { visibilityFilter, acType, acData, discountBooks }
export default ListReducer
