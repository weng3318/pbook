import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import StepLine from './StepLine'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Breadcrumb from './Breadcrumb'
import { cartFetch, orderFetch } from '../shop/ShopActions'
import { letMeLogin } from '../../pages/Forum/fmAction'
import './Cart.scss'

const Buy = props => {
  let [current, setSteps] = useState(0)
  let [order, setOrder] = useState(0)
  let [totalAmount, setTotalAmount] = useState(0)
  let [totalPrice, setTotalPrice] = useState(0)
  let member = JSON.parse(localStorage.getItem('user')).MR_number
  useEffect(() => {
    props.dispatch(cartFetch())
    props.dispatch(orderFetch(member))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.Cart.payload, order])
  let orderPayload = props.order.payload
  let cartPayload = props.Cart.payload
  function changeSteps(e) {
    if (localStorage.user !== undefined) {
      //有登入
      setSteps(e)
    } else {
      props.dispatch(letMeLogin())
    }
  }
  function toHome() {
    props.history.push(`/`)
  }
  let Steps
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
            <Steps
              changeSteps={changeSteps}
              toHome={toHome}
              cartPayload={cartPayload}
              orderPayload={orderPayload}
              history={props.history}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              order={order}
              setOrder={setOrder}
            ></Steps>
          </Row>
        </Container>
      </Container>
    </>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = state => ({
  loginOrNot: state.letMeLogin.loginOrNot,
  Cart: state.Cart,
  order: state.order,
  cartToOrder: state.cartToOrder,
})
// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(Buy)
