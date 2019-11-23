import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import BR_BlogList from './reviewer_page/BR_BlogList'
import axios from 'axios'

export class ReviewerBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
      bkData: [],
    }
  }
  componentDidMount() {
    let newcsData
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res => {
        this.setState({ csData: newcsData, bkData: res.data.rows })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }
  render(props) {
    // if (!this.state.csData.length) return <></>
    if (this.state.csData.length === 0)
      return (
        <>
          <h1>取得資料中...</h1>
        </>
      )
    let csData = this.state.csData

    let BlogData = null
      for (let i = 0; i < csData.length; i++) {
        if (csData[i].sid == this.props.sid) {
          BlogData = csData[i]
        }
    }
    console.log('點選書籍，獲取sid', BlogData.sid)
    return (
    <>
      {/* todo.. 比對兩張資料表的作者{author} */}
      <h3 className="h3_br">Blogger
      {/* 放BR_BlogList裡面才吃的到id */}
      <Link className="Blog_Edit" to={"/reviewer/reviewerBooks/reviewerBlog/reviewerBlogEdit/1"}>
          <img className="" src={require('./reviewer_page/images/P_logo_Big.png')}/>
      </Link>
      </h3>
      <section className="reviewerBlog borderLine">
      {/* 部落格內文 */}
          <BR_BlogList
          key={BlogData.sid}
          sid={BlogData.sid}
          name={BlogData.name}
          blog={BlogData.blog}
          tube={BlogData.tube}
          ></BR_BlogList>
      </section>
      {/* 效果圖 開發參照 */}
      {/* <img className="BlogBG" src={require('../pages/reviewer_page/images/03_評品書.png')}/> */}

      {/* 路由模式，關閉 */}
      {/* <Router>
          <Switch>
            <Route exact 
                    path="/reviewer/reviewerBooks/reviewerBlog/ReviewerBlogEdit/:sid?" 
                    component={ReviewerBlogEdit} />
          </Switch>
      </Router> */}
    </>
    )
  }
}

export default withRouter(ReviewerBlog)
