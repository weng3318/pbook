import React from 'react'
import BR_PathNow from './BR_PathNow'
import BR_DateTime from './BR_DateTime'
import {withRouter} from 'react-router-dom'

export class Navbar extends React.Component {
    render() {
        return (
            <>
                <nav className="brNavbar">
                <BR_PathNow />
                <BR_DateTime />
                <button onClick={()=> this.props.history.push('/reviewer/')}>開發用跳轉</button>
                </nav>
            </>
        )
    }
}

export default withRouter(Navbar)