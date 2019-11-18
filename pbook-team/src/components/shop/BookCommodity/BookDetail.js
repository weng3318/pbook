import React from 'react'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTruck,
  faCat,
  faCartPlus,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'
import './BookCommodity.scss'

const BookDetail = props => {
  let data =
    props.shopPayload && props.shopPayload.rows && props.shopPayload.rows[0]
  return (
    <>
      <Col md={5}>
        <div className="d-flex flex-column">
          <span className="mb-2 ml-2 bookTitle">{data && data.name}</span>
          <span className="my-2 ml-2">作者 ：{data && data.author}</span>
          <span className="my-2 ml-2">出版社 ：{data && data.cp_name}</span>
          <div className="my-3 d-flex">
            <div className="marks d-flex align-items-center justify-content-center mr-3">
              <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              <span className="fav">76</span>收藏
            </div>
            <div className="marks d-flex align-items-center justify-content-center mr-3">
              <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              <span className="fav">1296</span>評論
            </div>
          </div>
          <div className="d-flex flex-column bookPrice my-3">
            <span className="my-2 ml-2">
              定價：NT$<s>{data && data.fixed_price}</s>
            </span>
            <span className="my-2 ml-2">
              優惠價：<span className="discount">88</span>折，NT$
              <span className="discount">
                {parseInt((data && data.fixed_price) * 0.88)}
              </span>
            </span>
            {/* <span>現金回饋：5％(活動詳情)回饋金可全額折抵商品</span> */}
          </div>
          <span className="my-2 ml-2">
            限量商品 庫存：<span className="stock">{data && data.stock}</span>
          </span>
          <div className="d-flex icon mt-3">
            <div className="d-flex flex-column align-items-center mr-3">
              <FontAwesomeIcon icon={faTruck} />
              24h到貨
            </div>
            <div className="d-flex flex-column align-items-center mr-3">
              <FontAwesomeIcon icon={faCat} />
              黑貓宅配
            </div>
            <div className="d-flex flex-column align-items-center mr-3">
              <FontAwesomeIcon icon={faCartPlus} />
              大量訂單
            </div>
          </div>
          <div className="introduction mt-3 pt-2 pl-2">
            {data && data.introduction}
          </div>
        </div>
      </Col>
    </>
  )
}

export default BookDetail
