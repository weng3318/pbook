import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import RatingStatus from './RatingStatus'
import { addToCartFetch, addCartToOrder, cartFetch } from './ShopActions'
import './Shop.scss'

const BookInfoRight = props => {
  let totalAmount = props.cartToOrder.totalAmount
  let totalPrice = props.cartToOrder.totalPrice
  function addCart() {
    let cart = props.cartPayload && props.cartPayload.cart
    let sid = props.data.sid
    let index = cart.findIndex(carts => carts.sid === sid)
    if (index !== -1) {
      swal({
        text: '購物車已有此商品',
        icon: 'warning',
        button: 'OK',
      })
    } else if (index === -1) {
      props.dispatch(addToCartFetch(sid))
      localStorage.setItem(sid, 1)
      if (!localStorage.getItem('totalAmount')) {
        localStorage.setItem('totalAmount', 1)
      } else {
        localStorage.setItem(sid, 1)
        props.dispatch(
          addCartToOrder(totalAmount + 1, totalPrice + props.data.fixed_price)
        )
      }
      swal({
        text: '加入購物車成功',
        icon: 'success',
        button: 'OK',
      }).then(() => {
        props.dispatch(cartFetch())
      })
    }
  }
  return (
    <>
      <div className="d-flex flex-column book_sell">
        <span className="font-big pb-2">
          優惠價 : <span className="price">79</span> 折{' '}
          <span className="price">{props.data.fixed_price}</span> 元
        </span>
        <button className="addCart mb-2" onClick={() => addCart()}>
          放入購物車
        </button>
        <RatingStatus data={props.data}></RatingStatus>
        <Link to={'/book_reviews/' + props.data.sid} className="addReview">
          +本書短評
        </Link>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  Cart: state.Cart,
  cartToOrder: state.cartToOrder,
})
export default connect(mapStateToProps)(BookInfoRight)
