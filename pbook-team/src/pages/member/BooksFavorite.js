import React from 'react'
import './lukeStyle.scss'

class BooksFavorite extends React.Component{
    constructor(){
        super()
        this.state = {
            path: 'http://localhost/books/src/venderBooks_Management/vb_images/',
            booksData: [],
            heightNum: {},
        }
    }

    componentDidMount(){
        this.queryBooks()
        this.randomNum()
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

    randomNum = ()=>{
        let list = document.querySelector('#list')
        let height = Math.floor(Math.random() * 500) + 300;
    } 



    render(){
        let data = this.state.booksData
        //因為第一次渲染是空的會報錯
        // console.log(data[0] && data[0].name);
        // console.log(data.length);
        // console.log("heightNum", this.state.heightNum);
        

        

        return(
            <>
                <div className="booksContent">
                    <div className="title">收藏書籍</div>


                        <div className="wrap flex-wrap">                      
                    {(data && data).map(data =>(
                        <div className="list" >
                            <img className="listImg" src={this.state.path + (data.pic)} />
                            <div className="booksTitle">{data.name}</div>
                            {/* <div className="booksInfo"> */}
                                {/* 預留小圖示 */}
                                {/* <img class="avatar" src="../images/gift.png" alt=""/> */}
                                {/* <div className="introduction">
                                   {data.introduction}
                                </div> */}
                            {/* </div> */}
                        </div>
                    )) }
                    </div>

                </div>
            </>
        )
    }

}

export default BooksFavorite