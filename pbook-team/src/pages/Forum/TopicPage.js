import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import './TopicPage.scss'
import CardS1 from '../../components/forum/CardS1/CardS1'

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
          <div className="carouselContorl container">
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
