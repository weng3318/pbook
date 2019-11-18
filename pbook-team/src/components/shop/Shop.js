import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import Data from './Data'
import { rtFetch, shopFetch, cgFetch } from './ShopActions'
import './Shop.scss'

const Shop = props => {
  useEffect(() => {
    props.dispatch(rtFetch())
    props.dispatch(cgFetch())
    props.dispatch(
      shopFetch(props.match.params.page, props.match.params.categories)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, props.match.params.categories])
  // console.log(props.match.params.categories)
  let categoriesPayload = props.categories.payload
  let shopPayload = props.shop.payload
  let ratingsPayload = props.ratings.payload

  return (
    <>
      <Container className="px-0 book_wrapper" fluid={true}>
        <Breadcrumb
          categoriesPayload={categoriesPayload}
          nowCategories={props.match.params.categories}
          nowPage={props.match.params.page}
        ></Breadcrumb>
        <Container>
          <Row>
            <Categories categoriesPayload={categoriesPayload}></Categories>
            <Data
              shopPayload={shopPayload}
              ratingsPayload={ratingsPayload}
              nowCategories={props.match.params.categories}
              nowPage={props.match.params.page}
            ></Data>
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
export default connect(mapStateToProps)(Shop)
