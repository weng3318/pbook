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
            <div className="m-3 orderNumber">訂單編號：od00001</div>
            <div className="m-3 orderTime">訂購時間：2019-3-3</div>
            <div className="m-3 detail">
              <span className="title">購物明細</span>
              <div className="m-4 d-flex align-items-center tableTop">
                <div className="picName">商品明細</div>
                <div className="bookAmount">數量</div>
                <div className="bookPrice">價格</div>
              </div>
              <div className="m-4 d-flex align-items-center eachDetail">
                <div className="picName">
                  <span>一見峮心 峮峮個人寫真書</span>
                </div>
                <div className="bookAmount">1</div>
                <div className="bookPrice">NT$ 520</div>
              </div>
            </div>
            <div className="m-3 price">
              總金額：NT$ <span className="color-red">520</span>
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
