import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
      </>
    )
  }
}

export default withRouter(BR_BookcaseHot_books)
