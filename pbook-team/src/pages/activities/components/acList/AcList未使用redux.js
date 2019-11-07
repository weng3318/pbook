import React, { useState, useEffect } from 'react'
import AcItem from './AcItem'
import AcListHeader from './AcListHeader'
import './acList.css'
import { connect } from 'react-redux'
import { FETCH_DATA } from '../../actions/ListActions'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcList = props => {
  const [listData, setListData] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5555/api/ac-list', {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        setListData(await response.json())
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [props])

  return (
    <>
      <div className="container">
        <AcListHeader />
        <div className="my-2 py-2" style={{ borderTop: '1px solid #ccc' }}>
          {listData.map(v => (
            <AcItem key={v.AC_sid} {...v} />
          ))}
        </div>
      </div>
    </>
  )
}
// const mapStateToProps = state => ({ fetchData: 'aaa' })
// export default connect(mapStateToProps)(AcList)
export default AcList
