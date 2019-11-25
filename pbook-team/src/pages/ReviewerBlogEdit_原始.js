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
  render(props) {
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
    
    CKEDITOR.replace('editorDemo');
    console.log(CKEDITOR.instances.editorDemo.getData());
    return (
    <>
      <textarea name="editorDemo">範例</textarea>

      <h3 className="h3_br">書評家{BlogData.number} - 編輯模式</h3>
      <section className="br_CKEditor">

            <div className="App">
            <h5 className="h5_br">你正在編輯<h3 className="h3_Red">{this.props.name}</h3></h5>
                <CKEditor
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
                    data="<p>歡迎使用，編輯功能</p>"

                    onInit={ editor => {
                      // 儲存編輯器，發送資料
                        console.log( '系統正常', editor );
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
                        console.log( '聚焦!Focus.', editor );
                    } }
                />
            </div>

      </section>
    </>
    )
  }
}

export default withRouter(ReviewerBlogEdit)