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
          首頁 > 中文書 > 華文文學 ><span className="active">現代散文</span>
        </Col>
      </>
    )
  }
}

export default Breadcrumb
