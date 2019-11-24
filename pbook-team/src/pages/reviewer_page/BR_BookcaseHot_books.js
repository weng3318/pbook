import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'


function BR_BookcaseHot_books({ onHandleOpen, opened, sid, name, pic}) {
    return (
      <>
        {/* <Link to={"/reviewer/reviewerBooks/reviewerBlog/"+this.props.sid}> */}
            <div className="HotBookBox_Bookcase" onClick={() => onHandleOpen(opened === 'blog'? null : 'blog', sid)}>
                <img className="brHotBookImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${pic}`} alt=""/>
                <h5 className="brHotBookText">{name}</h5>
            </div>
        {/* </Link> */}
      </>
    )
}

export default withRouter(BR_BookcaseHot_books)
