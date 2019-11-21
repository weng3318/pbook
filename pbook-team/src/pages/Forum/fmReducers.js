import React from 'react'
//---- PostArticle --------
const postArticleState = {
  imgData: [],
  imgCount: 0,
  addElement: [],
  mainImage: '',
}
function postArticle(state = postArticleState, action) {
  switch (action.type) {
    case 'APPEND_IMGINPUT':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
        imgCount: state.imgCount + 1,
      }
    case 'APPEND_IMG_ELEMENT':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
        imgData: [...state.imgData, action.imgData],
      }

    case 'APPEND_TEXTAREA':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
      }
    case 'CLEAR_POST_DATA':
      return {
        ...postArticleState,
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
      return { ...state, loginOrNot: true }
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
