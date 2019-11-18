import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Shop.scss'

const Page = props => {
  let page_items = []
  let pt = props.shopPayload && props.shopPayload.totalPage
  for (let page = 1; page <= pt; page++) {
    page_items.push(
      <LinkContainer to={'/books/' + page + '/' + props.nowCategories}>
        <Pagination.Item key={page}>{page} </Pagination.Item>
      </LinkContainer>
    )
  }
  let fp = props.nowPage - 1
  if (fp < 1) fp = 1
  let np = props.nowPage + 1
  if (np > pt) np = pt

  return (
    <>
      <div className="position-absolute pageWrap pt-5">
        <Pagination className="d-flex justify-content-center">
          <LinkContainer to={'/books/1/' + props.nowCategories}>
            <Pagination.First className="none" key={-1} />
          </LinkContainer>
          <LinkContainer to={'/books/' + fp + '/' + props.nowCategories}>
            <Pagination.Prev className="none" key={0} />
          </LinkContainer>
          {page_items}
          <LinkContainer to={'/books/' + np + '/' + props.nowCategories}>
            <Pagination.Next className="none" key={10000} />
          </LinkContainer>
          <LinkContainer to={'/books/' + pt + '/' + props.nowCategories}>
            <Pagination.Last className="none" key={10001} />
          </LinkContainer>
        </Pagination>
      </div>
    </>
  )
}

export default Page
