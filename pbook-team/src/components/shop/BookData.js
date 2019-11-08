import React from 'react'
import './Shop.scss'
import { Col } from 'react-bootstrap'

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
          <div className="d-flex">
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
            <div></div>
          </div>
        </Col>
      </>
    )
  }
}

export default BookData
