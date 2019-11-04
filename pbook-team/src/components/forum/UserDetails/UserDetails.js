import React from 'react'
import './UserDetails.css'

class UserDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  handleCategoryClick = event => {
    console.log('category click')
  }

  handleUserClick = event => {
    console.log('User click')
  }
  //Category details hover frame
  handleCategoryMouseIn = event => {
    this.setState({
      categoryHover: true,
    })
  }
  handleCategoryMouseOut = event => {
    this.setState({
      categoryHover: false,
    })
  }
  //user details hover frame
  handleUserMouseIn = event => {
    this.setState({
      UserHover: true,
    })
  }
  handleUserMouseOut = event => {
    this.setState({
      UserHover: false,
    })
  }
  render() {
    return (
      <>
        {' '}
        <div className="card-details">
          <img
            src={require('./s2.jpg')}
            alt=""
            onClick={this.handleUserClick}
          />
          <div className="card-writer-wrapper">
            <div>
              <a
                href="#1"
                className="card-user-link"
                onClick={this.handleUserClick}
                onMouseEnter={this.handleUserMouseIn}
                onMouseLeave={this.handleUserMouseOut}
              >
                哈囉你好
                <div
                  className={
                    'userFrame ' +
                    (this.state.UserHover ? 'displayBlock' : 'displayNone')
                  }
                >
                  user details<br></br>user details<br></br>user details
                  <br></br>user details
                </div>
              </a>
              <span>發表於</span>
              <a
                href="#2"
                className="card-category-link"
                onClick={this.handleCategoryClick}
                onMouseEnter={this.handleCategoryMouseIn}
                onMouseLeave={this.handleCategoryMouseOut}
              >
                商業理財
                <div
                  className={
                    'userFrame ' +
                    (this.state.categoryHover ? 'displayBlock' : 'displayNone')
                  }
                >
                  {' '}
                  user details<br></br>user details<br></br>user details
                  <br></br>user details
                </div>
              </a>
            </div>
            <div>
              <time>2019-10-31</time>
              <span>2222人閱讀</span>
              <span className="card-response">16則留言</span>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default UserDetails
