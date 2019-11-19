import React from 'react'
import './lukeStyle.scss'

class BooksFavorite extends React.Component{
    constructor(){
        super()
        this.state = {
            path: 'http://localhost/books/src/venderBooks_Management/vb_images/',
            booksData: []
        }
    }

    componentDidMount(){
        this.queryBooks()
    }
    
    queryBooks = () => {
        let number = JSON.parse(localStorage.getItem('user')).MR_number

        fetch('http://localhost:5555/member/queryBookcase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                number: number
                })
            })
            .then( res => {
                return res.json()
            })
            .then(data => {
                // console.log("data", data);
                this.setState({booksData: data})
            })
       
    }





    render(){
        let data = this.state.booksData
        //因為第一次渲染是空的會報錯
        console.log(data[0] && data[0].name);
        console.log(data.length);
        

        

        return(
            <>
                <div className="booksContent">
                    <div className="title">收藏書籍</div>
                    {(data && data).map(data =>(
                        <div className="wrap">                      
                        <div className="list">
                            <img className="listImg" src={'http://localhost/books/src/venderBooks_Management/vb_images/' + (data.pic)} />
                            <div className="booksInfo">
                                <div className="booksTitle">{data.name}</div>
                                {/* 預留小圖示 */}
                                {/* <img class="avatar" src="../images/gift.png" alt=""/> */}
                                <div className="introduction">
                                   {data.introduction}
                                </div>
                            </div>
                        </div>
                    </div>
                    )) }
                </div>
            </>
        )
    }

}

export default BooksFavorite