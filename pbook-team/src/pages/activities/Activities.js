import React from 'react'
// import Test from './test'
import AcList from './components/acList/AcList'
import AcPageOffline from './components/acPage/AcPageOffline'
import AcPageDiscount from './components/acPage/AcPageDiscount'
import { connect } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Route, Link, Switch, Redirect } from 'react-router-dom'

// //redux---------------------------------------------
// import { createStore, applyMiddleware, compose } from 'redux'
// import { Provider } from 'react-redux'
// import thunkMiddleware from 'redux-thunk'
// import AcReducer from './AcReducers'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(
//   AcReducer,
//   composeEnhancers(applyMiddleware(thunkMiddleware))
// )
// //redux---------------------------------------------

const Activities = props => {
  return (
    <>
      <Redirect from={'/activities'} to={'/activities/' + props.acType} />
      <Switch>
        <Redirect
          exact
          from={'/activities'}
          to={'/activities/' + props.acType}
        />
      </Switch>

      <Route exact path={props.match.url + '/discount'} component={AcList} />
      <Route exact path={props.match.url + '/offline'} component={AcList} />
      <Route
        exact
        path={props.match.url + '/discount/:acId'}
        component={AcPageDiscount}
      />
      <Route
        exact
        path={props.match.url + '/offline/:acId'}
        component={AcPageOffline}
      />
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
})
export default connect(mapStateToProps)(Activities)
