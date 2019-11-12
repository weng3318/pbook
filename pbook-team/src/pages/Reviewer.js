import React from 'react'
import Chat from '../components/member/chat/Chat'
import Data from '../pages/reviewer_page/data/reviewer_data'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_Navbar from './reviewer_page/BR_Navbar'
import axios from 'axios'

// 書評家使用的CSS
import '../pages/reviewer_page/BR_Bookcase.css'
import '../pages/reviewer_page/BR_Reviewer.css'

export class Reviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        brData: [],
    }
}
  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer_Data')
      .then(res => {
          this.setState({ brData: res.data })
          console.log('取得資料' + res.data)
        })
        .catch(function(error) {
            console.log('沒有取得資料請執行 json-server --watch --port 5555 reviewer_Data.json ' + error)
        })
    }
    render() {
        return (
            <>
            <BR_Navbar />
        <h1>書評家</h1>
        {/* <Chat id="MR00001"/> */}
        {/* {this.state.brData */}
        {Data
          .filter(({ name }) => '31桑' == name)
          .map(({ level, type, name, info, id, tube }) => (
            <BR_ReviewerList
              key={id}
              to={'/ReviewerBooks/' + id}
              name={name}
              type={type}
              level={level}
              tube={tube}
              id={id}
              info={info}
            ></BR_ReviewerList>
          ))}

        {/* {this.state.brData */}
        {Data
        .map(({ level, type, name, info, id, tube, bookcase }) => (
            <BR_ReviewerList
              key={id}
              to={'/ReviewerBooks/' + id}
              name={name}
              type={type}
              level={level}
              tube={tube}
              id={id}
              info={info}
              bookcase={bookcase}
            ></BR_ReviewerList>
          )
        )}
      </>
    )
  }
}
export default Reviewer