import React from 'react'
import {
    ListGroup,
    Tab,
    Row,
    Col,
} from 'react-bootstrap'
import './chat.css'

import io from 'socket.io-client';

const socket = io('ws://localhost:5000');

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        
        socket.emit('clientToSeverMsg', { name: '橫山' })
        socket.on('SeverToClientMsg', function (data) {
            console.log('客戶端接收服務端發的消息', data);
        })

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
                                    <ListGroup.Item action href="#link1">
                                        <div className="d-flex">
                                            <div className="chatImgWrap">
                                                <img className="chatImg" src={require("./images/yoko2.jpg")}></img>
                                            </div>
                                            <div className="d-flex flex-column align-self-center chatTextWrap">
                                                <span className="chatText">YokoYama You</span>
                                                <span className="chatText">中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</span>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        <div className="d-flex">
                                            <div className="chatImgWrap">
                                                <img className="chatImg" src={require("./images/yoko2.jpg")}></img>
                                            </div>
                                            <div className="d-flex flex-column align-self-center chatTextWrap">
                                                <span className="chatText">YokoYama You</span>
                                                <span className="chatText">中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</span>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link3">
                                        <div className="d-flex">
                                            <div className="chatImgWrap">
                                                <img className="chatImg" src={require("./images/yoko2.jpg")}></img>
                                            </div>
                                            <div className="d-flex flex-column align-self-center chatTextWrap">
                                                <span className="chatText">YokoYama You</span>
                                                <span className="chatText">中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</span>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">
                                        <div className="container">
                                            <img src={require("./images/yoko2.jpg")} alt="Avatar" />
                                            <p>中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</p>
                                            <span className="time-right">11:00</span>
                                        </div>

                                        <div className="container darker">
                                            <img src={require("./images/yoko2.jpg")} alt="Avatar" className="right" />
                                            <p>中央氣象局今（1日）早發布大雨特報，由於東北風影響，花蓮縣已有豪雨發生，宜蘭、花蓮、台東地區及恆春半島仍有局部大雨發生機率，請注意瞬間大雨，連日降雨，山區請慎防坍方、落石及溪水暴漲，低窪地區請慎防淹水。</p>
                                            <span className="time-left">11:01</span>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link2">
                                        <h1>要擺的元件</h1>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link3">
                                        <h1>要擺的元件</h1>
                                    </Tab.Pane>
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