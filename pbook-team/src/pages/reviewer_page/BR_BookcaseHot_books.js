import React from 'react'
import { withRouter } from 'react-router-dom'

function BR_BookcaseHot_books ({onHandleOpen, opened, sid, pic, name, }){
    return (
      <>
            <div className="HotBookBox_Bookcase" onClick={()=> onHandleOpen( opened === 'blog'? 'blog' : 'blog' , sid)}>
            {/* <div className="HotBookBox_Bookcase" onClick={()=> onHandleOpen( opened === 'blog'? null : 'blog' , sid)}> */}
                <img className="brHotBookImg_Bookcase" src={`http://localhost:5555/images/books/${pic}`} alt=""/>
                {/* <img className="brHotBookImg_Bookcase" src={`http://localhost/books/src/venderBooks_Management/vb_images/${pic}`} alt=""/> */}
                <h5 className="brHotBookText">{name}</h5>
            </div>
      </>
    )
}

export default withRouter(BR_BookcaseHot_books)
