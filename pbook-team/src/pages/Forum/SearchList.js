import React, { useEffect, useState } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import CardS1 from '../../components/forum/CardS1/CardS1'

function SearchList(props) {
  let { keyWord } = useParams()
  let [data, setData] = useState(false)
  useEffect(() => {
    fetch(`http://localhost:5555/forum/search/${keyWord}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(results => {
        setData(results)
      })
  }, [keyWord])

  if (!data) {
    return (
      <div className="d-flex justify-content-center p-5 ">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <>
        <div className="cards-wrapper container">
          {data.map(item => (
            <CardS1 data={item}></CardS1>
          ))}
        </div>
      </>
    )
  }
}
const mapStateToProps = store => ({})

export default connect(mapStateToProps)(SearchList)
