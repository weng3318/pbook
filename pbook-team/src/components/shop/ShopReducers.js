import {
  CATEGORIES_RECEIVE,
  CATEGORIES_REQUEST,
  SHOP_RECEIVE,
  SHOP_REQUEST,
  BOOKINFO_RECEIVE,
  BOOKINFO_REQUEST,
} from './ShopActions'

//--------categories------
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
//--------------------
//-------shop-------
function sp(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case SHOP_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case SHOP_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function shop(state = [], action) {
  switch (action.type) {
    case SHOP_RECEIVE:
    case SHOP_REQUEST:
      return {
        ...state,
        ...sp(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//-------shop-------
function bi(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case BOOKINFO_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case BOOKINFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function bookInfo(state = [], action) {
  switch (action.type) {
    case BOOKINFO_RECEIVE:
    case BOOKINFO_REQUEST:
      return {
        ...state,
        ...bi(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
const ShopReducers = { bookInfo, categories, shop }

export default ShopReducers
