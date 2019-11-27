import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { letMeLogin } from '../../../pages/Forum/fmAction'
import { addToFavFetch, addToCartFetch } from '../ShopActions'
import './BookCommodity.scss'

const BookBuy = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]
  // console.log(props.cartPayload)
  function addCart() {
    let sid = data && data.sid
    props.dispatch(addToCartFetch(sid))
    // for(let i=0;i<10;i++){
    //   if(props.cartPayload[i])
    // }
    swal({
      text: '加入購物車成功',
      icon: 'success',
      button: 'OK',
    })
  }
  function addFav() {
    let memberID = JSON.parse(localStorage.getItem('user')).MR_number
    let isbn = data && data.isbn
    props.dispatch(addToFavFetch(memberID, isbn))
    // console.log(props.addToFav.payload && props.addToFav.payload.message)
    // swal({
    //   text: '加入收藏成功',
    //   icon: 'success',
    //   button: 'OK',
    // })
    // props.history.go(0)
  }
  function delFav() {
    let memberID = JSON.parse(localStorage.getItem('user')).MR_number
    let isbn = data && data.isbn
    props.dispatch(addToFavFetch(memberID, isbn))
    // localStorage.setItem('favState', JSON.stringify({ isbn: isbn, state: 0 }))
    // swal({
    //   text: '取消收藏成功',
    //   icon: 'success',
    //   button: 'OK',
    // })
    // props.history.go(0)
  }
  function goCart() {
    if (localStorage.user !== undefined) {
      props.history.push(`/cart`)
    } else {
      props.dispatch(letMeLogin())
    }
  }

  return (
    <>
      <Col md={3} className="d-flex flex-column">
        <button className="buyNow my-2" onClick={() => goCart()}>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          立即購買
        </button>
        <button className="addCart my-2" onClick={() => addCart()}>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          加入購物車
        </button>
        {/* {+props.favState !== 1 ? ( */}
        <button className="addFav my-2" onClick={() => addFav()}>
          <FontAwesomeIcon icon={faBookmark} className="mr-2" />
          加入收藏
        </button>
        {/* ) : (
          <button className="addFav my-2" onClick={() => delFav()}>
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
            取消收藏
          </button>
        )} */}
        <div className="d-flex book_star my-3 flex-column">
          <div className="d-flex flex-column align-items-center">
            <span className="book_rank">{data && data.avg}</span>
            <Box component="fieldset" mb={0} borderColor="transparent">
              <Rating value={data && data.avg} readOnly />
            </Box>
            <span className="book_review">
              {data && data.totalStars}
              篇評論
            </span>
          </div>
        </div>
        <Link
          to={'/book_reviews/' + (data && data.sid)}
          className="addComment my-2"
        >
          +我想評語
        </Link>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  loginOrNot: state.letMeLogin.loginOrNot,
  addToFav: state.addToFav,
  addToCart: state.addToCart,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(BookBuy)
