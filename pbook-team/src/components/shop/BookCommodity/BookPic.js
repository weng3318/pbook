import React from 'react'
import { Col } from 'react-bootstrap'
import './BookCommodity.scss'

const BookPic = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]
  if (!(data && data.pic)) return 'loading'

  return (
    <>
      <Col md={4}>
        <div className="bookCover">
          <img
            src={'http://localhost:5555/images/books/' + (data && data.pic)}
            alt=""
          />
        </div>
      </Col>
    </>
  )
}

export default BookPic
