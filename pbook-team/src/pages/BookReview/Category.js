import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import { BrowserRouter as Link } from 'react-router-dom'

function Category() {
  // const [categorys, setCategorys] = useState([]) //分類資料

  // useEffect(() => {
  //   categoryBar()
  // }, [])

  // const CategoryBar = styled.div`
  //   display: flex;
  //   flex-wrap: wrap;
  // `
  // //---------------------------------------------------------------------------------------------
  // const categoryBar = () => {
  //   axios
  //     .post('http://localhost:5555/categoryBar')
  //     .then(res => {
  //       let data = res.data.data
  //       setCategorys(data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  //---------------------------------------------------------------------------------------------
  return (
    <>
      {/* {categorys.map((data, index) => (
        <Link to={'reviews?c=' + data.sid + '&'}>
          <button value={data.sid} key={index} className="btn">
            {data.name}
          </button>
        </Link>
      ))} */}
      <Link to="/123">
        <button>123</button>
      </Link>
    </>
  )
}

export default Category
