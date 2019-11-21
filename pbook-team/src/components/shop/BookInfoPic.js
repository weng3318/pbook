import React from 'react'
import { Link } from 'react-router-dom'
import './Shop.scss'

const BookInfoPic = props => {
  return (
    <>
      <div className="book_pic mr-3">
        <Link to={'/books/information/' + props.data.sid}>
          <img
            src={'http://localhost:5555/images/books/' + props.data.pic}
            alt=""
          />
        </Link>
      </div>
      <Link to={'/books/information/' + props.data.sid} className="book_name">
        {props.data.name}
      </Link>
      <span className="font-big pb-2">
        優惠價 : <span className="price">79</span> 折{' '}
        <span className="price">{props.data.fixed_price}</span> 元
      </span>
      <button className="addCart mb-2">放入購物車</button>
    </>
  )
}

export default BookInfoPic
