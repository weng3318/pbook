import React from 'react'
import { Pagination } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import '../../pages/member/lukeStyle.scss'


const MyPagination = props => {
    let page_items = []
    let pt = props.totalPage
    // console.log("MyPagination", props);
    for(let page = 1; page <= pt ; page++) {
        page_items.push(
            <LinkContainer
                to= {'/member/BooksFavorite/' + page}
                key={page}
            >
                <Pagination.Item
                    onClick = { ()=>{
                        props.changePage(page)
                    }}
                >
                {page}
                </Pagination.Item>
            </LinkContainer>
        )
    }

    let fp = props.nowPage -1
    if(fp < 1) fp = 1
    let np = props.nowPage + 1
    if (np > pt) np = pt



    return(
        <>
            <div className="pageWrap pt-5">
                <Pagination className="d-flex justify-content-center">
                <LinkContainer to={'/member/BooksFavorite/1'} key={-1}>
                    <Pagination.First className="none" />
                </LinkContainer>
                <LinkContainer
                    to={'/member/BooksFavorite/' + fp }
                    key={0}
                >
                    <Pagination.Prev className="none" />
                </LinkContainer>
                {page_items}
                <LinkContainer
                    to={'/member/BooksFavorite/' + np}
                    key={10000}
                >
                    <Pagination.Next className="none" />
                </LinkContainer>
                <LinkContainer
                    to={'/member/BooksFavorite/' + pt}
                    key={10001}
                >
                    <Pagination.Last className="none" />
                </LinkContainer>
                </Pagination>
            </div>
        </>
    )

}


export default MyPagination