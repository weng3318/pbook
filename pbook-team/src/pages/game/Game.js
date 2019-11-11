import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import { ButtonToolbar, Button, Modal } from 'react-bootstrap'
import './changeGame.css'
import BGsound from './BGsound'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      myBooks: [],
      pairedMemberBooks: [],
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

  componentDidMount() {
    axios.get(`http://localhost/php-api/game.php`).then(res => {
      const persons = res.data
      for (var i = 0; i < persons.length; i++) {
        // console.log('persons', persons[i])
        if (
          persons[i][0]['mb_shelveMember'] ===
          JSON.parse(localStorage.getItem('user')).MR_number
        ) {
          console.log('第一組')
          this.setState({
            myBooks: persons[i][0],
            pairedMemberBooks: persons[i][1],
          })
        } else if (
          persons[i][1]['mb_shelveMember'] ===
          JSON.parse(localStorage.getItem('user')).MR_number
        ) {
          console.log('第二組')
          this.setState({
            myBooks: persons[i][1],
            pairedMemberBooks: persons[i][0],
          })
        }
      }
    })
  }

  render() {
    const { myBooks, pairedMemberBooks } = this.state
    console.log('render myBooks', myBooks)
    console.log('render pairedMemberBooks', pairedMemberBooks)

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
              zIndex: 999,
            }}
          >
            <div id="snow"></div>

            <div className="changeGameIndexBG">
              <div className="position-relative PC-changeGameWrap">
                <img
                  className="position-absolute PC-changeGameIndexContext"
                  src={require('./images/PC-changeGameIndexContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute d-flex PC-changeGameBtnWrap">
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
              zIndex: 999,
            }}
          >
            <div id="snow"></div>

            <div className="changeGameIndexBG">
              <div className="position-relative PC-changeGameBookListWrap d-flex">
                <img
                  className="position-absolute PC-changeGameBookListContext"
                  src={require('./images/PC-changeGameBookListContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute PC-changeGameBookListTable">
                  <h6>2019年9月29日 剩餘時間 5小時3分20秒</h6>
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">選擇</th>
                        <th scope="col">書籍名稱</th>
                        <th scope="col">書況</th>
                        <th scope="col">詳細資料</th>
                        <th scope="col">分類</th>
                        <th scope="col">定價</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <input
                            type="radio"
                            name="react-tips"
                            value="option1"
                          ></input>
                        </th>
                        <td>柱子小隊的資策會人生</td>
                        <td>A良好</td>
                        <td>
                          <ButtonToolbar>
                            <Button
                              style={{ margin: '0 auto' }}
                              variant="outline-danger"
                              onClick={this.handleModalShow}
                            >
                              +顯示
                            </Button>
                            <Modal
                              show={this.state.modalShow}
                              size="lg"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                  書籍名稱
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <div class="d-flex" style={{ padding: '20px' }}>
                                  <div
                                    style={{ width: '350px', height: '350px' }}
                                  >
                                    <img
                                      style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                      }}
                                      src={require('./images/hina.jpg')}
                                      alt="書籍封面照片"
                                    />
                                  </div>
                                  <div
                                    style={{
                                      textAlign: 'left',
                                      width: '300px',
                                    }}
                                  >
                                    <h5>・ISBN：</h5>
                                    <h5>・分類：</h5>
                                    <h5>・作者：</h5>
                                    <h5>・出版社：</h5>
                                    <h5>・出版日期：</h5>
                                    <h5>・版次：</h5>
                                    <h5>・定價：</h5>
                                    <h5>・頁數：000頁</h5>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: 'left',
                                      width: '400px',
                                      zIndex: '99999',
                                    }}
                                  >
                                    <h5>書籍簡介：</h5>
                                    <h5>書籍簡介內容</h5>
                                  </div>
                                  <div
                                    style={{
                                      width: '130px',
                                      height: '130px',
                                      position: 'absolute',
                                      bottom: '15%',
                                      right: '3%',
                                    }}
                                  >
                                    <img
                                      style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                      }}
                                      src={require('./images/品書印章.png')}
                                      alt="品書印章"
                                    />
                                  </div>
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button onClick={this.handleModalHide}>
                                  關閉
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </ButtonToolbar>
                        </td>
                        <td>程式語言</td>
                        <td>500元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            type="radio"
                            name="react-tips"
                            value="option2"
                          ></input>
                        </th>
                        <td>柱子小隊的資策會人生</td>
                        <td>A良好</td>
                        <td>+顯示</td>
                        <td>程式語言</td>
                        <td>500元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            type="radio"
                            name="react-tips"
                            value="option3"
                          ></input>
                        </th>
                        <td>柱子小隊的資策會人生</td>
                        <td>A良好</td>
                        <td>+顯示</td>
                        <td>程式語言</td>
                        <td>500元</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            type="radio"
                            name="react-tips"
                            value="option4"
                          ></input>
                        </th>
                        <td>柱子小隊的資策會人生</td>
                        <td>A良好</td>
                        <td>+顯示</td>
                        <td>程式語言</td>
                        <td>500元</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img
                  className="position-absolute PC-changeGameBookListSubmit"
                  src={require('./images/確認.png')}
                  alt="電腦版確認按鈕"
                />
              </div>

              <div className="position-relative">
                <img
                  className="PHONE-changeGameBookListContext"
                  src={require('./images/PHONE-changeGameBookListContext.png')}
                  alt="手機板"
                />
              </div>
            </div>
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
