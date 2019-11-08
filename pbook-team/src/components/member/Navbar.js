import React from 'react'
import '../../pages/member/lukeStyle.scss'


class Navbar extends React.Component {
  render() {
    return (
      <>
        <div className="navbarWrap">
          <ol className="breadcrumb">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">CSS</a>
            </li>
            <li>
              <a href="">breadcrumb</a>
            </li>
            <li>
              <a href="">React</a>
            </li>
            <li>
              <a href="">Node</a>
            </li>
            <li>
              <a href="">MySql</a>
            </li>
          </ol>
        </div>
      </>
    )
  }
}


export default Navbar