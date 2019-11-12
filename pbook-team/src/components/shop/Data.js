import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { rtFetch } from './ShopActions'
import { shopFetch } from './ShopActions'
import RateStatus from './RateStatus'
import './Shop.scss'

const Data = props => {
  useEffect(() => {
    props.dispatch(rtFetch())
    props.dispatch(shopFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <div className="d-flex flex-column book_data">
              <span>蔡康永的說話之道（兔斯基慶功版）</span>
              <span className="content_color my-2">
                作者：蔡康永 出版日期：2014/07/31
              </span>
              <div className="content_color content_box">
                ★職業婦女小S：做自己跟沒禮貌常常就是一線之間，每次聽到別人說：「我這個人說話就是比較直。」我就開始冒汗，因為接下來一定會有一些被他歸類為直其實挺刺耳的話出現，例如：「你今天氣色怎麼這麼差？」「最近胖囉？」「怎麼還不結婚？」「你記得我嗎？」（已經面露尷尬還死不報上名）
              </div>
              <Link to="/" className="ml-auto moreInfo">
                ... {''} <FontAwesomeIcon icon={faCaretRight} /> more
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column book_sell">
            <span className="font-big pb-2">
              優惠價 : <span className="price">79</span> 折{' '}
              <span className="price">261</span> 元
            </span>
            <button className="addCart mb-2">放入購物車</button>
            {console.log(props.shop.payload && props.shop.payload[1])}
            <div className="d-flex book_star mb-2">
              <RateStatus></RateStatus>
              <div className="d-flex flex-column align-items-center">
                <span className="book_rank">4.1</span>
                <Box component="fieldset" mb={0} borderColor="transparent">
                  <Rating value={4.1} readOnly />
                </Box>
                <span className="book_review">387篇評論</span>
              </div>
            </div>
            <button className="addReview">+本書短評</button>
          </div>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  ratings: state.ratings,
  shop: state.shop,
})
export default connect(mapStateToProps)(Data)
