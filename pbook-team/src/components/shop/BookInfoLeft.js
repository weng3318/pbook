import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import './Shop.scss'

const BookInfoLeft = props => {
  return (
    <>
      <div className="d-flex">
        <div className="book_pic mr-3">
          <Link
            to={
              '/books/' +
              'information/' +
              props.nowPage +
              '/' +
              props.nowCategories +
              '/' +
              props.data.name
            }
          >
            <img
              src={
                'http://localhost/books/src/venderBooks_Management/vb_images/' +
                props.data.pic
              }
              alt=""
            />
          </Link>
        </div>
        <div className="d-flex flex-column book_data">
          <Link
            to={
              '/books/' +
              'information/' +
              props.nowPage +
              '/' +
              props.nowCategories +
              '/' +
              props.data.name
            }
            className="book_name"
          >
            {props.data.name}
          </Link>
          <span className="content_color mt-2 mb-1">
            作者：{props.data.author} 出版社：{props.data.cp_name}
          </span>
          <span className="content_color mb-2">
            出版日期：
            {moment(props.data.publish_date).format('YYYY/MM/DD')}
          </span>
          <div className="content_color content_box">
            {props.data.introduction}
          </div>
          <Link
            to={
              '/books/' +
              props.nowPage +
              '/' +
              props.nowCategories +
              '/' +
              'information/' +
              props.data.name
            }
            className="ml-auto mt-auto moreInfo"
          >
            ... {''} <FontAwesomeIcon icon={faCaretRight} /> more
          </Link>
        </div>
      </div>
    </>
  )
}

export default BookInfoLeft
