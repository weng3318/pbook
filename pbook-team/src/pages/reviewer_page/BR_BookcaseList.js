import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class BR_BookcaseList extends React.Component {
    render() {
        return (
            <>
<section className="ReviewerListAllBox_Bookcase reviewerList">
    <div className="d-flex">
            {/* 書籍圖片 */}
        <Link to={"/reviewer/reviewerBooks/bookcase/"+this.props.sid} className="d-flex justify-content-center borderLineTop">
          <div className="brAvatarAllBox_Bookcase borderLine">
            <img className="brBookInfoImg_Bookcase" src={require(`./images_books/${this.props.bookcase}`)}/>
          </div>
        </Link>
          <div className="brInfoBox_Bookcase borderLine"><h5 className="h5_br">書評內容</h5>
                <div className="brInfoText_Bookcase">
                    {this.props.bookName}<div className="bookInfo_Bookcase">書名：蔡康永的說話之道</div>
                    {this.props.bookBy}<div className="bookInfo_Bookcase">作者：蔡康永</div>
                    <br/>
                    {this.props.intro}
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                        書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 書評介紹 > 
                </div>
                <div className="brIconBox_Bookcase">
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_youtube.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_facebook.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_twitter.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_shaer.png')}/>
              </div>
          </div>
    </div>
            {/* 評分組件 */}
    {/* <div className="brStarBox_Bookcase borderLine"></div> */}
    </section>
        <div style={{height:'30px'}}></div>
        <h1>測試書本：{this.props.bookcase}</h1>
       </>
        )
    }
}

export default BR_BookcaseList
