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
export const AC_REQUEST = 'AC_REQUEST'
function acRequest(acType) {
  return {
    type: AC_REQUEST,
    acType,
  }
}

export const AC_RECEIVE = 'AC_RECEIVE'
function acReceive(acType, json) {
  return {
    type: AC_RECEIVE,
    acType,
    ac: json,
    receivedAt: Date.now(),
  }
}

export const AC_FETCH = 'AC_FETCH'
export const acFetch = acType => async dispatch => {
  dispatch(acRequest(acType))
  try {
    let response = await fetch('http://localhost:5555/activities', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(acReceive(acType, await response.json()))
  } catch (error) {
    console.log('error', error)
  }
}
