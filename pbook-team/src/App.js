import React from 'react'
import Header from './components/header/Header'
import GoTop from './components/GoTop'
import Footer from './components/footer/Footer'

// import Login from './pages/login/Login'

// redux----------------------
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import AcReducer from '../src/pages/activities/AcReducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  AcReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
// ----------------------------

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        {/* <Login/> */}
        <GoTop />
        <Footer />
      </Provider>
    </>
  )
}

export default App
