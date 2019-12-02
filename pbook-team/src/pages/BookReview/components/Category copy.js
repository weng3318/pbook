import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Category({ callback3 }) {
  const [categorys, setCategorys] = useState(() => callback3())

  useEffect(() => {
    setCategorys(callback3())
  }, [callback3])

  const CategoryBar = styled.div`
    display: flex;
    width: 700px;
  `
  //---------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------
  return (
    <section>
      <CategoryBar className="reviews_cate1">
        {categorys
          .filter((key, index) => index < 7)
          .map(data => (
            <Link key={data.sid} to={'reviews?c=' + data.sid + '&p=1'}>
              <button value={data.sid} key={data.sid} className="reviews_btn">
                {data.categoriesName}
              </button>
            </Link>
          ))}
      </CategoryBar>
      <CategoryBar className="reviews_cate2">
        {categorys
          .filter((key, index) => index > 6 && index < 14)
          .map(data => (
            <Link key={data.sid} to={'reviews?c=' + data.sid + '&p=1'}>
              <button value={data.sid} key={data.sid} className="reviews_btn">
                {data.categoriesName}
              </button>
            </Link>
          ))}
      </CategoryBar>
      <CategoryBar className="reviews_cate3">
        {categorys
          .filter((key, index) => index > 13)
          .map(data => (
            <Link key={data.sid} to={'reviews?c=' + data.sid + '&p=1'}>
              <button value={data.sid} key={data.sid} className="reviews_btn">
                {data.categoriesName}
              </button>
            </Link>
          ))}
      </CategoryBar>
    </section>
  )
}

export default Category
