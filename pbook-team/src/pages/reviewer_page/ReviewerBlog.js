import React from 'react'
import axios from 'axios'

export class ReviewerBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        this.setState({ csData: res.data.rows })
        console.log('取得資料', res.data.rows)
      })
      .catch(function(error) {
        console.log(
          '沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ',
          error
        )
      })
  }
  render() {
    return <></>
  }
}
export default ReviewerBlog
