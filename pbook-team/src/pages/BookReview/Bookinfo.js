/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import styled from '@emotion/styled'
import axios from 'axios'
import BookScore from './BookScore'
import BookLine from './BookLine'
import Category from './Category'
import './Reviews.css'
function Bookinfo() {
  const [bookInformation, setBookInformation] = useState([]) //書籍資料
  const [array, setArray] = useState(1) //排序方式
  const [categorys, setCategorys] = useState([])
  const [page, getPage] = useState()
  const [goPage, setPage] = useState(1)
  let pageNum = []
  let c,
    p = 1,
    s1,
    s2
  const url = window.location.search.replace('?', '')
  if (url !== '') {
    let urlSplit = url.split('&')
    if (url.indexOf('c') != -1) {
      if (urlSplit.length >= 1) {
        s1 = urlSplit[0].split('=')
        c = 'c=' + s1[1] + '&'
        p = 1
      }
    } else {
      c = ''
      s1 = urlSplit[0].split('=')
      p = s1[1]
    }
    if (urlSplit.length >= 2) {
      s2 = urlSplit[1].split('=')
      p = s2[1]
    }
  }

  //---------------------------------------------------------------------------
  const CategoryBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
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
  //直排
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
    width: 750px;
    height: 180px;
    margin: 0 2rem 45px 2rem;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `
  //書本星數
  const BookScoreSet = styled.div`
    width: 350px;
    height: 250px;
    margin: 100px auto;
    border: 1px solid #ccc;
  `

  //---------------------------------------------------------------------
  useEffect(() => {
    bookInfo()
    categoryBar()
  }, [array, c, p])

  const categoryBar = () => {
    axios
      .post('http://localhost:5555/reviews/categoryBar')
      .then(res => {
        let data = res.data.data
        setCategorys(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const bookInfo = () => {
    axios
      .get(`http://localhost:5555/reviews/?${c}a=${array}&p=${p}`)
      .then(res => {
        setBookInformation(res.data.rows)
        getPage(Math.ceil(res.data.total / 10))
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  for (let i = 1; i <= page; i++) {
    pageNum.push(
      <Link to={'reviews?' + c + 'p=' + i}>
        <li value={i} className="reviews_paginationNum">
          {i}
        </li>
      </Link>
    )
  }
  return (
    <>
      <CategoryBar>
        {categorys.map((data, index) => (
          <Link to={'reviews?c=' + data.sid + '&p=1' }>
            <button value={data.sid} key={index} className="reviews_btn">
              {data.name}
            </button>
          </Link>
        ))}
      </CategoryBar>

      <OptionBar>
        <select
          onChange={e => {
            setArray(e.target.value)
          }}
          value={array}
          name="array"
        >
          <option value="1">討論度(高>低)</option>
          <option value="2">上市日期(新>舊)</option>
          <option value="3">暢銷度</option>
        </select>
      </OptionBar>

      <Book>
        <BookColumn>
          {bookInformation.map((data, index) => (
            <BookImage>
              <Link to={'/book_reviews/' + data.sid}>
                <img
                  key={index}
                  className="reviews_img"
                  src={require('./images/' + data.pic)}
                />
              </Link>
            </BookImage>
          ))}
        </BookColumn>
        <BookColumn>
          {bookInformation.map(data => (
            <BookInfo key={data.sid}>
              <Link
                className="reviews_list_sid"
                to={'/book_reviews/' + data.sid}
              >
                <h4> {data.name}</h4>
              </Link>
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
        <BookColumn>
          <BookLine List={bookInformation} />
        </BookColumn>
      </Book>
      <ul className="reviews_pagination">{pageNum}</ul>
    </>
  )
}

export default Bookinfo
