import React from 'react'
import './UserDetails.scss'
import { connect } from 'react-redux'
import {
  userHover,
  categoryHover,
  fmUserFetch,
} from '../../../pages/Forum/fmAction'

//props : memberId={fm_memberId} read={true}//閱讀人數是否顯示 article={article} //文章資料

class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
      user: false,
      userHover: false,
      categoryHover: false,
    }
  }

  componentDidMount() {
    // 用props傳入的userID在fetch一次
    if (!this.props.update) {
      this.props.dispatch(
        fmUserFetch(this.props.memberId, this.props.article.fm_category)
      )
    }
  }

  handleCategoryClick = event => {
    console.log('category click')
  }

  handleUserClick = event => {
    console.log('User click')
  }
  //Category details hover frame
  handleCategoryMouseInOut = event => {
    this.setState({
      categoryHover: !this.state.categoryHover,
    })
  }

  //user details hover frame
  handleUserMouseInOut = event => {
    this.setState({
      userHover: !this.state.userHover,
    })
  }
  render() {
    if (!this.props.update) {
      return <span>Loading</span>
    } else {
      let article = this.props.article
      let user = this.props.data[0]
      let userImage = user.MR_pic

      return (
        <>
          <div>{this.props.userHover}</div>
          <div className="card-details">
            <img
              className="card-details-img "
              src={'http://localhost:5555/images/member/' + userImage}
              alt=""
              onClick={this.handleUserClick}
            />
            <div className="card-writer-wrapper">
              <div>
                <a
                  href="#1"
                  className="card-user-link"
                  onClick={this.handleUserClick}
                  onMouseEnter={this.handleUserMouseInOut}
                  onMouseLeave={this.handleUserMouseInOut}
                >
                  {user.MR_nickname}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.userHover ? 'displayBlock' : 'displayNone')
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
                  onMouseEnter={this.handleCategoryMouseInOut}
                  onMouseLeave={this.handleCategoryMouseInOut}
                >
                  {user.name}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.categoryHover
                        ? 'displayBlock'
                        : 'displayNone')
                    }
                  >
                    {' '}
                    user details<br></br>user details<br></br>user details
                    <br></br>user details
                  </div>
                </a>
              </div>
              <div>
                <time>{article.fm_publishTime.slice(0, 10)} </time>
                <span
                  className={
                    this.props.read ? 'displayInlineBlock' : 'displayNone'
                  }
                >
                  {article.fm_read}人閱讀
                </span>
                <span
                  className={
                    'card-response ' +
                    (this.props.read ? 'displayInlineBlock' : 'displayNone')
                  }
                >
                  16則留言
                </span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  userHover: store.UserDetails.userHover,
  categoryHover: store.UserDetails.cateHover,
  update: store.UserDetails.update,
  data: store.UserDetails.data,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(UserDetails)
