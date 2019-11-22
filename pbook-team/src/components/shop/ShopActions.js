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
//-------Shop-----------
export const SHOP_RECEIVE = 'SHOP_RECEIVE'
export const SHOP_REQUEST = 'SHOP_REQUEST'
function shopReceive(shopPage, shopCategories, shopKeyword, json) {
  return {
    type: SHOP_RECEIVE,
    shopPage,
    shopCategories,
    shopKeyword,
    payload: json,
    receivedAt: Date.now(),
  }
}
function shopRequest(shopPage, shopCategories, shopKeyword) {
  return {
    type: SHOP_REQUEST,
    shopPage,
    shopCategories,
    shopKeyword,
  }
}
export const shopFetch = (
  shopPage,
  shopCategories,
  shopKeyword
) => async dispatch => {
  dispatch(shopRequest(shopPage, shopCategories, shopKeyword))
  try {
    let response = await fetch(
      'http://localhost:5555/books/book_data/' +
        shopPage +
        '/' +
        shopCategories +
        '/' +
        (shopKeyword ? shopKeyword : ''),
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(
      shopReceive(shopPage, shopCategories, shopKeyword, await response.json())
    )
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
//-------BookInfo-----------
export const BOOKINFO_RECEIVE = 'BOOKINFO_RECEIVE'
export const BOOKINFO_REQUEST = 'BOOKINFO_REQUEST'
function bookInfoReceive(sid, json) {
  return {
    type: BOOKINFO_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function bookInfoRequest(sid) {
  return {
    type: BOOKINFO_REQUEST,
    sid,
  }
}
export const bookInfoFetch = sid => async dispatch => {
  dispatch(bookInfoRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/book_info/' + sid, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(bookInfoReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
