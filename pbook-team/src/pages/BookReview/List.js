/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import '../../Reviews.css'

//---------------------------------------------------------------------------------------------------------

//主頁面外框

// 書本外框
const Book = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: center;
  height: 300px;
  align-items: center;
`
//書本圖片
const BookImage = styled.img`
  width: 250px;
  height: 250px;
`
//書本資訊
const BookInfo = styled.div`
  width: 800px;
  height: 250px;
  border: 1px solid #ccc;
`
//書本星數
const BookStar = styled.div`
  display: flex;
  width: 400px;
  height: 250px;
  border: 1px solid #ccc;
  justify-content: center;
`
//回復評論外框
const Review = styled.section`
  width: 1200px;
  height: 350px;
  margin: 3rem auto;
  border-bottom: 1px solid #ccc;
`
//會員頭像
const Member = styled.img`
  width: 100px;
  height: 100px;
`
const Text = styled.div`
  position: relative;
  top: -100px;
  left: 150px;
  width: 1000px;
  height: 200px;
  border: 1px solid #ccc;
`
const Submit = styled.button`
  position: relative;
  top: -70px;
  left: 1050px;
  width: 100px;
  height: 50px;
`

//------------------------------------------------------------------------------------------------------

const List = () => {
  //從nodejs拿取資料的sid值
  const urlParams = window.location.pathname.replace('/list/', '')

  //變數
  const [List, setList] = useState([])

  useEffect(() => {
    reviewList()
  }, [])

  //書評分頁資料ajax
  const reviewList = () => {
    axios
      .get(`http://localhost:5555/list/${urlParams}`)
      .then(res => {
        console.log(res.data)
        setList(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <Book>
        {List.map(data => (
          <h4>{data.sid}</h4>
        ))}
        <BookImage></BookImage>
        <BookInfo></BookInfo>
        <BookStar />
      </Book>
      <Review>
        <h3>發表評論</h3>
        <Member />
        <Text />
        <Submit>送出評論</Submit>
      </Review>
      <Review>
        <Member />
        <Text />
      </Review>
    </>
  )
}

export default List
