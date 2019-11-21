import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import './bookInfo.scss'
function BookInfo(props) {
  return (
    <div className="book_box col-md-3 mb-5">
      <figure className="mb-1">
        <Link
          to={'/books/information/' + props.sid}
          className="ml-auto mt-auto moreInfo"
        >
          <div className="book_pic">
            <img
              src={
                'http://localhost/books/src/venderBooks_Management/vb_images/' +
                props.pic
              }
              alt=""
            />
          </div>
          <div className="book_data">
            <h6
              className="px-3 mt-2 mb-1"
              title={props.name + '\n\n' + props.introduction}
            >
              {props.name}
            </h6>
            <span className="info mb-2 mt-1">
              <span className="author" title={'作者：' + props.author}>
                作者：{props.author}
              </span>
              <div className="">
                <span className="price">79</span> 折
                <span className="price">{props.fixed_price}</span> 元
              </div>
            </span>
            {/* <div className="intro">{props.introduction}</div> */}
          </div>
        </Link>
      </figure>
      <div className="book_sell d-flex justify-content-center">
        <button className="addCart">放入購物車</button>
      </div>
    </div>
  )
}
export default BookInfo
