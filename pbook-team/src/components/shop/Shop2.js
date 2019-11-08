import React from 'react'
import './Shop.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import BookData from './BookData'

class Shop extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <Container>
          <Row>
            <Breadcrumb></Breadcrumb>
          </Row>
          <Row className="book_wrapper">
            <categories></categories>
            <BookData></BookData>
          </Row>
        </Container>
      </>
    )
  }
}
export default Shop
