import React from 'react'
import './lukeStyle.scss'
import { Link } from 'react-router-dom'

class BooksFavorite extends React.Component {
  constructor() {
    super()
    this.state = {
      path: 'http://localhost/books/src/venderBooks_Management/vb_images/',
      booksData: [],
      heightNum: {},
    }
  }

  componentDidMount() {
    this.queryBooks()
  }

  queryBooks = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number

    fetch('http://localhost:5555/member/queryBookcase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: number,
      }),
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log("data", data.rows);
        this.setState({ booksData: data.rows })
      })
  }

  render() {
    let data = this.state.booksData
    //因為第一次渲染是空的會報錯
    console.log(data && data)
    console.log(data.length)

    return (
      <>
        <div className="booksContent">
          <div className="title">收藏書籍</div>

          <div className="wrap flex-wrap">
            {(data && data).map(data => (
              <Link
                to={'/books/information/1/' + data.categories + '/' + data.name}
              >
                <div className="list">
                  <img className="listImg" src={this.state.path + data.pic} />
                  <div className="booksTitle">{data.name}</div>
                  {/* <div className="booksInfo"> */}
                  {/* 預留小圖示 */}
                  {/* <img class="avatar" src="../images/gift.png" alt=""/> */}
                  {/* <div className="introduction">
                                    {data.introduction}
                                    </div> */}
                  {/* </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default BooksFavorite
