import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import BR_BlogList from './reviewer_page/BR_BlogList'
import axios from 'axios'

export class ReviewerBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        this.setState({ csData: res.data.rows })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料',error)
      })
  }
  render(props) {
    // if (!this.state.csData.length) return <></>
    if (this.state.csData.length === 0) return <><h1>取得資料中...</h1></>
    let csData = this.state.csData
    let BlogData = null
      console.log('csData[0].name', csData[0].name)
      for (let i = 0; i < csData.length; i++) {
        if (csData[i].sid == this.props.match.params.sid) {
          BlogData = csData[i]
        }
      }
    console.log('render csData 書評部落格資料',this.state.csData);
    return (
    <>
      {/* <BR_Navbar /> */}
      <h1>書評部落格</h1>
      <section className="reviewerBlog borderLine">
          <BR_BlogList
          name={BlogData.name}
          info={BlogData.info}
          ></BR_BlogList>
      </section>
          {/* <img className="BG_Blog" src={require('../pages/reviewer_page/images/03_評品書.png')}/> */}
    </>
    )
  }
}

export default withRouter(ReviewerBlog)
