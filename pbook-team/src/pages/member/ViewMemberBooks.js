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
                      <div className="modal-content" style={{width:'450px'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" >title</h5>
                            <button type="button" className="btn btn-secondary">刪除</button>
                        </div>
                        <div className="d-flex" style={{padding: '20px'}}>
                            <div style={{width:'250px', height: '240px'}}>
                                <img style= {{objectFit: 'contain', width: '100%', height: '100%'}} />
                            </div>
                            <div style={{textAlign: 'left', width: '300px'}}>
                                <h5>・ISBN：</h5>
                                <h5>・分類：</h5>
                                <h5>・作者：</h5>
                                <h5>・出版社：</h5>
                                <h5>・出版日期：</h5>
                                <h5>・版次：</h5>
                                <h5>・定價：</h5>
                                <h5>・頁數：</h5>
                            </div>
                        </div>
                    </div>
                </div>
              </>
          )
      }
    }  




    export default ViewMemberBooks