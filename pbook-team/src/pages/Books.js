import React from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Shop from '../components/shop/Shop'

class Books extends React.Component {
  render() {
    return (
      <>
        <Redirect from={'/books'} to={'/books/1/1'} />
        <Switch>
          <Route path="/books/:page/:categories" component={Shop}></Route>
        </Switch>
        {/* <Shop /> */}
      </>
    )
  }
}

export default Books
