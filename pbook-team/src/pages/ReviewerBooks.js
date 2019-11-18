import React from 'react'
// import Data from '../pages/reviewer_page/data/reviewer_data'
import { withRouter } from 'react-router-dom'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_BookcaseList from './reviewer_page/BR_BookcaseList'
import BR_BookcaseHot from './reviewer_page/BR_BookcaseHot'
import BR_Navbar from './reviewer_page/BR_Navbar'
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
        // this.setState({ brData: res.data.rows })
        // console.log( res.data.rows[0])
        return axios.get('http://localhost:5555/reviewer/brBookcase')
      })
      .then(res => {
        // this.setState({ brData: newbrData, csData: res.data.rows })
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res=>{
        this.setState({ brData: newbrData, csData: newcsData, bkData:res.data.rows})
      })
      .catch(function(error) {
        console.log(
          '沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' +
          error
          )
        })
      }
      render(props) {
        console.log('render brData 書評家',this.state.brData);
        console.log('render csData 看看書櫃',this.state.csData);
        console.log('render bkData 書籍資料',this.state.bkData);
        
    // if (!this.state.brData.length) return <></>
    if (this.state.brData.length === 0) return <><h1>取得資料中...</h1></>
    
    let brData = this.state.brData
    let csData = this.state.csData
    let bkData = this.state.bkData

    let reviewerData = null
    console.log('bkData[0].name', bkData[0].name)
    // console.log(brData)
    for (let i = 0; i < brData.length; i++) {
      if (brData[i].sid == this.props.match.params.sid) {
        reviewerData = brData[i]
      }
    }

    console.log('撈書櫃的書籍', csData)
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

          {/* 收藏書櫃列表 */}
          {this.state.csData.filter(({number}) => reviewerData.number == number)
          .map(({bookcase, sid})=>(
            <BR_BookcaseList
            to={"/reviewer/reviewerBooks/bookcase/" + sid}
            bookcase={bookcase}
            ></BR_BookcaseList>
          ))}

          {this.state.bkData.map(({name,pic})=>(
            <BR_BookcaseList
            name={name}
            pic={pic}
            ></BR_BookcaseList>
          ))}

        </section>
      </>
    )
  }
}

export default withRouter(ReviewerBooks)
