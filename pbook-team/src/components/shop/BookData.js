import React from 'react'
import { Col, Button } from 'react-bootstrap'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons' //空
import { faStar as faStars } from '@fortawesome/free-regular-svg-icons' //滿
import './Shop.scss'
class BookData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <Col md={10} className="books">
          <div className="book_account mx-3 my-3">
            最新上架書籍共有<span className="book_number px-2">1315</span>本
          </div>
          <div className="book_order mx-4 my-3 px-5 d-flex justify-content-between">
            <span>顯示模式</span>
            <span>排序依</span>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="book_pic">
                <img
                  src="http://localhost/books/src/venderBooks_Management/vb_images/0a9fe44e072627ea61bfdafa2831c2e6947eeb42.jpg"
                  alt=""
                />
              </div>
              <div className="d-flex flex-column">
                <span>蔡康永的說話之道（兔斯基慶功版）</span>
                <span className="content_color">
                  作者：蔡康永 出版日期：2014/07/31
                </span>
                <div className="content_color content_box">
                  ★職業婦女小S：做自己跟沒禮貌常常就是一線之間，每次聽到別人說：「我這個人說話就是比較直。」我就開始冒汗，因為接下來一定會有一些被他歸類為直其實挺刺耳的話出現，例如：「你今天氣色怎麼這麼差？」「最近胖囉？」「怎麼還不結婚？」「你記得我嗎？」（已經面露尷尬還死不報上名）
                </div>
              </div>
            </div>
            <div className="d-flex flex-column ">
              <span>優惠價 : 79 折 261 元</span>
              <Button>放入購物車</Button>
              <div className="d-flex position-relative">
                <div className="position-absolute"></div>
                <div>
                  <Rating
                    emptySymbol={[<FontAwesomeIcon icon={faStars} />]}
                    fullSymbol={[
                      <FontAwesomeIcon icon={faStar} color={'#FFC408'} />,
                    ]}
                    initialRating={3}
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </>
    )
  }
}

export default BookData
