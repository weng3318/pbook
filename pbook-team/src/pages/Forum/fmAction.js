// Action Creators
export const userHover = hover => ({ type: 'USER_HOVER', status: hover })

export const categoryHover = hover => ({
  type: 'CATEGORY_HOVER',
  status: hover,
})

//給UserDetailsFetch用=======
// fetch data list
const fmUserRequest = () => {
  return {
    type: 'FM_USER_REQUEST',
  }
}
const fmUserReceive = json => {
  return {
    type: 'FM_USER_RECEIVE',
    data: json,
    receivedAt: Date.now(),
  }
}

export const fmUserFetch = (memberId, fm_category) => async dispatch => {
  dispatch(fmUserRequest())
  try {
    let response = await fetch(
      'http://localhost:5555/forum/homepage/' + memberId + '/' + fm_category,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(fmUserReceive(await response.json()))
  } catch (error) {
    console.log('error', error)
  }
}
