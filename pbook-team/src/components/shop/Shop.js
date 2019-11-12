import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import BookData from './BookData'
import './Shop.scss'

class Shop extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <Container className="px-0" fluid={true}>
          <Breadcrumb></Breadcrumb>
        </Container>
        <Container>
          <Row className="book_wrapper">
            <Categories></Categories>
            <BookData></BookData>
          </Row>
        </Container>
      </>
    )
  }
}
export default Shop
