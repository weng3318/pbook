import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh'
import swal from '@sweetalert/with-react'

export class ReviewerBlogEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
      blogData:'',
    }
  }
  componentDidMount() {
    let newcsData
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res => {
        this.setState({ csData: newcsData, bkData: res.data.rows })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }

  // 編輯用API-------------------------------------------------------------------------
  handleBlogEdit = (e) => {
    e.preventDefault()
    fetch('http://localhost:5555/reviewer/brBlogEdit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid: this.props.sid,
        blog: this.state.blogData,
      }),
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        return response.json()
      })
      .then(data=>{
        swal('編輯完成','','success').then(value=>{
          setTimeout(()=>{
            window.location.reload()
          },100)
        })
      })
      // .then(data => {
      //   console.log('Fetch進來的資料', JSON.stringify(data))
      //   let status = data.status
      //   let message = data.message
      //   if (status === '修改成功') {
      //     this.success(status, message)
      //   }
      //   if (status === '修改失敗') {
      //     this.fail(status, message)
      //   }
      // })
  }

  // Sweet動畫---------------------------------------------------------------------
  success = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'success',
      button: 'OK',
    }).then(title => {
      if (title === '編輯完成') {
        swal('文章已經發佈了!', {
          icon: 'success',
        })
      }
      setTimeout(()=>{
        window.location = '/member'
      }, 1000)
    })
  }
  fail = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'error',
      button: 'OK',
    })
  }
  // Sweet動畫---------------------------------------------------------------------

  render() {
    let { opened } = this.props
    let { name } = this.props
    let { br_name } = this.props
    console.log(this.state.blogData)
    // if (!this.state.csData.length) return <></>
    if (this.state.csData.length === 0)
      return (
        <>
          <h1 className="h1_br">取得資料中...</h1>
        </>
      )
    // 書櫃資料
    let csData = this.state.csData

    let BlogData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].sid == this.props.sid) {
        BlogData = csData[i]
      }
    }

    // let LinkTo_sid = (window.location.pathname.slice(-2).replace('/',''))
    // console.log('書櫃跳來的sid', LinkTo_sid)
    console.log('編輯模式進來的sid', this.props.sid)
    return (
      <>
        <h3 className="h3_br">書評家{br_name} - 編輯模式</h3>
        <section className="br_CKEditor">
        <h5 className="h5_br">你正在編輯<div className="h3_Red">{name}</div></h5>
          <div className="Animate_Close_Box">
            <div
              className="Animate_Close_btn"
              onClick={() =>
                this.props.onHandleOpen(opened === 'edit' ? null : 'edit')
              }
            >
              <img
                className="icon_Blog_Close"
                src={require('./reviewer_page/images/icon_Blog_Close.png')}
              />
              <h5 className="text_Blog_Close">關閉編輯</h5>
            </div>
          </div>
          
          <section className="Blog_textarea">
          </section>

            <form onSubmit={this.handleBlogEdit}>
              <button
                  type="submit" 
                  className="Blog_submit"
                  // onClick={this.handleBlogEdit}
                  value="編輯完成">編輯完成</button>

          {/* ---------------------------------------------------------------- */}
          <CKEditor
            sid={this.props.sid}
            blog={this.props.blog}
            editor={ClassicEditor}
            config={{
              language: 'zh',
            }}
            
            data={this.props.blog}
            
            onInit={editor => {
              // 存儲"編輯器"，在需要時使用。
              console.log('編輯器可以使用了！', editor)
              // 外部添加 decoupled-document 工具欄導入
              // editor.ui
              //   .getEditableElement()
              //   .parentElement.insertBefore(
              //     editor.ui.view.toolbar.element,
              //     editor.ui.getEditableElement()
              //   )
            }}

              // 31
              // handleChange = (e) => {
              // this.setState({
              // [e.target.name]: e.target.value
              //     })
              //   }
// --------------------------------------------------------------------
                onChange={(event, editor) => {
                const data = editor.getData()
                this.setState({
                  blogData:data
                })
                console.log({ event, editor, data })
              }}

              onBlur={(event, editor) => {
                console.log('失焦!Blur.', editor)
              }}
              onFocus={(event, editor) => {
                console.log('聚焦!Focus.', editor)
              }}
          />
          {/* ---------------------------------------------------------------- */}
            </form>
        </section>
      </>
    )
  }
}

export default withRouter(ReviewerBlogEdit)
