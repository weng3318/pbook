import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import Data from './Data'
import './Shop.scss'

const Shop = props => {
  console.log(props.match.params.categories)

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

export default Shop
