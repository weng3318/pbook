import React from 'react'
import AcList from './components/acList/AcList'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ListReducer from './reducers/ListReducers'

const store = createStore(
  ListReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Activities = props => {
  return (
    <Provider store={store}>
      {console.log(store.getState())}
      <AcList />
    </Provider>
  )
}

export default Activities
