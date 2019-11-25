import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class ReviewerBlogEdit extends React.Component {
  constructor(props) {
    super(props)
    this.elementName = "editor_" + props.id;
    this.state = {
      csData: [],
      init: false,
    }
  }
  // componentDidMount(){
  //   // 當該組件用於創建模塊時，需要渲染editor (條件：之前從沒初始化過)
  //         if (this.props.content === '' && this.props.id && this.state.init === false) {
  //           this.loadCkEditor(this.props);
  //         }
  //       }
  //   // 每次更新都會走進該週期，需要判斷有沒有初始化過 && 外部有傳進內容
  //   // 當沒有init === false的判斷，會導致頁面渲染多個編輯器，
  //   // 開始的解決方案不是用init作為標記，而是使用ckeditor的destory、delete等方法，發現實現起來都不太乾淨，且有問題
  //       componentWillReceiveProps(nextProps) {
    
  //         if (CKEDITOR && nextProps && nextProps.content && nextProps.id  && this.state.init === false) {
  //           this.loadCkEditor(nextProps);
  //         }
  //       }
    
  //       loadCkEditor = (nextProps) => {
  //         this.elementName = "editor_" + this.props.id;
    
  //         CKEDITOR.replace(this.elementName);
  //         const { onChange } = nextProps;
    
  //         CKEDITOR.instances[this.elementName].on("change", function () {
  //           onChange && onChange(CKEDITOR.instances[this.elementName].getData())
  //         }.bind(this));
    
  //         this.setState({
  //           init: true
  //         })
  //       }
// -------------------------------------------------------------
  // componentDidMount() {
  //   let newcsData
  //   axios
  //     .get('http://localhost:5555/reviewer/brBookcase')
  //     .then(res => {
  //       newcsData = res.data.rows
  //       return axios.get('http://localhost:5555/reviewer/brbooks')
  //     })
  //     .then(res => {
  //       this.setState({ csData: newcsData, bkData: res.data.rows })
  //     })
  //     .catch(function(error) {
  //       console.log('前端沒有取得資料', error)
  //     })
  // }
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
    return (
    <>
      <textarea ref="content1" name={this.elementName} value={this.props.content ? this.props.content : ''}></textarea>

      <h3 className="h3_br">書評家{BlogData.number} - 編輯模式</h3>
      <section className="br_CKEditor">

            <div className="App">
            <h5 className="h5_br">你正在編輯<h3 className="h3_Red">{this.props.name}</h3></h5>
                <CKEditor
                id="content"
                content={this.props.contractBodyEditor}
                onChange={(value) => this.ckOnChange(value)}
                
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

                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     console.log( { event, editor, data } );
                    // } }

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