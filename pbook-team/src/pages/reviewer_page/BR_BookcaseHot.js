import React from 'react'

class BR_BookcaseHot extends React.Component {
    render() {
        return (
            <>
                <div className="HotBookBoxAll_Bookcase">
                    <h5 className="h5_Bookcase">熱門書評</h5>
                        <div className="HotBookBox_Bookcase">
                            <div>
                                <img className="brHotBookImg_Bookcase" src={require('../reviewer_page/images/03書_React全方位基礎入門實戰.png')} />
                                <div className="brHotBookText">React全方位基礎入門實戰</div>
                            </div>
                            <div>
                                <img className="brHotBookImg_Bookcase" src={require('../reviewer_page/images/03書_React全方位基礎入門實戰.png')} />
                                <div className="brHotBookText">React全方位基礎入門實戰</div>
                            </div>
                            <div>
                                <img className="brHotBookImg_Bookcase" src={require('../reviewer_page/images/03書_React全方位基礎入門實戰.png')} />
                                <div className="brHotBookText">React全方位基礎入門實戰</div>
                            </div>
                            <div>
                                <img className="brHotBookImg_Bookcase" src={require('../reviewer_page/images/03書_React全方位基礎入門實戰.png')} />
                                <div className="brHotBookText">React全方位基礎入門實戰</div>
                            </div> 
                        </div>
                    </div>
       </>
        )
    }
}

export default BR_BookcaseHot
