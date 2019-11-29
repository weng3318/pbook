import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { bookInfoFetch, cartFetch, reviewsFetch } from '../ShopActions'
import Breadcrumb from './Breadcrumb'
import BookDetail from './BookDetail'
import BookPic from './BookPic'
import BookBuy from './BookBuy'
import BookProduct from './BookProduct'
import BookComment from './BookComment'
import './BookCommodity.scss'

const BookCommodity = props => {
  // let favState = JSON.parse(localStorage.getItem('favState'))
  useEffect(() => {
    props.dispatch(bookInfoFetch(props.match.params.sid))
    props.dispatch(reviewsFetch(props.match.params.sid))
    props.dispatch(cartFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let bookInfoPayload = props.bookInfo.payload
  let cartPayload = props.Cart.payload
  let reviewsPayload = props.reviews.payload
  return (
    <>
      <Container className="px-0 detail_wrapper" fluid={true}>
        <Breadcrumb bookInfoPayload={bookInfoPayload}></Breadcrumb>
        <Container className="mt-5">
          <Row>
            <BookPic bookInfoPayload={bookInfoPayload}></BookPic>
            <BookDetail bookInfoPayload={bookInfoPayload}></BookDetail>
            <BookBuy
              bookInfoPayload={bookInfoPayload}
              cartPayload={cartPayload}
              history={props.history}
              match={props.match}
            ></BookBuy>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={12}>
              <BookProduct bookInfoPayload={bookInfoPayload}></BookProduct>
              <BookComment reviewsPayload={reviewsPayload}></BookComment>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  bookInfo: state.bookInfo,
  reviews: state.reviews,
  Cart: state.Cart,
})
export default connect(mapStateToProps)(BookCommodity)
