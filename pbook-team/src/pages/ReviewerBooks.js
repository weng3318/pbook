import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import Data from '../pages/reviewer_page/data/reviewer_data'
import { withRouter } from 'react-router-dom'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_BookcaseList from './reviewer_page/BR_BookcaseList'
import BR_BookcaseHot_books from './reviewer_page/BR_BookcaseHot_books'
import BR_Navbar from './reviewer_page/BR_Navbar'
import ReviewerBlog from './ReviewerBlog'
import axios from 'axios'

class ReviewerBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
      csData: [],
      bkData: [],
    }
  }
  componentDidMount() {
    let newbrData
    let newcsData
    let newbkData
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(res => {
        newbrData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brBookcase')
      })
      .then(res => {
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res => {
        newbkData = res.data.rows
        this.setState({
          brData: newbrData,
          csData: newcsData,
          bkData: newbkData,
        })
        // console.log('前端取得資料' , res.data.rows)
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }
  render(props) {
    // console.log('render brData 書評家',this.state.brData);
    // console.log('render csData 看看書櫃',this.state.csData);
    // console.log('render bkData 書籍資料',this.state.bkData);

    // if (!this.state.brData.length) return <></>
    if (this.state.brData.length === 0)
      return (
        <>
          <h1>取得資料中...</h1>
        </>
      )
    if (this.state.csData.length === 0)
      return (
        <>
          <h1>取得資料中...</h1>
        </>
      )
    if (this.state.bkData.length === 0)
      return (
        <>
          <h1>取得資料中...</h1>
        </>
      )

    let brData = this.state.brData
    let csData = this.state.csData
    let bkData = this.state.bkData

    let reviewerData = null
    // console.log('bkData[0].name', bkData[0].name)
    for (let i = 0; i < brData.length; i++) {
      if (brData[i].sid == this.props.match.params.sid) {
        reviewerData = brData[i]
        console.log('取得會員', reviewerData.name, '為對象。')
      }
    }
    // 拿到指定會員的書櫃資料，並進行配對

    let bookcaseData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].number == reviewerData.number) {
        bookcaseData = csData[i].isbn
        console.log('bookcaseData的資料', bookcaseData)
      }
    }

    console.log('bookcaseData', typeof bookcaseData)
    console.log(
      '從',
      reviewerData.name,
      '書櫃，取isbn「',
      bookcaseData,
      '」進行配對。'
    )

    // 進行配對，取得書籍完整資料
    let bookData = null
    for (let i = 0; i < bkData.length; i++) {
      if (bkData[i].isbn == bookcaseData) {
        bookData = bkData[i]
      }
    }
    console.log('取得 書籍：完整資料', bookData)
    return (
      <>
        <BR_Navbar />
        <h1>看看書櫃</h1>
        <section className="reviewerBooks borderLine">
          {/* 接應id的書評家個人介紹 */}
          <BR_ReviewerList
            key={reviewerData.sid}
            sid={reviewerData.sid}
            title={reviewerData.title}
            img={reviewerData.img}
            name={reviewerData.name}
            job={reviewerData.job}
            intro={reviewerData.intro}
            tube={reviewerData.tube}
          ></BR_ReviewerList>

          <Router>
            {/* 熱門書評列表 */}
            <div className="HotBookBoxAll_Light">
              <div className="blackBG">
                <h5 className="h5_hotText">熱門書評</h5>
                <div className="HotBookBoxAll_Bookcase">
                  {this.state.csData
                    .filter(({ number }) => reviewerData.number == number)
                    .map(({ pic, sid, name, introduction }) => (
                      <BR_BookcaseHot_books
                        key={sid}
                        to={'/reviewer/reviewerBooks/reviewerBlog/' + sid}
                        sid={sid}
                        pic={pic}
                        name={name}
                      ></BR_BookcaseHot_books>
                    ))}
                </div>
              </div>
            </div>
            <Switch>
              <Route
                exact
                path="/reviewer/reviewerBooks/reviewerBlog/:sid?"
                component={ReviewerBlog}
              />
            </Switch>
          </Router>
          {/* 針對書評家 - 書櫃列表 */}

          {this.state.csData
            .filter(({ number }) => number == reviewerData.number)
            .map(({ name, pic, author, sid, introduction, info }) => (
              <BR_BookcaseList
                sid={sid}
                pic={pic}
                name={name}
                author={author}
                info={info}
                introduction={introduction}
              ></BR_BookcaseList>
            ))}

          {/* try */}
          {/* {this.state.bkData.filter(({isbn}) => isbn ===
           this.state.csData.filter(({number}) => number === reviewerData.number).map(({isbn})=> isbn))
           .map(({sid, name, pic, author, introduction })=>((
            <BR_BookcaseList
            name={name}
            key={sid}
            sid={sid}
            ></BR_BookcaseList>
          )))} */}
        </section>
      </>
    )
  }
}

export default withRouter(ReviewerBooks)
