import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'


class BR_BookcaseHot_books extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       opened:null,
    }
  }
  handleOpened(opened){
    this.setState({opened})
  }
  render() {
    const { sid } = this.props;
    const { opened } = this.state;
    return (
      <>
        {/* <Link to={"/reviewer/reviewerBooks/reviewerBlog/"+this.props.sid}> */}
            <div className="HotBookBox_Bookcase" onClick={()=>this.handleOpened(this.state.opened === 'blog'? null : 'blog')}>
                <img className="brHotBookImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${this.props.pic}`} alt=""/>
                <h5 className="brHotBookText">{this.props.name}</h5>
            </div>
            {opened === 'blog' && <ReviewerBlog sid={sid}/>}
        {/* </Link> */}
      </>
    )
  }
}

export default withRouter(BR_BookcaseHot_books)
