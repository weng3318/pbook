import React from 'react'
import moment from 'moment'
import './BookCommodity.scss'

const BookProduct = props => {
  let data =
    props.shopPayload && props.shopPayload.rows && props.shopPayload.rows[0]
  return (
    <>
      <div className="BookProduct mt-5">
        <div className="d-flex flex-column">
          <span className="mt-4">商品資料</span>
          <span className="mt-2">
            作者：{data && data.author} ｜出版社：{data && data.cp_name}
          </span>
          <span className="mt-2">
            出版日期：{moment(data && data.publish_date).format('YYYY-MM-DD')}{' '}
            ｜ ISBN/ISSN：{data && data.isbn}
          </span>
          <span className="mt-2">
            頁數：{data && data.page}頁 ｜ 版次：{data && data.version}
          </span>
          <span className="mt-2"> 類別：文學小說</span>
        </div>
      </div>
    </>
  )
}

export default BookProduct
