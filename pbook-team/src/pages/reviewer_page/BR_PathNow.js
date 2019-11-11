import React from 'react';
import {withRouter} from 'react-router';

const PathNow = (props) => {
    return (
        <>
        <h5 style={{color:'#3d2a2a'}}>
        現在位置：{props.location.pathname}
        {/* <span>　　　麵包屑 > 麵包屑 > 
                屑屑屑屑屑屑屑屑屑屑...
                </span> */}
        </h5>
        </>
    );
}

export default withRouter(PathNow);