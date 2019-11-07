import React from 'react'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ForumNavBar from './ForumNavBar'
import CardS1 from '../../components/forum/CardS1/CardS1'
import CardS2 from '../../components/forum/CardS2/CardS2'
import './Forum.scss'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      update: false,
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
          data: result,
          update: true,
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
        <div className="forumpage">
          <ForumNavBar />
          <div className="container">
            <div className="featured-title">精選文章</div>
            <div className="featured">
              <CardS1 data={this.state.data[0]} />
              <CardS2
                update={this.state.update}
                data={[
                  this.state.data[2],
                  this.state.data[3],
                  this.state.data[4],
                ]}
              />
              <CardS1 data={this.state.data[1]} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Forum
