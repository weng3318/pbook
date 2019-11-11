import { CATEGORIES_RECEIVE, CATEGORIES_REQUEST } from './ShopActions'

function cg(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case CATEGORIES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_RECEIVE:
    case CATEGORIES_REQUEST:
      return {
        ...state,
        ...cg(state[action], action),
      }
    default:
      return state
  }
}

const ShopReducers = { categories }

export default ShopReducers
