/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function AcItem(props) {
  return (
    <>
      <div className="acItem row mt-3">
        <figure className="acImg col-md-4">
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            href="#"
            className="img"
            style={{
              backgroundImage:
                "url('http://localhost:5555/ac/images/" + props.img + "')",
            }}
          ></a>
        </figure>
        <section className="acContent col-md-6">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="acTitle">
            <h4>{props.title}</h4>
          </a>
          <div className="acIntro ellipsis">{props.brief_intro}</div>
          <div className="acInfo">
            <small className="date">{props.date.substring(0, 10)}</small>
            <br />
            <small className="location">{props.location}</small>
          </div>
        </section>
      </div>
    </>
  )
}

export default AcItem
