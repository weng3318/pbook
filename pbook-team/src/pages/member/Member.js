import React from 'react'
import {Row} from 'react-bootstrap'
import Sidebar from '../../components/member/Sidebar'
import Navbar from '../../components/member/Navbar'
import Edit from './Edit'
import Info from './Info'


class Member extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <Row>
          <div className="col">
            <Navbar />
            <div className="row">
              <Sidebar />
              {/* <Edit /> */}
              <Info />
            </div>
          </div>
        </Row>
      </>
    )
  }
}
export default Member
