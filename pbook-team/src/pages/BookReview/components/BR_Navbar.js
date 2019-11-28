import React from 'react'
import BR_PathNow from '../../reviewer_page/BR_PathNow'
import Search from './Search'
import { withRouter } from 'react-router-dom'

export class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="reviews_crumb">
          <BR_PathNow />
        </nav>
   
      </>
    )
  }
}

export default withRouter(Navbar)
