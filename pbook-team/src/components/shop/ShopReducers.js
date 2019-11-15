import {
  CATEGORIES_RECEIVE,
  CATEGORIES_REQUEST,
  RATING_RECEIVE,
  RATING_REQUEST,
  SHOP_RECEIVE,
  SHOP_REQUEST,
  SET_SHOP_PARAMS,
} from './ShopActions'

const shopParams = (state = [], action) => {
  switch (action.type) {
    case SET_SHOP_PARAMS:
      return {
        shopPage: action.shopPage,
        shopCategories: action.shopCategories,
        // shopKeyword: action.shopKeyword,
      }
    default:
      return {
        ...state,
      }
  }
}

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
//-------rating-------
function rt(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case RATING_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case RATING_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function ratings(state = [], action) {
  switch (action.type) {
    case RATING_RECEIVE:
    case RATING_REQUEST:
      return {
        ...state,
        ...rt(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
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

const ShopReducers = { shopParams, categories, ratings, shop }

export default ShopReducers
