import React from 'react'
import Chat from '../components/member/chat/Chat'
import Data from '../pages/reviewer_page/data/reviewer_data'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_Navbar from './reviewer_page/BR_Navbar'
import axios from 'axios'

// 書評家使用的CSS
import '../pages/reviewer_page/BR_Bookcase.css'
import '../pages/reviewer_page/BR_Reviewer.css'
import '../pages/reviewer_page/BR_Blog.css'

export class Reviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        brData: [],
    }
}
  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(res => {
        this.setState({ brData: res.data.rows })
        // console.log('前端取得資料' , res.data.rows)
      })
      .catch(function(error) {
            console.log('前端沒有取得資料' , error)
        })
    }
    render() {
     if (this.state.brData.length === 0) return <h1>取得資料中...</h1>
      console.log('所有的書評家',this.state.brData)

        return (
          <>
            <BR_Navbar />
        <h1>書評家</h1>
          {/* {Data */}
      <div className="bg_pic">
          {/* {this.state.brData
            .filter(({ name }) => '達克尼斯' == name)
            .map(({ sid, title, img, name, job, intro, bookcase, youtube, facebook, twitter, tube,}) => (
              <BR_ReviewerList
                key={sid}
                // to={'/ReviewerBooks/' + sid}
                sid={sid}
                title={title}
                img={img}
                name={name}
                job={job}
                intro={intro}
                bookcase={bookcase}
                youtube={youtube}
                facebook={facebook}
                twitter={twitter}
                tube={tube}
              ></BR_ReviewerList>
            ))} */}

        {/* <Chat sid="MR00001"/> */}
        {/* {Data */}
        {this.state.brData
        .map(({ sid, title, img, name, job, intro, bookcase, youtube, facebook, twitter, tube,}) => (
            <BR_ReviewerList
              key={sid}
              // to={'/ReviewerBooks/' + sid}
              sid={sid}
              title={title}
              img={img}
              name={name}
              job={job}
              intro={intro}
              bookcase={bookcase}
              youtube={youtube}
              facebook={facebook}
              twitter={twitter}
              tube={tube}
            ></BR_ReviewerList>
          )
        )}
    </div>
      </>
    )
  }
}
export default Reviewer