import React from 'react'
import './lukeStyle.scss'


class ViewMemberBooks extends React.Component {
    constructor(){
      super()
      this.state = {
      }
     
    }
    
    render(){
     return(
              <>
                <div className="viewMemberBooks">
                    <div className="Book_title">配對書籍</div>
                      <div className="books_container flex-wrap">
                        <div className="modal-content" style={{width:'450px'}}>
                          <div className="modal-header">
                              <h5 className="modal-title" >週休遊台灣：52條懶人包玩樂路線任你選</h5>
                              <button type="button" className="btn btn-warning" style={{width: '80px'}}>刪除</button>
                          </div>
                          <div className="d-flex" style={{padding: '20px'}}>
                              <div style={{width:'250px', height: '240px'}}>
                                  <img style= {{objectFit: 'contain', width: '100%', height: '100%'}} />
                              </div>
                              <div style={{textAlign: 'left', width: '360px'}}>
                                  <h5>・ISBN：9789578587823</h5>
                                  <h5>・分類：旅遊</h5>
                                  <h5>・作者：查理．蒙格</h5>
                                  <h5>・出版社：樂遊台灣</h5>
                                  <h5>・出版日期：2019-07-05</h5>
                                  <h5>・版次：初版</h5>
                                  <h5>・定價：350</h5>
                                  <h5>・頁數：362</h5>
                              </div>
                          </div>
                      </div>
                      
                  </div>
              </div>
            </>
          )
      }
    }  




    export default ViewMemberBooks