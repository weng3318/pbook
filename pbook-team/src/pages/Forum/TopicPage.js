import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import './TopicPage.scss'
import CardS1 from '../../components/forum/CardS1/CardS1'
import ButtonUI from '../../components/Material-UI/Button'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'

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
    fetch(`http://localhost:5555/forum/homepage/cate/${this.props.cate}`)
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
          data: result.article,
        })
      })
  }
  handelSelectSubcate = selectedKey => {
    if (selectedKey !== '0') {
      let result = this.state.data.filter(value => {
        return `${value.fm_subCategories}` === selectedKey
      })
      this.setState({
        articles: result,
      })
    } else {
      this.handleCateChange()
    }
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
                  <Nav
                    variant="pills"
                    defaultActiveKey="0"
                    onSelect={this.handelSelectSubcate}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="0">熱門</Nav.Link>
                    </Nav.Item>
                    {this.state.subcategory.map(value => {
                      return (
                        <Nav.Item key={value.sid}>
                          <Nav.Link eventKey={value.sid}>{value.name}</Nav.Link>
                        </Nav.Item>
                      )
                    })}
                  </Nav>
                </div>
              </div>
              <div className="subBar-item ">
                <ButtonUI name="我想發文" color="secondary"></ButtonUI>
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
