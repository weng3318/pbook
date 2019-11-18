import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import './Shop.scss'

const Categories = props => {
  // console.log(props.categoriesPayload)
  return (
    <>
      <Col md={2} className="book_categories px-0">
        <div className="d-flex justify-content-center align-items-center border-bottom">
          分類瀏覽
        </div>
        {props.categoriesPayload &&
          props.categoriesPayload.map(categories => (
            <Link
              to={'/books/1/' + categories.sid}
              className="d-flex justify-content-center align-items-center border-bottom categories-color"
              key={categories.sid}
            >
              {categories.name}
            </Link>
          ))}
      </Col>
    </>
  )
}

export default Categories
