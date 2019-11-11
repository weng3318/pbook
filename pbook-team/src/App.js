import React from 'react'
import Header from './components/header/Header'
import GoTop from './components/GoTop'
import Footer from './components/footer/Footer'

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
