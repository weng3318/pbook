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
                <input type="text" id="email" name="email" />
              </div>
              <div className="d-flex item">
                <h4>姓名 : </h4>
                <input type="text" id="name" name="name" />
              </div>
              <div className="d-flex item">
                <h4>暱稱 : </h4>
                <input type="text" id="nickname" name="nickname" />
              </div>
              <div className="d-flex item">
                <h4>生日 : </h4>
                <input type="text" id="birthday" name="birthday" />
              </div>

              <div className="d-flex item">
                <h4>手機 : </h4>
                <input type="text" id="mobile" name="mobile" />
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
              <div className="itemTitle">
                <h3>會員編號 :</h3>
                <h3>MR000001</h3>
              </div>
              <div className="itemTitle">
                <h3>會員等級 :</h3>
                <h3>品書大師</h3>
              </div>
              <div className="item">
                <figure>
                  <img src="../images/cars.jpg" alt="" />
                </figure>
                <div className="chang_btn">
                <input type="file" class="form-control-file" id="mr_pic" name="mr_pic" style={{display:"none"}} />
                
                <button className="btn btn-warning my-2 my-sm-0" type="button" onclick="uploadFile()">
                                選擇圖片
                </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex button-group">
            <div>
              <button
                style={{ width: '130px' }}
                type="submit"
                class="btn btn-warning"
                id="submit_btn"
              >
                &nbsp;取&nbsp;&nbsp;&nbsp;消&nbsp;
              </button>
            </div>
            <div>
              <button
                style={{ width: '130px' }}
                type="submit"
                class="btn btn-warning"
                id="submit_btn"
              >
                &nbsp;確&nbsp;認&nbsp;修&nbsp;改&nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit