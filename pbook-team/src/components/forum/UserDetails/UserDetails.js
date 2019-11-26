import React from 'react'
import './UserDetails.scss'
import { connect } from 'react-redux'

//material UI
import StarsIcon from '@material-ui/icons/Stars'
import Button from '@material-ui/core/Button'
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
      level: [
        '品書會員',
        '品書學徒',
        '品書專家',
        '品書大師',
        '品書至尊',
        '書評家',
      ],
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
      let user = this.props.data
      let userImage = user.MR_pic

      return (
        <>
          <div>{this.props.userHover}</div>
          <div className="card-details">
            <img
              className="card-details-img "
              src={'http://localhost:5555/images/member/' + user.MR_pic}
              alt=""
              onClick={this.handleUserClick}
            />
            <div className="card-writer-wrapper pl-3">
              <div>
                <a
                  href="#1"
                  className="card-user-link"
                  onClick={this.handleUserClick}
                  onMouseEnter={this.handleUserMouseInOut}
                  onMouseLeave={this.handleUserMouseInOut}
                >
                  {user.MR_nickname}
                  {/* hover user details */}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.userHover ? 'displayBlock' : 'displayNone')
                    }
                  >
                    <div className="title-line"></div>
                    <div className="title">
                      <span>{user.MR_nickname}</span>
                      <span className="d-flex flex-align-center">
                        <StarsIcon
                          className="icon pr-1"
                          style={{ fontSize: 26 }}
                        ></StarsIcon>
                        <span>
                          {this.state.level[`${user.MR_personLevel}`]}
                        </span>
                      </span>
                    </div>
                    <hr></hr>
                    <div className="subtitle">
                      從
                      <span className="m-1">
                        {user.MR_createdDate.slice(0, 10)}{' '}
                      </span>
                      成為品書會員
                    </div>
                    <div
                      className="mt-1 pr-2 introduction"
                      title={user.MR_introduction}
                    >
                      {user.MR_introduction}
                    </div>
                    <hr></hr>
                    <div>
                      <span className="followText">
                        <span className="mr-3">{this.props.follow || 5}</span>
                        <span className="mr-3">人追蹤中</span>
                        <Button variant="outlined" color="secondary">
                          追蹤作者
                        </Button>
                      </span>
                    </div>
                  </div>
                </a>
                <span className="ml-2">
                  發表於
                  <span className="categories-name ml-2">
                    {article.categoriesName}
                  </span>
                </span>
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
                  <span className="mr-1">{article.fm_read}</span>人閱讀
                </span>
                <span
                  className={
                    'card-response ' +
                    (this.props.read ? 'displayInlineBlock' : 'displayNone')
                  }
                >
                  <span className="mr-1">{this.props.message}</span>則留言
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
  update: store.UserDetails.update,
  data: store.UserDetails.data,
  follow: store.UserDetails.follow,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(UserDetails)
