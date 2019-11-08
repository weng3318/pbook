import React from 'react'
// import Test from './test'
import AcList from './components/acList/AcList'
// import AcPage from './components/acPage/AcPage'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AcReducer from './AcReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  AcReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

const Activities = props => {
  return (
    <>
      <Provider store={store}>
        <AcList />
        {/* <AcPage acId={12} /> */}
      </Provider>
    </>
  )
}

export default Activities
