/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import BookScoreAndLine from './BookScore/BookScoreAndLine'
import BookStar from './BookScore/BookScoreForBR'
import BookScoreForMember from './BookScore/BookScoreForMember'
import InsertReply from './components/InsertReply'
import {
  faTimes,
  faPen,
  faTrashAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from '@sweetalert/with-react'

//---------------------------------------------------------------------------------------------------------

//主要內容外框
const Main = styled.section`
  margin: 40px auto 0 auto;
  width: 1200px;
`

// 書本外框
const Book = styled.div`
  display: flex;
  margin: 5px 0;
  height: 300px;
`
//橫排
const BookRow = styled.div`
  display: flex;
  flex-direction: row;
`

//直排
const BookColumn = styled.div`
  display: flex;
  flex-direction: column;
`

//直排右側分數
const BookColumnScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

//直排下方會員
const BookColumnMember = styled.div`
  display: flex;
  margin: 0 0 0 20px;
  align-items: center;
  flex-direction: column;
`

//評分條外框
const BookLine = styled.div`
  display: flex;
  flex-direction: row-reverse;
  outline: none;
`

//書本資訊
const BookInfo = styled.div`
  margin: 0 0 0 50px;
  width: 1000px;
`
//回復評論外框
const Review = styled.section`
  display: flex;
  width: 1200px;
  margin: 0 0 3rem 0;
  border-bottom: 1px dashed #ccc;
`
//會員頭像
const Member = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 0 0 5px;
`

const Submit = styled.button``

//------------------------------------------------------------------------------------------------------

const List = () => {
  //從nodejs拿取資料的sid值
  const urlParams = window.location.pathname.replace('/book_reviews/', '')

  //變數
  const [List, setList] = useState([]) //上方書本資料
  const [memberReview, getMemberReview] = useState([]) //會員書評
  //會員個人資料設定
  const [user, setUser] = useState({
    isLogin: false,
    pic: 'yui.png',
    nickname: '',
  })
  //CRUD設定
  const [review, setReview] = useState({
    id: '',
    isbn: '',
    sid: '',
    pic: '',
    editReview: '',
    reviewText: '',
    replyText: '',
    book: urlParams,
    star: '1',
    isEdit: false,
  })
  const [x, y] = useState({})
  //書評下方顯示欄資料
  const [reply, setReply] = useState([])
  const [txt, setTxt] = useState()

  useEffect(() => {
    bookList()
    reviewList()
    replyText()
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      let data = JSON.parse(localStorage.getItem('user'))
      setUser({
        isLogin: true,
        pic: data.MR_pic,
        nickname: data.MR_nickname,
      })
      setReview({ ...review, id: data.MR_number })
    }
  }, [InsertReply])
  //書評分頁資料ajax
  const bookList = async () => {
    await axios
      .get(`http://localhost:5555/reviews/book_reviews/${urlParams}`)
      .then(res => {
        let data = res.data.data[0]
        setList(res.data.data)
        // setReview({ ...review, isbn: data.isbn, pic: data.pic })
      })
      .catch(error => {
        console.log(error)
      })
  }
  //書評資料
  const reviewList = async () => {
    await axios
      .get(`http://localhost:5555/reviews/memberReview/${urlParams}`)
      .then(res => {
        getMemberReview(res.data.reviews)

        console.log(res.data)
        // setReview({...review,sid:''})
      })
      .catch(error => {
        console.log(error)
      })
  }

  const keypress = e => {
    e.preventDefault()
    if (e.which === 13) {
      console.log('123')
      submitHandler(e)
      updateHandler(e)
    }
  }

  //輸入時更新資料
  const changeHandler = e => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    })
    let x = e.target.name
    for (let i = 1; i < memberReview.length; i++) {
      if (e.target.name == memberReview[i].sid) {
      }
    }
  }

  //新增資料
  const submitHandler = e => {
    e.preventDefault()
    let api = `http://localhost:5555/reviews/book_reviews/${urlParams}/data`

    if (review.reviewText !== '') {
      axios
        .post(api, {
          id: review.id,
          book: review.book,
          reviewText: review.reviewText,
          star: review.star,
        })
        .then(res => {
          swal('新增成功', '', 'success').then(value => {
            setTimeout(() => {
              window.location.reload()
            }, 100)
          })
        })

        .catch(error => {
          setReview({
            error: true,
            submitSuccess: false,
          })
        })
    } else {
      swal('書評內容為空')
    }
  }

  //更新資料
  const updateHandler = e => {
    e.preventDefault()
    let api = `http://localhost:5555/reviews/editReview/data`
    axios
      .put(api, {
        sid: review.sid,
        editReview: review.editReview,
      })
      .then(res => {
        swal('修改成功!').then(value => {
          setTimeout(() => {
            window.location.reload()
          }, 100)
        })
      })

      .catch(error => {
        setReview({
          error: true,
          submitSuccess: false,
        })
      })
  }

  //刪除資料
  const deleteHandler = e => {
    let delete_data = e
    console.log(delete_data)
    swal({
      title: '確定刪除嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('刪除成功!', '', {
          icon: 'success',
        }).then(value => {
          axios.delete(
            `http://localhost:5555/reviews/deleteReview/${delete_data}`
          )
          setTimeout(() => {
            window.location.reload()
          }, 100)
        })
      } else {
        swal('已取消刪除!')
      }
    })
  }

  // 跳至登入畫面
  const login = () => {
    let loginBtn = document.querySelector('.loginButton')
    loginBtn.click()
  }

  //加入書櫃
  const addCase = e => {
    e.preventDefault()
    let api = `http://localhost:5555/member/addBookcase`
    if (user.isLogin) {
      axios.post(api, {
        number: review.book,
        isbn: review.isbn,
      })
    } else {
      swal('請登入會員').then(value => {
        login()
      })
    }
  }

  // -----------------------------------------------------------------------

  //書評下方顯示資料
  const replyText = async () => {
    await axios.get(`http://localhost:5555/reviews/reply/`).then(res => {
      setReply(res.data.reply)
      console.log(res.data)
    })
  }

  return (
    <>
      <Main>
        {List.map(data => (
          <Book key={data.sid}>
            <BookColumn>
              <img
                className="reviews_list_img"
                key={data.sid}
                src={require('./images/' + data.pic)}
              />
            </BookColumn>
            <BookColumn>
              <BookInfo>
                <h4>{data.name}</h4>
                {'作者:'}
                {data.author}
                <br />
                <br />
                <br />
                {'內容簡介:'}
                <div>
                  {data.introduction
                    .replace(/<[^>]*>/g, '')
                    .replace(/&nbsp;/g, '')
                    .replace(/&hellip;/g, '')
                    .replace(/&bull;/g, '')}
                </div>
              </BookInfo>
            </BookColumn>
          </Book>
        ))}
        <div>
          <BookColumnScore>
            <button className="BookBuy">立即購買</button>
            <BookRow>
              <BookScoreAndLine List={List} />
            </BookRow>
            <form onSubmit={addCase}>
              <button type="submit" onClick={addCase} className="BookCase">
                加入書櫃
              </button>
            </form>
          </BookColumnScore>
        </div>
        {/* <InsertReply
          user={user}
          login={login}
          review={review}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
        /> */}
        <h3 className="reviews_push">發表評論</h3>
        <Review>
          <BookColumnMember>
            <Member>
              {user.isLogin ? (
                <img
                  className="reviews_member_img"
                  src={`http://localhost:5555/images/member/${user.pic}`}
                />
              ) : (
                ''
              )}
              <h6 className="reviews_member_nickname">{user.MR_nickname}</h6>
            </Member>
          </BookColumnMember>
          {user.isLogin ? (
            <form className="reviews_form" onSubmit={submitHandler}>
              <textarea
                className="reviews_textarea"
                name="reviewText"
                value={review.reviewText}
                onChange={changeHandler}
                onKeyPress={keypress}
                placeholder="新增評論..."
              />
              <BookRow>
                <p style={{ width: '80px' }}>幫書籍評分</p>
                <BookStar
                  score_star={review.star}
                  setScore_star={changeHandler}
                />
                <button type="submit" className="reviews_submitBtn">
                  送出評論
                </button>
              </BookRow>
            </form>
          ) : (
            <form className="reviews_form">
              <h6 className="reviews_Login">
                <a onClick={login} href="#">
                  請登入會員填寫評論
                </a>
              </h6>
            </form>
          )}
        </Review>
        {memberReview.map(data => (
          <Review key={data.sid}>
            <BookColumnMember>
              <Member>
                <img
                  className="reviews_memberReview_img"
                  src={`http://localhost:5555/images/member/${data.MR_pic}`}
                />
              </Member>
            </BookColumnMember>
            <div className="reviews_member_text">
              <BookRow>
                <BookScoreForMember score_star={data.star} />
                {data.MR_levelName}
              </BookRow>
              <BookRow>
                <h6 className="reviews_member_nickname">{data.MR_nickname}</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="reviews_time">
                  {new Intl.DateTimeFormat('zh-TW', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour12: false,
                  })
                    .format(new Date(data.create_time))
                    .replace(/\//g, '-')}
                </div>
              </BookRow>
              <br />
              {review.isEdit && data.sid === review.sid ? (
                <form onSubmit={updateHandler}>
                  <textarea
                    className="reviews_textarea"
                    name="editReview"
                    value={review.editReview}
                    onChange={changeHandler}
                    onKeyPress={keypress}
                  />
                  <button type="submit" className="reviews_UpdateBtn">
                    修改評論
                  </button>
                </form>
              ) : (
                <div className="reviews_text">{data.message}</div>
              )}
              {reply.map(item =>
                item.review_sid == data.sid ? (
                  <div key={item.review_sid} className="reviews_reply_view">
                    {item.MR_nickname}
                    &nbsp;
                    {':'}
                    &nbsp;
                    {item.reply_text}
                  </div>
                ) : (
                  ''
                )
              )}
              {user.isLogin ? (
                <form key={data.sid}>
                  <textarea
                    value={txt}
                    onChange={e => setTxt(e.target.value)}
                    name={data.sid}
                    placeholder="回覆此書評"
                    className="reviews_reply_text"
                    onKeyPress={keypress}
                  />
                </form>
              ) : (
                ''
              )}
            </div>
            {review.id === data.member ? (
              <div>
                {review.isEdit && data.sid === review.sid ? (
                  <>
                    <FontAwesomeIcon
                      onClick={() => {
                        setReview({
                          ...review,
                          isEdit: false,
                          editReview: data.message,
                          sid: data.sid,
                        })
                      }}
                      className="reviews_member_icon"
                      icon={faTimes}
                    />
                  </>
                ) : (
                  <FontAwesomeIcon
                    onClick={() => {
                      setReview({
                        ...review,
                        isEdit: true,
                        sid: data.sid,
                        editReview: data.message,
                      })
                    }}
                    className="reviews_member_icon"
                    icon={faPen}
                  />
                )}
                <br />
                <FontAwesomeIcon
                  onClick={() => deleteHandler(data.sid)}
                  value={data.sid}
                  className="reviews_member_icon"
                  icon={faTrashAlt}
                />
              </div>
            ) : (
              ''
            )}
          </Review>
        ))}
      </Main>
    </>
  )
}

export default List
