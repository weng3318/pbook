import React from 'react'
import styled from '@emotion/styled'

function BookInfo(props) {
  //直排
  const BookColumn = styled.div`
    display: flex;
    flex-direction: column;
  `
  // 書本外框
  const Book = styled.div`
    display: flex;
    margin: 5px 0;
    height: 300px;
  `

  const { item } = props
  console.log(props)
  console.log(item)
  return (
    <>
      {item.map(data => (
        <Book key={data.sid}>
          <BookColumn>
            <img
              className="reviews_list_img"
              key={data.sid}
              src={require('../images/' + data.pic)}
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
    </>
  )
}

export default BookInfo
