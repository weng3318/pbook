import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'

class BR_BookcaseList extends React.Component {
    render(props) {
        // console.log(this.props)
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'))
        return (
            <>
            <Router>
<section className="ReviewerListAllBox_Bookcase">
    <div className="d-flex">
            {/* 書籍圖片 */}
        <Link to={"/reviewer/reviewerBooks/reviewerBlog/"+this.props.sid} className="d-flex justify-content-center borderLineTop">
          <div className="brAvatarAllBox_Bookcase borderLineLB">
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images_books/vb_9789578587823.jpg`)}/> */}
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images/${this.props.pic}`)}/> */}
            <img className="brBookInfoImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${this.props.pic}`} alt=""/>
            </div>
        </Link>
          <div className="brInfoBox_Bookcase borderLineUpDown"><h5 className="h5_br">書籍內容</h5>
                <div className="brInfoText_Bookcase">
                    <span className="bookInfo_Bookcase">書名：</span>{this.props.name}
                    <br/>
                    <span className="bookInfo_Bookcase">作者：</span>{this.props.author}
                    <br/>
                    <br/>
                    <h5 className="brInfoText_Bookcase" dangerouslySetInnerHTML={{__html:this.props.info}}></h5>
                </div>
                {/* <div className="brInfoText ">{this.props.intro}</div> */}
                <div className="brIconBox_Bookcase">
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_youtube.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_facebook.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_twitter.png')}/>
                    <img className="brIconShare_Bookcase" src={require('../reviewer_page/images/icon_shaer.png')}/>

              {/* <a href='javascript: void(window.open("http://www.facebook.com/share.php?u=".concat
              (encodeURIComponent("https://i.imgur.com/nLnK93i.png"))));'>分享品書雞</a> */}
                    <div className="fbBox">
                        <div className="fb-share-button" 
                            data-href='https://i.imgur.com/PKtu1i4.png'
                            data-layout="button_count">
                        </div>
                    </div>
              </div>
          </div>
    </div>
            {/* 評分組件 */}
    {/* <div className="brStarBox_Bookcase borderLine"></div> */}
    </section>
        {/* <h3>測試書本：{this.props.name}</h3> */}
        {/* <div style={{height:'30px'}}></div> */}
            <Switch>
                  <Route exact 
                  path="/reviewer/reviewerBooks/reviewerBlog/:sid?" 
                  component={ReviewerBlog} />
            </Switch>
            </Router>
        </>
        )
    }
}

export default BR_BookcaseList