const detailInitState = {
  userHover: false,
  cateHover: false,
  update: false,
  data: false,
}

// {type: 'DID_UPDATE', data: {data, update} }
function UserDetails(state = detailInitState, action) {
  switch (action.type) {
    case 'USER_HOVER':
      return { ...state, userHover: action.status }
    case 'CATEGORY_HOVER':
      return { ...state, cateHover: action.status }
    case 'DID_UPDATE':
      return { ...state, data: action.data }
    default:
      return state
  }
}
const ListReducer = { UserDetails }

export default ListReducer
