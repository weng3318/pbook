import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class BR_BlogList extends React.Component {
  render(props) {
    return (
      <>
          <h5 className="h5_br">{this.props.name}</h5>
          <br/>
        <section className="ReviewerListAllBox reviewerList">
          <h5 className="" dangerouslySetInnerHTML={{__html:this.props.info}}></h5>
        </section>
          <img className="pbookChick" src={require('./images/品書印章.png')}/>
      </>
    )
  }
}

export default BR_BlogList