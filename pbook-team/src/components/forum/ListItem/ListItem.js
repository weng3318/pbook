import React from 'react'
import './Listitem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import {
  faBookmark as faBookmarks,
  faStar as faStars,
} from '@fortawesome/free-regular-svg-icons'
//props: article(文章資訊)

class Listitem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faBookmark: true,
      like: false,
    }
  }

  componentDidMount() {}
  handleIconClick = value => event => {
    if (value === 1) {
      this.setState({ faBookmark: !this.state.faBookmark })
    }
    if (value === 2) {
      this.setState({ like: !this.state.like })
    }
  }
  render() {
    let article = this.props.article
    if (!this.props.empty) {
      return (
        <>
          <div className="forum-list-item dis-flex">
            <div className="item-left">
              <div className="list-item-category">{article.name}</div>
              <div className="card-title-font">{article.fm_title}</div>
              <div className="card-subtitle-font fm-subtitle">
                {article.fm_subTitle}
              </div>
              <div className="list-item-details">{article.MR_nickname}</div>
              <div className="list-item-time dis-flex ">
                <div>
                  <span>{article.fm_publishTime.slice(0, 10)}</span>
                  <span>{article.fm_read}人已閱讀</span>
                  <span
                    className={
                      article.fm_featured ? 'displayInlineBlock' : 'diplayNone'
                    }
                  >
                    {this.props.article.fm_featured === 1 ? (
                      <FontAwesomeIcon
                        icon={faStars}
                        className={'fa-star active'}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className="item-time-right">
                  <span className="item-icon" onClick={this.handleIconClick(1)}>
                    <FontAwesomeIcon
                      icon={this.state.faBookmark ? faBookmarks : faBookmark}
                    />
                  </span>
                  <span
                    className="item-icon position-r"
                    onClick={this.handleIconClick(2)}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                    <div
                      className={
                        'likeOrNot position-a ' +
                        (this.state.like ? 'displayBlock' : ' displayNone')
                      }
                    >
                      13213123
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="item-right">
              <img
                className="img"
                src={
                  'http://localhost:5555/images/forum/article_key/' +
                  article.fm_demoImage
                }
                alt=""
              />
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="forum-list-item dis-flex">
            <div className="item-left">
              <div className="list-item-category loading">1</div>
              <div className="card-title-font loading">Loading</div>
              <div className="card-subtitle-font fm-subtitle loading"></div>
              <div className="list-item-details loading">1</div>
              <div className="list-item-time dis-flex loading">
                <div className="loading">
                  <span></span>
                  <span></span>
                </div>
                <div className="item-time-right ">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faBookmarks} />
                  </span>
                  <span className="item-icon position-r">
                    <FontAwesomeIcon icon={faEllipsisH} />
                    <div
                      className={
                        'likeOrNot position-a ' +
                        (this.state.like ? 'displayBlock' : ' displayNone')
                      }
                    >
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="item-right loading">
              <img className="img" src="" alt="" />
            </div>
          </div>
        </>
      )
    }
  }
}
export default Listitem
