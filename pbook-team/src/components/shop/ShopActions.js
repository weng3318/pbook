export const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
//給cgFetch用---------------
function cgReceive(cgData) {
  return {
    type: CATEGORIES_RECEIVE,
    payload: cgData,
    receivedAt: Date.now(),
  }
}
function cgRequest() {
  return {
    type: CATEGORIES_REQUEST,
  }
}
//-------------------------
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
    console.log('success')
  } catch (error) {
    console.log('error ', error)
  }
}
