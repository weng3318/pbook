import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import './scss/TopicPage.scss'
import CardS1 from '../../components/forum/CardS1/CardS1'
import ButtonUI from '../../components/Material-UI/Button'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { withRouter } from 'react-router'

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: false,
      featured: false,
      activeKey: 2,
    }
  }
  componentDidMount() {
    console.log(this.props)
    this.handleCateChange()
  }

  handleCateChange() {
    fetch(`http://localhost:5555/forum/cate/${this.props.cate}`)
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
          activeKey: 0,
        })
      })
  }
  handelSelectSubcate = selectedKey => {
    console.log(selectedKey)
    if (selectedKey !== '0') {
      let result = this.state.data.filter(value => {
        return `${value.fm_subCategories}` === selectedKey
      })
      this.setState({
        articles: result,
        activeKey: selectedKey,
      })
    } else {
      this.handleCateChange()
    }
  }
  handlePostClick = e => {
    console.log(this.props.location.pathname)
    // this.props.history.push('/forum/post')
  }

  render() {
    if (!this.state.featured) {
      return <h2>hello{this.props.cate}</h2>
    } else {
      if (this.props.cate !== this.state.cate) {
        this.handleCateChange()
      }
      return (
        // defaultActiveKey="0"

        <>
          <div className="HotTopicPage container">
            <div className="subCate-navbar">
              <div className="dis-flex">
                <div className="subBar-item">
                  <Nav
                    variant="pills"
                    activeKey={this.state.activeKey}
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
              <Link to="/forum/post">
                <div className="subBar-item ">
                  <ButtonUI name="我想發文" color="secondary"></ButtonUI>
                </div>
              </Link>
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

export default withRouter(TopicPage)
