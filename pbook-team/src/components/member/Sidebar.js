import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Info from '../../pages/member/Info'
import Edit from '../../pages/member/Edit'
import AddMemberBook from '../../pages/member/AddMemberBook'
import PasswordModify from '../../pages/member/PasswordModify'
import BooksFavorite from '../../pages/member/BooksFavorite'
import ViewMemberBooks from '../../pages/member/ViewMemberBooks'
import ResetPWD from '../../pages/ResetPWD'

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
                  className="sidebar_title"
                  style={{color: "#2D3A3A",textDecoration: "none",fontSize: "28px"}}
                >
                  <Link to="/member" style={{color: "#2D3A3A",textDecoration: "none"}}>
                    <h2 >會員資料</h2>
                  </Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <Link to="/member/edit">
                    <a href="css">編輯資料</a>
                  </Link>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <Link to="/member/PasswordModify">
                  <a href="css">修改密碼</a>
                  </Link>
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
                  style={{color: "#2D3A3A",textDecoration: "none",fontSize: "28px"}}
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
                  style={{color: "#2D3A3A",textDecoration: "none",fontSize: "28px"}}
                >
                  個人書櫃
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                  <Link to='/member/BooksFavorite'>
                    <a href="css">收藏書籍</a>
                  </Link>
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
                <Link to='/member/ViewMemberBooks'
                style={{color: "#2D3A3A",textDecoration: "none",fontSize: "28px"}}
                >
                  二手書管理
                </Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="sidebar_item">
                <Link to="/member/AddMemberBook">
                  <a href="css">配對書籍</a>
                </Link>
                </Accordion.Collapse>
              </div>
            </Accordion>
          </nav>
        </div>

        <Switch>
          <Route exact path="/member" component={Info} />
          <Route exact path="/member/edit" component={Edit} />
          <Route exact path="/member/AddMemberBook" component={AddMemberBook} />
          <Route exact path="/member/PasswordModify" component={PasswordModify} />
          <Route exact path="/member/BooksFavorite" component={BooksFavorite} />
          <Route exact path="/member/ViewMemberBooks" component={ViewMemberBooks} />
          
        </Switch>
      </Router>
    </>
  )
}

export default Sidebar
