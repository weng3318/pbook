import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import DataList from './DataList'
import DataPic from './DataPic'
import { shopFetch, cgFetch } from './ShopActions'
import './Shop.scss'

const ShopSearch = props => {
  let [searchValue, setValue] = useState('')
  let mode = localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : 'list'
  useEffect(() => {
    props.dispatch(cgFetch())
    props.dispatch(
      shopFetch(props.match.params.page, 'search', props.match.params.keyword)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, props.match.params.keyword])
  const Search = event => {
    searchValue = document.querySelector('.searchInput').value
    setValue(searchValue)
    window.location.href = '/books/search/1/' + searchValue
    event.preventDefault()
    return false
  }
  let categoriesPayload = props.categories.payload
  let shopPayload = props.shop.payload
  let Data
  if (mode === 'list') {
    Data = DataList
    localStorage.setItem('mode', 'list')
  } else if (mode === 'pic') {
    Data = DataPic
    localStorage.setItem('mode', 'pic')
  }
  return (
    <>
      <Container className="px-0 book_wrapper" fluid={true}>
        <Breadcrumb Search={Search} searchValue={searchValue}></Breadcrumb>
        <Container>
          <Row>
            <Categories categoriesPayload={categoriesPayload}></Categories>
            <Data
              shopPayload={shopPayload}
              nowPage={props.match.params.page}
              keyword={props.match.params.keyword}
              nowCategories={props.match.params.categories}
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
export default connect(mapStateToProps)(ShopSearch)
