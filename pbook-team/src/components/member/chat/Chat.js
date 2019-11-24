import React from 'react'
import { ListGroup, Tab, Row, Col } from 'react-bootstrap'
import './chat.css'

import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client'
import swal from '@sweetalert/with-react'

var socket

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squareData: [],
      oldDataList: [],
      oldDataMessage: [],
      mySearch: '',
      people: 0,
    }
    if (localStorage.getItem('user') !== null) {
      if (this.props.location.pathname === '/chat') {
        socket = io.connect('ws://localhost:5000/', {
          query: {
            MR_number: JSON.parse(localStorage.getItem('user')).MR_number,
            MR_name: JSON.parse(localStorage.getItem('user')).MR_name,
            MR_pic: JSON.parse(localStorage.getItem('user')).MR_pic,
          },
        })
      }
    }
    socket.on('SeverToClientMsg', this.onMsg)
    socket.on('SeverToClientDelete', this.onMsgDelete)
  }

  handleSearch = () => {
    // 取得搜尋的字串
    var mySearch = this.mySearch.value
    this.setState({ mySearch: mySearch })
  }

  handleMessage = async () => {
    this.myDiv.classList.add('hide')
    // this.messageSearch.classList.add('show-inline-flex')
    console.log('點擊左邊那欄第一次拿chatMessage')
    await axios
      .post(`http://localhost:5555/nana_use/chatMessage2`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        this.setState({ oldDataMessage: res.data })
      })
      .catch(error => {
        console.log('點擊左邊那欄第一次拿chatMessage有錯誤', error)
      })
  }

  onMsg = fullData => {
    if (fullData.square === false) {
      console.log('私人聊天')
      console.log('客戶端接收服務端發的消息onMsg fullData', fullData)
      console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)
      console.log('客戶端接收服務端發的消息onMsg fullData.data?', fullData.data)

      if (
        fullData.data.myFrom ===
        JSON.parse(localStorage.getItem('user')).MR_number
      ) {
        this.setState({
          oldDataList: fullData.oldDataList,
          oldDataMessage: fullData.oldDataMessage,
        })
      } else if (
        fullData.data.myTo ===
        JSON.parse(localStorage.getItem('user')).MR_number
      ) {
        axios
          .post(`http://localhost:5555/nana_use/chatList2`, {
            memberId: JSON.parse(localStorage.getItem('user')).MR_number,
          })
          .then(res => {
            this.setState({
              oldDataList: res.data,
              oldDataMessage: fullData.oldDataMessage,
            })
          })
          .catch(error => {
            console.log('componentDidMount拿資料時有錯誤', error)
          })
      }
    } else {
      console.log('廣場聊天')
      console.log('客戶端接收服務端發的消息onMsg fullData', fullData)
      console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)

      this.setState({ squareData: fullData })
    }
  }

  onMsgDelete = fullData => {
    console.log('客戶端接收服務端發的消息onMsgDelete fullData', fullData)
    console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)
    console.log(
      '客戶端接收服務端發的消息onMsgDelete fullData.data?',
      fullData.data
    )

    if (
      fullData.data.myFrom ===
      JSON.parse(localStorage.getItem('user')).MR_number
    ) {
      this.setState({
        oldDataList: fullData.oldDataList,
        oldDataMessage: fullData.oldDataMessage,
      })
    } else if (
      fullData.data.myTo === JSON.parse(localStorage.getItem('user')).MR_number
    ) {
      axios
        .post(`http://localhost:5555/nana_use/chatList2`, {
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        })
        .then(res => {
          this.setState({
            oldDataList: res.data,
            oldDataMessage: fullData.oldDataMessage,
          })
        })
        .catch(error => {
          console.log('componentDidMount拿資料時有錯誤', error)
        })
    }
  }

  handleSubmit = () => {
    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    // 取得對話文字
    var textInput = this.textInput.value
    // 判斷是否是在大廳發出的訊息
    var square = false
    if (window.location.href === 'http://localhost:3000/chat') {
      square = true
    }
    console.log('square', square)

    socket.emit(`clientToSeverMsg`, {
      square: square,
      chat_id: chat_id,
      myFrom: myFrom,
      myTo: 'MR' + myTo[0],
      content: textInput,
      myRead: 0,
      created_at: new Date(),
      myDelete: 0,
    })

    this.textInput.value = ''
  }

  handleSubmit2 = e => {
    if (e.key === 'Enter') {
      // 利用網址列取得chat_id
      var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
      var chat_id = window.location.href.slice(chat_id_index + 1)
      // 利用localStorage取得發文者(myFrom)
      var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
      // 利用網址取得myTo
      var chat_id_array = chat_id.split('MR')
      var myFrom_array = myFrom.split('MR')

      var myTo = []
      for (var i = 1; i < chat_id_array.length; i++) {
        for (var k = 1; k < myFrom_array.length; k++) {
          if (chat_id_array[i] !== myFrom_array[k]) {
            myTo.push(chat_id_array[i])
          }
        }
      }
      console.log(myTo[0])

      // 取得對話文字
      var textInput = this.textInput.value
      // 判斷是否是在大廳發出的訊息
      var square = false
      if (window.location.href === 'http://localhost:3000/chat') {
        square = true
      }
      console.log('square', square)

      socket.emit('clientToSeverMsg', {
        square: square,
        chat_id: chat_id,
        myFrom: myFrom,
        myTo: 'MR' + myTo[0],
        content: textInput,
        myRead: 0,
        created_at: new Date(),
        myDelete: 0,
      })

      this.textInput.value = ''
    }
  }

  handleMessageDelete = e => {
    let MessageSid = e.target.getAttribute('data-value')
    console.log('handleMessageDelete MessageSid1', MessageSid)

    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    swal({
      title: '您確定要收回嗎?',
      text: '一旦收回,將會沒辦法復原喔!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      buttons: ['取消', '確定'],
    }).then(willDelete => {
      if (willDelete) {
        swal('您的訊息已經被收回!', {
          icon: 'success',
        })
        socket.emit(`clientToSeverDelete`, {
          MessageSid: MessageSid,
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
          chat_id: chat_id,
          myFrom: myFrom,
          myTo: 'MR' + myTo[0],
        })
      }
    })
  }

  goBackToSquare = () => {
    window.location.href = 'http://localhost:3000/chat'
  }

  componentDidMount() {
    axios
      .post(`http://localhost:5555/nana_use/chatList2`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        this.setState({
          oldDataList: res.data,
        })
      })
      .catch(error => {
        console.log('componentDidMount拿資料時有錯誤', error)
      })
    socket.on(`SeverToClientPeople`, data => {
      this.setState({ people: data })
      console.log('人數', data)
    })
    if (window.location.href !== 'http://localhost:3000/chat') {
      window.location.href = 'http://localhost:3000/chat'
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    socket.disconnect()
  }

  render() {
    console.log('render', this.state.oldDataList)
    let myId = JSON.parse(localStorage.getItem('user')).MR_number
    let myPic = JSON.parse(localStorage.getItem('user')).MR_pic
    var count = 0
    return (
      <>
        <div className="chatWrap">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item>
                    <form className="form-inline d-flex">
                      <input
                        className="form-control form-control-sm mr-3 w-75"
                        type="text"
                        placeholder="請輸入您要尋找的姓名..."
                        aria-label="Search"
                        ref={search => (this.mySearch = search)}
                        onChange={this.handleSearch}
                      />
                      <span
                        className="chatSearchBtn"
                        onClick={this.handleSearch}
                      >
                        <i className="fas fa-search" aria-hidden="true"></i>
                      </span>
                    </form>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={this.goBackToSquare}
                      >
                        回到品書聊天廣場
                      </button>
                    </span>
                  </ListGroup.Item>

                  {this.state.oldDataList
                    .filter(
                      item =>
                        !this.state.mySearch ||
                        item.MR_name.indexOf(this.state.mySearch) !== -1
                    )
                    .map((value, index) => {
                      count++
                      return (
                        <ListGroup.Item
                          key={index}
                          action
                          href={'#' + value.chat_id}
                          onClick={this.handleMessage}
                        >
                          <div className="d-flex">
                            <div className="chatImgWrap">
                              <img
                                alt="左邊DATALIST大頭照"
                                className="chatImg"
                                src={
                                  'http://localhost:5555/images/member/' +
                                  value.MR_pic
                                }
                              ></img>
                            </div>
                            <div className="d-flex flex-column align-self-center chatTextWrap">
                              <span className="chatText">{value.MR_name}</span>
                              {value.myDelete === 0 ? (
                                <span className="chatText">
                                  {value.content}
                                </span>
                              ) : (
                                <span className="chatText">
                                  {value.myFrom === myId
                                    ? '您已收回訊息'
                                    : value.MR_name + '已收回訊息'}
                                </span>
                              )}
                            </div>
                            {value.total === 0 ? (
                              <div className="d-flex flex-column align-content-center position-absolute newest hide">
                                {value.total}
                              </div>
                            ) : (
                              <div className="d-flex flex-column align-content-center position-absolute newest">
                                {value.total}
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      )
                    })}
                  {count === 0 ? (
                    <ListGroup.Item>找不到符合的資料...</ListGroup.Item>
                  ) : (
                    ''
                  )}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <div className="myDefault" ref={div => (this.myDiv = div)}>
                    <div className="p-2">
                      <i className="far fa-comments mx-2"></i>
                      歡迎來到品書聊天廣場！目前有{this.state.people}
                      位會員正在線上。
                    </div>
                    <div className="chatMessageScroll">
                      {this.state.squareData.map((value, index) => {
                        return (
                          <div key={index}>
                            {value.myFrom !== myId ? (
                              <div className="myContainer">
                                <img
                                  src="http://localhost:5555/images/member/kura.jpg"
                                  alt="Avatar"
                                />
                                <p>這裡是其他人發出的</p>
                                <span className="time-right">
                                  其他人發出的時間
                                </span>
                              </div>
                            ) : (
                              <div className="myContainer darker">
                                <img
                                  src="http://localhost:5555/images/member/yoko.jpg"
                                  alt="Avatar"
                                  className="right"
                                />
                                <p>這裡是我發出的</p>
                                <span className="time-left">我發出的時間</span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {/* <img
                      alt="背景圖"
                      src={require('./images/admin_bg.png')}
                    ></img> */}
                  </div>
                  {this.state.oldDataList.map((value, index) => {
                    return (
                      <Tab.Pane key={index} eventKey={'#' + value.chat_id}>
                        <div className="p-2">
                          <i className="far fa-comment-dots mx-2"></i>
                          {'您正在和[' + value.MR_name + ']聊天'}
                        </div>
                        <div className="chatMessageScroll">
                          {/* eslint-disable-next-line array-callback-return */}
                          {this.state.oldDataMessage.map((value2, index2) => {
                            if (value.chat_id === value2.chat_id) {
                              return (
                                <div key={index2}>
                                  {(() => {
                                    if (
                                      value2.myFrom !== myId &&
                                      value2.myDelete === 0
                                    ) {
                                      return (
                                        <div className="myContainer">
                                          <img
                                            src={
                                              'http://localhost:5555/images/member/' +
                                              value.MR_pic
                                            }
                                            alt="Avatar"
                                          />
                                          <p>{value2.content}</p>
                                          <span className="time-right">
                                            {moment(value2.created_at).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                            )}
                                          </span>
                                        </div>
                                      )
                                    } else if (
                                      value2.myFrom === myId &&
                                      value2.myDelete === 0
                                    ) {
                                      return (
                                        <div className="myContainer darker">
                                          <img
                                            src={
                                              'http://localhost:5555/images/member/' +
                                              myPic
                                            }
                                            alt="Avatar"
                                            className="right"
                                          />
                                          <p>{value2.content}</p>
                                          <span className="time-left">
                                            {moment(value2.created_at).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                            )}
                                          </span>
                                          <i
                                            className="fas fa-undo-alt messageDelete"
                                            data-value={value2.sid}
                                            onClick={this.handleMessageDelete}
                                          >
                                            收回
                                          </i>
                                        </div>
                                      )
                                    } else if (
                                      value2.myFrom !== myId &&
                                      value2.myDelete === 1
                                    ) {
                                      return (
                                        <span className="chatDeleteMessage">
                                          {value.MR_name + '已收回訊息'}
                                        </span>
                                      )
                                    } else if (
                                      value2.myFrom === myId &&
                                      value2.myDelete === 1
                                    ) {
                                      return (
                                        <span className="chatDeleteMessage">
                                          您已收回訊息
                                        </span>
                                      )
                                    }
                                  })()}
                                </div>
                              )
                            }
                          })}
                        </div>
                      </Tab.Pane>
                    )
                  })}
                  <div
                    className="input-group md-form form-sm form-2 my-3"
                    ref={messageSearch => (this.messageSearch = messageSearch)}
                  >
                    <input
                      className="form-control my-0 py-1 lime-border"
                      type="text"
                      placeholder="請輸入訊息..."
                      aria-label="Search"
                      ref={input => (this.textInput = input)}
                      onKeyPress={this.handleSubmit2}
                    />
                    <div
                      className="input-group-append chatMessageSubmit"
                      onClick={this.handleSubmit}
                    >
                      <span
                        className="input-group-text lime lighten-2"
                        id="basic-text1"
                      >
                        送出
                      </span>
                    </div>
                  </div>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </>
    )
  }
}
export default Chat
