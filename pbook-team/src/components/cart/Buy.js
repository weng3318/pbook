import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Top from './Top'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import './Cart.scss'

const Buy = props => {
  let [current, setSteps] = useState(0)
  let Steps
  function changeSteps(e) {
    setSteps(e)
  }
  if (current === 0) {
    Steps = StepOne
  } else if (current === 1) {
    Steps = StepTwo
  } else if (current === 2) {
    Steps = StepThree
  }
  return (
    <>
      <Container className="px-0 cart_wrap" fluid={true}>
        <Container className="py-3 top">
          <Row>
            <Col md={12}>
              <Top current={current}></Top>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Steps changeSteps={changeSteps}></Steps>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Buy
