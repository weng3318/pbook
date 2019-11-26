import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class ReviewerBlogEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
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

  render() {
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
      
    return (
    <>
      <h3 className="h3_br">書評家{BlogData.br_name} - 編輯模式</h3>
      <section className="br_CKEditor">
          <div className="Animate_Close_Box">
              <div className="Animate_Close_btn" onClick={() => this.props.onHandleOpen( this.props.opened === 'edit'? null : 'edit' )}>
                  <img className="icon_Blog_Close" src={require('./reviewer_page/images/icon_Blog_Close.png')}/>
                  <h5 className="text_Blog_Close">關閉編輯</h5>
              </div>
          </div>

        <h5 className="h5_br">你正在編輯<h3 className="h3_Red">{this.props.name}</h3></h5>

        <section className="Blog_textarea">
        
          <form method="post" action="">
                <CKEditor
                name={this.props.name}
                  editor={ ClassicEditor }
                  config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo"
                      ]
                  }}
        
                    data={this.props.blog}

                    onInit={ editor => {
                      // 儲存編輯器，發送資料
                        console.log( '編輯器啟動', editor );
                      // 添加decoupled-document 工具欄導入
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    } }

                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }

                    onBlur={ ( event, editor ) => {
                        console.log( '失焦!Blur.', editor );
                    } }

                    onFocus={ ( event, editor ) => {
                        console.log( '關注!Focus.', editor );
                    } }
                />

            <input className="Blog_submit" type="submit" value="編輯完成"/>
            </form>
          </section>
      </section>
    </>
    )
  }
}

export default withRouter(ReviewerBlogEdit)