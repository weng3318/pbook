import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ForumNavBar = () => {
  return (
    <>
      <Navbar variant="dark" className="navbar">
        <nav className="container">
          <Navbar.Brand className="F-nav-link">個人首頁</Navbar.Brand>
          <Nav className="mr-auto ">
            <LinkContainer to="/" exact activeClassName="active">
              <Nav.Link className="F-nav-link">商業理財</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/News" activeClassName="active">
              <Nav.Link className="F-nav-link" >藝術攝影</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">文學小說</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">心理勵志</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">生活風格</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">美食旅遊</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">數位科技</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">親子教養</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Contact" activeClassName="active">
              <Nav.Link className="F-nav-link">人文史地</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </nav>
      </Navbar>
    </>
  )
}
export default ForumNavBar
