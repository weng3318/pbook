import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import './scss/ArticleContent.scss'
//action
import { letMeLogin, readMoreResponse } from './fmAction'
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
import { green, purple } from '@material-ui/core/colors'
//component
import Message from '../../components/forum/Messgae/Message'
import avatar from './2.jpg'
import TextareaAutosize from 'react-textarea-autosize'
import { FacebookProvider, Share, ShareButton } from 'react-facebook'

const ArticleContent = props => {
  const classes = useStyles()

  let { articleId } = useParams()

  const [login, setLogin] = useState(false)
  const [data, setData] = useState('')
  const [contentUpdated, setContentUpdated] = useState(false) //讀取內容json
  const [addElement, setAddElement] = useState(0) //render element
  const [textareaValue, setTextareaValue] = useState('')
  const [shouldRender, setShouldRender] = useState(0)

  useEffect(() => {
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      setLogin(true)
    }
    fetch('http://localhost:5555/forum/article/content/' + articleId, {
      method: 'GET',
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        setContentUpdated(true)
        return response.json()
      })
      .then(result => {
        setData(result)
      })
  }, [])

  useEffect(() => {
    if (contentUpdated) {
      handleContentUpdated()
    }
  }, [data])

  const handleContentUpdated = () => {
    fetch(
      'http://localhost:5555/forum/content/' +
        data.article.fm_articleId +
        '.json'
    )
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(result => {
        let imgCount = 0
        let textAreaCount = 0
        let type = data.article.fm_demoImage.split('.')[1]
        let body = result.element.map(item => {
          switch (item) {
            case 'textarea':
              let uni = `textarea${textAreaCount}`
              let textareaElement = (
                <pre id={uni} className="contentPre" key={uni}>
                  {result.textareaValue[textAreaCount]}
                </pre>
              )
              textAreaCount++
              return textareaElement
            case 'img':
              let uni1 = `img${imgCount}`
              let imgElement = (
                <img
                  className="contentImg"
                  alt=""
                  key={uni1}
                  id={uni1}
                  src={`http://localhost:5555/images/forum/article_key/${data.article.fm_articleId}${imgCount}.${type}`}
                ></img>
              )
              imgCount++
              return imgElement
            default:
              return 'nothing'
          }
        })
        setTextareaValue(result.textareaValue)
        setAddElement([...body])
      })
  }
  const handleFollow = () => {}
  const handleClickArticleLike = () => {
    fetch(`http://localhost:5555/forum//article/like/${data.article.fm_like}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setShouldRender(shouldRender + 1)
      })
  }
  const wantToResponse = () => {
    document.documentElement.scrollTop = 0
    props.dispatch(letMeLogin())
  }
  const handleReadMore = () => {
    props.dispatch(readMoreResponse(5))
    console.log(props.showResponse)
  }
  // if (!contentUpdated) {
  if (!data) {
    return <CircularIndeterminate />
  } else {
    let countRes = data.responseNO['COUNT(1)'] - props.showResponse

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
              <div className="writer-item ">
                <span className="name1">{data.member.MR_nickname}</span>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleContentUpdated}
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
          <section>{addElement}</section>
          <div className="social-area">
            <div className="dis-flex thumb">
              <div className="thumb-frame">
                <ThumbUpIcon style={{ fontSize: 50 }} />
              </div>
              <span>{data.article.fm_like}</span>
            </div>
            <div className="social-icons">
              <FacebookProvider appId="2545805135652577">
                <ShareButton href="https://www.google.com.tw/">
                  <div title="分享到臉書">
                    <FacebookIcon style={{ fontSize: 40, color: '#3b5998' }} />
                  </div>
                </ShareButton>
              </FacebookProvider>
              <BookmarkBorderIcon style={{ fontSize: 40 }}></BookmarkBorderIcon>
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
              <img
                alt=""
                src={
                  login
                    ? 'http://localhost:5555/images/member/' +
                      data.member.MR_pic
                    : avatar
                }
              ></img>
            </div>

            <TextareaAutosize
              placeholder="寫個留言吧......"
              onClick={login ? '' : wantToResponse}
            />
            {login ? (
              <BootstrapButton
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                <span>回覆文章</span>
              </BootstrapButton>
            ) : (
              ''
            )}
          </div>
          <Message articleId={articleId}></Message>
          <div className="button" onClick={handleReadMore}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              看更多回應({countRes < 0 ? 0 : countRes})
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

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  showResponse: store.readMoreResponse.number,
})
// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props

export default connect(mapStateToProps)(ArticleContent)

//components

function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
  )
}

//Material UI style
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
const BootstrapButton = withStyles({
  root: {
    fontSize: '1rem',
    width: '130px',
    padding: '8px 24px',
    // border: '1px solid',
    backgroundColor: '#2d3a3a',
    // fontFamily: [
    //   '-apple-system',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    // ].join(','),
    '&:hover': {
      backgroundColor: '#2d3a3a',
      color: '#ffc408',
      boxShadow: 'none',
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  },
})(Button)
