import React from 'react'
import { NavLink } from 'react-router-dom'
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
            <NavLink
              to={'/books/' + props.mode + '/1/' + categories.sid}
              className="d-flex justify-content-center align-items-center border-bottom categories-color"
              activeClassName="active"
              key={categories.sid}
            >
              {categories.name}
            </NavLink>
          ))}
      </Col>
    </>
  )
}

export default Categories
