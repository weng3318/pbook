import React from 'react'
import './Shop.scss'
import { Col } from 'react-bootstrap'

class Breadcrumb extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <Col className="bread pl-4 d-flex align-items-center">
          首頁 > 書籍商城 > <span className="active"> 文學小說</span>
        </Col>
      </>
    )
  }
}

export default Breadcrumb
