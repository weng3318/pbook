import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class ReviewerBlogEdit extends React.Component {
  constructor(props) {
    super(props)
    this.bookName = "editor_" + this.props.id; //
    this.state = {
      csData: [],
      init: false, //
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
  // ----------------------------------------------------------------
  // 當該組件用於創建模塊時，需要渲染editor (條件：之前從沒初始化過)
    if (this.props.content === '' && this.props.id && this.state.init === false) {
      this.loadCkEditor(this.props);
    }
      }
      // 每次更新都會走進該週期，需要判斷有沒有初始化過 && 外部有傳進內容
      // 當沒有init === false的判斷，會導致頁面渲染多個編輯器，
      // 開始的解決方案不是用init作為標記，而是使用ckeditor的destory、delete等方法，發現實現起來都不太乾淨，且有問題
      componentWillReceiveProps(nextProps) {

        if (CKEditor && nextProps && nextProps.content && nextProps.id  && this.state.init === false) {
          this.loadCkEditor(nextProps);
        }
      }

      loadCkEditor = (nextProps) => {
        this.bookName = "editor_" + this.props.name;

        CKEditor.replace(this.bookName);
        const { onChange } = nextProps;

        CKEditor.instances[this.bookName].on("change", function () {
          onChange && onChange(CKEditor.instances[this.bookName].getData())
        }.bind(this));

        this.setState({
          init: true
        })
  // ----------------------------------------------------------------
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
    window.onload = function()
    {
      CKEditor.replace( 'description');
    };
    return (
    <>
   <textarea ref="content1" name={this.bookName} value={this.props.blog ? this.props.blog : ''}></textarea>
        {/* 書評家：<input type="text" name="position" id="position"/>
        簡介：<input type="text" name="quantity" id="quantity"/>
        其他職業：<input type="text" name="education" id="education"/>
        喜好書籍：<input type="text" name="salary" id="salary"/>
        部落格文章：<textarea name="description" id="description"></textarea> */}

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
          <form method="post" action="/localhost:3000/reviewer/reviewerBooks">
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