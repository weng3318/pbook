import React from 'react'
import './theme.css'


function Theme() {


    return (
        <section className="recomend-body position-relative">
            <div className="sub-title">
                <span style={{ fontSize: "20px" }}>閱讀話題</span>
                <br />
                <span style={{ fontSize: "16px", color: "#ffc408" }}>THEME</span>
            </div>

            <div className="container recomend-book" style={{ position: "relative", zIndex: "2" }}>

                <div className="component">

                    <ul className="themeAlign">
                        <li>
                            <figure className='themeBook'>

                                {/* Front */}

                                <ul className='hardcover_front'>
                                    <li>
                                        <div className="coverDesign grey">
                                            <span className="ribbon">NEW</span>
                                            <img src={require('./images/getImage.jpg')} alt="" />
                                        </div>
                                    </li>
                                    <li></li>
                                </ul>

                                {/* Pages */}

                                <ul className='themePage'>
                                    <li></li>
                                    <li>
                                        <a className="recomend-book-btn" href="#">閱讀此書</a>
                                        <img src={require('./images/品書印章.png')} alt="" className="position-absolute"
                                            style={{ height: 40 + "px", width: 40 + "px", bottom: 10 + "px", right: 10 + "px" }} />
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>

                                {/* Back */}

                                <ul className='hardcover_back'>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className='book_spine'>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <figcaption>
                                    <h1>好關係是麻煩出來的</h1>
                                    <span>作者：格子珊s</span>
                                    <p className="recomend-p">
                                        許多人都害怕拜託別人幫忙，然而，怕麻煩別人其實是不願意承認自己需要對方，也活生生阻礙了別人對自己的需要。偶爾的示弱，會讓你更有力量。許多人都害怕拜託別人幫忙，然而，怕麻煩別人其實是不願意承認自己需要對方，也活生生阻礙了別人對自己的需要。偶爾的示弱，會讓你更有力量。</p>
                                </figcaption>
                            </figure>
                        </li>

                        <li>
                            <figure className='themeBook'>

                                {/* Front */}

                                <ul className='hardcover_front'>
                                    <li>
                                        <div className="coverDesign grey">
                                            <span className="ribbon">NEW</span>
                                            <img src={require('./images/getImage.jpg')} alt="" />
                                        </div>
                                    </li>
                                    <li></li>
                                </ul>

                                {/* Pages */}

                                <ul className='themePage'>
                                    <li></li>
                                    <li>
                                        <a className="recomend-book-btn" href="#">閱讀此書</a>
                                        <img src={require('./images/品書印章.png')} alt="" className="position-absolute"
                                            style={{ height: 40 + "px", width: 40 + "px", bottom: 10 + "px", right: 10 + "px" }} />
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>

                                {/* Back */}

                                <ul className='hardcover_back'>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className='book_spine'>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <figcaption>
                                    <h1>好關係是麻煩出來的</h1>
                                    <span>作者：格子珊s</span>
                                    <p className="recomend-p">
                                        許多人都害怕拜託別人幫忙，然而，怕麻煩別人其實是不願意承認自己需要對方，也活生生阻礙了別人對自己的需要。偶爾的示弱，會讓你更有力量。許多人都害怕拜託別人幫忙，然而，怕麻煩別人其實是不願意承認自己需要對方，也活生生阻礙了別人對自己的需要。偶爾的示弱，會讓你更有力量。</p>
                                </figcaption>
                            </figure>
                        </li>
                    </ul>
                </div>

            </div>

        </section>

    )
}

export default Theme