import React from 'react'
import './CardS1.scss'
import UserDetails from '../UserDetails/UserDetails'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCat } from '@fortawesome/free-solid-svg-icons'

//傳入props.data (fm資料表))

class CardS1 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      messageCount: [],
      user: [],
    }
  }
  componentDidUpdate() {
    fetch(
      `http://localhost:5555/forum/message/content/${this.props.data.fm_articleId}`
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        this.setState({ messageCount: result.length })
      })
  }

  render() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <>
          <figure className="card-figure">
            <img className="card-s1-img" alt="" src={require('./2.jpg')} />
          </figure>
        </>
      )
    } else {
      let article = this.props.data
      return (
        <>
          <div className="cards-frame">
            <figure className="card-figure card-module">
              <Link to={`/forum/article/${article.fm_articleId}`}>
                <img
                  className="card-s1-img"
                  alt=""
                  src={
                    'http://localhost:5555/images/forum/article_key/' +
                    article.fm_demoImage
                  }
                />
              </Link>
              <div className="card-body">
                <Link to={`/forum/article/${article.fm_articleId}`}>
                  <div className="card-title-font" title={article.fm_title}>
                    {article.fm_title}
                  </div>
                </Link>
                <Link to={`/forum/article/${article.fm_articleId}`}>
                  <div
                    className="card-s1-subTitle card-subtitle-font"
                    // title={article.fm_subTitle}
                  >
                    {article.fm_subTitle}
                  </div>
                </Link>
                <div className="user-details">
                  <UserDetails
                    read={true}
                    article={article}
                    memberId={article.fm_memberId}
                    message={this.state.messageCount}
                  />
                </div>
              </div>
            </figure>
          </div>
        </>
      )
    }
  }
}
export default CardS1
