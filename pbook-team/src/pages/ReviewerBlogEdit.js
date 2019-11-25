import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
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
    let csData = this.state.csData

    let BlogData = null
      
      for (let i = 0; i < csData.length; i++) {
        if (csData[i].sid == this.props.sid) {
          BlogData = csData[i]
        }
    }
    console.log('render csData 書評部落格資料', this.state.csData)
    return (
    <>
      <h3 className="h3_br">書評家{this.props.number} - 編輯模式</h3>
      <h5 className="h5_br">你正在編輯 <h3 className="h3_Red">{this.props.name}</h3></h5>
      <section className="br_CKEditor">
      <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.detail}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      const data = editor.getData();
                        this.setState({
                          detail:data
                        });
                        
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
      </section>
    </>
    )
  }
}

export default withRouter(ReviewerBlogEdit)
