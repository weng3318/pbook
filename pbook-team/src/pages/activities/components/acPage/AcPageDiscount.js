/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageDiscount.scss'
import { connect } from 'react-redux'
import {
  getDiscountBooks,
  fetchAcList,
  getRecommendBooks,
} from '../../AcActions'
import BookInfo from './BookInfo'
import AcPageAside from './AcPageAside'
import ScrollToTop from '../ScrollToTop'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageDiscount = props => {
  let acId = props.match.params.acId.toString()
  let allBooksDiscount = false
  let memberNum = JSON.parse(localStorage.user).MR_number

  useEffect(() => {
    // 取得活動列表
    if (!props.acData.offline.data.length) {
      props.dispatch(fetchAcList('discount'))
    }

    // 獲取折價書籍
    props.dispatch(getDiscountBooks(acId))

    // 獲取推薦書籍
    props.dispatch(getRecommendBooks(memberNum, 12))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!props.discountBooks[acId] || !props.discountBooks[acId].data)
    return <></>
  // 獲取活動資訊
  let acInfo = props.acData.discount.data.filter(v => {
    return +v.sid === +acId
  })
  if (!acInfo || !acInfo.length) return <></>

  let discountBook = []
  // 若此活動全品項皆適用，獲取推薦書籍
  if (props.discountBooks[acId].data.books.length === 0) {
    allBooksDiscount = true
    discountBook.books = props.recommendBooks.data
  } else {
    discountBook = props.discountBooks[acId].data
  }

  acInfo = acInfo[0]

  return (
    <>
      <ScrollToTop>
        <div className="container acPage">
          <div
            className="banner my-3"
            style={{
              backgroundImage:
                "url('http://localhost:5555/ac/images/" + acInfo.img + "')",
            }}
          ></div>
          <div className="row">
            <main className="col-md-9">
              <div className="info my-3">
                <small>
                  <time>開始時間：{acInfo.start_time.substr(0, 10)}</time>
                </small>
                <br />
                <small>
                  <time>結束時間：{acInfo.end_time.substr(0, 10)}</time>
                </small>
              </div>
              <header className="py-3">
                <h1>{acInfo.title}</h1>
              </header>

              <article
                className="mt-4 mb-5"
                dangerouslySetInnerHTML={{
                  __html: acInfo.brief_intro,
                }}
              ></article>

              <span className="booksRowInfo mb-5 pb-3">
                {allBooksDiscount ? '全品項皆適用　　推薦書籍' : '適用書籍'}
              </span>
              <section className="books row">
                {discountBook.books &&
                  discountBook.books.map(v => {
                    return <BookInfo {...v} key={v.sid} />
                  })}
              </section>
            </main>
            <AcPageAside />
          </div>

          <section className="recommend py-4 my-5">
            <h4 className="text-center pb-2 my-3">其他推薦</h4>
            <div className="row">
              <figure className="col-md-3">
                <h6 className="text-center">其他活動</h6>
                <a
                  style={{ backgroundImage: "url('images/test.jpg')" }}
                  alt=""
                ></a>
              </figure>
              <figure className="col-md-3">
                <h6 className="text-center">其他活動</h6>
                <a
                  style={{ backgroundImage: "url('images/test.jpg')" }}
                  alt=""
                ></a>
              </figure>
              <figure className="col-md-3">
                <h6 className="text-center">其他活動</h6>
                <a
                  style={{ backgroundImage: "url('images/test.jpg')" }}
                  alt=""
                ></a>
              </figure>
              <figure className="col-md-3">
                <h6 className="text-center">其他活動</h6>
                <a
                  style={{ backgroundImage: "url('images/test.jpg')" }}
                  alt=""
                ></a>
              </figure>
            </div>
          </section>
        </div>
      </ScrollToTop>
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
  acData: state.acData,
  discountBooks: state.discountBooks,
  recommendBooks: state.recommendBooks,
})
export default connect(mapStateToProps)(AcPageDiscount)
