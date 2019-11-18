import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Shop from '../components/shop/Shop'
import BookCommodity from '../components/shop/BookCommodity/BookCommodity'

class Books extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Redirect exact from={'/books'} to={'/books/1/1'} />
            <Route
              path="/books/:page/:categories/information/:name"
              component={BookCommodity}
            ></Route>
            <Route path="/books/:page/:categories" component={Shop}></Route>
          </Switch>
        </>
      </Router>
    )
  }
}

export default Books
