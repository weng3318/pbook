import React from 'react'
import styled from '@emotion/styled'
import BookScoreForBR from '../BookScore/BookScoreForBR'

function InsertReply(props) {
  //橫排
  const BookRow = styled.div`
    display: flex;
    margin: 0 1rem 0 0;
    flex-direction: row;
  `

  //直排
  const BookColumnMember = styled.div`
    display: flex;
    margin: 0 0 0 20px;
    align-items: center;
    flex-direction: column;
  `
  //會員頭像
  const Member = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 0 0 5px;
  `
  //回復評論外框
  const Review = styled.section`
    display: flex;
    width: 1200px;
    margin: 0 0 3rem 0;
    border-bottom: 1px dashed #ccc;
  `
  //橫排按鈕
  const BookRowButton = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin: 1rem 0 0 700px;
  `
  const { user, review, submitHandler, changeHandler } = props
  return (
    <>
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
              <span>幫書籍評分</span>
              <BookScoreForBR
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
              <a href="/">請登入會員填寫評論</a>
            </h6>
          </form>
        )}
      </Review>
    </>
  )
}

export default InsertReply
