import React from 'react'
import { Link } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'
import ReviewerBlogEdit from '../ReviewerBlogEdit'

class BR_BookcaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         opened: null,
        }
        // this.handleOpened.bind(this)
     }
    //  裝填，改變
     handleOpened = (opened) => {
         this.setState({ opened })
    }
 
     render() {
        const { opened } = this.state;
        const { sid } = this.props;
        const { name } = this.props;
        const { number } = this.props;

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'))
        return (
            <>
            {/* <Router> */}
    <section className="ReviewerListAllBox_Bookcase">
            {/* 書籍圖片 */}
        {/* <Link to={"/reviewer/reviewerBooks/reviewerBlog/"+this.props.sid} className="d-flex justify-content-center borderLineTop"> */}
          <div className="brAvatarAllBox_Bookcase" onClick={() => this.handleOpened(this.state.opened === 'blog' ? null : 'blog')}>
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images_books/vb_9789578587823.jpg`)}/> */}
            {/* <img className="brBookInfoImg_Bookcase" src={require(`./images/${this.props.pic}`)}/> */}
            <img className="brBookInfoImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${this.props.pic}`} alt=""/>
            </div>
        {/* </Link> */}
          <div className="brInfoBox_Bookcase borderLineUpDown"><h5 className="h5_br">書籍簡介</h5>
                <div className="brInfoTextBox_Bookcase">
                    <div className="bookNameBox_Bookcase">
                        <div className="bookName_Bookcase">書名：</div>
                        <div className="bookNameText_Bookcase">{this.props.name}</div>
                    </div>
                    <div className="beAuthorText">作者：{this.props.author}</div>

                    <h5 className="brInfoText_Bookcase" dangerouslySetInnerHTML={{__html:this.props.introduction? this.props.introduction:this.props.blog}}></h5>
                </div>

            {/* 編輯模式按鈕 */}
                {/* <Link className="Animate_Edit_Box" to={"/reviewer/reviewerBooks/reviewerBlog/reviewerBlogEdit/"+this.props.sid}> */}
                    <div className="Animate_Edit_Box">
                        <div className="Animate_Edit_btn" onClick={() => this.handleOpened(opened === 'edit' ? null : 'edit')}>
                            <img className="icon_Blog_Edit" src={require('../reviewer_page/images/icon_Blog_Edit.png')}/>
                            <h5 className="text_Blog_Edit">編輯模式</h5>
                        </div>
                    </div>
                {/* </Link> */}
                {/* <Link className="" to={"/reviewer/reviewerBooks/reviewerBlog/reviewerBlogEdit/"+this.props.sid}>
                </Link> */}
            <div className="brIconBox_Bookcase">
            {/* 收藏書籍 (圖示) */}
                <Link to={'/reviewer'} className="brIconShare_Bookcase">
                        <img src={require('../reviewer_page/images/icon_shaer.png')}/>
                </Link>
            {/* 分享功能 */}
                    <div className="fbBox">
                        <div className="fb-share-button" 
                            data-href='https://i.imgur.com/PKtu1i4.png'
                            data-layout="button_count">
                        </div>
                    </div>
              </div>
    </div>
            {/* 評分組件區塊 */}
    {/* <div className="brStarBox_Bookcase borderLine"></div> */}
    </section>
            {/* 切換 部落格文章 與 編輯模式 */}                 {/* onHandleOpen 爺爺想見孫女 brBlog brBlogList*/}
    {opened === 'blog' && <ReviewerBlog sid={sid} opened={opened} onHandleOpen={this.handleOpened}/>}
    {opened === 'edit' && <ReviewerBlogEdit sid={sid} name={name} number={number}/>}
                    {/* <Switch>
                        <Route exact 
                        path="/reviewer/reviewerBooks/reviewerBlog/:sid?" 
                        component={ReviewerBlog} />
                        <Route
                        exact
                        path="/reviewer/reviewerBooks/reviewerBlog/reviewerBlogEdit/:sid?"
                        component={ReviewerBlogEdit}
                        />
                    </Switch> */}
            {/* </Router> */}
        {/* <h3>測試書本：{this.props.name}</h3> */}
        {/* <div style={{height:'30px'}}></div> */}
        </>
        )
    }
}

export default BR_BookcaseList