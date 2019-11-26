import React from 'react'
import { Link } from 'react-router-dom'

class BR_ReviewerList extends React.Component {
  render(props) {
    // console.log(this.props)
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))

    // 點擊追蹤圖示導向
    let Hash = `#${this.props.number}`
    return (
      <>
      {/* 設定了書評家 id={會員編號} {this.props.number} */}
<section id={this.props.number} className="ReviewerListAllBox reviewerList">
    <div className="d-flex">
          <div className="brAvatarAllBox borderLine">
              <h5 className="h5_br">{this.props.title}</h5>
            <Link to={"/reviewer/reviewerBooks/"+this.props.sid}>
              <div className="brAvatarBox">
              <img className="brAvatarImg" src={require(`./images/${this.props.img}`)}/>
              </div>
            </Link>
              <h5 className="h5_br">{this.props.br_name}</h5>

              <div className="brIconBox">
                  <div className="AvatarInfo">{this.props.job}</div>
              </div>

              <Link to={"/reviewer/reviewerBooks/"+this.props.sid} className="d-flex justify-content-center borderLineTop">
              <div className="brIconBox">
                <img className="brMark_img" src={require('../reviewer_page/images/P_logo.png')}/>
              </div>
                <div className="brReadBooks">看看書櫃</div>
              </Link>
              
              {/* 追蹤作者 */}
              <Link to={`/reviewer${Hash}`}>
                  <div className="brIconBox borderLineTop">
                      <img className="brIconFollow" src={require('../reviewer_page/images/icon_follow.png')}/>
                  </div>
              </Link>

              <div className="brIconBox borderLineTop">
              <a className="brIconShare" href={this.props.youtube} target="black">
                    <img className="brMark_img" src={require('../reviewer_page/images/icon_youtube.png')}/>
              </a>
              <a className="brIconShare" href={this.props.facebook} target="black">
                    <img className="brMark_img" src={require('../reviewer_page/images/icon_facebook.png')}/>
              </a>
              <a className="brIconShare" href={this.props.twitter} target="black">
                    <img className="brMark_img" src={require('../reviewer_page/images/icon_twitter.png')}/>
              </a>
              </div>
          </div>

          <div className="brInfoBox borderLine"><h5 className="h5_br">書評家簡介</h5>
                <div className="brInfoText ">{this.props.intro}</div>
                    <div className="fbBox">
                        <div className="fb-share-button"data-href={this.props.tube} data-layout="button_count"></div>
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
