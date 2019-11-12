import React from 'react'
import './lukeStyle.scss'

class Edit extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      number: '',
      nickname:'',
      birthday:'',
      mobile:'',
      address:'',
      member: {}

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount(){
    this.queryMember()
    }

    queryMember(){
        let number = JSON.parse(localStorage.getItem('user')).MR_number
        fetch('http://localhost:5555/member', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              number: number,
            })
          })
          .then( response => {
            if(!response) throw new Error(response.statusText)
            // console.log('3'+response);
            return response.json()
          })
          .then(data =>{
            //   console.log("test", JSON.stringify(data));
            let bdy = data[0].MR_birthday
            let birthday = bdy.slice(0, 10)
              this.setState({
                name: data[0].MR_name,
                email: data[0].MR_email,
                number: data[0].MR_number,
                nickname: data[0].MR_nickname,
                birthday: birthday,
                mobile: data[0].MR_mobile,
                address:data[0].MR_address,
                member: data[0]
              })
          })

        
    }




  handleChange(e){
    const name = e.target.name
    const obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }

  handleEdit(){
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    fetch('http://localhost:5555/member/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              number: number,
              nickname: this.state.nickname,
              birthday: this.state.birthday,
              mobile: this.state.mobile,
              address: this.state.address,
            })
          })
          .then( response => {
            if(!response) throw new Error(response.statusText)
            return response.json()
          })
          .then(data =>{
              console.log("data", JSON.stringify(data));
          })
  }






  render(){
    let member = this.state.member
    let level = [
      '',
      '品書會員',
      '品書學徒',
      '品書專家',
      '品書大師',
      '品書至尊',
      '書評家'
    ];

      return (
        <>
          <div className="editWrap">
            <div className=" wrap">
              <div className="title">會員資料修改</div>
              <div className="d-flex">
                <div className="list">
                  <div className="d-flex item">
                    <h4>帳號 : </h4>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                  </div>
                  <div className="d-flex item">
                    <h4>姓名 : </h4>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                  </div>
                  <div className="d-flex item">
                    <h4>暱稱 : </h4>
                    <input type="text" id="nickname" name="nickname" value={this.state.nickname} onChange={this.handleChange}/>
                  </div>
                  <div className="d-flex item">
                    <h4>生日 : </h4>
                    <input type="text" id="birthday" name="birthday" value={this.state.birthday} onChange={this.handleChange}/>
                  </div>
                  <div className="d-flex item">
                    <h4>手機 : </h4>
                    <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                  </div>
                  <div className="d-flex item">
                    <h4>地址 : </h4>
                    <textarea
                      name="address"
                      id=""
                      cols="30"
                      rows="5"
                      style={{ width: '300px', minHeight: '50px', resize: 'none' }}
                      value={this.state.address} onChange={this.handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="list-r">
                  <div className="itemTitle">
                    <h3>會員編號 :</h3>
                    <h3>{this.state.number}</h3>
                  </div>
                  <div className="itemTitle">
                    <h3>會員等級 :</h3>
                    <h3>{level[member.MR_personLevel]}</h3>
                  </div>
                  <div className="item">
                    <figure>
                      <img src="../images/cars.jpg" alt="" />
                    </figure>
                    <div className="chang_btn">
                    <input type="file" className="form-control-file" id="mr_pic" name="mr_pic" style={{display:"none"}} />
                    
                    <button className="btn btn-warning my-2 my-sm-0" type="button">
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
                    className="btn btn-warning"
                    id="submit_btn"
                  >
                    &nbsp;取&nbsp;&nbsp;&nbsp;消&nbsp;
                  </button>
                </div>
                <div>
                  <button
                    style={{ width: '130px' }}
                    type="submit"
                    className="btn btn-warning"
                    id="submit_btn"
                    onClick={this.handleEdit}
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
}

export default Edit