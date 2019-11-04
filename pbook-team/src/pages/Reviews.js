/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../Reviews.css'

// ------------------------------------------------------------------------------------
//主要內容外框
const Main = styled.section`
  margin: 0 auto;
  width: 1200px;
`
//類別欄外框
const CategoryBar = styled.div`
  display: flex;
  flex-wrap: wrap;
`
//右上排列方式欄位
const OptionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

// 書本外框
const Book = styled.section`
  display: flex;
  margin: 5px 0;
  align-items: center;
`
const BookColumn = styled.div`
  display: flex;
  flex-direction: column;
`

//書本圖片
const BookImage = styled.div`
  margin: 0 auto;
`
//書本資訊
const BookInfo = styled.div`
  width: 850px;
  margin: 0 0 40px 2rem;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
//書本星數
const BookStar = styled.div`
  width: 350px;
  height: 250px;
  border: 1px solid #ccc;
`
// ------------------------------------------------------------------------------------

const Reviewer = () => {
  const [category, setCategory] = useState([]) //分類資料
  const [bookinfo, setbookinfo] = useState([]) //書籍資料
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState([]) //分頁數
  let pagNum = [] //分頁

  useEffect(() => {
    categoryBar()
    bookInfo()
  }, [page])

  //書籍分類ajax
  const categoryBar = () => {
    axios
      .post('http://localhost:5555/categoryBar')
      .then(res => {
        setCategory(res.data.data)
        console.log(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //書籍資料ajax
  const bookInfo = () => {
    axios
      .get(`http://localhost:5555/bookInfo/${page}`)
      .then(res => {
        setbookinfo(res.data.rows)
        setPagination(Math.ceil(res.data.total) / 10)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const goPage = () => {}

  //分頁陣列
  for (let i = 1; i <= pagination; i++) {
    pagNum.push(<li className="paginationNum">{i}</li>)
  }
  // category.filter()

  return (
    <>
      <Router>
        <Main>
          <CategoryBar>
            {category.map(data => (
              <button key={data.sid} className="btn">
                {data.name}
              </button>
            ))}
          </CategoryBar>
          <OptionBar>
            <select name="array">
              <option value="1">討論度(高>低)</option>
              <option value="2">上市日期(新>舊)</option>
              <option value="2">暢銷度</option>
            </select>
          </OptionBar>
          <Book>
            <BookColumn>
              {bookinfo.map((data, index) => (
                <BookImage>
                  <a href={'http://localhost:3000/list/' + data.sid}>
                    <img
                      key={index}
                      className="img"
                      src={require('./BookReview/images/' + data.pic)}
                    />
                  </a>
                </BookImage>
              ))}
            </BookColumn>
            <BookColumn>
              {bookinfo.map(data => (
                <BookInfo key={data.sid}>
                  <a
                    className="list_sid"
                    href={'http://localhost:3000/list/' + data.sid}
                  >
                    <h4> {data.name}</h4>
                  </a>
                  {'作者:'}
                  {data.author}
                  {/* {'出版社:'}
                  {data.publish_date} */}
                  <div />
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
              ))}
            </BookColumn>
            {/* <BookStar /> */}
          </Book>
          <ul className="pagination">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
            >
              1
            </button>
            {pagNum}
            <button
              onClick={() => {
                page < pagination ? setPage(page + 1) : setPage((page = 1))
                // if (page < pagination) {
                //   setPage(page + 1)
                // }
              }}
            >
              >
            </button>
          </ul>
        </Main>
      </Router>
    </>
  )
}

export default Reviewer
