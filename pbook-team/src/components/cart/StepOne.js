import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Cart.scss'

const StepOne = props => {
  function getAmount() {
    console.log(document.querySelector('.bookAmount').value)
  }
  return (
    <>
      <Col md={7}>
        <div className="shopDetail my-5">
          <div className="d-flex justify-content-around align-items-center tableTop">
            <div className="picName">商品明細</div>
            <div className="bookAmount">數量</div>
            <div className="bookPrice">價格</div>
          </div>
          <div className="m-4 d-flex justify-content-between align-items-center eachDetail">
            <div className="picture">
              <Link to={'/books/information/123'} target="_blank">
                <img
                  src={
                    'http://localhost:5555/images/books/5479510f15038363abee10df642bcf669c77200f.jpg'
                  }
                  alt=""
                />
              </Link>
            </div>
            <div className="bookName">
              <Link to={'/books/information/123'} target="_blank">
                <span>一見峮心 峮峮個人寫真書</span>
              </Link>
            </div>
            <div>
              <input
                type="number"
                className="bookAmount"
                onChange={() => getAmount()}
                min="1"
                max="99"
                defaultValue="1"
              />
            </div>
            <div>
              <span className="bookPrice">NT$ 520</span>
            </div>
            <div>
              <button type="button" className="delete">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      </Col>
      <Col md={5}>
        <div className="d-flex flex-column cartSummary my-5">
          <div className="orderSummary d-flex align-items-center justify-content-center">
            訂單摘要
          </div>
          <div className="d-flex justify-content-between my-2 mx-5">
            <span>商品項數</span>
            <span className="color-red">1</span>
          </div>
          <div className="d-flex justify-content-between my-2 mx-5">
            <span>商品數量</span>
            <span className="color-red">1</span>
          </div>
          <div className="d-flex justify-content-between my-2 mx-5">
            <span>商品總計</span>
            <span>
              NT$ <span className="color-red">520</span>
            </span>
          </div>
          <button
            className="goCheckout ml-auto m-3"
            onClick={() => props.changeSteps(1)}
          >
            前往結帳
          </button>
        </div>
      </Col>
    </>
  )
}

export default StepOne
