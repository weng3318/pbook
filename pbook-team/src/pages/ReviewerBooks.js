import React from 'react'
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
      opened: null,
      openedSid: null,
    }
    this.handleOpened.bind(this)
  }

  componentDidMount() {
    let newbrData
    let newcsData

    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(res => {
        newbrData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brBookcase')
      })
      .then(res => {
        newcsData = res.data.rows
        this.setState({
          brData: newbrData,
          csData: newcsData,
        })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }

    // 裝填
  handleOpened = (opened, openedSid) => {
    this.setState({ opened, openedSid })
  }

  render() {
    
    // 進去撈 sid#state
    const { opened, openedSid } = this.state

    // console.log('render brData 書評家',this.state.brData);
    // console.log('render csData 看看書櫃',this.state.csData);

    // if (!this.state.brData.length) return <></>
    if (this.state.brData.length === 0)
      return (
        <>
          <h1 className="h1_br">取得資料中...</h1>
        </>
      )

    let brData = this.state.brData //書評家
    let csData = this.state.csData //看看書櫃

    let reviewerData = null;
    for (let i = 0; i < brData.length; i++) {
      if (brData[i].sid == this.props.match.params.sid) {
        reviewerData = brData[i]
        console.log('書評家編號', reviewerData.number, '為對象。')
      }
    }

    // 指定會員的書櫃資料，撈出來進行處理
    let bookcaseData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].number == reviewerData.number) {
        bookcaseData = csData[i].isbn
        console.log('來自書評家',reviewerData.name,'的書籍isbn：',bookcaseData)
      }
    }

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

          {/* 熱門書評列表 */}
          <div className="HotBookBoxAll_Light">
            <div className="blackBG">
              <h5 className="h5_hotText">熱門書評</h5>
              <div className="HotBookBoxAll_Bookcase">
                {this.state.csData
                  .filter(({ number }) => reviewerData.number === number)
                  .filter((key, index) => index < 4)
                  .map(({ pic, sid, name }) => (
                    <BR_BookcaseHot_books
                      onHandleOpen={this.handleOpened} //進去勒索
                      opened={opened}
                      key={sid}
                      sid={sid}
                      pic={pic}
                      name={name}
                    ></BR_BookcaseHot_books>
                  ))}
              </div>
            </div>
          </div>

          {opened === 'blog' && <ReviewerBlog sid={openedSid} opened={opened} onHandleOpen={this.handleOpened}/>}

          {/* 針對書評家 - 書櫃列表 */}
          {this.state.csData
            .filter(({ number }) => number === reviewerData.number)
            .map(({ name, pic, author, sid, introduction, blog, tube }) => (
              <BR_BookcaseList
                sid={sid}
                pic={pic}
                name={name}
                author={author}
                blog={blog}
                introduction={introduction}
                tube={tube}
              ></BR_BookcaseList>
            ))}

          {/* try */}
          {/* {this.state.brData.filter(({name}) => name ===
           this.state.csData.filter(({number}) => number === reviewerData.number).map(({name})=> name))
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
