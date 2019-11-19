/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageOffline.scss'
import { connect } from 'react-redux'
import { fetchAcList } from '../../AcActions'
import ScrollToTop from '../ScrollToTop'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageOffline = props => {
  // ------若store裡沒有活動列表資料，就拿取資料--------
  useEffect(() => {
    if (!props.acData.offline.data.length) {
      props.dispatch(fetchAcList('offline'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // -----------------------------------------------
  // ------------取得該項活動資料-----------
  let acId = props.match.params.acId
  let item = props.acData.offline.data.filter(v => {
    return +v.sid === +acId
  })
  if (!item || !item.length) return <></>
  item = item[0]
  // --------------------------------------
  return (
    <>
      <ScrollToTop>
        <div className="container acPage">
          <div
            className="banner my-3"
            style={{
              backgroundImage:
                "url('http://localhost:5555/ac/images/" + item.img + "')",
            }}
          ></div>
          <div className="row">
            <main className="col-md-9">
              <div className="info my-3">
                <small>
                  <time>時間：{item.date.substr(0, 10)}</time>
                </small>
                <br />
                <small>
                  <span>地點：{item.location}</span>
                </small>
              </div>
              <header className="py-3">
                <h1>{item.title}</h1>
              </header>

              <article
                className="mt-4 mb-5"
                dangerouslySetInnerHTML={{ __html: item.intro }}
              ></article>
            </main>
            <aside className="col-md-3">
              我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊
            </aside>
          </div>

          <section className="recommend py-5">
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
})
export default connect(mapStateToProps)(AcPageOffline)
