import React from 'react'
import './login.css'
import Carousel from '../../components/indexComponents/carousel/Carousel'
import '../member/lukeStyle.scss'
import FbLogin from './FbLogin'
import swal from '@sweetalert/with-react'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2:'',
      captcha:"",
      error: '',
      memberData:{},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  success (status, message){
    swal({
      title: status,
      text: message,
      icon: "success",
      button: "OK",
    }).then(()=>{
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    })
  }

  fail(status, message){
    console.log(1111);
    
    swal({
      title: status,
      text: message,
      icon: "error",
      button: "OK",
    })
    // .then(()=>{
    //   setTimeout(() => {
    //     window.location.href = '/login'
    //   },5000)
    // })
  }


  handleChange(e){
    const name = e.target.name
    const obj = {};
    obj[name] = e.target.value;
    this.setState(obj, ()=>{
      // console.log(this.state)
    });

    //解構賦值
    // const {name, value} = e.target
    // console.log(name, value);
  }

  checkName(name){
    const re = /^\S{3,}/;
    const result = re.test(name);
    return result
  }

  //判斷email格式
  checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    return result;
  }

  //判斷密碼格式
  checkPassword(password, password2){
    const re =   /^(?=.*\d)(?=.*[a-z]).{4,8}$/
    console.log((password == password2) , re.test(password, password2));
    const result = (password == password2) && re.test(password, password2)
    return result
  }



  handleLogin (e){
    fetch('http://localhost:5555/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then( response => {
      if(!response) throw new Error(response.statusText)
      // console.log('3'+response);
      
      return response.json()
    })
    .then(async data => {
      // console.log(data.info);
      let status = data.status
      let message = data.message
      if(status === "登入成功"){
        await this.success(status, message)
        await localStorage.setItem('user', JSON.stringify(data.info))
        // alert(status + message)
        await this.setState({memberData: data.info})
       
      }
      if(status === "登入失敗"){
        console.log(status, message)
        await this.fail(status, message)
      }
    })
    // .catch(error => {
    //   console.log('error = ' + error);
    // })
    
  }

  

  handleRegister(e){
   let isPass = false
   let email = this.state.email
   let password = this.state.password
   let password2 = this.state.password2
   let name = this.state.name


    if(this.checkEmail(email) === false){
     //驗證信箱錯誤時的訊息
      this.setState({email: "帳號格式有誤"})
      let email = document.querySelector('#email')
      email.classList.add('error') 
      }

    if(this.checkName(name) === false){
      //驗證名稱錯誤時的訊息
       this.setState({name: "字數太少囉"})
       let name = document.querySelector('#name')
       name.classList.add('error') 
     }

     if(this.checkPassword(password, password2) === false){
      this.setState({password: "格式或密碼有誤", password2: "請再重新輸入"})
      let password = document.querySelector('#password')
      let password2 = document.querySelector('#password2')
      password.type = (password.type == "text") ;
      password2.type = (password2.type == "text") ;
      password.classList.add('error')
      password2.classList.add('error')
      }else{
        isPass = true
      } 
      // this.setState({name: "字數太少囉",password: "格式或密碼有誤", password2: "請再重新輸入"})
    console.log(isPass);
    
    if(isPass){
    fetch('http://localhost:5555/member/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
        })
        .then( response => {
          if(!response) throw new Error(response.statusText)
          // console.log('3'+response);
          
          return response.json()
        })
        .then(async data => {
          console.log(data.info);
          if(data.status === "註冊成功"){
            // alert(data.status + data.message)
            await this.setState({memberData: data.info})
            // await setTimeout(()=>{
            //   window.location.href = '/'
            // }, 1000)
          }else{
            alert(data.status + data.message)
            window.location.href = '/login'
          }
        })
        .catch(error => {
          console.log('error = ' + error);
        })
        }
  }
  
  
  flipSingUp = () =>{
      let container_back = document.querySelector('.container_back')
      let container_front = document.querySelector('.container_front')
      container_back.classList.add('flip-to-right')
      container_front.classList.add('_opacity')
      container_front.classList.remove('_invisible')    
  }
  flipSingIn = () =>{
    let container_right = document.querySelector('.container_right')
    let container_front = document.querySelector('.container_front')
    let container_back = document.querySelector('.container_back')
    container_right.classList.add('flip-to-left')
    container_back.classList.remove('flip-to-right')
    container_front.classList.add('_invisible')
  }

  
  

  render() {
    // console.log(this.state.memberData);
    
    return (
      <>
      <Carousel />
      <div className="login_wrap" >
      <div className="container_login" >
          <form action="#" className="container_back">
            <div className="login_title">
              <img src={require('./icon_MR_m.svg')} alt="" style={{ width: '30px' }} />
              <h2>品書人註冊</h2>
            </div>
            <input required className="login_input" name="email" id="email" type="text" placeholder="電子郵件" 
            value={this.state.email} onChange={this.handleChange} />
            <input
              className="login_input"
              type="text"
              placeholder="使用者名稱"
              name="name" id="name"
              value={this.state.name} onChange={this.handleChange} 
            />
             <small className="tip">至少3個字元</small>
            <input className="login_input" type="password" name="password" id="password" 
            placeholder="密碼" value={this.state.password} onChange={this.handleChange} />
            <small className="tip">至少有一個數字、一個小寫英文字母、密碼長度在 4~8 之間</small>
            <input
              className="login_input"
              type="password"
              placeholder="請再次確認密碼"
              name="password2" id="password2"
              value={this.state.password2} onChange={this.handleChange} 
            />
            <input className="login_input" type="text" placeholder="新增照片" />
            <div className="serial"></div>
            <input
              className="login_input"
              type="text"
              placeholder="輸入驗證碼"
            />
            <button type="button" className="singUp_btn" onClick={this.handleRegister}>
              確認
            </button>
            <button type="button" className="singUp_btn" onClick={()=>{window.location.href = '/' }}>
              取消
            </button>
          </form>

          <form action="#" className="container_front" data={this.state.memberData}>
            <div className="login_title">
              <img src={require('./icon_MR_m.svg')} alt="" style={{ width: '30px' }} />
              <h2>品書人登入</h2>
            </div>
            <input className="login_input" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
            <input className="login_input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <button className="login_btn" onClick={this.handleLogin}>登入</button>
            <a href="link">Forgot your password?</a>
            <div className="social-container ">
              <div className="title">快速登入</div>
              <div><FbLogin/></div>
            </div>
          </form>

          <div className="container_left _center">
            <img src={require('./品書logo.png')}alt="" style={{ width: '120px' }} />
            <h4 style={{ margin: '10px' }}>還沒有帳號就快來加入品書人行列</h4>
            <button className="login_btn" onClick={this.flipSingUp}>
              品書人註冊
            </button>
          </div>

          <div className="container_right _center">
            <img src={require('./品書logo.png')} alt="" style={{ width: '120px' }} />
            <button className="login_btn" onClick={this.flipSingIn}>
              品書人登入
            </button>
        </div>
      </div>
      </div>
      </>
    )
  }
}

export default Login
