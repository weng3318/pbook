import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import StepLine from './StepLine'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Breadcrumb from './Breadcrumb'
import './Cart.scss'

const Buy = props => {
  let [current, setSteps] = useState(0)
  let Steps
  function changeSteps(e) {
    setSteps(e)
  }
  function toHome() {
    props.history.push(`/`)
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
        <Breadcrumb></Breadcrumb>
        <Container className="pt-5 pb-3 top">
          <Row>
            <Col md={12}>
              <StepLine current={current}></StepLine>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Steps changeSteps={changeSteps} toHome={toHome}></Steps>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Buy
