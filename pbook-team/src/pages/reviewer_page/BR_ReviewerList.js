import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class BR_ReviewerList extends React.Component {
  render(props) {
    return (
      <>   
<section className="ReviewerListAllBox reviewerList">
    <div className="d-flex">


          <div className="brAvatarAllBox borderLine">
              <h5>{this.props.title}</h5>
              <div className="brAvatarBox">
              <img className="brAvatarImg" src={require(`./images/${this.props.img}`)}/>
              </div>
              <h5>{this.props.name}</h5>

              <div className="brIconBox">
                  <div className="AvatarInfo">{this.props.job}</div>
              </div>

              <Link to={"/reviewerBooks/"+this.props.sid} className="d-flex justify-content-center borderLineTop">
              <div className="brIconBox">
                <img src={require('../reviewer_page/images/P_logo.png')}/>
              </div>
              <div className="brReadBooks">看看書櫃</div>
              </Link>
              
              <Link>
              <div className="brIconBox borderLineTop">
                  <img className="brIconFollow" src={require('../reviewer_page/images/icon_follow.png')}/>
              </div>
              </Link>

              <Link>
              <div className="brIconBox borderLineTop">
                    <img className="brIconShare" src={require('../reviewer_page/images/icon_youtube.png')}/>
                    <img className="brIconShare" src={require('../reviewer_page/images/icon_facebook.png')}/>
                    <img className="brIconShare" src={require('../reviewer_page/images/icon_twitter.png')}/>
              </div>
              </Link>
          </div>

          <div className="brInfoBox borderLine"><h5>書評家簡介</h5>
              <div className="brInfoText ">
              {this.props.intro}
                </div>
          </div>
    </div>
        <iframe className="brYouTubeRWD borderLine" width="50%" height="auto" src={this.props.tube} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</section>
        <div style={{height:'30px'}}></div>
      </>
    )
  }
}

export default BR_ReviewerList
