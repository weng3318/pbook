import React from 'react'
import BR_BookcaseList from './BR_BookcaseList'
import axios from 'axios'

export class BR_ReviewerBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        csData: [],
    }
}
  componentDidMount() {
    axios
      // .get('http://localhost:5000/reviewer/brBookcase')
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        this.setState({ csData: res.data.rows })
        console.log('取得資料' , res.data.rows)
      })
      .catch(function(error) {
            console.log('沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' , error)
        })
    }
    render() {
      
        return (
            <>
        <h1>書評家 收藏書櫃</h1>
        {/* <Chat sid="MR00001"/> */}
        {this.state.csData
        .map(({ sid, bookcase,}) => (
            <BR_BookcaseList
              key={sid}
              sid={sid}
              bookcase={bookcase}
            ></BR_BookcaseList>
          )
        )}
      </>
    )
  }
}
export default BR_ReviewerBlog