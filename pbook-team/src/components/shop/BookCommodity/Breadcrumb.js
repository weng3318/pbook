import React from 'react'
import '../Shop.scss'
import { Col } from 'react-bootstrap'

const Breadcrumb = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]

  return (
    <>
      <Col className="bread pl-4 d-flex align-items-center">
        首頁 > 書籍商城 > <span> {data && data.categoriesName}</span> >
        <span className="active">{data && data.name}</span>
      </Col>
    </>
  )
}

export default Breadcrumb
