import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import './TopicPage.scss'
import CardS1 from '../../components/forum/CardS1/CardS1'
import Button from '../../components/Material-UI/Button'

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: false,
      featured: false,
    }
  }
  componentDidMount() {
    this.handleCateChange()
  }
  handleCateChange() {
    fetch(`http://localhost:5555/forum/homepage/cate/${this.props.cate}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(result => {
        this.setState({
          featured: result.featured,
          articles: result.article,
          subcategory: result.subcategory,
          cate: this.props.cate,
        })
      })
  }

  render() {
    if (!this.state.featured) {
      return <h2>hello{this.props.cate}</h2>
    } else {
      if (this.props.cate !== this.state.cate) {
        this.handleCateChange()
      }
      return (
        <>
          <div className="HotTopicPage container">
            <div className="subCate-navbar">
              <div className="dis-flex">
                <div className="subBar-item">
                  <Button name="熱門" color="primary" />
                </div>
                {this.state.subcategory.map(value => {
                  return (
                    <div className="subBar-item" key={value.sid}>
                      {value.name}
                    </div>
                  )
                })}
              </div>
              <div className="subBar-item ">
                <Button name="我想發文" color="secondary"></Button>
              </div>
            </div>
            <Carousel />
            <div className="cards-wrapper">
              {this.state.articles.map(value => (
                <CardS1 key={value.fm_articleId} data={value}></CardS1>
              ))}
            </div>
          </div>
        </>
      )
    }
  }
}

export default TopicPage
