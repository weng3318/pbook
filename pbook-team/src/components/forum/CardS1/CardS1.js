import React from 'react'
import './CardS1.css'
import UserDetails from '../UserDetails/UserDetails'

//傳入props.data

class CardS1 extends React.Component {
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
            <div className="card-body">
              <div>
                <div className="card-s-title" onClick={this.handleTitleClick}>
                  {/* {this.props.data && this.props.data.fm_title} */}
                </div>
                <div className="card-subTitle" onClick={this.handleTitleClick}>
                  {/* {this.props.data && data.fm_subTitle} */}
                </div>
                <UserDetails />
              </div>
            </div>
          </figure>
        </>
      )
    } else {
      let article = this.props.data
      let image_name = article.fm_demoImage

      return (
        <>
          <figure className="card-figure">
            <img
              className="card-s1-img"
              alt=""
              src={
                'http://localhost:5555/images/forum/article_key/' + image_name
              }
              onClick={this.handleTitleClick}
            />
            <div className="card-body">
              <div>
                <div className="card-s-title" onClick={this.handleTitleClick}>
                  {article.fm_title}
                </div>
                <div className="card-subTitle" onClick={this.handleTitleClick}>
                  {article.fm_subTitle}
                </div>
                <UserDetails data={article} memberId={article.fm_memberId} />
              </div>
            </div>
          </figure>
        </>
      )
    }
  }
}
export default CardS1
