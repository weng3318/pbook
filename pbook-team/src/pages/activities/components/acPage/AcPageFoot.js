import React from 'react'
import './acPageFoot.scss'

function AcPageFoot(props) {
  return (
    <>
      <section className="acPageFoot d-flex justify-content-between">
        <div className="prevAc">
          <button className="btn">
            上一則
            <span className="ml-3">活動活動</span>
          </button>
        </div>
        <div className="nextAc">
          <button className="btn">
            下一則
            <span className="ml-3">活動活動</span>
          </button>
        </div>
      </section>
    </>
  )
}

export default AcPageFoot
