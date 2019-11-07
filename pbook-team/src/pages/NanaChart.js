import React from 'react'
import Chat from '../components/chat/Chat'

class Member extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    //娜娜的聊天室
    render() {
        const {id} = this.props
        return (
            <>
                <Chat id={id}/>
            </>
        )
    }
}
export default Member