import React from 'react'
import BR_PathNow from '../../reviewer_page/BR_PathNow'
import BR_DateTime from '../../reviewer_page/BR_DateTime'
import { withRouter } from 'react-router-dom'

export class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="brNavbar">
          <BR_PathNow />
          {/* <BR_DateTime /> */}
        </nav>
      </>
    )
  }
}

export default withRouter(Navbar)
