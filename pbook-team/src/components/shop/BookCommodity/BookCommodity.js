import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { rtFetch, shopFetch, cgFetch } from '../ShopActions'
import Breadcrumb from './Breadcrumb'
import BookDetail from './BookDetail'
import BookPic from './BookPic'
import BookBuy from './BookBuy'
import BookProduct from './BookProduct'
import BookComment from './BookComment'
import './BookCommodity.scss'

const BookCommodity = props => {
  useEffect(() => {
    props.dispatch(rtFetch())
    props.dispatch(cgFetch())
    props.dispatch(
      shopFetch(
        props.match.params.page,
        props.match.params.categories,
        props.match.params.name
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let shopPayload = props.shop.payload
  let ratingsPayload = props.ratings.payload
  let categoriesPayload = props.categories.payload
  return (
    <>
      <Container className="px-0 detail_wrapper" fluid={true}>
        <Breadcrumb
          categoriesPayload={categoriesPayload}
          nowCategories={props.match.params.categories}
          shopPayload={shopPayload}
        ></Breadcrumb>
        <Container className="mt-5">
          <Row>
            <BookPic shopPayload={shopPayload}></BookPic>
            <BookDetail shopPayload={shopPayload}></BookDetail>
            <BookBuy
              ratingsPayload={ratingsPayload}
              shopPayload={shopPayload}
            ></BookBuy>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={12}>
              <BookProduct shopPayload={shopPayload}></BookProduct>
              <BookComment></BookComment>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  ratings: state.ratings,
  shop: state.shop,
  categories: state.categories,
})
export default connect(mapStateToProps)(BookCommodity)
