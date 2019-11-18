import React from 'react'
//---- PostArticle --------
const postArticleState = {
  imgData: [],
  imgCount: 1,
  addElement: [],
  mainImage: '',
}
function postArticle(state = postArticleState, action) {
  switch (action.type) {
    case 'APPEND_IMG_ELEMENT':
      return {
        ...state,
        imgCount: state.imgCount + 1,
        addElement: [...state.addElement, action.content],
        imgData: [...state.imgData, action.imgData],
      }
    case 'MAIN_IMAGE':
      console.log('action.mainImagefile', action.mainImagefile)
      return { ...state, mainImage: action.mainImagefile }
    case 'APPEND_TEXTAREA':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
      }

    default:
      return state
  }
}

//---- PostArticle End --------

//---Login----
const loginOrNot = {
  loginOrNot: false,
}
function letMeLogin(state = loginOrNot, action) {
  switch (action.type) {
    case 'LET_ME_LOGIN':
      return { ...state, loginOrNot: !state.loginOrNot }
    default:
      return state
  }
}

//---- UserDetails --------
const detailInitState = {
  update: false,
  data: false,
}

function UserDetails(state = detailInitState, action) {
  switch (action.type) {
    // case 'FM_USER_REQUEST':
    //   return { ...state, data: action.data }
    case 'FM_USER_RECEIVE':
      return { ...state, data: action.data, update: true }
    default:
      return state
  }
}
//---- UserDetails End --------

const ListReducer = { UserDetails, postArticle, letMeLogin }

export default ListReducer
