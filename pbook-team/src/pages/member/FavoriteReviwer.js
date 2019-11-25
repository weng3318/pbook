import React from 'react'
import './lukeStyle.scss'
import { Link } from 'react-router-dom'
import MyPagination from '../../components/member/MyPagination'
import axios from 'axios'

class FavoriteReviwer extends React.Component{
    constructor(){
        super()
        this.state = {
            reviewerData: []
        }
    }
    componentDidMount(){
        this.queryReviewer()
    }


    queryReviewer = ()=>{
        let number = JSON.parse(localStorage.getItem('user')).MR_number
        axios.post('http://localhost:5555/member/queryReviewer', { number })
        .then( res =>{
            this.setState({reviewerData: res.data.rows})
        })
    }



    render(){
        let reviewerData = this.state.reviewerData
        console.log(reviewerData && reviewerData)
        



        return(
            <>
            <div className="reviewerContent">
                <div className="title">收藏書評家</div>
                    <div className="wrap flex-wrap">
                    {
                        (reviewerData && reviewerData).map(data => (
                            <section className="ReviewerListAllBox reviewerList">
                            <div className="d-flex">
                                <div className="brAvatarAllBox borderLine">
                                    <h5 className="h5_br">{data.title}</h5>
                                    <Link to={"/reviewer/reviewerBooks/"+data.sid}>
                                    <div className="brAvatarBox">
                                    <img className="brAvatarImg" src={require(`../reviewer_page/images/${data.img}`)}/>
                                    </div>
                                    </Link>
                                    <h5 className="h5_br">{data.name}</h5>

                                    <div className="brIconBox">
                                        <div className="AvatarInfo">{data.job}</div>
                                    </div>

                                    <Link to={"/reviewer/reviewerBooks/"+data.sid} className="d-flex justify-content-center borderLineTop">
                                    <div className="brIconBox">
                                        <img src={require('../reviewer_page/images/P_logo.png')}/>
                                    </div>
                                    <div className="brReadBooks">看看書櫃</div>
                                    </Link>
                                    
                                    <Link>
                                    <div className="brIconBox borderLineTop">
                                        <img className="brIconFollow" src={require('../reviewer_page/images/icon_follow.png')}/>
                                    </div>
                                    </Link>

                                    <div className="brIconBox borderLineTop">
                                    <a className="brIconShare" href={data.youtube} target="black">
                                            <img src={require('../reviewer_page/images/icon_youtube.png')}/>
                                    </a>
                                    <a className="brIconShare" href={data.facebook} target="black">
                                            <img src={require('../reviewer_page/images/icon_facebook.png')}/>
                                    </a>
                                    <a className="brIconShare" href={data.twitter} target="black">
                                            <img src={require('../reviewer_page/images/icon_twitter.png')}/>
                                    </a>
                                    </div>
                                </div>

                                <div className="brInfoBox borderLine"><h5 className="h5_br">書評家簡介</h5>
                                        <div className="brInfoText ">{data.intro}</div>
                                            <div className="fbBox">
                                                <div className="fb-share-button"data-href={data.tube} data-layout="button_count"></div>
                                            </div>
                                </div>
                            </div>
                                <iframe className="brYouTubeRWD borderLine" width="50%" height="auto" src={data.tube} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </section>
                        ))}
                </div>
            </div>
            </>
        )
    }
}

export default FavoriteReviwer
