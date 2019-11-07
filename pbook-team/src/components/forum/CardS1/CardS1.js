import React from 'react'
import './CardS1.css'
import UserDetails from '../UserDetails/UserDetails'

class CardS1 extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
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
                  {/* {this.props.data && data.fm_title} */}
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
      let data = this.props.data
      let image_name = data.fm_demoImage
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
                  {data.fm_title}
                </div>
                <div className="card-subTitle" onClick={this.handleTitleClick}>
                  {data.fm_subTitle}
                </div>
                <UserDetails data={data} />
              </div>
            </div>
          </figure>
        </>
      )
    }
  }
}
export default CardS1
