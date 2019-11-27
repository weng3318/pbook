import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import RatingStatus from './RatingStatus'
import { addToCartFetch } from './ShopActions'
import './Shop.scss'

const BookInfoRight = props => {
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
      swal({
        text: '加入購物車成功',
        icon: 'success',
        button: 'OK',
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
})
export default connect(mapStateToProps)(BookInfoRight)
