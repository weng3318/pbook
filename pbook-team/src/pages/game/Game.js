import React from 'react'
import axios from 'axios'
import './changeGame.css'
import BGsound from './BGsound'
import SnowStorm from 'react-snowstorm'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myBooks: [],
      pairedMemberBooks: [],
    }
  }

  handleStartGame = () => {
    this.btnaudio.cloneNode().play()
  }

  handleBackGame = () => {
    this.btnaudio.cloneNode().play()
  }

  componentDidMount() {
    axios.get(`http://localhost/php-api/game.php`).then(res => {
      const persons = res.data
      for (var i = 0; i < persons.length; i++) {
        // console.log(persons[i])
        if (persons[i][0]['mb_shelveMember'] === this.props.match.params.id) {
          console.log('第一組')
          this.setState({
            myBooks: persons[i][0],
            pairedMemberBooks: persons[i][1],
          })
        } else if (
          persons[i][1]['mb_shelveMember'] === this.props.match.params.id
        ) {
          console.log('第二組')
          this.setState({
            myBooks: persons[i][1],
            pairedMemberBooks: persons[i][0],
          })
        }
      }
    })
  }

  render() {
    const { myBooks, pairedMemberBooks } = this.state
    console.log(myBooks)
    console.log(pairedMemberBooks)

    return (
      <>
        <audio
          id="audio"
          src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
          hidden="true"
          ref={audio => (this.btnaudio = audio)}
        ></audio>

        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'URL(' + require('./images/bg.png') + ')',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: 999,
          }}
        >
          <div className="changeGameIndexBG">
            <div className="position-relative PC-changeGameWrap">
              <img
                className="position-absolute PC-changeGameIndexContext"
                src={require('./images/PC-changeGameIndexContext.png')}
                alt="電腦版"
              />
              <div className="position-absolute d-flex PC-changeGameBtnWrap">
                <img
                  id="btn"
                  src={require('./images/start-black.png')}
                  alt="電腦版進入按鈕"
                  onClick={this.handleStartGame}
                />
                <img
                  src={require('./images/back-black.png')}
                  alt="電腦版退出按鈕"
                  onClick={this.handleBackGame}
                />
              </div>
            </div>
            <div className="position-relative">
              <img
                className="PHONE-changeGameIndexContext"
                src={require('./images/PHONE-changeGameIndexContext.png')}
                alt="手機板"
              />
              <div className="position-absolute PHONE-changeGameBtnWrap">
                <img
                  src={require('./images/start-black.png')}
                  alt="手機版進入按鈕"
                  onClick={this.handleStartGame}
                />
                <img
                  src={require('./images/back-black.png')}
                  alt="手機版退出按鈕"
                  onClick={this.handleBackGame}
                />
              </div>
            </div>
          </div>
          <BGsound />
          {/* <button onClick={() => this.props.history.push('/')}>回首頁</button> */}
          {/* 回首頁可能還要改 */}
        </div>
      </>
    )
  }
}

export default Game
