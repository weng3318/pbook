import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { bookInfoFetch } from '../ShopActions'
import Breadcrumb from './Breadcrumb'
import BookDetail from './BookDetail'
import BookPic from './BookPic'
import BookBuy from './BookBuy'
import BookProduct from './BookProduct'
import BookComment from './BookComment'
import './BookCommodity.scss'

const BookCommodity = props => {
  useEffect(() => {
    props.dispatch(bookInfoFetch(props.match.params.sid))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let bookInfoPayload = props.bookInfo.payload

  return (
    <>
      <Container className="px-0 detail_wrapper" fluid={true}>
        <Breadcrumb bookInfoPayload={bookInfoPayload}></Breadcrumb>
        <Container className="mt-5">
          <Row>
            <BookPic bookInfoPayload={bookInfoPayload}></BookPic>
            <BookDetail bookInfoPayload={bookInfoPayload}></BookDetail>
            <BookBuy bookInfoPayload={bookInfoPayload}></BookBuy>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={12}>
              <BookProduct bookInfoPayload={bookInfoPayload}></BookProduct>
              <BookComment></BookComment>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  bookInfo: state.bookInfo,
})
export default connect(mapStateToProps)(BookCommodity)
