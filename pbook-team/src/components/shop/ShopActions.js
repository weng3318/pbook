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
//-------ADD_TO_FAV--------
export const ADD_TO_FAV_RECEIVE = 'ADD_TO_FAV_RECEIVE'
export const ADD_TO_FAV_REQUEST = 'ADD_TO_FAV_REQUEST'
function afReceive(memberID, isbn, json) {
  return {
    type: ADD_TO_FAV_RECEIVE,
    memberID,
    isbn,
    payload: json,
    receivedAt: Date.now(),
  }
}
function afRequest(memberID, isbn) {
  return {
    type: ADD_TO_FAV_REQUEST,
    memberID,
    isbn,
  }
}
export const addToFavFetch = (memberID, isbn) => async dispatch => {
  dispatch(afRequest(memberID, isbn))
  try {
    let response = await fetch('http://localhost:5555/member/addBookcase', {
      method: 'POST',
      body: JSON.stringify({ number: memberID, isbn: isbn }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(afReceive(memberID, isbn, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ADD_TO_CART--------
export const ADD_TO_CART_RECEIVE = 'ADD_TO_CART_RECEIVE'
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST'
function atcReceive(sid, json) {
  return {
    type: ADD_TO_CART_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function atcRequest(sid) {
  return {
    type: ADD_TO_CART_REQUEST,
    sid,
  }
}
export const addToCartFetch = sid => async dispatch => {
  dispatch(atcRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/addToCart', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ sid: sid }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(atcReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------DEL_CART--------
export const DEL_CART_RECEIVE = 'DEL_CART_RECEIVE'
export const DEL_CART_REQUEST = 'DEL_CART_REQUEST'
function dcReceive(sid, json) {
  return {
    type: DEL_CART_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function dcRequest(sid) {
  return {
    type: DEL_CART_REQUEST,
    sid,
  }
}
export const delCartFetch = sid => async dispatch => {
  dispatch(dcRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/delCart', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ sid: sid }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(dcReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------CART--------
export const CART_RECEIVE = 'CART_RECEIVE'
export const CART_REQUEST = 'CART_REQUEST'
function ctReceive(json) {
  return {
    type: CART_RECEIVE,
    payload: json,
    receivedAt: Date.now(),
  }
}
function ctRequest() {
  return {
    type: CART_REQUEST,
  }
}
export const cartFetch = () => async dispatch => {
  dispatch(ctRequest())
  try {
    let response = await fetch('http://localhost:5555/books/addToCart', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(ctReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ORDER--------
export const ORDER_RECEIVE = 'ORDER_RECEIVE'
export const ORDER_REQUEST = 'ORDER_REQUEST'
function odReceive(memberID, json) {
  return {
    type: ORDER_RECEIVE,
    memberID,
    payload: json,
    receivedAt: Date.now(),
  }
}
function odRequest(memberID) {
  return {
    type: ORDER_REQUEST,
    memberID,
  }
}
export const orderFetch = memberID => async dispatch => {
  dispatch(odRequest(memberID))
  try {
    let response = await fetch(
      'http://localhost:5555/books/order/' + memberID,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(odReceive(memberID, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ADD_ORDER--------
export const ADD_ORDER_RECEIVE = 'ADD_ORDER_RECEIVE'
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST'
function aoReceive(
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time,
  json
) {
  return {
    type: ADD_ORDER_RECEIVE,
    memberID,
    bookName,
    singlePrice,
    bookAmount,
    orderPrice,
    created_time,
    payload: json,
    receivedAt: Date.now(),
  }
}
function aoRequest(
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time
) {
  return {
    type: ADD_ORDER_REQUEST,
    memberID,
    bookName,
    singlePrice,
    bookAmount,
    orderPrice,
    created_time,
  }
}
export const addOrderFetch = (
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time
) => async dispatch => {
  dispatch(
    aoRequest(
      memberID,
      bookName,
      singlePrice,
      bookAmount,
      orderPrice,
      created_time
    )
  )
  try {
    let response = await fetch('http://localhost:5555/books/addOrder', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        memberID: memberID,
        bookName: bookName,
        singlePrice: singlePrice,
        bookAmount: bookAmount,
        orderPrice: orderPrice,
        created_time: created_time,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(
      aoReceive(
        memberID,
        bookName,
        singlePrice,
        bookAmount,
        orderPrice,
        created_time,
        await response.json()
      )
    )
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
