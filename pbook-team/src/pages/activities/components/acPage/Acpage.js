/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './acPage.scss'
import { connect } from 'react-redux'
import { acFetch } from '../../AcActions'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
let count = 0
const AcPage = props => {
  let item
  function getData(acType, acId) {
    item =
      props.acData[acType] &&
      props.acData[acType].items.filter(v => {
        return +v.sid === +acId
      })
    if (!item) props.dispatch(acFetch('discount'))
  }
  getData(props.acType, props.match.params.acId)

  if (!item || !item.length) return <></>
  item = item[0]
  return (
    <>
      <div className="container acPage">
        <div
          className="banner"
          style={{
            backgroundImage:
              "url('http://localhost:5555/ac/images/" + item.img + "')",
          }}
        ></div>
        <div className="row">
          <main className="col-md-9">
            <div className="info">
              <time>時間：{item.date.substr(0, 10)}</time>
              <br />
              <span>地點：{item.location}</span>
            </div>
            <header>
              <h1>{item.title}</h1>
            </header>

            <article dangerouslySetInnerHTML={{ __html: item.intro }}></article>
          </main>
          <aside className="col-md-3">
            我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊我是資訊
          </aside>
        </div>

        <section className="recommend py-5">
          <h4 className="text-center pb-2">其他推薦</h4>
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
})
export default connect(mapStateToProps)(AcPage)
