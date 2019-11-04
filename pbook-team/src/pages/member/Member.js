import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Container } from 'react-bootstrap'

class Member extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <Container>
          <Sidebar />
        </Container>
      </>
    )
  }
}
export default Member
