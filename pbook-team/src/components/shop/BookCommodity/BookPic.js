import React from 'react'
import { Col } from 'react-bootstrap'
import './BookCommodity.scss'

const BookPic = props => {
  let pic =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0].pic
  return (
    <>
      <Col md={4}>
        <div className="bookCover">
          <img src={'http://localhost:5555/images/books/' + pic} alt="" />
        </div>
      </Col>
    </>
  )
}

export default BookPic
