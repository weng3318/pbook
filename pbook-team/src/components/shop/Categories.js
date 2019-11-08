import React from 'react'
import './Shop.scss'
import { Col } from 'react-bootstrap'

class Categories extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <Col md={2} className="book_categories px-0">
          <div className="d-flex justify-content-center align-items-center border-bottom">
            分類瀏覽
          </div>
          <div className="d-flex justify-content-center align-items-center border-bottom">
            中文
          </div>
          <div className="d-flex justify-content-center align-items-center border-bottom">
            旅遊
          </div>
        </Col>
      </>
    )
  }
}

export default Categories
