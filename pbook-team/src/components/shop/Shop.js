import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import Data from './Data'
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
            <Data></Data>
          </Row>
        </Container>
      </>
    )
  }
}
export default Shop
