import React from 'react'
import '../Shop.scss'
import { Col } from 'react-bootstrap'

const Breadcrumb = props => {
  let data =
    props.shopPayload && props.shopPayload.rows && props.shopPayload.rows[0]
  let categoriesPayload = props.categoriesPayload && props.categoriesPayload
  let name = []
  for (let i = 0; i < 21; i++) {
    if (
      (categoriesPayload && categoriesPayload[i] && categoriesPayload[i].sid) ==
      props.nowCategories
    )
      name[i] = categoriesPayload[i].name
    else name[i] = ''
  }

  return (
    <>
      <Col className="bread pl-4 d-flex align-items-center">
        首頁 > 書籍商城 > <span> {name[props.nowCategories - 1]}</span> >
        <span className="active">{data && data.name}</span>
      </Col>
    </>
  )
}

export default Breadcrumb
