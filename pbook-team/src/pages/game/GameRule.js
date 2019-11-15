import React from 'react'
import Typist from 'react-typist'

class GameRule extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,.8)',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '30',
            color: '#fff',
          }}
        >
          {/* 換行 */}
          <Typist>
            <p> First Sentence </p>
            <Typist.Delay ms={500} />
            <br />
            This won't be animated until 500ms after the first sentenced is
            rendered
            <br />
            <button>我是按鈕</button>
          </Typist>

          {/* 可以假裝打錯字 */}
          {/* <Typist>
            <span> First Sentence </span>
            <Typist.Backspace count={8} delay={200} />
            <span> Phrase </span>
          </Typist> */}
        </div>
      </>
    )
  }
}

export default GameRule
