import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Info from '../../pages/member/Info'
import Edit from '../../pages/member/Edit'
import Chat from './chat/Chat'
import '../../pages/member/lukeStyle.scss'

const Sidebar = (props) => {
  return (
    <>
      <Router>
        <div className="side-menu">
          <nav className="sidebar">
            <Accordion defaultActiveKey="0">
              <div className="sidebar_card">
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  // style={{ textDecoration: 'none' }}
                  className="sider_title"
                >
                  <Link to="/member">
                    <h2>會員資料</h2>
                  </Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <Link to="/member/edit">
                    <a href="css">編輯資料</a>
                  </Link>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">修改密碼</a>
                </Accordion.Collapse>
              </div>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <div className="sidebar_card">
                <Accordion.Toggle
                  className="sidebar_title"
                  as={Button}
                  variant="link"
                  eventKey="0"
                >
                  訂單管理
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">訂單查詢</a>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">訂單修改</a>
                </Accordion.Collapse>
              </div>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <div className="sidebar_card">
                <Accordion.Toggle
                  className="sidebar_title"
                  as={Button}
                  variant="link"
                  eventKey="0"
                >
                  個人書櫃
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">收藏書籍</a>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">收藏書評家</a>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">收藏書評</a>
                </Accordion.Collapse>
              </div>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <div className="sidebar_card">
                <Accordion.Toggle
                  className="sidebar_title"
                  as={Button}
                  variant="link"
                  eventKey="0"
                >
                  二手書管理
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <a href="css">配對書籍</a>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <Link to="/member/chat">配對列表</Link>
                </Accordion.Collapse>
              </div>
            </Accordion>
          </nav>
        </div>

        <Switch>
          <Route exact path="/member" component={Info} />
          <Route exact path="/member/edit" component={Edit} />
          <Route path="/member/chat" component={()=><Chat id="MR00001"/>} />
        </Switch>
      </Router>
    </>
  )
}

export default Sidebar
