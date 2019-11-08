import React from 'react'
import { ListGroup, Tab, Row, Col } from 'react-bootstrap'
import './chat.css'

import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client'

const socket = io('ws://localhost:5000')

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      oldDataList: [],
      oldDataMessage: [],
      mySearch: '',
    }
    socket.on('SeverToClientMsg', this.onMsg)
  }

  handleSearch = () => {
    // 取得搜尋的字串

    var mySearch = this.mySearch.value

    this.setState({ mySearch: mySearch })
  }

  handleMessage = () => {
    this.myDiv.classList.add('hide')
    this.messageSearch.classList.add('show-inline-flex')

    axios.get(`http://localhost:5555/nana_use/chatMessage`).then(res => {
      this.setState({ oldDataMessage: res.data })
    })
  }

  onMsg = data => {
    console.log('客戶端接收服務端發的消息', data)

    this.setState({
      oldDataMessage: [data, ...this.state.oldDataMessage],
    })

    axios.get(`http://localhost:5555/nana_use/chatList`).then(res => {
      this.setState({ oldDataList: res.data })
    })
  }

  handleSubmit = () => {
    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#')
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用props取得發文者(myFrom)
    var myFrom = this.props.id
    // 利用chat_id和myFrom取得收文者
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')
    var myTo = ''
    for (let item of chat_id_array) {
      for (let item2 of myFrom_array) {
        if (item !== item2 && item !== '') {
          myTo = 'MR' + item
        }
      }
    }

    // 取得對話文字
    var textInput = this.textInput.value

    socket.emit('clientToSeverMsg', {
      chat_id: chat_id,
      myFrom: myFrom,
      myTo: myTo,
      content: textInput,
      myRead: 0,
      created_at: new Date(),
    })

    this.textInput.value = ''
  }

  handleSubmit2 = e => {
    if (e.key === 'Enter') {
      // 利用網址列取得chat_id
      var chat_id_index = window.location.href.indexOf('#')
      var chat_id = window.location.href.slice(chat_id_index + 1)
      // 利用props取得發文者(myFrom)
      var myFrom = this.props.id
      // 利用chat_id和myFrom取得收文者
      var chat_id_array = chat_id.split('MR')
      var myFrom_array = myFrom.split('MR')
      var myTo = ''
      for (let item of chat_id_array) {
        for (let item2 of myFrom_array) {
          if (item !== item2 && item !== '') {
            myTo = 'MR' + item
          }
        }
      }

      // 取得對話文字
      var textInput = this.textInput.value

      socket.emit('clientToSeverMsg', {
        chat_id: chat_id,
        myFrom: myFrom,
        myTo: myTo,
        content: textInput,
        myRead: 0,
        created_at: new Date(),
      })

      this.textInput.value = ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5555/nana_use/chatList`).then(res => {
      this.setState({ oldDataList: res.data })
    })
  }

  render() {
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
                              {/* <img
                                alt="會員大頭照"
                                className="chatImg"
                                src={
                                  value.MR_pic
                                    ? require('../../images/' + value.MR_pic)
                                    : require('../../images/yoko.jpg')
                                }
                              ></img> */}
                            </div>
                            <div className="d-flex flex-column align-self-center chatTextWrap">
                              <span className="chatText">{value.MR_name}</span>
                              <span className="chatText">{value.content}</span>
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
                    <img alt="#" src={require('./images/admin_bg.png')}></img>
                  </div>

                  {this.state.oldDataList.map((value, index) => {
                    return (
                      <Tab.Pane key={index} eventKey={'#' + value.chat_id}>
                        <div className="chatMessageScroll">
                          {/* eslint-disable-next-line array-callback-return */}
                          {this.state.oldDataMessage.map((value2, index2) => {
                            if (value.chat_id === value2.chat_id) {
                              return (
                                <div key={index2}>
                                  {(function() {
                                    if (value.MR_number === value2.myFrom) {
                                      return (
                                        <div className="myContainer">
                                          {/* <img
                                            src={
                                              value.MR_pic
                                                ? require('../../images/' +
                                                    value.MR_pic)
                                                : require('../../images/yoko.jpg')
                                            }
                                            alt="Avatar"
                                          /> */}
                                          <p>{value2.content}</p>
                                          <span className="time-right">
                                            {moment(value2.created_at).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                            )}
                                          </span>
                                        </div>
                                      )
                                    } else {
                                      return (
                                        <div className="myContainer darker">
                                          {/* <img
                                            src={require('./images/yoko2.jpg')}
                                            alt="Avatar"
                                            className="right"
                                          /> */}
                                          <p>{value2.content}</p>
                                          <span className="time-left">
                                            {moment(value2.created_at).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                            )}
                                          </span>
                                        </div>
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
                    className="input-group md-form form-sm form-2 my-3 hide"
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
