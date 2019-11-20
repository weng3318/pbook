import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import './scss/ArticleContent.scss'
//action
import { letMeLogin } from './fmAction'
//Material Icons
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Button from '@material-ui/core/Button'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import avatar from './2.jpg'
import TextareaAutosize from 'react-textarea-autosize'

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    margin: '8px 8px',
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const ArticleContent = props => {
  const classes = useStyles()

  let { articleId } = useParams()

  const [login, setLogin] = useState(false)
  const [data, setData] = useState('')

  useEffect(() => {
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      setLogin(true)
    }
    fetch('http://localhost:5555/forum/article/' + articleId, {
      method: 'GET',
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        return response.json()
      })
      .then(result => {
        setData(result)
      })
  }, [])

  const handleFollow = () => {
    console.log(data.article.fm_title)
  }
  const wantToResponse = () => {
    document.documentElement.scrollTop = 0
    props.dispatch(letMeLogin())
  }
  if (!data) {
    return <CircularIndeterminate />
  } else {
    return (
      <div className="container">
        <div>path</div>
        <div className="article-content-warpper">
          <div className="dis-flex dis-flex-flex-between">
            <div className="title">{data.article.fm_title}</div>
            <div className="bookmarkIcon">
              <BookmarkBorderIcon fontSize="large" />
            </div>
          </div>
          <div className="writer-details dis-flex">
            <figure>
              <img
                className="avater"
                src={
                  'http://localhost:5555/images/member/' + data.member.MR_pic
                }
              ></img>
            </figure>
            <div>
              <div className="writer-item name">
                <span className="name">{data.member.MR_number}</span>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleFollow}
                >
                  追蹤作者
                </Button>
              </div>
              <div className="writer-item">
                <span className="name">{data.article.fm_publishTime}</span>
                <span>publishTime</span>
              </div>
            </div>
          </div>
          <hr></hr>
          <section>{JSON.parse(data.article.fm_content)}</section>
          <div className="social-area">
            <div className="dis-flex thumb">
              <div className="thumb-frame">
                <ThumbUpIcon style={{ fontSize: 50 }} />
              </div>
              <span>{data.article.fm_like}</span>
            </div>
            <div className="social-icons">
              <ThumbUpIcon></ThumbUpIcon>
              <ThumbUpIcon></ThumbUpIcon>
              <ThumbUpIcon></ThumbUpIcon>
              <ThumbUpIcon></ThumbUpIcon>
              <BookmarkBorderIcon></BookmarkBorderIcon>
            </div>
          </div>
          <hr></hr>
          <div className="writer-details dis-flex">
            <figure>
              <img
                className="avater"
                src={
                  'http://localhost:5555/images/member/' + data.member.MR_pic
                }
              ></img>
            </figure>
            <div>
              <span className="name">WRITTEN BY</span>
              <div className="writer-item name">
                <span className="name">writer-name</span>
                <Button variant="outlined" color="secondary">
                  追蹤作者
                </Button>
              </div>
              <div className="writer-item">
                <span className="name">introduction</span>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="massage-frame dis-flex">
            <div className="avatar-md">
              <img src={avatar}></img>
            </div>
            <TextareaAutosize placeholder="寫個留言吧......" />
          </div>
          <Massage></Massage>
          <div className="button">
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              看更多回應(16)
            </Button>
          </div>
          {!login ? (
            <div className="need-login">
              <span>
                請先登入會員，才可回應。
                <button className="login-button" onClick={wantToResponse}>
                  登入
                </button>
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
const Massage = props => {
  return (
    <div>
      <div className="massage-frame">
        <div className="avatar-sm">
          <img src={avatar}></img>
        </div>
        <div>kasjflkdsjfldksjfaklsjfkldfjlsajfdls</div>
        <div className="social-area2">
          <div className="dis-flex thumb-sm">
            <div className="thumb-frame">
              <ThumbUpIcon style={{ fontSize: 20 }} />
            </div>
            <span>4566</span>
          </div>
          <div className="social-icons">
            <ThumbUpIcon></ThumbUpIcon>
            <ThumbUpIcon></ThumbUpIcon>
            <ThumbUpIcon></ThumbUpIcon>
            <ThumbUpIcon></ThumbUpIcon>
            <BookmarkBorderIcon></BookmarkBorderIcon>
          </div>
        </div>
      </div>
    </div>
  )
}
function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(ArticleContent)
