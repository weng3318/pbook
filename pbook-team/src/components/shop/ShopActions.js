// set ac type
export const SET_SHOP_PARAMS = 'SET_SHOP_PARAMS'
export const setShopParams = (shopPage, shopCategories, shopKeyword) => ({
  type: SET_SHOP_PARAMS,
  shopPage: shopPage,
  shopCategories: shopCategories,
  shopKeyword: shopKeyword,
})
//-------categories--------
export const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
//給cgFetch用=======
function cgReceive(json) {
  return {
    type: CATEGORIES_RECEIVE,
    payload: json,
    receivedAt: Date.now(),
  }
}
function cgRequest() {
  return {
    type: CATEGORIES_REQUEST,
  }
}
//==================
export const cgFetch = () => async dispatch => {
  dispatch(cgRequest())
  try {
    let response = await fetch('http://localhost:5555/books/book_categories', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(cgReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------rating-----------
export const RATING_RECEIVE = 'RATING_RECEIVE'
export const RATING_REQUEST = 'RATING_REQUEST'
function rtReceive(json) {
  return {
    type: RATING_RECEIVE,
    payload: json,
    receivedAt: Date.now(),
  }
}
function rtRequest() {
  return {
    type: RATING_REQUEST,
  }
}
export const rtFetch = () => async dispatch => {
  dispatch(rtRequest())
  try {
    let response = await fetch('http://localhost:5555/books/book_ratings', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(rtReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
//-------Shop-----------
export const SHOP_RECEIVE = 'SHOP_RECEIVE'
export const SHOP_REQUEST = 'SHOP_REQUEST'
function shopReceive(shopPage, shopCategories, json) {
  return {
    type: SHOP_RECEIVE,
    shopPage,
    shopCategories,
    // shopKeyword,
    payload: json,
    receivedAt: Date.now(),
  }
}
function shopRequest(shopPage, shopCategories) {
  return {
    type: SHOP_REQUEST,
    shopPage,
    shopCategories,
    // shopKeyword,
  }
}
export const shopFetch = (shopPage, shopCategories) => async dispatch => {
  dispatch(shopRequest(shopPage, shopCategories))
  try {
    let response = await fetch(
      'http://localhost:5555/books/book_data/' +
        shopPage +
        '/' +
        shopCategories,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(shopReceive(shopPage, shopCategories, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
