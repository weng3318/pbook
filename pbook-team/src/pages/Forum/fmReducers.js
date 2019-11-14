const detailInitState = {
  userHover: false,
  cateHover: false,
  update: false,
  data: false,
}

function UserDetails(state = detailInitState, action) {
  switch (action.type) {
    case 'USER_HOVER':
      return { ...state, userHover: action.status }
    case 'CATEGORY_HOVER':
      return { ...state, cateHover: action.status }
    // case 'FM_USER_REQUEST':
    //   return { ...state, data: action.data }
    case 'FM_USER_RECEIVE':
      return { ...state, data: action.data, update: true }
    default:
      return state
  }
}

const ListReducer = { UserDetails }

export default ListReducer
