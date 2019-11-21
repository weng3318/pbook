/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
// import BookHeart from './BookScore/BookScore'
import BookStar from './BookScore/BookScoreForBR'
import BookLineForBR from './BookLine/BookLineForBR'
import BookScoreForMember from './BookScore/BookScoreForMember'
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
  margin: 0 1rem 0 0;
  flex-direction: row;
`
//橫排按鈕
const BookRowButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 1rem 0 0 700px;
`

//直排
const BookColumn = styled.div`
  display: flex;
  flex-direction: column;
`

//直排
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

//加入書櫃按鈕
const BookCase = styled.button`
  width: 100px;
  height: 50px;
  margin: 0 50px 0 0;
  border-radius: 5px;
  background-color: #cde2d0;
  color: #2d3a3a;
  border: 1px solid #ccc;
`
//書本資訊
const BookInfo = styled.div`
  margin: 0 0 0 50px;
  width: 1000px;
`

//書本分數
const BookScoreTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0 0 0;
  font-size: 15px;
`
//書本評分
const BookScore = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  align-items: center;
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
  const [List, setList] = useState([])
  const [score, setScore] = useState([])
  const [memberReview, getMemberReview] = useState([])
  const [user, setUser] = useState({
    isLogin: false,
    pic: 'yui.png',
    nickname: '',
  })
  const [review, setReview] = useState({
    id: '',
    sid: '',
    editReview: '',
    reviewText: '',
    book: urlParams,
    star: '1',
    isEdit: false,
    submitSuccess: false,
    error: false,
  })

  useEffect(() => {
    bookList()
    reviewList()
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      let data = JSON.parse(localStorage.getItem('user'))
      setUser({
        isLogin: true,
        pic: data.MR_pic,
        nickname: data.MR_nickname,
      })
      setReview({ ...review, id: data.MR_number })
    }
  }, [score])

  const bookList = async () => {
    await axios
      .get(`http://localhost:5555/reviews/book_reviews/${urlParams}`)
      .then(res => {
        let s = res.data.data[0].sid
        setList(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  //書評分頁資料ajax
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

  //輸入時更新資料
  const changeHandler = e => {
    if (review.isEdit) {
      setReview({
        ...review,
        [e.target.name]: e.target.value,
      })
    } else {
      setReview({
        ...review,
        [e.target.name]: e.target.value,
      })
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
          swal('新增成功', '', 'success')
          console.log(res)
        })
        .then(
          setTimeout(function() {
            window.location.reload()
          }, 1500)
        )
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

  const updateHandler = e => {
    e.preventDefault()
    let api = `http://localhost:5555/reviews/editReview/data`
    axios
      .put(api, {
        sid: review.sid,
        editReview: review.editReview,
      })
      .then(res => {
        swal('修改成功!')
        console.log(res)
      })
      .then(
        setTimeout(function() {
          window.location.reload()
        }, 2000)
      )
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
        swal('刪除成功!', '1秒後跳轉頁面', {
          icon: 'success',
        })
        axios.delete(
          `http://localhost:5555/reviews/deleteReview/${delete_data}`
        )
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        swal('已取消刪除!')
      }
    })
  }

  const login = () => {
    let loginBtn = document.querySelector('.loginButton')
    loginBtn.click()
  }

  //更新資料狀態
  const EditReview = e => {
    let sid = e
    return (
      <>
        <FontAwesomeIcon className="reviews_member_icon" icon={faCheck} />
        <FontAwesomeIcon
          onClick={() => {
            setReview({ ...review, isEdit: false, sid: sid })
          }}
          className="reviews_member_icon"
          icon={faTimes}
        />
      </>
    )
  }
  //未更新資料狀態
  const NoEditReview = () => {
    return (
      <FontAwesomeIcon
        onClick={() => {
          setReview({ ...review, isEdit: true })
        }}
        className="reviews_member_icon"
        icon={faPen}
      />
    )
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
          <BookLine>
            <BookScore>{/* <BookHeart urlParams={urlParams} /> */}</BookScore>
            <BookRow>
              <BookLineForBR List={List} />
            </BookRow>
            <BookScoreTitle>
              <span>{'5'}</span>
              <span>{'4'}</span>
              <span>{'3'}</span>
              <span>{'2'}</span>
              <span>{'1'}</span>
            </BookScoreTitle>
            <BookCase>加入書櫃</BookCase>
            <BookCase>立即購買</BookCase>
          </BookLine>
          {/* {review.submitSuccess && <p>送出成功</p>}
          {review.error && <p>送出失敗</p>} */}
        </div>
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
                placeholder="新增評論..."
              />
              <BookRow>
                <p style={{ width: '80px' }}>幫書籍評分</p>
                <BookStar
                  score_star={review.star}
                  setScore_star={changeHandler}
                />
                <BookRowButton>
                  <button type="submit" className="reviews_submitBtn">
                    送出評論
                  </button>
                </BookRowButton>
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
                  />
                  <button type="submit" className="reviews_UpdateBtn">
                    修改評論
                  </button>
                </form>
              ) : (
                <div className="reviews_text">{data.message}</div>
              )}
              <textarea
                className="reviews_reply"
                placeholder="回覆此書評"
              ></textarea>
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
