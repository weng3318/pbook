import React from 'react'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class BR_BookcaseHot_books extends React.Component {
  render() {
    return (
      <>
        <Link to={"/reviewer/reviewerBooks/reviewerBlog/"+this.props.sid}>
            <div className="HotBookBox_Bookcase">
                <img className="brHotBookImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${this.props.pic}`} alt=""/>
                <h5 className="brHotBookText">{this.props.name}</h5>
            </div>
        </Link>

          {/* <div>
            <img className="brHotBookImg_Bookcase"
              src={require('../reviewer_page/images/03書_React全方位基礎入門實戰.png')}/>
            <div className="brHotBookText">React全方位基礎入門實戰</div>
          </div> */}
      </>
    )
  }
}

export default withRouter(BR_BookcaseHot_books)
