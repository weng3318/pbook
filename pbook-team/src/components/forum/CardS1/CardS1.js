import React from 'react'
import './CardS1.scss'
import UserDetails from '../UserDetails/UserDetails'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCat } from '@fortawesome/free-solid-svg-icons'

//傳入props.data (fm資料表))

class CardS1 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
    }
  }

  handleTitleClick = event => {
    console.log('title click')
  }

  render() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <>
          <figure className="card-figure">
            <img
              className="card-s1-img"
              alt=""
              src={require('./2.jpg')}
              onClick={this.handleTitleClick}
            />
          </figure>
        </>
      )
    } else {
      let article = this.props.data
      let image_name = article.fm_demoImage

      return (
        <>
          <figure className="card-figure card-module">
            <img
              className="card-s1-img"
              alt=""
              src={
                'http://localhost:5555/images/forum/article_key/' + image_name
              }
              onClick={this.handleTitleClick}
            />
            <div className="card-body">
              <div className="card-title-font" onClick={this.handleTitleClick}>
                {article.fm_title}
              </div>
              <div
                className="card-s1-subTitle card-subtitle-font"
                onClick={this.handleTitleClick}
              >
                {article.fm_subTitle}
              </div>
              <div className="user-details">
                <UserDetails
                  read={true}
                  article={article}
                  memberId={article.fm_memberId}
                />
              </div>
            </div>
          </figure>
        </>
      )
    }
  }
}
export default CardS1
