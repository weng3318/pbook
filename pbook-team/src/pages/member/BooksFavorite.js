import React from 'react'
import './lukeStyle.scss'
import { Link } from 'react-router-dom'
import MyPagination from '../../components/member/MyPagination'
import { log } from 'util'

class BooksFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'http://localhost:5555/images/books/',
      booksData: [],
      data:[],
      nowPage: '',
      totalPage: '',
      totalRows: '',
      page:''
    }
  }

  componentDidMount() {
    this.queryBooks()
  }

  changePage = ( page )=>{
    console.log(page);
    
    // this.setState({page})
  }


  queryBooks = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    let page = this.props.match.params.page
    
    fetch('http://localhost:5555/member/queryBookcase/' + page, {
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
        // console.log("data11", data);
        if (data.totalRows == 0){
          return 
        }
        this.setState({ 
          data,
          booksData: data.rows ,
          nowPage: data.page,
          totalPage: data.totalPage,
          totalRows: data.totalRows
        })
      })
  }
  // componentDidUpdate(page)
  render() {
    let data = this.state.booksData
    //因為第一次渲染是空的會報錯
    // console.log("data ",data && data)
    console.log("props", this.props);
    let totalPage = this.state.totalPage
    let totalRows = this.state.totalRows

    return (
      <>
        <div className="booksContent">
          <div className="title">收藏書籍</div>
            <div className="wrap flex-wrap">
              {(data && data).map(data => (
                <Link
                  to={'/books/information/' + data.sid}
                  target="_blank"
                  key={data.sid}
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
            <MyPagination 
              nowPage = {this.props.match.params.page}
              totalPage = {totalPage}
              totalRows = {totalRows}
              
              />
        </div>
      </>
    )
  }
}

export default BooksFavorite
