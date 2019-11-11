import React from 'react'
import './lukeStyle.scss'

const Edit = () => {
  return (
    <>
      <div className="editWrap">
        <div className=" wrap">
          <div className="title">會員資料修改</div>
          <div className="d-flex">
            <div className="list">
              <div className="d-flex item">
                <h4>帳號 : </h4>
                <input type="text" />
              </div>
              <div className="d-flex item">
                <h4>姓名 : </h4>
                <input type="text" />
              </div>
              <div className="d-flex item">
                <h4>暱稱 : </h4>
                <input type="text" />
              </div>
              <div className="d-flex item">
                <h4>信箱 : </h4>
                <input type="text" />
              </div>
              <div className="d-flex item">
                <h4>性別 : </h4>
                <div className="d-flex genderGroup">
                  <input
                    className=""
                    type="radio"
                    name="gender"
                    value="1"
                  />
                  <h4>
                    男
                  </h4>
                  <input
                    className=""
                    type="radio"
                    name="gender"
                    value="2"
                  />
                  <h4 className="" for="gender">
                    女
                  </h4>
                </div>
                
              </div>
              <div className="d-flex item">
                <h4>手機 : </h4>
                <input type="text" />
              </div>
              <div className="d-flex item">
                <h4>地址 : </h4>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  style={{ width: '300px', minHeight: '50px', resize: 'none' }}
                ></textarea>
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
              <div className="item column">
                <figure>
                  <img src="../images/cars.jpg" alt="" />
                </figure>
                <button>更換</button>
              </div>
            </div>
          </div>
          <div className="d-flex button-group">
            <button>取消</button>
            <button>確認</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
