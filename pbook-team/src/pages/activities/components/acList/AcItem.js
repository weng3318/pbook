import React from 'react'
import acImg from '../../images/test.jpg'

function AcItem(props) {
  return (
    <>
      <div className="acItem row mt-3">
        <figure className="acImg col-md-4">
          <a
            href="#"
            className="img"
            style={{ backgroundImage: 'url(' + acImg + ')' }}
          ></a>
        </figure>
        <section className="acContent col-md-5">
          <a href="#" className="acTitle">
            <h4>{props.AC_title}</h4>
          </a>
          <div className="acIntro ellipsis">
            我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂我是活動我很快樂
          </div>
          <div className="acInfo">
            <small className="date">{props.AC_date.substring(0, 10)}</small>
            <br />
            <small className="location">{props.AC_eventArea}</small>
          </div>
        </section>
      </div>
    </>
  )
}

export default AcItem
