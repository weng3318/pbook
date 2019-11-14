// set ac status filter
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VisibilityFilterType = {
  SHOW_ACTIVE: { type: 'SHOW_ACTIVE', value: 1 },
  SHOW_ALL: { type: 'SHOW_ALL', value: 3 },
  SHOW_COMING_SOON: { type: 'SHOW_COMING_SOON', value: 0 },
  SHOW_COMPLETED: { type: 'SHOW_COMPLETED', value: 2 },
}
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter: filter,
})
// set ac type
export const SET_AC_TYPE = 'SET_AC_TYPE'
export const acTypeConst = { DISCOUNT: 'discount', OFFLINE: 'offline' }
export const setAcType = acType => ({
  type: SET_AC_TYPE,
  acType: acType,
})

// fetch data list
// export const AC_REQUEST = 'AC_REQUEST'
// function acRequest(acType) {
//   return {
//     type: AC_REQUEST,
//     acType,
//   }
// }

// export const AC_RECEIVE = 'AC_RECEIVE'
// function acReceive(acType, json) {
//   return {
//     type: AC_RECEIVE,
//     acType,
//     ac: json,
//     receivedAt: Date.now(),
//   }
// }

// export const AC_FETCH = 'AC_FETCH'
// export const acFetch = acType => async (dispatch, getState) => {
//   let { acData } = getState()
//   if (acData[acType].items.length) {
//     // 這是已經被快取的資料！不要做任何事情。
//     return
//   }

//   dispatch(acRequest(acType))
//   try {
//     let response = await fetch('http://localhost:5555/activities/' + acType, {
//       method: 'GET',
//       headers: new Headers({
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       }),
//     })
//     dispatch(acReceive(acType, await response.json()))
//   } catch (error) {
//     console.log('error', error)
//   }
// }

// middleware fetch list
export const AC_LIST_ACTION_TYPE = {
  AC_LIST_REQUEST: 'AC_LIST_REQUEST',
  AC_LIST_SUCCESS: 'AC_LIST_SUCCESS',
  AC_LIST_FAILURE: 'AC_LIST_FAILURE',
}
export function fetchAcList(acType) {
  return {
    types: ['AC_LIST_REQUEST', 'AC_LIST_SUCCESS', 'AC_LIST_FAILURE'],
    // 檢查快取：
    shouldCallAPI: state => !state.acData[acType].items.length,
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/' + acType, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { acType },
  }
}

// get discount books
export const DISCOUNT_BOOKS_ACTION_TYPE = {
  DISCOUNT_BOOKS_REQUEST: 'AC_LIST_REQUEST',
  DISCOUNT_BOOKS_SUCCESS: 'AC_LIST_SUCCESS',
  DISCOUNT_BOOKS_FAILURE: 'AC_LIST_FAILURE',
}
export function getDiscountBooks(acId) {
  return {
    types: [
      'DISCOUNT_BOOKS_REQUEST',
      'DISCOUNT_BOOKS_SUCCESS',
      'DISCOUNT_BOOKS_FAILURE',
    ],
    // 檢查快取：
    shouldCallAPI: state =>
      !state.acData.discount.items[acId] ||
      !state.acData.discount.items[acId].books,
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/discount/' + acId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { acId },
  }
}
