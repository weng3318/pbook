import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import { ButtonToolbar, Button, Modal, Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
      myBooks: [],
      pairedMemberBooks: [],
      startTime: '',
      chance: 0,
      modalShow: false,
    }
  }

  // 遊戲首頁到對方的書籍列表(進入遊戲)
  handleStartGame = () => {
    this.btnaudio.cloneNode().play()
    if (this.state.myBooks.length === 0) {
      swal({
        title: '您的書櫃裡沒有書唷!請到會員資料的二手書管理內新增配對書籍!',
        icon: 'warning',
      }).then(value => {
        // 這邊要記得改!要引導到上架書籍那
        window.location.href = '/'
      })
    } else {
      this.setState({ status: 'gameBookList' })
    }
  }

  // 遊戲首頁返回(退出遊戲)
  handleBackGame = () => {
    this.btnaudio.cloneNode().play()
    window.history.back()
  }

  // 書籍列表光箱控制鈕
  handleModalShow = () => {
    this.setState({ modalShow: true })
  }
  handleModalHide = () => {
    this.setState({ modalShow: false })
  }

  // 書籍列表重置紐
  getNewData = data => {
    this.setState({
      pairedMemberBooks: JSON.parse(data.pairedMemberBooks),
      chance: data.chance,
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
        console.log('COMPONENTDIDMOUNT AJAX時有錯誤', error)
      })
  }

  render() {
    const { myBooks, pairedMemberBooks, startTime, chance } = this.state
    console.log('render myBooks', myBooks)
    console.log('render pairedMemberBooks', pairedMemberBooks)
    console.log('render startTime', startTime)
    console.log('render chance', chance)
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
                                value="option1"
                              ></input>
                            </th>
                            <td>{value.mb_name}</td>
                            <td>{value.mb_savingStatus}</td>
                            <td>
                              <ButtonToolbar>
                                <div
                                  className="PC-changeGameBookListShow"
                                  onClick={this.handleModalShow}
                                >
                                  +顯示
                                </div>
                              </ButtonToolbar>

                              <Modal
                                show={this.state.modalShow}
                                size="lg"
                                aria-labelledby={'book' + value.mb_sid}
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title id={'book' + value.mb_sid}>
                                    {index}
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Slider {...pcSettings}>
                                    <div>
                                      <img
                                        style={{
                                          margin: '0 auto',
                                        }}
                                        src={require('./images/vb_9573318318.jpg')}
                                        alt="書籍照片"
                                      />
                                    </div>
                                    <div>
                                      <img
                                        style={{
                                          margin: '0 auto',
                                        }}
                                        src={require('./images/vb_9573318318.jpg')}
                                        alt="書籍照片"
                                      />
                                    </div>
                                  </Slider>
                                </Modal.Body>
                                <Modal.Body>書籍備註：無畫線註記。</Modal.Body>
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
                  <div>
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
                        柱子小隊的資策會人生
                      </Card.Header>
                      <Card.Body className="text-left">
                        <Card.Text>
                          <img
                            src={require('./images/hina.jpg')}
                            alt="手機板書籍照片"
                            className="PHONE-changeGameBookListImg"
                          ></img>
                        </Card.Text>
                        <Card.Text>
                          ・選擇：
                          <input
                            type="radio"
                            name="react-tips"
                            value="option1"
                          ></input>
                        </Card.Text>
                        <Card.Text>・書況：A良好</Card.Text>
                        <Card.Text>・分類：程式語言</Card.Text>
                        <Card.Text className="PHONE-changeGameBookListText">
                          ・書籍備註：CSS不能單獨使用，必須與HTML或XML一起協同工作，為HTML或XML起裝飾作用。本文主要介紹用於裝飾HTML網頁的CSS技術。其中HTML負責確定網頁中有哪些內容，CSS確定以何種外觀(大小、粗細、顏色、對齊和位置)展現這些元素。CSS可以用於設定頁面布局、設定頁面元素樣式、設定適用於所有網頁的全域樣式。CSS可以零散地直接添加在要應用樣式的網頁元素上，也可以集中化內建於網頁、連結式引入網頁以及匯入式引入網頁。[1]
                          CSS最重要的目標是將檔案的內容與它的顯示分隔開來。在CSS出現前，幾乎所有的HTML檔案內都包含檔案顯示的資訊，比如字型的顏色、背景應該是怎樣的、如何排列、邊緣、連線等等都必須一一在HTML檔案內列出，有時重複列出。CSS使作者可以將這些資訊中的大部分隔離出來，簡化HTML檔案，這些資訊被放在一個輔助的，用CSS語言寫的檔案中。HTML檔案中只包含結構和內容的資訊，CSS檔案中只包含樣式的資訊。
                          比如HTML中H2標誌這一個二級標題，它在級別上比一級標題H1低，比三級標題H3高。這些資訊都是結構上的資訊。
                        </Card.Text>
                        <Card.Text>・定價：500元</Card.Text>
                      </Card.Body>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-center" style={{ margin: '10px 0' }}>
                      2019年9月29日 剩餘時間 5小時3分20秒
                    </h6>
                    <div
                      style={{
                        width: '90vw',
                        margin: '0 auto',
                      }}
                    >
                      <Card.Header className="text-center">
                        柱子小隊的資策會人生
                      </Card.Header>
                      <Card.Body className="text-left">
                        <Card.Text>
                          <img
                            src={require('./images/hina.jpg')}
                            alt="手機板書籍照片"
                            className="PHONE-changeGameBookListImg"
                          ></img>
                        </Card.Text>
                        <Card.Text>
                          ・選擇：
                          <input
                            type="radio"
                            name="react-tips"
                            value="option2"
                          ></input>
                        </Card.Text>
                        <Card.Text>・書況：A良好</Card.Text>
                        <Card.Text>・分類：程式語言</Card.Text>
                        <Card.Text className="PHONE-changeGameBookListText">
                          ・書籍備註：CSS不能單獨使用，必須與HTML或XML一起協同工作，為HTML或XML起裝飾作用。本文主要介紹用於裝飾HTML網頁的CSS技術。其中HTML負責確定網頁中有哪些內容，CSS確定以何種外觀(大小、粗細、顏色、對齊和位置)展現這些元素。CSS可以用於設定頁面布局、設定頁面元素樣式、設定適用於所有網頁的全域樣式。CSS可以零散地直接添加在要應用樣式的網頁元素上，也可以集中化內建於網頁、連結式引入網頁以及匯入式引入網頁。[1]
                          CSS最重要的目標是將檔案的內容與它的顯示分隔開來。在CSS出現前，幾乎所有的HTML檔案內都包含檔案顯示的資訊，比如字型的顏色、背景應該是怎樣的、如何排列、邊緣、連線等等都必須一一在HTML檔案內列出，有時重複列出。CSS使作者可以將這些資訊中的大部分隔離出來，簡化HTML檔案，這些資訊被放在一個輔助的，用CSS語言寫的檔案中。HTML檔案中只包含結構和內容的資訊，CSS檔案中只包含樣式的資訊。
                          比如HTML中H2標誌這一個二級標題，它在級別上比一級標題H1低，比三級標題H3高。這些資訊都是結構上的資訊。
                        </Card.Text>
                        <Card.Text>・定價：500元</Card.Text>
                      </Card.Body>
                    </div>
                  </div>
                </Slider>
                <div className="d-flex PHONE-changeGameBookListBtnWrap">
                  <img
                    src={require('./images/submit-green.png')}
                    alt="手機版確認送出按鈕"
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
    } else if (this.state.status === 'aaaa') {
      return (
        <>
          <h1>測試2</h1>
        </>
      )
    }
  }
}

export default Game
