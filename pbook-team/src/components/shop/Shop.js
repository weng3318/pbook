import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import DataList from './DataList'
import DataPic from './DataPic'
import { shopFetch, cgFetch } from './ShopActions'
import './Shop.scss'

const Shop = props => {
  let [searchValue, setValue] = useState('')
  useEffect(() => {
    props.dispatch(cgFetch())
    props.dispatch(
      shopFetch(
        props.match.params.page,
        props.match.params.categories,
        searchValue ? searchValue : ''
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, props.match.params.categories, searchValue])
  function Search() {
    searchValue = document.querySelector('.searchInput').value
    setValue(searchValue)
    return false
  }
  let categoriesPayload = props.categories.payload
  let shopPayload = props.shop.payload
  let Data
  if (props.match.params.mode == 'list') Data = DataList
  else if (props.match.params.mode == 'pic') Data = DataPic
  return (
    <>
      <Container className="px-0 book_wrapper" fluid={true}>
        <Breadcrumb
          categoriesPayload={categoriesPayload}
          nowCategories={props.match.params.categories}
          nowPage={props.match.params.page}
          Search={Search}
          // SearchKey={SearchKey}
          // keyword={props.addSearch.keyword}
        ></Breadcrumb>
        <Container>
          <Row>
            <Categories
              categoriesPayload={categoriesPayload}
              mode={props.match.params.mode}
            ></Categories>
            <Data
              shopPayload={shopPayload}
              nowCategories={props.match.params.categories}
              nowPage={props.match.params.page}
              mode={props.match.params.mode}
            ></Data>
          </Row>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  shop: state.shop,
  categories: state.categories,
})
export default connect(mapStateToProps)(Shop)
