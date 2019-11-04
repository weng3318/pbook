import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactResizeDetector from 'react-resize-detector'
import swal from '@sweetalert/with-react'

import Home from '../../pages/Home'
import Reviewer from '../../pages/Reviewer'
import Books from '../../pages/Books'
import Activities from '../../pages/Activities'
import Reviews from '../../pages/Reviews'
import Forum from '../../pages/Forum'
import Login from '../../pages/login/Login'
import Member from '../../pages/member/Member'
import Game from '../../pages/game/Game'
import Logout from '../../pages/Logout'
import Cart from '../../pages/Cart'
import NoPage from '../../pages/nopage/NoPage'

import './header.css'

export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      hasData: false,
      id: 'MR00001',
      name: '橫山裕',
      level: '品書學徒',
      loginImg: './images/yoko.jpg',
    }
  }

  handleLoginButton = event => {
    if (this.state.id === '') {
      window.location.href = '/login'
    } else {
      let loginButton = event.currentTarget
      let loginImg = loginButton.querySelector('.loginImg')
      let loginText = loginButton.querySelectorAll('.loginText')

      loginButton.classList.add('transition')
      loginButton.classList.toggle('long')
      setTimeout(() => {
        loginImg.classList.toggle('show')
        for (let i = 0; i < loginText.length; i++) {
          loginText[i].classList.toggle('show')
        }
      }, 200)
    }
  }

  handleStopPropagation = event => {
    event.stopPropagation()
  }

  handleLogout = () => {
    swal({
      title: '您確定要登出嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('您已經成功登出!', {
          icon: 'success',
        })
        setTimeout(() => {
          this.setState({
            hasData: false,
            id: '',
            name: '',
            level: '',
            loginImg: './images/pbook_logo_black.png',
          })
          window.location.href = '/'
        }, 1000)
      }
    })
  }

  onResize = () => {
    let loginButton = document.querySelector('.loginButton')
    loginButton.classList.remove('transition')
  }

  handlePhoneTitle = event => {
    event.currentTarget.classList.toggle('active')
  }

  componentDidMount() {
    // 模擬會員登入後的狀態
    // setTimeout(() => {
    //     this.setState({
    //         id: "MR00001",
    //         name: "橫山裕",
    //         level: "品書學徒",
    //         loginImg: "./images/yoko.jpg",
    //     })
    // }, 1000)
    // 品書通知的東西
    // load()
    // var notification;
    // function load() {
    //     if (Notification.permission === "granted") {
    //         //console.log("允許");
    //         notification = new Notification("品書通知", {
    //             body: "Notification Demo...",
    //             icon: require('./images/P_logo.png')
    //         });
    //     } else if (Notification.permission === "default") {
    //         console.log("要求權限");
    //         getPermission(load);
    //     } else {
    //         console.log("拒絕");
    //     }
    //     console.log(notification);
    // }
    // function getPermission(cb) {
    //     Notification.requestPermission(cb);
    // }
  }

  render() {
    let phoneMemberStatus = 'none'
    if (this.state.id !== '') phoneMemberStatus = 'block'
    let phoneVisitorStatus = 'block'
    if (this.state.id !== '') phoneVisitorStatus = 'none'

    return (
      <>
        <img
          src={require('./images/header.jpg')}
          className="img-fluid header-img"
          alt=""
        />

        <Router>
          <Link
            to="/"
            className="myHeaderLogo position-absolute pointer"
          ></Link>

          <div className="mwt_border"></div>

          <div className="cartButton position-absolute d-flex flex-column justify-content-center align-items-center pointer">
            <Link to="/cart" className="titleZh-white">
              購物車
            </Link>
            <span className="titleEn">CART</span>
          </div>
          <div
            className="loginButton position-absolute d-flex flex-column justify-content-center align-items-center pointer"
            style={{ minHeight: this.state.height }}
            onClick={this.handleLoginButton}
          >
            <span className="titleZh-white">
              {this.state.id === '' ? '登入' : this.state.name}
            </span>
            <span className="titleEn">
              {this.state.id === '' ? 'LOGIN' : this.state.level}
            </span>
            <span
              className="loginImg"
              style={{
                backgroundImage:
                  'url(' + require('' + this.state.loginImg) + ')',
              }}
            ></span>
            <Link
              to="/member"
              className="loginText"
              onClick={this.handleStopPropagation}
            >
              會員資料
            </Link>
            <Link
              to={'/game/' + this.state.id}
              className="loginText"
              onClick={this.handleStopPropagation}
            >
              二手書配對
            </Link>
            <div className="loginText" onClick={this.handleLogout}>
              登出
            </div>
          </div>

          <section className="d-flex justify-content-center titleButton">
            <Link to="/reviewer" className="myHeaderTextCenter mx-4 pointer">
              <span className="titleZh">書評家</span>
              <br />
              <span className="titleEn">REVIEWER</span>
            </Link>
            <Link to="/books" className="myHeaderTextCenter mx-4 pointer">
              <span className="titleZh">書籍商城</span>
              <br />
              <span className="titleEn">BOOKS</span>
            </Link>
            <Link to="/activities" className="myHeaderTextCenter mx-4 pointer">
              <span className="titleZh">品書活動</span>
              <br />
              <span className="titleEn">ACTIVITIES</span>
            </Link>
            <Link to="/reviews" className="myHeaderTextCenter mx-4 pointer">
              <span className="titleZh">品書書評</span>
              <br />
              <span className="titleEn">REVIEWS</span>
            </Link>
            <Link to="/forum" className="myHeaderTextCenter mx-4 pointer">
              <span className="titleZh">品書討論區</span>
              <br />
              <span className="titleEn">FORUM</span>
            </Link>
          </section>

          <section className="phoneTitleHide">
            <div className="myHeaderMenu" onClick={this.handlePhoneTitle}>
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
              <ul>
                <li style={{ display: phoneVisitorStatus }}>
                  <Link to="/login" className="myHeaderA">
                    登入
                  </Link>
                </li>
                <li style={{ display: phoneMemberStatus }}>
                  <Link to="/member" className="myHeaderA">
                    {this.state.name}
                  </Link>
                </li>
                <li style={{ display: phoneMemberStatus }}>
                  <Link to={'/game/' + this.state.id} className="myHeaderA">
                    二手書配對
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="myHeaderA">
                    購物車
                  </Link>
                </li>
                <li>
                  <Link to="/reviewer" className="myHeaderA">
                    書評家
                  </Link>
                </li>
                <li>
                  <Link to="/books" className="myHeaderA">
                    書籍商城
                  </Link>
                </li>
                <li>
                  <Link to="/activities" className="myHeaderA">
                    品書活動
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="myHeaderA">
                    品書書評
                  </Link>
                </li>
                <li>
                  <Link to="/forum" className="myHeaderA">
                    品書討論區
                  </Link>
                </li>
                <li style={{ display: phoneMemberStatus }}>
                  <div className="myHeaderA" onClick={this.handleLogout}>
                    登出
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/reviewer"
              component={() => <Reviewer id="111" />}
            />
            <Route exact path="/books" component={Books} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/reviews" component={Reviews} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/member" component={Member} />
            <Route exact path="/game/:id" component={Game} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact component={NoPage} />
          </Switch>
        </Router>

        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </>
    )
  }
}
