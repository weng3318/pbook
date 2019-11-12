import React from 'react'
import Data from '../pages/reviewer_page/data/reviewer_data'
import { withRouter } from 'react-router-dom'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_BookcaseList from './reviewer_page/BR_BookcaseList'
import BR_BookcaseHot from './reviewer_page/BR_BookcaseHot'
import BR_Navbar from './reviewer_page/BR_Navbar'
import axios from 'axios';

class ReviewerBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer_Data')
      .then(res => {
        this.setState({ brData: res.data })
        console.log('取得資料' + res.data)
      })
      .catch(function(error) {
        console.log('沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' + error)
      })
  }
  render() {
    let reviewerData = null
    
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].id == this.props.match.params.id) {
        reviewerData = Data[i]
      }
    }
    // 書櫃裡的書
    let as = reviewerData.bookcase
    return (
      <>
        <BR_Navbar />
        <h1>看看書櫃</h1>
        <section className="reviewerBooks borderLine">
          {/* 接應id的書評家個人介紹 */}
          <BR_ReviewerList
            key={reviewerData.id}
            id={reviewerData.id}
            name={reviewerData.name}
            type={reviewerData.type}
            level={reviewerData.level}
            info={reviewerData.info}
            tube={reviewerData.tube}
          ></BR_ReviewerList>

          {/* 熱門書評列表 */}
          <BR_BookcaseHot />

          {/* 書評列表 */}
          {as.map((bookcase) => (
            <BR_BookcaseList bookcase={bookcase}></BR_BookcaseList>
          ))}

        </section>
      </>
    )
  }
}

export default withRouter(ReviewerBooks)
