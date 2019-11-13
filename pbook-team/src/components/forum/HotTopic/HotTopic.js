import React from 'react'
import './HotTopic.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBookmark } from '@fortawesome/free-solid-svg-icons'
// import { faBookmark as faBookmarks } from '@fortawesome/free-regular-svg-icons'

class HotTopic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:5555/forum/homepage', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(async result => {
        await this.setState({
          article: [
            result.featured[0],
            result.featured[1],
            result.featured[2],
            result.featured[3],
            result.featured[4],
          ],
        })
      })
      .catch(error => {
        //這裡可以顯示一些訊息
        console.error(error)
      })
  }
  render() {
    let count = 1
    return (
      <>
        <div className="HotTopic-card">
          <div className="HotTopic-title">討論區熱門文章</div>
          <div className="tilte-line"></div>
          <div className="padding-frame">
            {this.state.article.map(value => {
              return (
                <div className="HotTopic-item" key={value.fm_articleId}>
                  <div className="dis-flex">
                    <span className="counter">{'0' + count++}</span>

                    <div>
                      <div
                        className="card-title-font fm-title"
                        title={value.fm_title}
                      >
                        {value.fm_title}
                      </div>
                      <div>{value.MR_nickname}</div>
                      <div>
                        <span className="time">
                          {value.fm_publishTime.slice(0, 10)}
                        </span>
                        <span className="time">{value.fm_read}人已經閱讀</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}
export default HotTopic
