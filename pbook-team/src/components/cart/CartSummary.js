import React from 'react'
import './Cart.scss'
import { Col } from 'react-bootstrap'
const CartSummary = props => {
  return (
    <>
      <Col md={5}>
        <div className="d-flex flex-column order my-5">
          <div className="orderSummary d-flex align-items-center justify-content-center">訂單摘要</div>
          <span>共1項商品</span>
          <span>數量1個</span>
          <div>
            <span>商品總計</span>
            <span>NT$ 520</span>
          </div>
        </div>
      </Col>
    </>
  )
}

export default CartSummary
