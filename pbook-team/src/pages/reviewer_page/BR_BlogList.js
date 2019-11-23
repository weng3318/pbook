import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
// import { log } from 'util'

class BR_BlogList extends React.Component {

  handleURL=()=>{
    // let url = `${this.props.tube}`
    let url = 'https://i.imgur.com/nLnK93i.png'
    void window.open("http://www.facebook.com/share.php?u=".concat(encodeURIComponent(url)))
  }

  render() {
    return (
      <>
      {/* <Link className="Animate_Edit_Box" to={"/reviewer/reviewerBooks/reviewerBlog/reviewerBlogEdit/:sid?"}>
                    <div className="Animate_Edit_btn">
                        <img className="icon_Blog_Edit" src={require('../reviewer_page/images/icon_Blog_Edit.png')}/>
                        <h5 className="text_Blog_Edit">關閉書評</h5>
                    </div>
      </Link> */}
          <h5 className="h5_br">{this.props.name}</h5>
          <br/>
        <section className="ReviewerListAllBox reviewerList">
          <h5 className="" dangerouslySetInnerHTML={{__html:this.props.blog}}></h5>
        </section>
          <img className="pbookChick BlogMouse" onClick={this.handleURL} src={require('./images/品書印章.png')}/>
        {/* href='javascript: void(window.open("http://www.facebook.com/share.php?u=".concat
              (encodeURIComponent("https://i.imgur.com/nLnK93i.png"))));' */}
      </>
    )
  }
}

export default withRouter(BR_BlogList)