import React from 'react'
import './CardS1.css'

const CardS1 = props => {
  return (
    <>
      <figure className="card-figure">
        <img
          className="card-s1-img"
          alt=""
          src={require('./s1.jpg')}
          onClick={props.handleTitleClick}
        />
        <div className="card-body">
          <div>
            <div className="card-s-title" onClick={props.handleTitleClick}>
              商業原則和商業邏輯
            </div>
            <div className="card-subTitle" onClick={props.handleTitleClick}>
              工作者之間的溝通也基於商業原則和商業邏輯。著商業思維思維......
              工作者之間的溝通也基於商業原則和商業邏輯。著商業思維思維......
            </div>
          </div>
          <div className="card-details">
            <img
              src={require('./s2.jpg')}
              alt=""
              onClick={props.handleUserClick}
            />
            <div className="card-writer-wrapper">
              <div>
                <a
                  href="#1"
                  className="card-user-link"
                  onClick={props.handleUserClick}
                >
                  哈囉你好
                </a>
                <span>發表於</span>
                <a href="#2" onClick={props.handleTopicClick}>
                  商業理財
                </a>
              </div>
              <div>
                <time>2019-10-31</time>
                <span>2222人閱讀</span>
                <span className="card-response">16則留言</span>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </>
  )
}

export default CardS1
