import React from 'react'
import UserDetails from '../UserDetails/UserDetails'
import './CardS2.css'

const CardS2 = props => {
  if (!props.update) {
    return <div>loading</div>
  } else {
    return (
      <>
        <figure className="card-s2-figure">
          {props.data.map(value => {
            return (
              <div className="card-s2-list" key={value.fm_articleId}>
                <img
                  src={
                    'http://localhost:5555/images/forum/article_key/' +
                    value.fm_demoImage
                  }
                  alt=""
                />
                <div className="card-s2-list-details">
                  <div className="card-s2-title">{value.fm_title}</div>
                  <div className="card-s2-subTitle">{value.fm_subTitle}</div>
                  <UserDetails memberId={value.fm_memberId} data={value} />
                </div>
              </div>
            )
          })}
        </figure>
      </>
    )
  }
}

export default CardS2
