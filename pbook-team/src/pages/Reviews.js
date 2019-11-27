/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import './BookReview/Reviews.css'
import NavBar from './BookReview/components/BR_Navbar'

import Bookinfo from './BookReview/Bookinfo'

// ------------------------------------------------------------------------------------
//主要內容外框
const Main = styled.section`
  margin: 0 auto;
  width: 1200px;
`
// ------------------------------------------------------------------------------------

const Reviewer = () => {
  return (
    <>
      <NavBar />
      <Main>
        <Bookinfo />
      </Main>
    </>
  )
}

export default Reviewer
