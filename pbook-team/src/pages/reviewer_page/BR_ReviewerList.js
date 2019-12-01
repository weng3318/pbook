import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from '@sweetalert/with-react'

class BR_ReviewerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      user:'',
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.setState({
        isLogin: true,
      })
    }
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(({ data: { rows: brData } }) => {
        this.setState({ brData })
      })
  }

  // 收藏書評家API-------------------------------------------------------------------------
  handleLikeBook = () => {
    // if (isLogin){
      axios
      .post('http://localhost:5555/reviewer/brReviewerAdd', {
        number: this.props.number,
        number_reviewer: this.state.number,
      })
      .then(data => {
        this.state.refreshLikeBook()
        swal('收藏成功', '', 'success')
      })
    // } 
    // else {
    //   swal('請登入會員').then(value=>{
    //     login()
    //   })
    // }
  }

  render() {
    // console.log(this.props)
    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    // 點擊追蹤圖示導向
    let Hash = `#${this.props.number}`
    return (
      <>
        {/* 設定書評列表的 id={會員編號} {this.props.number} */}
        <section
          id={this.props.number}
          className="ReviewerListAllBox reviewerList"
        >
          <div className="d-flex">
            <div className="brAvatarAllBox borderLineR">
              <h5 className="h5_br">{this.props.title}</h5>
              <Link to={'/reviewer/reviewerBooks/' + this.props.sid}>
                <div className="brAvatarBox">
                  <img
                    className="brAvatarImg"
                    src={require(`./images/${this.props.img}`)}
                  />
                </div>
              </Link>
              <h5 className="h5_br">{this.props.br_name}</h5>

              <div className="brIconBox">
                <div className="AvatarInfo">{this.props.job}</div>
              </div>

              <Link
                to={'/reviewer/reviewerBooks/' + this.props.sid}
                className="brSeeBookBox d-flex justify-content-center borderLineTop"
              >
                <div className="brIconBox">
                  <img
                    className="brMark_img_noAni"
                    src={require('../reviewer_page/images/P_logo.png')}
                  />
                  <img
                    className="brMark_img_ani"
                    src={require('../reviewer_page/images/ani_LoadingPBook_min.gif')}
                  />
                </div>
                <div className="brReadBooks">看看書櫃</div>
              </Link>

              {/* 追蹤作者----------------------------------------------------- */}
              {!this.state.isLogin ? (
                <>
              <Link to={`/reviewer${Hash}`}>
                <div className="brIconBox borderLineTop">
                  <img
                    className="brIconFollow"
                    // 請先登入
                    src={require('../reviewer_page/images/icon_followLogin.png')}
                  />
                </div>
              </Link>
              </>
            ) : JSON.parse(localStorage.getItem('user')).MR_number !==
              this.props.number ? (
              <>
              <Link to={`/reviewer${Hash}`}>
                <div className="brIconBox borderLineTop">
                  <img
                    className="brIconFollow"
                    // 追蹤作者
                    src={require('../reviewer_page/images/icon_follow.png')}
                  />
                </div>
              </Link>
              </>
            ) : (
              <>
              <Link to={`/reviewer${Hash}`}>
                <div className="brIconBox borderLineTop">
                  <img
                    className="brIconFollow"
                    // 取消追蹤
                    src={require('../reviewer_page/images/icon_follow.png')}
                  />
                </div>
              </Link>
              </>
            )}
              {/* 追蹤作者----------------------------------------------------- */}

              <div className="brIconBox borderLineTop">
                <a
                  className="brIconShare"
                  href={this.props.youtube}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_youtube.png')}
                  />
                </a>
                <a
                  className="brIconShare"
                  href={this.props.facebook}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_facebook.png')}
                  />
                </a>
                <a
                  className="brIconShare"
                  href={this.props.twitter}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_twitter.png')}
                  />
                </a>
              </div>
            </div>

            <div className="brInfoBox">
              <h5 className="h5_br">書評家簡介</h5>
              <div className="brInfoText">{this.props.intro}</div>
              <div className="fbBox">
                <div
                  className="fb-share-button"
                  data-href={this.props.tube}
                  data-layout="button_count"
                ></div>
              </div>
            </div>
          </div>
          <iframe
            className="brYouTubeRWD"
            width="50%"
            height="auto"
            src={this.props.tube}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <div style={{ height: '60px' }}></div>
      </>
    )
  }
}

export default BR_ReviewerList
