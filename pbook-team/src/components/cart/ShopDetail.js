import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Cart.scss'

const ShopDetail = props => {
  //   let [num, setQuantity] = useState(null)
  return (
    <>
      <Col md={7}>
        <div className="shopDetail my-5">
          <div className="m-3 d-flex eachDetail">
            <div className="picture">
              <Link to={'/books/information/123'} target="_blank">
                <img
                  src={
                    'http://localhost:5555/images/books/5479510f15038363abee10df642bcf669c77200f.jpg'
                  }
                  alt=""
                />
              </Link>
            </div>
            <Link to={'/books/information/123'} target="_blank">
              <span className="bookName">一見峮心 峮峮個人寫真書</span>
            </Link>
            <div>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <span>NT$ 520</span>
            </div>
            <div>
              <button type="button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      </Col>
    </>
  )
}

export default ShopDetail
