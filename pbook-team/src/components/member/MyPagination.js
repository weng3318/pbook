import React from 'react'
import { Pagination } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'


const MyPagination = props => {
    let page_items = []
    let pt = props.totalPage
    for(let page = 1; page <= pt ; page++) {
        page_items.push(
            <LinkContainer
                to= {'/member/queryBookcase/' + page}
                key={page}
            >
                <Pagination.Item>{page}</Pagination.Item>
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
                <LinkContainer to={'/member/queryBookcase/' + props} key={-1}>
                    <Pagination.First className="none" />
                </LinkContainer>
                <LinkContainer
                    to={'/member/queryBookcase/' + fp }
                    key={0}
                >
                    <Pagination.Prev className="none" />
                </LinkContainer>
                {page_items}
                <LinkContainer
                    to={'/member/queryBookcase/' + np + '/' + props}
                    key={10000}
                >
                    <Pagination.Next className="none" />
                </LinkContainer>
                <LinkContainer
                    to={'/member/queryBookcase/' + pt + '/' + props}
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