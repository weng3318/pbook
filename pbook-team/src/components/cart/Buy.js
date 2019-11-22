import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Top from './Top'
import StepOne from './StepOne'
import './Cart.scss'

const Buy = props => {
  let [current, setSteps] = useState(0)
  let Steps
  function changeSteps(e) {
    setSteps(e)
  }
  if (current === 0) {
    Steps = StepOne
  }
  return (
    <>
      <Container className="px-0" fluid={true}>
        <Container className="my-3 top">
          <Row>
            <Col md={12}>
              <Top current={current}></Top>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Steps></Steps>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Buy
