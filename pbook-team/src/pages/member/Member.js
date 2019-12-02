import React from 'react'
import {Row} from 'react-bootstrap'
import Sidebar from '../../components/member/Sidebar'
import Navbar from '../../components/member/Navbar'
// import Edit from './Edit'
// import Info from './Info'
import FbMessage from './FbMessage'


class Member extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
            <Navbar />
        <Row style={{marginRight:"0px",margin:'0',padding:'0',flexWrap:'nowrap'}}>
          <div className="col" style={{paddingRight:"0px" , backgroundImage: 'url("../login/bg.png")'}}>
            <div className="row" style={{marginRight:"0px"}}>
              <Sidebar />
              {/* <Edit />
              <Info /> */}
              <FbMessage/>
            </div>
          </div>
        </Row>
      </>
    )
  }
}
export default Member
