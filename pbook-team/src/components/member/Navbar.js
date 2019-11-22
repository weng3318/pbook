import React from 'react'
// import '../../pages/member/lukeStyle.scss'
import BR_PathNow from '../../pages/reviewer_page/BR_PathNow'
import BR_DateTime from '../../pages/reviewer_page/BR_DateTime'
import {withRouter} from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <>
          <nav className="brNavbar">
          <BR_PathNow />
          <BR_DateTime />
          </nav>
      </>
  )
  }
}


export default withRouter(Navbar)