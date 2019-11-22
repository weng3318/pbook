import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import './Message.scss'
//action
import { letMeLogin } from '../../../pages/Forum/fmAction'

//Material Icons
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import FacebookIcon from '@material-ui/icons/Facebook'

import CircularProgress from '@material-ui/core/CircularProgress'
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import avatar from './2.jpg'
// import { FacebookProvider, Share, ShareButton } from 'react-facebook'

//nees to import props : articleId
const Massage = props => {
  const [response, setResponse] = useState(false)

  useEffect(() => {
    console.log('update')
    fetch(`http://localhost:5555/forum/message/content/${props.articleId}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(result => {
        setResponse(result)
      })
  }, [props.articleId])

  if (!response) {
    return (
      <>
        <CircularProgress />
      </>
    )
  } else {
    // return <MessageChild key={response[i].sid} response={response[i]} />
    let count = 0
    return (
      <div>
        {response.map(item => {
          if (count < props.showResponse) {
            count++
            return <MessageChild key={item.sid} response={item} />
          } else {
            return ''
          }
        })}
      </div>
    )
  }
}
const MessageChild = props => {
  return (
    <div>
      <div className="massage-frame">
        <div className="dis-flex flex-align-center writer">
          <div className="avatar-sm">
            <img
              alt=""
              src={`http://localhost:5555/images/member/${props.response.MR_pic}`}
            ></img>
          </div>
          <div className="writer-d">
            <div className="writer-name">{props.response.MR_nickname}</div>
            <div>
              {`${props.response.responseTime}`
                .replace('T', '   ')
                .replace('.000Z', '')}
            </div>
          </div>
        </div>
        <div className="p2">
          <pre className="pre-content">{props.response.fm_responseContent}</pre>
        </div>
        <div className="social-area2">
          <div className="dis-flex thumb-sm">
            <div className="thumb-frame">
              <ThumbUpIcon style={{ fontSize: 20 }} />
            </div>
            <span>{props.response.fm_resLike}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  showResponse: store.readMoreResponse.number,
})
// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(Massage)
