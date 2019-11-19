import React from 'react'
import { Col } from 'react-bootstrap'
import './BookCommodity.scss'

const BookPic = props => {
  let pic =
    props.shopPayload && props.shopPayload.rows && props.shopPayload.rows[0].pic
  return (
    <>
      <Col md={4}>
        <div className="bookCover">
          <img
            src={
              'http://localhost/books/src/venderBooks_Management/vb_images/' +
              pic
            }
            alt=""
          />
        </div>
      </Col>
    </>
  )
}

export default BookPic
