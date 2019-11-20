import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import { ButtonToolbar, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import './changeGame.css'
import BGsound from './BGsound'
import GameRuleAlways from './GameRuleAlways'
import GameRule from './GameRule'
import MyCountdown from './MyCountdown'
import MyChance from './MyChance'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      gameInviteMe: [],
      gameWait: [],
      myBooks: [],
      pairedMemberBooks: [],
      startTime: '',
      chance: 0,
      modalShow: false,
      modalData: {
        bookName: '',
        bookPic: [],
        bookRemarks: '',
      },
      chosenValue: 0,
    }
  }

  // 遊戲首頁到對方的書籍列表(進入遊戲)
  handleStartGame = async () => {
    this.btnaudio.cloneNode().play()

    await axios
      .post(`http://localhost:5555/nana_use/gameWait`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        startTime: this.state.startTime,
      })
      .then(res => {
        this.setState({ gameWait: res.data })
      })
      .catch(err => {
        console.log('handleStartGame ajax時錯誤', err)
      })

    if (this.state.myBooks.length === 0) {
      swal({
        title:
          '書櫃裡沒有書無法參與遊戲!請到會員資料的二手書管理內新增配對書籍!',
        icon: 'warning',
      }).then(value => {
        // 這邊要記得改!要引導到上架書籍那
        window.location.href = '/'
      })
    } else if (this.state.gameWait.length === 0) {
      this.setState({ status: 'gameBookList' })
    } else {
      this.setState({ status: 'gameWaitList' })
    }
  }

  // 遊戲首頁返回(退出遊戲)
  handleBackGame = () => {
    this.btnaudio.cloneNode().play()
    window.history.back()
  }

  // 書籍列表光箱控制鈕
  handleModalShow = modalData => {
    console.log('modalData', modalData)
    var bookPic
    if (modalData.bookPic !== null) {
      bookPic = modalData.bookPic.split(',')
    } else {
      bookPic = ['品書印章.png']
    }

    this.setState({
      modalData: {
        bookName: modalData.bookName,
        bookPic: bookPic,
        bookRemarks: modalData.bookRemarks,
      },
      modalShow: true,
    })
  }
  handleModalHide = () => {
    this.setState({ modalShow: false })
  }

  // 書籍列表重置按鈕
  getNewData = data => {
    this.setState({
      pairedMemberBooks: JSON.parse(data.pairedMemberBooks),
      chance: data.chance,
    })
  }

  //書籍列表送出按鈕
  handleCheckedBook = () => {
    if (this.state.chosenValue === 0) {
      // 沒選擇書籍
      swal({
        title: '您沒有選擇書籍喔!',
        icon: 'warning',
      })
    } else {
      // 有選擇書籍
      axios
        .post(`http://localhost:5555/nana_use/gameWaitCheck`, {
          bookSid: this.state.chosenValue,
        })
        .then(res => {
          // 所選的書籍已經被刪除的話....
          if (res.data.length === 0) {
            swal({
              title: '很抱歉!您所選擇的書籍已經被刪除了!我們將替您刷新書籍!',
              icon: 'warning',
            })
            return axios
              .post(`http://localhost:5555/nana_use/pairedMemberBooks`, {
                memberId: JSON.parse(localStorage.getItem('user')).MR_number,
              })
              .then(res => {
                this.setState({ pairedMemberBooks: res.data })
              })
          } else {
            // 所選的書籍沒被刪除
            return axios
              .post(`http://localhost:5555/nana_use/gameWaitInsert`, {
                memberId: JSON.parse(localStorage.getItem('user')).MR_number,
                startTime: this.state.startTime,
                bookSid: this.state.chosenValue,
              })
              .then(res => {
                if ((res.data = 'gameWaitInsert 新增成功')) {
                  swal({
                    title: '您已經成功發出配對邀請!請去察看配對狀態!',
                    icon: 'warning',
                  }).then(res => {
                    this.setState({ status: 'gameWaitList' })
                  })
                }
              })
          }
        })
        .catch(err => {
          console.log('handleCheckedBook ajax時錯誤', err)
        })
    }
  }

  // 書籍列表radioButton
  handleRadioButtonClick = e => {
    this.setState({
      chosenValue: e.target.value,
    })
  }

  componentDidMount() {
    let startTime = new Date().getTime()
    let chance = JSON.parse(localStorage.getItem('user')).MR_personLevel - 1
    let myBooks
    axios
      .post(`http://localhost:5555/nana_use/myBooks`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        myBooks = res.data
        return axios
          .post(`http://localhost:5555/nana_use/pairedMemberBooksOld`, {
            memberId: JSON.parse(localStorage.getItem('user')).MR_number,
          })
          .then(res => {
            // console.log('hihi length', res.data.length)
            // console.log('hihi', JSON.parse(res.data[0].GamePairedMemberBooks))
            // console.log('hihi', JSON.parse(res.data[0].GameCreatedTime))

            // 如果回傳資料長度為0,代表尚未建立過配對列表,則執行ajax去創建資料並新增
            if (res.data.length === 0) {
              return axios
                .post(`http://localhost:5555/nana_use/pairedMemberBooks`, {
                  memberId: JSON.parse(localStorage.getItem('user')).MR_number,
                })
                .then(res => {
                  this.setState({
                    pairedMemberBooks: res.data,
                    startTime: startTime,
                    myBooks: myBooks,
                    chance: chance,
                  })
                  return axios
                    .post(
                      `http://localhost:5555/nana_use/pairedMemberBooksInsert`,
                      {
                        memberId: JSON.parse(localStorage.getItem('user'))
                          .MR_number,
                        pairedMemberBooks: res.data,
                        startTime: startTime,
                        GameChance: chance,
                      }
                    )
                    .then(res => {
                      console.log('pairedMemberBooksInsert', res.data)
                    })
                })
            } else if (
              startTime >
              JSON.parse(res.data[0].GameCreatedTime) + 21600000
            ) {
              // 如果書籍列表有資料,但現在時刻大於建立時刻+6小時那也可以去創建新資料並更新
              return axios
                .post(`http://localhost:5555/nana_use/pairedMemberBooks`, {
                  memberId: JSON.parse(localStorage.getItem('user')).MR_number,
                })
                .then(res => {
                  this.setState({
                    pairedMemberBooks: res.data,
                    startTime: startTime,
                    myBooks: myBooks,
                    chance: chance,
                  })
                  return axios
                    .post(
                      `http://localhost:5555/nana_use/pairedMemberBooksUpdate`,
                      {
                        memberId: JSON.parse(localStorage.getItem('user'))
                          .MR_number,
                        pairedMemberBooks: res.data,
                        startTime: startTime,
                        GameChance: chance,
                      }
                    )
                    .then(res => {
                      console.log('pairedMemberBooksUpdate', res.data)
                    })
                })
            } else {
              // 都不符合更新或新增的條件,則直接將舊資料塞進去!
              console.log('直接塞舊資料')
              this.setState({
                pairedMemberBooks: JSON.parse(
                  res.data[0].GamePairedMemberBooks
                ),
                startTime: JSON.parse(res.data[0].GameCreatedTime),
                chance: JSON.parse(res.data[0].GameChance * 1),
                myBooks: myBooks,
              })
            }
          })
      })
      .catch(error => {
        console.log('COMPONENTDIDMOUNT AJAX時有錯誤1', error)
      })
    axios
      .post(`http://localhost:5555/nana_use/gameInviteMe`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        if (res.data.length !== 0) {
          this.setState({ gameInviteMe: res.data })
        }
      })
      .catch(error => {
        console.log('COMPONENTDIDMOUNT AJAX時有錯誤2', error)
      })
  }

  render() {
    const {
      myBooks,
      pairedMemberBooks,
      startTime,
      chance,
      modalData,
      gameWait,
      chosenValue,
    } = this.state
    console.log('render myBooks', myBooks)
    console.log('render pairedMemberBooks', pairedMemberBooks)
    console.log('render startTime', startTime)
    console.log('render gameWait', gameWait)
    console.log('render chance', chance)
    console.log('render modalData', modalData)
    console.log('render chosenValue', chosenValue)
    var pcSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    if (this.state.status === 'start') {
      return (
        <>
          <audio
            id="audio"
            hidden={true}
            src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
            ref={audio => (this.btnaudio = audio)}
          ></audio>

          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'URL(' + require('./images/bg.png') + ')',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 20,
            }}
          >
            <div className="changeGameIndexBG">
              <div id="snow"></div>
              <div className="position-relative PC-changeGameWrap">
                <img
                  className="position-absolute PC-changeGameIndexContext"
                  src={require('./images/PC-changeGameIndexContext.png')}
                  alt="電腦版"
                />
                <div className="d-flex position-absolute PC-changeGameBtnWrap">
                  <img
                    id="btn"
                    src={require('./images/start-black.png')}
                    alt="電腦版進入按鈕"
                    onClick={this.handleStartGame}
                  />
                  <img
                    src={require('./images/back-black.png')}
                    alt="電腦版退出按鈕"
                    onClick={this.handleBackGame}
                  />
                  <img
                    src={require('./images/cfm-black.png')}
                    alt="電腦版查看配對狀態按鈕"
                    // onClick={this.handleBackGame}
                    // 還沒寫
                  />
                </div>
              </div>

              <div className="position-relative">
                <img
                  className="PHONE-changeGameIndexContext"
                  src={require('./images/PHONE-changeGameIndexContext.png')}
                  alt="手機板"
                />
                <div className="position-absolute PHONE-changeGameBtnWrap">
                  <img
                    src={require('./images/start-black.png')}
                    alt="手機版進入按鈕"
                    onClick={this.handleStartGame}
                  />
                  <img
                    src={require('./images/back-black.png')}
                    alt="手機版退出按鈕"
                    onClick={this.handleBackGame}
                  />
                </div>
              </div>
            </div>
            <GameRuleAlways />
            <BGsound />
          </div>
        </>
      )
    } else if (this.state.status === 'gameBookList') {
      return (
        <>
          <audio
            id="audio"
            hidden={true}
            src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
            ref={audio => (this.btnaudio = audio)}
          ></audio>

          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'URL(' + require('./images/bg.png') + ')',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 20,
            }}
          >
            <GameRule />

            <div className="changeGameIndexBG">
              <div id="snow"></div>
              <div className="position-relative PC-changeGameBookListWrap d-flex">
                <img
                  className="position-absolute PC-changeGameBookListContext"
                  src={require('./images/PC-changeGameBookListContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute PC-changeGameBookListTableWrap">
                  <div className="PC-changeGameBookListTable">
                    <MyCountdown />
                    <MyChance
                      chance={this.state.chance}
                      getNewData={this.getNewData}
                    />
                    <table className="table table-bordered table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">選擇</th>
                          <th scope="col">書籍名稱</th>
                          <th
                            scope="col"
                            className="PC-changeGameBookListBookStatus"
                          >
                            +書況
                          </th>
                          <th scope="col">書籍照片</th>
                          <th scope="col">分類</th>
                          <th scope="col">定價</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.pairedMemberBooks.map((value, index) => (
                          <tr key={index}>
                            <th scope="row">
                              <input
                                type="radio"
                                name="react-tips"
                                value={value.mb_sid}
                                onClick={this.handleRadioButtonClick}
                              ></input>
                            </th>
                            <td>{value.mb_name}</td>
                            <td>{value.mb_savingStatus}</td>
                            <td>
                              <ButtonToolbar>
                                <div
                                  className="PC-changeGameBookListShow"
                                  onClick={() =>
                                    this.handleModalShow({
                                      bookName: value.mb_name,
                                      bookPic: value.mb_pic,
                                      bookRemarks: value.mb_remarks,
                                    })
                                  }
                                >
                                  +顯示
                                </div>
                              </ButtonToolbar>

                              <Modal
                                show={this.state.modalShow}
                                onHide={this.handleModalHide}
                                size="lg"
                                aria-labelledby="myModal"
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title id="myModal">
                                    {modalData.bookName}
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Slider {...pcSettings}>
                                    {modalData.bookPic.map((value, index) => (
                                      <div key={index}>
                                        <img
                                          style={{
                                            margin: '0 auto',
                                            width: '30vw',
                                            maxHeight: '30vh',
                                            objectFit: 'contain',
                                          }}
                                          src={
                                            'http://localhost:5555/images/memberBooks/' +
                                            value
                                          }
                                          alt="書籍照片"
                                        />
                                      </div>
                                    ))}
                                  </Slider>
                                </Modal.Body>
                                <Modal.Body>
                                  書籍備註：{modalData.bookRemarks}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button onClick={this.handleModalHide}>
                                    關閉
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </td>
                            <td>{value.mb_categories}</td>
                            <td>{value.mb_fixedPrice}元</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end PC-changeGameBookListBtnWrap">
                    <img
                      src={require('./images/submit-green.png')}
                      alt="電腦版確認送出按鈕"
                      onClick={this.handleCheckedBook}
                    />
                    <img
                      src={require('./images/back-red.png')}
                      alt="電腦版回到首頁按鈕"
                    />
                  </div>
                </div>
              </div>

              <div className="position-relative PHONE-changeGameBookListWrap">
                <img
                  className="PHONE-changeGameBookListContext"
                  src={require('./images/PHONE-changeGameBookListContext.png')}
                  alt="手機板"
                />

                <Slider {...settings}>
                  {this.state.pairedMemberBooks.map((value, index) => (
                    <div key={index}>
                      <div className="text-center" style={{ margin: '10px 0' }}>
                        <MyCountdown />
                        <MyChance
                          chance={this.state.chance}
                          getNewData={this.getNewData}
                        />
                      </div>
                      <div
                        style={{
                          width: '90vw',
                          margin: '0 auto',
                        }}
                      >
                        <Card.Header className="text-center">
                          {value.mb_name}
                        </Card.Header>
                        <Card.Body className="text-left">
                          <Card.Text>
                            <img
                              src={
                                'http://localhost:5555/images/memberBooks/' +
                                value.mb_pic.split(',')[0]
                              }
                              alt="手機板書籍照片"
                              className="PHONE-changeGameBookListImg"
                            ></img>
                          </Card.Text>
                          <Card.Text>
                            ・選擇：
                            <input
                              type="radio"
                              name="react-tips"
                              value={value.mb_sid}
                              onClick={this.handleRadioButtonClick}
                            ></input>
                          </Card.Text>
                          <Card.Text>・書況：{value.mb_savingStatus}</Card.Text>
                          <Card.Text>・分類：{value.mb_categories}</Card.Text>
                          <Card.Text>・定價：{value.mb_fixedPrice}元</Card.Text>
                          <div
                            className="PHONE-changeGameBookListShow"
                            onClick={() =>
                              this.handleModalShow({
                                bookName: value.mb_name,
                                bookPic: value.mb_pic,
                                bookRemarks: value.mb_remarks,
                              })
                            }
                          >
                            ・點我顯示詳請
                          </div>
                        </Card.Body>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="d-flex PHONE-changeGameBookListBtnWrap">
                  <img
                    src={require('./images/submit-green.png')}
                    alt="手機版確認送出按鈕"
                    onClick={this.handleCheckedBook}
                  />
                  <img
                    src={require('./images/back-red.png')}
                    alt="手機版回到首頁按鈕"
                  />
                </div>
              </div>
            </div>
            <GameRuleAlways />
            <BGsound />
          </div>
        </>
      )
    } else if (this.state.status === 'gameWaitList') {
      return (
        <>
          <audio
            id="audio"
            hidden={true}
            src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
            ref={audio => (this.btnaudio = audio)}
          ></audio>

          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'URL(' + require('./images/bg.png') + ')',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 20,
            }}
          >
            <GameRule />

            <div className="changeGameIndexBG">
              <div id="snow"></div>
              <div className="position-relative PC-changeGameWaitWrap d-flex">
                <img
                  className="position-absolute PC-changeGameWaitContext"
                  src={require('./images/PC-changeGameWaitContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute PC-changeGameWaitContextWrap">
                  <div className="PC-changeGameWaitTable">
                    <MyCountdown />
                    <Tabs
                      defaultActiveKey="link-1"
                      id="uncontrolled-tab-example"
                      className="PC-nav-link"
                    >
                      <Tab eventKey="link-1" title="我發出的邀請">
                        <div className="PC-changeGameWaitTableWrap">
                          <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">編號</th>
                                <th scope="col">書籍狀態</th>
                                <th scope="col">欲換書籍</th>
                                <th scope="col">配對狀態</th>
                                <th scope="col">發出日期/時間</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.gameWait.map((value, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{value.bookStatus}</td>
                                  <td>{value.book_name}</td>
                                  <td>{value.matchStatus}</td>
                                  <td>
                                    {moment(value.created_at * 1).format('lll')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Tab>
                      <Tab eventKey="link-2" title="向我發出的邀請">
                        <div className="PC-changeGameWaitTableWrap">
                          <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">編號</th>
                                <th scope="col">發出人</th>
                                <th scope="col">書籍狀態</th>
                                <th scope="col">欲換書籍</th>
                                <th scope="col">配對狀態</th>
                                <th scope="col">發出日期/時間</th>
                                <th scope="col">是否同意?</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.gameInviteMe.map((value, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>發出人</td>
                                  <td>{value.bookStatus}</td>
                                  <td>{value.book_name}</td>
                                  <td>{value.matchStatus}</td>
                                  <td>
                                    {moment(value.created_at * 1).format('lll')}
                                  </td>
                                  <td>同意</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Tab>
                      <Tab eventKey="link-3" title="配對成功列表">
                        <h1>測試3</h1>
                      </Tab>
                    </Tabs>
                  </div>
                  <div className="d-flex justify-content-end PC-changeGameWaitBtnWrap">
                    <img
                      src={require('./images/submit-green.png')}
                      alt="電腦版確認送出按鈕"
                      onClick={this.handleCheckedBook}
                    />
                    <img
                      src={require('./images/back-red.png')}
                      alt="電腦版回到首頁按鈕"
                    />
                  </div>
                </div>
              </div>

              <div className="position-relative PHONE-changeGameBookListWrap">
                <img
                  className="PHONE-changeGameBookListContext"
                  src={require('./images/PHONE-changeGameBookListContext.png')}
                  alt="手機板"
                />

                <Slider {...settings}>
                  {this.state.pairedMemberBooks.map((value, index) => (
                    <div key={index}>
                      <div className="text-center" style={{ margin: '10px 0' }}>
                        <MyCountdown />
                        <MyChance
                          chance={this.state.chance}
                          getNewData={this.getNewData}
                        />
                      </div>
                      <div
                        style={{
                          width: '90vw',
                          margin: '0 auto',
                        }}
                      >
                        <Card.Header className="text-center">
                          {value.mb_name}
                        </Card.Header>
                        <Card.Body className="text-left">
                          <Card.Text>
                            <img
                              src={
                                'http://localhost:5555/images/memberBooks/' +
                                value.mb_pic.split(',')[0]
                              }
                              alt="手機板書籍照片"
                              className="PHONE-changeGameBookListImg"
                            ></img>
                          </Card.Text>
                          <Card.Text>
                            ・選擇：
                            <input
                              type="radio"
                              name="react-tips"
                              value={value.mb_sid}
                              onClick={this.handleRadioButtonClick}
                            ></input>
                          </Card.Text>
                          <Card.Text>・書況：{value.mb_savingStatus}</Card.Text>
                          <Card.Text>・分類：{value.mb_categories}</Card.Text>
                          <Card.Text>・定價：{value.mb_fixedPrice}元</Card.Text>
                          <div
                            className="PHONE-changeGameBookListShow"
                            onClick={() =>
                              this.handleModalShow({
                                bookName: value.mb_name,
                                bookPic: value.mb_pic,
                                bookRemarks: value.mb_remarks,
                              })
                            }
                          >
                            ・點我顯示詳請
                          </div>
                        </Card.Body>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="d-flex PHONE-changeGameBookListBtnWrap">
                  <img
                    src={require('./images/submit-green.png')}
                    alt="手機版確認送出按鈕"
                    onClick={this.handleCheckedBook}
                  />
                  <img
                    src={require('./images/back-red.png')}
                    alt="手機版回到首頁按鈕"
                  />
                </div>
              </div>
            </div>
            <GameRuleAlways />
            <BGsound />
          </div>
        </>
      )
    }
  }
}

export default Game
