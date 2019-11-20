import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Cart.scss'

const StepOne = props => {
  return (
    <>
      <Container className="px-0" fluid={true}>
        <Container>
          <Row>
            <Col md={12}></Col>
          </Row>
        </Container>
        <Container>
          <Row></Row>
        </Container>
      </Container>
    </>
  )
}

export default StepOne
