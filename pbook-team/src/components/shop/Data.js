import React from 'react'
import { Col } from 'react-bootstrap'
import Page from './Page'
import BookInfoRight from './BookInfoRight'
import BookInfoLeft from './BookInfoLeft'
import './Shop.scss'

const Data = props => {
  return (
    <>
      <Col md={10} className="books position-relative">
        <div className="book_account mx-3 my-3">
          最新上架書籍共有
          <span className="book_number px-2">
            {props.shopPayload && props.shopPayload.totalRows}
          </span>
          本
        </div>
        <div className="book_order mx-4 my-3 px-5 d-flex justify-content-between">
          <span>顯示模式</span>
          <div>
            <span className="mr-2">排序依</span>
            <select>
              <option>書名(小->大)</option>
              <option>書名(大->小)</option>
              <option>書名(小->大)</option>
              <option>書名(小->大)</option>
              <option>書名(小->大)</option>
            </select>
          </div>
        </div>
        {props.shopPayload &&
          props.shopPayload.rows &&
          props.shopPayload.rows.map(data => (
            <div className="d-flex justify-content-between my-5" key={data.sid}>
              <BookInfoLeft
                data={data}
                nowCategories={props.nowCategories}
                nowPage={props.nowPage}
              ></BookInfoLeft>
              {/*書籍資訊左半*/}
              <BookInfoRight
                ratingsPayload={props.ratingsPayload}
                data={data}
              ></BookInfoRight>
              {/*書籍資訊右半*/}
            </div>
          ))}
        <Page
          shopPayload={props.shopPayload}
          nowCategories={props.nowCategories}
          nowPage={props.nowPage}
        ></Page>
        {/*Pagination*/}
      </Col>
    </>
  )
}

export default Data
