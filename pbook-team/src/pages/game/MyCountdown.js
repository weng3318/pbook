import React from 'react'
import axios from 'axios'
import Countdown from 'react-countdown-now'

class MyCountdown extends React.Component {
  constructor() {
    super()
    this.state = {
      oldTime: '',
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5555/nana_use/countDown`).then(res => {
      this.setState({ oldTime: res.data })
    })
  }

  render() {
    return (
      <>
        <h6 className="countDownText">
          今日配對剩餘時間：
          <Countdown date={this.state.oldTime + 86400000} />
        </h6>
      </>
    )
  }
}

export default MyCountdown
