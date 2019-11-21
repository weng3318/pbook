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
            <Redirect exact from={'/books'} to={'/books/list/1/1'} />
            <Route
              exact
              path="/books/:mode/:page/:categories"
              component={Shop}
            ></Route>
            <Route
              exact
              path="/books/information/:page/:categories/:name"
              component={BookCommodity}
            ></Route>
          </Switch>
        </>
      </Router>
    )
  }
}

export default Books
