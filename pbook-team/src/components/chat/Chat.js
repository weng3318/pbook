import React from 'react'
import {
    ListGroup,
    Tab,
    Row,
    Col,
} from 'react-bootstrap'
import './chat.css'

import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client';



const socket = io('ws://localhost:5000');

var oldDataMessage = []

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            oldDataList: [],
            oldDataMessage: []
        }
    }

    handleMessage = (event) => {
        this.myDiv.classList.add('hide');
        axios.get(`http://localhost:5555/nana_use/chatMessage`)
            .then(res => {
                oldDataMessage = res.data
                this.setState({ oldDataMessage: res.data })
            })

        socket.emit('clientToSeverMsg', { name: '橫山' })
        socket.on('SeverToClientMsg', function (data) {
            console.log('客戶端接收服務端發的消息', data);

        })
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.oldDataMessage.length === 0) {
    //         console.log("true1");
    //         return true
    //     } else {
    //         if (nextState.oldDataMessage === oldDataMessage) {
    //             console.log("false");
    //             return false
    //         } else {
    //             console.log("true2");
    //             return true
    //         }
    //     }
    // }



    componentDidMount() {
        axios.get(`http://localhost:5555/nana_use/chatList`)
            .then(res => {
                this.setState({ oldDataList: res.data })
            })
    }


    render() {
        console.log(this.state.oldDataList);
        console.log(this.state.oldDataMessage);

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
                                    <div className="myDefault" ref={div => this.myDiv = div}>
                                        <img alt="#" src={require("./images/admin_bg.png")}></img>
                                    </div>
                                    {
                                        this.state.oldDataList.map((value, index) => {
                                            return (
                                                <Tab.Pane key={index} eventKey={"#" + value.chat_id}>
                                                    {this.state.oldDataMessage.map((value2, index2) => {
                                                        {/* console.log("1", value.chat_id) */ }
                                                        if (value.chat_id === value2.chat_id) {
                                                            {/* console.log("2", value2.chat_id) */ }
                                                            return (
                                                                <div key={index2}>
                                                                    {function () {
                                                                        if (value.MR_number === value2.myFrom) {
                                                                            return (
                                                                                <div className="myContainer">
                                                                                    <img src={value.MR_pic ? require("../../images/" + value.MR_pic) : require("../../images/yoko.jpg")} alt="Avatar" />
                                                                                    <p>{value2.content}</p>
                                                                                    <span className="time-right">{moment(value2.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div className="myContainer darker">
                                                                                    <img src={require("./images/yoko2.jpg")} alt="Avatar" className="right" />
                                                                                    <p>{value2.content}</p>
                                                                                    <span className="time-left">{moment(value2.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }()}
                                                                </div>
                                                            )
                                                        }
                                                    })}

                                                    <div className="input-group md-form form-sm form-2 my-3">
                                                        <input className="form-control my-0 py-1 lime-border" type="text" placeholder="Search" aria-label="Search" />
                                                        <div className="input-group-append chatMessageSubmit">
                                                            <span className="input-group-text lime lighten-2" id="basic-text1">送出</span>
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