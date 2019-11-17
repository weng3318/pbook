import React from 'react'
// import Data from '../pages/reviewer_page/data/reviewer_data'
import { withRouter } from 'react-router-dom'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_BookcaseList from './reviewer_page/BR_BookcaseList'
import BR_BookcaseHot from './reviewer_page/BR_BookcaseHot'
import BR_Navbar from './reviewer_page/BR_Navbar'
import Reviewer from '../pages/Reviewer'
import axios from 'axios'

class ReviewerBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
      nweData: [],
    }
  }
  componentDidMount() {
    let newbrData
    axios
      // .get('http://localhost:5000/brReviewerList')
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(res => {
        newbrData = res.data.rows
        // this.setState({ brData: res.data.rows })
        // console.log( res.data.rows[0])
        return axios.get('http://localhost:5555/reviewer/brBookcase')
      })
      .then(res => {
        this.setState({ brData: newbrData, nweData: res.data.rows })
      })
      .catch(function(error) {
        console.log(
          '沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' +
            error
        )
      })
  }
  render(props) {
    // if (!this.state.brData.length) return <></>
    console.log('render brData',this.state.brData);
    console.log('render nweData',this.state.nweData);
    
    if (this.state.brData.length === 0) return <><h1>取得資料中...</h1></>

    let Data = this.state.brData

    let reviewerData = null
    console.log('Data[0].sid', Data[0])
    // console.log(Data)
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].sid == this.props.match.params.sid) {
        reviewerData = Data[i]
      }
    }

    console.log('帶進來的書籍', reviewerData.bookcase)
    console.log('撈書櫃的書籍', Data)
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
          <BR_BookcaseHot />

          {/* 書評列表 */}
          {/* <BR_BookcaseList 
          bookcase={reviewerData.bookcase}
          bookcase={reviewerData.bookcase}
          ></BR_BookcaseList> */}

          {/* {this.state.brData
        .map(({ sid, title, img, name, job, intro, bookcase, youtube, facebook, twitter, tube,}) => (
            <BR_ReviewerList
              key={sid}
              to={'/ReviewerBooks/' + sid}
              sid={sid}
              tube={tube}
            ></BR_ReviewerList>
          )
        )} */}
        </section>
      </>
    )
  }
}

export default withRouter(ReviewerBooks)
