import React from 'react'
import './lukeStyle.scss'

const Info = () => {
  return (
    <>
      <div className="infoWrap">
                <div className="title">
                        會員資料
                </div>
                <div className="row">
                    <div className="list">
                        <div className="row item">
                            <h4>帳號 : </h4>
                            <h4>luke@gmail.com</h4>
                        </div>
                        <div className="row item">
                            <h4>姓名 : </h4>
                            <h4>luke</h4>
                        </div>
                        <div className="row item">
                            <h4>暱稱 : </h4>
                            <h4>luke</h4>
                        </div>
                        <div className="row item">
                            <h4>信箱 : </h4>
                            <h4>1988/08/12</h4>
                        </div>
                        <div className="row item">
                            <h4>手機 : </h4>
                            <h4>09XXXXXXXX</h4>
                        </div>
                        <div className="row item">
                            <h4>地址 : </h4>
                            <h4>XXXXXXXXXXXXXXXXXXXXXXXXX</h4>
                        </div>
                    </div>
                    <div className="list-r">
                            <div className="item">
                                    <h3>會員編號 :</h3>
                                    <h3>MR000001</h3>
                            </div>
                            <div className="item">
                                    <h3>會員等級 :</h3>
                                    <h3>品書大師</h3>
                            </div>
                                <div className="item col">
                                    <figure>
                                        <img src="../images/cars.jpg" alt="" />
                                    </figure>
                                </div>
                    </div>
                </div>            
            </div>
    </>
  )
}

export default Info
