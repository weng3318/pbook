import React from 'react'
import {
    Carousel,
} from 'react-bootstrap'

import './carousel.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextIcon: <div className="myCarouselButton right"><i className="fas fa-caret-right"></i></div>,
            prevIcon: <div className="myCarouselButton left"><i className="fas fa-caret-left"></i></div>
        }
    }


    render() {
        const { nextIcon, prevIcon } = this.state;
        return (
            <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
                <Carousel.Item>
                    <img
                        className="carousel-item d-block w-100"
                        src={require("./images/getImage_01.jpg")}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-item d-block w-100"
                        src={require("./images/getImage_02.jpg")}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-item d-block w-100"
                        src={require("./images/getImage_03.jpg")}
                        alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>
        )
    }
}