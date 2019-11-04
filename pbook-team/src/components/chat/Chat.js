import React from 'react'
import {
    ListGroup,
    Tab,
    Row,
    Col,
} from 'react-bootstrap'
import './chat.css'

import axios from 'axios'
import io from 'socket.io-client';



const socket = io('ws://localhost:5000');


class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            oldDataList: []
        }
    }

    handleMessage = (event) => {
        this.myH1.classList.add('hide')


    }


    componentDidMount() {
        axios.get(`http://localhost:5555/chatList`)
            .then(res => {
                this.setState({ oldDataList: res.data })
            })

        socket.emit('clientToSeverMsg', { name: '橫山' })
        socket.on('SeverToClientMsg', function (data) {
            console.log('客戶端接收服務端發的消息', data);

        })

    }



    render() {
        return (
            <>
                <div className="chatWrap">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <form className="form-inline">
                                            <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                                                aria-label="Search" />
                                            <a href="" className="chatSearchBtn"><i className="fas fa-search" aria-hidden="true"></i></a>
                                        </form>
                                    </ListGroup.Item>
                                    {
                                        this.state.oldDataList.map((value, index) => {
                                            return (
                                                <ListGroup.Item key={index} action href={"#" + value.chat_id} onClick={this.handleMessage}>
                                                    <div className="d-flex">
                                                        <div className="chatImgWrap">
                                                            <img className="chatImg" src={value.MR_pic ? require("../../images/" + value.MR_pic) : require("../../images/yoko.jpg")}></img>
                                                        </div>
                                                        <div className="d-flex flex-column align-self-center chatTextWrap">
                                                            <span className="chatText">{value.MR_name}</span>
                                                            <span className="chatText">{value.content}</span>
                                                        </div>
                                                        {value.total === 0 ?
                                                            <div className="d-flex flex-column align-content-center position-absolute newest hide" >
                                                                {value.total}
                                                            </div> :
                                                            <div className="d-flex flex-column align-content-center position-absolute newest" >
                                                                {value.total}
                                                            </div>}
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    <h1 ref={h1 => this.myH1 = h1}>點擊左側列表和朋友聊天吧^^</h1>
                                    {
                                        this.state.oldDataList.map((value, index) => {
                                            return (
                                                <Tab.Pane key={index} eventKey={"#" + value.chat_id}>
                                                    <div className="myContainer">
                                                        <img src={require("./images/yoko2.jpg")} alt="Avatar" />
                                                        <p>中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</p>
                                                        <span className="time-right">11:00</span>
                                                    </div>

                                                    <div className="myContainer darker">
                                                        <img src={require("./images/yoko2.jpg")} alt="Avatar" className="right" />
                                                        <p>中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</p>
                                                        <span className="time-left">11:01</span>
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control" placeholder="請輸入聊天訊息" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                            <div className="input-group-append">
                                                            <button className="btn btn-outline-success" type="button" id="button-addon2">送出</button>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            )
                                        })
                                    }


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