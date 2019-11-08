import React from 'react'
import '../../pages/member/lukeStyle.scss'


class Navbar extends React.Component {
  render() {
    return (
      <>
        <div className="navbarWrap">
          <ol className="breadcrumb">
            <li>
              <a href="home">Home</a>
            </li>
            <li>
              <a href="css">CSS</a>
            </li>
            <li>
              <a href="css">breadcrumb</a>
            </li>
            <li>
              <a href="css">React</a>
            </li>
            <li>
              <a href="css">Node</a>
            </li>
            <li>
              <a href="css">MySql</a>
            </li>
          </ol>
        </div>
      </>
    )
  }
}


export default Navbar