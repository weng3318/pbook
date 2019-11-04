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
    let data
    if (this.props.data) {
      data = this.props.data
    }
    return (
      <>
        <figure className="card-figure">
          <img
            className="card-s1-img"
            alt=""
            src={require('../../../images/forum/1.jpg')}
            onClick={this.handleTitleClick}
          />
          <div className="card-body">
            <div>
              <div className="card-s-title" onClick={this.handleTitleClick}>
                {console.log(this.props.img)}
                {this.props.data && data.fm_title}
              </div>
              <div className="card-subTitle" onClick={this.handleTitleClick}>
                {this.props.data && data.fm_subTitle}
              </div>
              <UserDetails data={this.props.data} />
            </div>
          </div>
        </figure>
      </>
    )
  }
}
export default CardS1
