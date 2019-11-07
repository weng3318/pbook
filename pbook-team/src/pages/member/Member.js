import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Edit from '../../components/memberContent/Edit'
import { Container, Row, Col } from 'react-bootstrap'

class Member extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <Row>
          <Sidebar />
          <div style={{ width: '1280px' }}>
            {/* <Edit /> */}
          </div>
        </Row>
      </>
    )
  }
}
export default Member
