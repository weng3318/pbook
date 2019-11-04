import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import './style.scss'

const Sidebar = () => {
  return (
    <>
      <div className="side-menu">
        <nav className="sidebar">
          <Accordion defaultActiveKey="0">
            <div className="sidebar_card">
              <Accordion.Toggle
                className="sider_title"
                as={Button}
                variant="link"
                eventKey="0"
                style={{ textDecoration: 'none' }}
              >
                <h2>會員資料</h2>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">編輯資料</a>
              </Accordion.Collapse>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">修改密碼</a>
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
                <a href="">訂單查詢</a>
              </Accordion.Collapse>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">訂單修改</a>
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
                <a href="">收藏書籍</a>
              </Accordion.Collapse>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">收藏書評家</a>
              </Accordion.Collapse>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">收藏書評</a>
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
                <a href="">配對書籍</a>
              </Accordion.Collapse>
              <Accordion.Collapse eventKey="0" className="sidebar_item">
                <a href="">配對通知</a>
              </Accordion.Collapse>
            </div>
          </Accordion>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
