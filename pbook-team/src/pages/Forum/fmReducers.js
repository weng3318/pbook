import React from 'react'
//---- PostArticle --------
const postArticleState = {
  imgData: [],
  imgCount: 1,
  addElement: []

}
function postArticle(state = postArticleState, action) {
  switch (action.type) {
    case 'APPEND_IMG_ELEMENT':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
        imgData: [...state.imgData, action.imgData]
      }
    case 'APPEND_TEXTAREA':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
      }
    default: return state
  }
}

//---- PostArticle End --------

//---- UserDetails --------
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
//---- UserDetails End --------

const ListReducer = { UserDetails, postArticle }

export default ListReducer
