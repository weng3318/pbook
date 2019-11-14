import React from 'react'
import Chat from '../components/member/chat/Chat'
import Data from '../pages/reviewer_page/data/reviewer_data'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_Navbar from './reviewer_page/BR_Navbar'
import axios from 'axios'

// 書評家使用的CSS
import '../pages/reviewer_page/BR_Bookcase.css'
import '../pages/reviewer_page/BR_Reviewer.css'

export class Reviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        brData: [],
    }
}
  componentDidMount() {
    axios
      .get('http://localhost:5000/brBookcase')
      .then(res => {
        this.setState({ brData: res.data })
        console.log('取得資料' + res.data)
      })
      .catch(function(error) {
            console.log('沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' + error)
        })
    }
    render() {
      console.log('檢視brData資料'+this.state.brData)
        return (
            <>
            <BR_Navbar />
        {/* {Data */}
            {this.state.brData
            .map(({ sid, title, img, name, job, intro, youtube, facebook, twitter, tube,}) => (
            <BR_ReviewerList
              key={sid}
              to={'/ReviewerBooks/' + sid}
              sid={sid}
              title={title}
              img={img}
              name={name}
              job={job}
              title={title}
              youtube={youtube}
              facebook={facebook}
              intro={intro}
              twitter={twitter}
              tube={tube}
            ></BR_ReviewerList>
          ))}
        <h1>書評家</h1>
        {/* <Chat sid="MR00001"/> */}
        {/* {Data */}
        {/* {this.state.brData
          .filter(({ name }) => '31桑' == name)
          .map(({ img, title, name, intro, sid, tube }) => (
            <BR_ReviewerList
              key={sid}
              to={'/ReviewerBooks/' + sid}
              sid={sid}
              name={name}
              title={title}
              img={img}
              tube={tube}
              intro={intro}
            ></BR_ReviewerList>
          ))} */}

        {/* {Data */}
        {/* {this.state.brData
        .map(({ img, title, name, intro, id, tube, bookcase }) => (
            <BR_ReviewerList
              key={id}
              to={'/ReviewerBooks/' + id}
              name={name}
              title={title}
              img={img}
              tube={tube}
              id={id}
              intro={intro}
              bookcase={bookcase}
            ></BR_ReviewerList>
          )
        )} */}
      </>
    )
  }
}
export default Reviewer