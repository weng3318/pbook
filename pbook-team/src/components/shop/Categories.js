import React from 'react'
import './Shop.scss'
import { Col } from 'react-bootstrap'

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
    }
  }

  // 元件 "已經 Did" 呈現在網頁上
  async componentDidMount() {
    try {
      const response = await fetch(
        'http://localhost:5555/books/book_categories',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      // if (!response.ok) throw new Error(response.statusText)
      const cate_data = await response.json()
      await this.setState({ categories: cate_data })
      const text = this.state.categories.name
      const id = this.state.categories.sid
      const payload = { id: id, text: text }
      const action = { type: 'ADD_TODO', payload }
      this.props.dispatch(action)
      this.setState({ categories: [] })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  render() {
    return (
      <>
        <Col md={2} className="book_categories px-0">
          <div className="d-flex justify-content-center align-items-center border-bottom">
            分類瀏覽
          </div>
          {this.state.categories.map(categories => (
            <div
              className="d-flex justify-content-center align-items-center border-bottom categories-color"
              key={categories.sid}
            >
              {categories.name}
            </div>
          ))}
        </Col>
      </>
    )
  }
}

export default Categories
