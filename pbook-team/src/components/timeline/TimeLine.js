import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import HorizontalTimelineContent from './demos/demo-swipeable-views/HorizontalTimelineContent';

import './timeLine.css'


class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      oldData: []
    };
  }

  goToReviews = () => {
    window.location.href = '/reviews'
  }


  componentDidMount() {

    setInterval(() => {
      renderMydata()
    }, 1000)

    const renderMydata = async () => {

      var GameInfo = []
      await axios.get(`http://localhost/php-api/timeLine.php`)
        .then(res => {
          GameInfo = res.data
        })

      this.data = GameInfo.map((game, index) => {
        return ({
          date: game.BR_release_time,
          component: (
            <div className='container' key={index} style={{ textAlign: "left" }} >
              <h2 className="timeLine20">{game.BR_title.replace(/<.+?>/g, '').replace(/&nbsp;/ig, '').replace(/\s/ig, '')}</h2>
              <em className="timeLine16" style={{ fontSize: "20px" }}>-書評家：{game.BR_publisher}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-發表時間：{game.BR_release_time}</em>
              <br />
              <em className="timeLine16" style={{ fontSize: "20px" }}>-書籍名稱：{game.BR_book_name}</em>
              <hr />
              <p className="timeline-p">{game.BR_data.replace(/<.+?>/g, '').replace(/&nbsp;/ig, '').replace(/\s/ig, '')}</p>
              <hr />
              <div className="timeline-more">
                <span className="pointer" style={{ color: "#ffc408" }}>►</span>
                <span className="pointer" onClick={this.goToReviews}>Read More</span>
              </div>
            </div>
          )
        });
      });
      this.setState({ oldData: GameInfo })
      console.log("timeLineCounter");
    }
    renderMydata()
  }

  render() {
    if (!this.data) return <h1>等待資料中...</h1>
    return (
      <section className="position-relative">
        <div className="crane"></div>
        <div className="sub-title">
          <span className="titleZh">書評家x最新書評</span>
          <br />
          <span className="titleEn">NEWS</span>
        </div>
        <HorizontalTimelineContent
          content={this.data} />
      </section>
    );
  }
}

export default TimeLine
