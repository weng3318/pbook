import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { delCartFetch, addCartToOrder, cartFetch } from '../shop/ShopActions'
import './Cart.scss'

const StepOne = props => {
  let bookAmount = []
  let totalAmount, totalPrice
  function changeAmount() {
    totalAmount = 0
    totalPrice = 0
    for (
      let i = 0;
      i < (props.cartPayload && props.cartPayload.totalCart);
      i++
    ) {
      if (
        +document.querySelector(
          '.bookAmount' + (props.cartPayload && props.cartPayload.cart[i].sid)
        ).value === 0
      ) {
        bookAmount[i] = 1
      } else {
        bookAmount[i] = document.querySelector(
          '.bookAmount' + (props.cartPayload && props.cartPayload.cart[i].sid)
        ).value
      }

      localStorage.setItem(
        props.cartPayload && props.cartPayload.cart[i].sid,
        +bookAmount[i]
      )
      totalPrice += +(
        (props.cartPayload && props.cartPayload.cart[i].fixed_price) *
        localStorage.getItem(props.cartPayload && props.cartPayload.cart[i].sid)
      )
      totalAmount += +bookAmount[i]
    }
    props.setTotalAmount(totalAmount)
    props.setTotalPrice(totalPrice)
    props.dispatch(addCartToOrder(totalAmount, totalPrice))
  }
  function delCart(sid, fixed_price) {
    props.dispatch(delCartFetch(sid))
    let a = props.cartToOrder.totalAmount - localStorage.getItem(sid)
    let b =
      props.cartToOrder.totalPrice - localStorage.getItem(sid) * fixed_price
    props.dispatch(addCartToOrder(a, b))
    localStorage.removeItem(sid)
    props.dispatch(cartFetch())
  }
  // console.log(props.cartPayload)
  return (
    <>
      <Col md={7}>
        <div className="shopDetail my-5">
          <div className="d-flex justify-content-around align-items-center tableTop">
            <div className="picName">商品明細</div>
            <div className="bookAmount">數量</div>
            <div className="bookPrice">價格</div>
          </div>

          {props.cartPayload &&
            props.cartPayload &&
            props.cartPayload.cart.map(cartData => (
              <div
                className="m-4 d-flex justify-content-between align-items-center eachDetail"
                key={cartData.sid}
              >
                <div className="picture">
                  <Link
                    to={'/books/information/' + cartData.sid}
                    target="_blank"
                  >
                    <img
                      src={'http://localhost:5555/images/books/' + cartData.pic}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="bookName">
                  <Link
                    to={'/books/information/' + cartData.sid}
                    target="_blank"
                  >
                    <span>{cartData.name}</span>
                  </Link>
                </div>
                <div>
                  <input
                    type="number"
                    className={'bookAmount' + cartData.sid}
                    onChange={() => changeAmount()}
                    min="1"
                    max="99"
                    defaultValue={localStorage.getItem(cartData.sid)}
                  />
                </div>
                <div>
                  <span className="bookPrice">NT$ {cartData.fixed_price}</span>
                </div>
                <div>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => delCart(cartData.sid, cartData.fixed_price)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Col>
      <Col md={5}>
        <div className="d-flex flex-column cartSummary my-5">
          <div className="orderSummary d-flex align-items-center justify-content-center">
            訂單摘要
          </div>
          <div className="d-flex justify-content-between mt-3 mx-5">
            <span>商品項數</span>
            <span className="color-red">
              {props.cartPayload && props.cartPayload.totalCart}
            </span>
          </div>
          <div className="d-flex justify-content-between mt-3 mx-5">
            <span>商品數量</span>
            <span className="color-red">{props.cartToOrder.totalAmount}</span>
          </div>
          <div className="d-flex justify-content-between mt-3 mx-5">
            <span>商品總計</span>
            <span>
              NT${' '}
              <span className="color-red">{props.cartToOrder.totalPrice}</span>
            </span>
          </div>
          <button
            className="goCheckout ml-auto m-4"
            onClick={() => props.changeSteps(1)}
          >
            前往結帳
          </button>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  delCart: state.delCart,
  Cart: state.Cart,
  cartToOrder: state.cartToOrder,
})
export default connect(mapStateToProps)(StepOne)
