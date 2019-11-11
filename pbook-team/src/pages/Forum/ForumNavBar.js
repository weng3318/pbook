import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Forum from './Forum'
import TopicPage from './TopicPage'
import './ForumNavBar.scss'

// 2 3 1 7 10 11 21 13 4
// vb_categories {
// 1  文學小說
// 2  商業理財
// 3  藝術設計
// 4  人文史地
// 5  社會科學
// 6  自然科普
// 7  心理勵志
// 8  醫療保健
// 9  飲食
// 10 生活風格
// 11 美食旅遊
// 12 宗教命理
// 13 親子教養
// 14 童書/青少年文學
// 15 輕小說
// 16 漫畫
// 17 語言學習
// 18 考試用書
// 19 電腦資訊
// 20 專業/教科書/政府出版品
// 21 數位科技
// }
const ForumNavBar = () => {
  return (
    <Router>
      <>
        <div className="forumPage">
          <Navbar className="navbarControl">
            <nav className="container">
              <LinkContainer to="/forum" exact activeClassName="active">
                <Navbar.Brand className="F-nav-link">個人首頁</Navbar.Brand>
              </LinkContainer>
              <Nav className="mr-auto ">
                <LinkContainer to="/forum/finance" activeClassName="active">
                  <Nav.Link className="F-nav-link">商業理財</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/art" activeClassName="active">
                  <Nav.Link className="F-nav-link">藝術攝影</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/novel" activeClassName="active">
                  <Nav.Link className="F-nav-link">文學小說</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/psychology" activeClassName="active">
                  <Nav.Link className="F-nav-link">心理勵志</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/lifeStyle" activeClassName="active">
                  <Nav.Link className="F-nav-link">生活風格</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/food" activeClassName="active">
                  <Nav.Link className="F-nav-link">美食旅遊</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/technology" activeClassName="active">
                  <Nav.Link className="F-nav-link">數位科技</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/child" activeClassName="active">
                  <Nav.Link className="F-nav-link">親子教養</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum/humanities" activeClassName="active">
                  <Nav.Link className="F-nav-link">人文史地</Nav.Link>
                </LinkContainer>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </nav>
          </Navbar>

          <Switch>
            <Route exact path="/forum" component={Forum}></Route>
            <Route
              exact
              path="/forum/finance"
              render={props => <TopicPage {...props} cate={2} />}
            ></Route>
            <Route
              exact
              path="/forum/art"
              render={props => <TopicPage {...props} cate={3} />}
            ></Route>
            <Route
              exact
              path="/forum/novel"
              render={props => <TopicPage {...props} cate={1} />}
            ></Route>
            <Route
              exact
              path="/forum/psychology"
              render={props => <TopicPage {...props} cate={7} />}
            ></Route>
            <Route
              exact
              path="/forum/lifeStyle"
              render={props => <TopicPage {...props} cate={10} />}
            ></Route>
            <Route
              exact
              path="/forum/food"
              render={props => <TopicPage {...props} cate={11} />}
            ></Route>
            <Route
              exact
              path="/forum/technology"
              render={props => <TopicPage {...props} cate={21} />}
            ></Route>
            <Route
              exact
              path="/forum/child"
              render={props => <TopicPage {...props} cate={13} />}
            ></Route>
            <Route
              exact
              path="/forum/humanities"
              render={props => <TopicPage {...props} cate={4} />}
            ></Route>
          </Switch>
        </div>
      </>
    </Router>
  )
}
export default ForumNavBar
