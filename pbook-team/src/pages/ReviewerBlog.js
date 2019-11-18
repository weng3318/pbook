import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
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
    return <>
      <h1>書評部落格</h1>
      <section className="reviewerBlog borderLine">
          {/* <img className="reviewerList" src={require('../pages/reviewer_page/images/03_評品書.png')}/> */}
      </section>
    </>
  }
}
export default ReviewerBlog
