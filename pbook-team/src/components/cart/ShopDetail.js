import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Cart.scss'

const ShopDetail = props => {
  //   let [num, setQuantity] = useState(null)
  function getAmount() {
    console.log(document.querySelector('.bookAmount').value)
  }
  return (
    <>
      <Col md={7}>
        <div className="shopDetail my-5">
          <div className="m-4 d-flex justify-content-between align-items-center eachDetail">
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
            <div className="bookName">
              <Link to={'/books/information/123'} target="_blank">
                <span>一見峮心 峮峮個人寫真書</span>
              </Link>
            </div>
            <div>
              <input
                type="number"
                className="bookAmount"
                onChange={() => getAmount()}
                min="1"
                max="99"
                defaultValue="1"
              />
            </div>
            <div>
              <span className="bookPrice">NT$ 520</span>
            </div>
            <div>
              <button type="button" className="delete">
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
