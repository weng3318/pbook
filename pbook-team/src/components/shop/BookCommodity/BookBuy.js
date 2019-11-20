import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import RatingStatus from './RatingStatus'
import './BookCommodity.scss'

const BookBuy = props => {
  let data =
    props.shopPayload && props.shopPayload.rows && props.shopPayload.rows[0]
  // console.log(data)

  return (
    <>
      <Col md={3} className="d-flex flex-column">
        <button className="buyNow my-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          立即購買
        </button>
        <button className="addCart my-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          加入購物車
        </button>
        <button className="addFav my-2">
          <FontAwesomeIcon icon={faBookmark} className="mr-2" />
          加入收藏
        </button>
        <RatingStatus data={data}></RatingStatus>
        <Link to={{ hash: '#' }} className="addComment my-2">
          +我想評語
        </Link>
      </Col>
    </>
  )
}

export default BookBuy
