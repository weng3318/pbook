import React from 'react'
import { Col } from 'react-bootstrap'
import './Cart.scss'

const StepOne = props => {
  return (
    <>
      <Col md={12}>
        <div className="orderDetail my-5 ">
          <div className="orderFin mx-auto">
            <div className="finish d-flex align-items-center justify-content-center">
              訂單完成
            </div>
            <div className="m-3 orderNumber">
              訂單編號：{' '}
              {props.orderPayload &&
                props.orderPayload.rows &&
                props.orderPayload.rows[0].orderID}
            </div>
            <div className="m-3 orderTime">
              訂購時間：
              {props.orderPayload &&
                props.orderPayload.rows &&
                props.orderPayload.rows[0].created_time}
            </div>
            <div className="m-3 detail">
              <span className="title">購物明細</span>
              <div className="m-4 d-flex align-items-center tableTop">
                <div className="picName">商品明細</div>
                <div className="bookAmount">數量</div>
                <div className="bookPrice">價格</div>
              </div>
              {props.orderPayload &&
                props.orderPayload &&
                props.orderPayload.rows.map(orderData => (
                  <div
                    className="m-4 d-flex align-items-center eachDetail"
                    key={orderData.sid}
                  >
                    <div className="picName">
                      <span>{orderData.bookName}</span>
                    </div>
                    <div className="bookAmount">{orderData.bookAmount}</div>
                    <div className="bookPrice">NT$ {orderData.singlePrice}</div>
                  </div>
                ))}
            </div>
            <div className="m-3 price">
              總金額：NT${' '}
              <span className="color-red">
                {props.orderPayload &&
                  props.orderPayload.rows &&
                  props.orderPayload.rows[0].orderPrice}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="toHome m-3" onClick={() => props.toHome()}>
              回到首頁
            </button>
          </div>
        </div>
      </Col>
    </>
  )
}

export default StepOne
