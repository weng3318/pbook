import React from 'react'
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

    // 指定會員的書櫃，收藏的書籍
    let bookcaseData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].number == reviewerData.number) {
        bookcaseData = csData[i].isbn
    // console.log('來自書評家',reviewerData.name,'的書籍isbn：',bookcaseData)
      }
    }

    // 熱門書籍數量
    let hotNum = 5
    return (
      <>
        <BR_Navbar />
        <h1>看看書櫃</h1>
        <section className="reviewerBooks borderLine">
          {/* 接應id的書評家個人介紹 */}
          <BR_ReviewerList
            number={reviewerData.number}
            key={reviewerData.sid}
            sid={reviewerData.sid}
            title={reviewerData.title}
            img={reviewerData.img}
            br_name={reviewerData.br_name}
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
                  .filter((key, index) => index < hotNum)
                  .map(({ pic, sid, name, likebook, readbook }) => (
                    <BR_BookcaseHot_books
                      onHandleOpen={this.handleOpened} //進去勒索
                      opened={opened}
                      key={sid}
                      sid={sid}
                      pic={pic}
                      name={name}
                      likebook={likebook}
                      readbook={readbook}
                    ></BR_BookcaseHot_books>
                  ))}
              </div>
            </div>
          </div>

          {opened === 'blog' && <ReviewerBlog sid={openedSid} opened={opened} onHandleOpen={this.handleOpened}/>}

          {/* 針對書評家 - 書櫃列表 */}
          {this.state.csData
            .filter(({ number }) => number === reviewerData.number)
            .map(({ vb_book_sid,name, pic, author, sid, introduction, blog, tube, likebook, readbook, isbn }) => (
              <BR_BookcaseList
                key={sid}
                id={sid} // 點擊熱門書名傳送至對應#id
                isbn={isbn}
                vb_book_sid={vb_book_sid}
                sid={sid}
                pic={pic}
                name={name}
                author={author}
                blog={blog}
                introduction={introduction}
                tube={tube}
                likebook={likebook}
                readbook={readbook}
              ></BR_BookcaseList>
            ))}

          {/* try */}
          {/* {this.state.brData.filter(({br_name}) => br_name ===
           this.state.csData.filter(({number}) => number === reviewerData.number).map(({br_name})=> br_name))
           .map(({sid, br_name, pic, author, introduction })=>((
            <BR_BookcaseList
            br_name={br_name}
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
