import { combineReducers } from 'redux'
import { CATEGORIES_RECEIVE, CATEGORIES_REQUEST } from './ShopActions'

function cg(
  state = {
    isFetching: false,
    didInvalidate: false,
    cgName: [],
    id: [],
  },
  action
) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case CATEGORIES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        cgName: action.cgData.name,
        id: action.cgData.sid,
        lastUpdated: action.receivedAt,
      }
    default:
      return state
  }
}

function cgData(state = [], action) {
  switch (action.type) {
    case CATEGORIES_RECEIVE:
    case CATEGORIES_REQUEST:
      return {
        ...state,
        [action.payload]: cg(state[action.payload], action),
      }
    default:
      return state
  }
}

const ShopReducers = { cgData }

export default ShopReducers
