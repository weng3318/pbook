import React from 'react'
import { Link } from 'react-router-dom'
import RatingStatus from './RatingStatus'
import './Shop.scss'

const BookInfoRight = props => {
  return (
    <>
      <div className="d-flex flex-column book_sell">
        <span className="font-big pb-2">
          優惠價 : <span className="price">79</span> 折{' '}
          <span className="price">{props.data.fixed_price}</span> 元
        </span>
        <button className="addCart mb-2">放入購物車</button>
        <RatingStatus data={props.data}></RatingStatus>
        <Link to={'/book_reviews/' + props.data.sid} className="addReview">
          +本書短評
        </Link>
      </div>
    </>
  )
}

export default BookInfoRight
