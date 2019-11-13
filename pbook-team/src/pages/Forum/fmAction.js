// Action Creators
export const userHover = hover => ({ type: 'USER_HOVER', status: hover })

export const categoryHover = hover => ({
  type: 'CATEGORY_HOVER',
  status: hover,
})
export const detailUpdate = data => ({ type: 'DID_UPDATE', data })









//給UserDetailsFetch用=======
function UserDetailsReceive(json) {
  return {
    type: 'USER_DETAILS_RECEIVE',
    payload: json,
  }
}
function UserDetailsRequest(memberId) {
  return {
    type: 'USER_DETAILS_REQUEST',
    id: memberId,
  }
}
//==================
export const UserDetailsFetch = memberId => async dispatch => {
  dispatch(UserDetailsRequest(memberId))
  try {
    let response = await fetch(
      'http://localhost:5555/forum/homepage/' + memberId,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(UserDetailsReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
