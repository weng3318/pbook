export const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
//給cgFetch用---------------
function cgReceive(payload, cgData) {
  return {
    type: CATEGORIES_RECEIVE,
    payload,
    cgData: cgData,
    receivedAt: Date.now(),
  }
}
function cgRequest(payload) {
  return {
    type: CATEGORIES_REQUEST,
    payload,
  }
}
//-------------------------
export const cgFetch = payload => async dispatch => {
  dispatch(cgRequest(payload))
  try {
    let response = await fetch('http://localhost:5555/books/book_categories', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(cgReceive(payload, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
