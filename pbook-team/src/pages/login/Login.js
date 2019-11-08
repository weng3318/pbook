import React from 'react'
import './login.css'
import Carousel from '../../components/indexComponents/carousel/Carousel'
import '../member/lukeStyle.scss'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      data:[],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }




  handleChange(e){
    const name = e.target.name
    const obj = {};
    obj[name] = e.target.value;
    this.setState(obj, ()=>{
      console.log(this.state)
    });

    //解構賦值
    // const {name, value} = e.target
    // console.log(name, value);
  }

  handleLogin (e){
    // console.log(this.state.email, this.state.email);  
    // e.preventDefault()
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
      console.log(data);
      await this.setState(
        {data: data}
      )
    })
    .catch(error => {
      console.log('error = ' + error);
      
    })
    
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
    return (
      <>
      <Carousel />
      <div className="login_wrap" >
      <div className="container_login" >
          <form action="#" className="container_back" >
            <div className="login_title">
              <img src={require('./icon_MR_m.svg')} alt="" style={{ width: '30px' }} />
              <h2>品書人註冊</h2>
            </div>
            <input className="login_input" type="text" placeholder="電子郵件" />
            <input
              className="login_input"
              type="text"
              placeholder="使用者名稱"
            />
            <input className="login_input" type="password" placeholder="密碼" />
            <input
              className="login_input"
              type="password"
              placeholder="請再次確認密碼"
            />
            <input className="login_input" type="text" placeholder="新增照片" />
            <div className="serial"></div>
            <input
              className="login_input"
              type="text"
              placeholder="輸入驗證碼"
            />
            <button type="button" className="singUp_btn">
              確認
            </button>
            <button type="button" className="singUp_btn">
              取消
            </button>
          </form>

          <form action="#" className="container_front">
            <div className="login_title">
              <img src={require('./icon_MR_m.svg')} alt="" style={{ width: '30px' }} />
              <h2>品書人登入</h2>
            </div>
            <input className="login_input" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
            <input className="login_input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <button className="login_btn" onClick={this.handleLogin}>登入</button>
            <a href="link">Forgot your password?</a>
            <div className="social-container">
              <div>快速登入</div>
              <a href="link" className="social">FB</a>
              <a href="link" className="social">GOOGLE</a>
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
