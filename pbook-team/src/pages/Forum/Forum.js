import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ForumNavBar from './ForumNavBar'
import CardS1 from '../../components/forum/CardS1/CardS1'
import CardS2 from '../../components/forum/CardS2/CardS2'
import './Forum.css'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:5555/forum/homepage', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(async result => {
        await this.setState({
          data: result[0],
        })
      })
      .catch(error => {
        //這裡可以顯示一些訊息
        console.error(error)
      })
  }

  render() {
    return (
      <>
        <ForumNavBar />
        <div className="container">
          <div className="featured-title">精選文章</div>
          <div className="featured">
            <CardS1
              data={this.state.data}
              img={
                "require('../../../images/Forum/'" +
                this.state.data.fm_demoImage +
                ')'
              }
            />
            <CardS2 />
            <CardS1 />
          </div>
        </div>
      </>
    )
  }
}
export default Forum
