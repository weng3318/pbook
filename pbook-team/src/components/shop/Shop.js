import React from 'react'
import './Shop.scss'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import BookData from './BookData'
//---------redux-----------
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

function shop(state = [], action) {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      return [action.payload, ...state]
    default:
      return state
  }
}

const store = createStore(
  combineReducers({ shop }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
//--------------------------
class Shop extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Row>
            <Breadcrumb></Breadcrumb>
          </Row>
          <Row className="book_wrapper">
            <Categories></Categories>
            <BookData></BookData>
          </Row>
        </Container>
      </Provider>
    )
  }
}
export default Shop
