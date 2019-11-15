/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageDiscount.scss'
import { connect } from 'react-redux'
import { getDiscountBooks, fetchAcList } from '../../AcActions'
import BookInfo from './BookInfo'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageDiscount = props => {
  let acId = props.match.params.acId
  useEffect(() => {
    // 取得活動列表
    if (!props.acData.offline.data.length) {
      props.dispatch(fetchAcList('discount'))
    }

    // 獲取折價書籍-------------
    props.dispatch(getDiscountBooks(acId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!props.discountBooks[acId.toString()]) return <></>
  let discountBook = props.discountBooks[acId].data

  // 獲取活動資訊---------------
  let acInfo = props.acData.discount.data.filter(v => {
    return +v.sid === +acId
  })

  if (!acInfo || !acInfo.length) return <></>

  acInfo = acInfo[0]
  // --------------------------
  return (
    <>
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
                __html: acInfo.intro,
              }}
            ></article>
            <section className="books row">
              {discountBook &&
                discountBook.books.map(v => {
                  return <BookInfo {...v} key={v.sid} />
                })}
            </section>
          </main>
          <aside className="col-md-3">
            我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊
          </aside>
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
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
  acData: state.acData,
  discountBooks: state.discountBooks,
})
export default connect(mapStateToProps)(AcPageDiscount)
