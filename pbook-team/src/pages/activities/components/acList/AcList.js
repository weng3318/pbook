import React, { useEffect, useRef } from 'react'
import AcItem from './AcItem'
import AcListHeader from './AcListHeader'
import './acList.css'
import { connect } from 'react-redux'
import { GET_LIST } from '../../actions/ListActions'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcList = props => {
  let prevVisibilityFilterRef = useRef()
  const prevVisibilityFilter = prevVisibilityFilterRef.current
  useEffect(() => {
    async function fetchData() {
      console.log('connect to db')
      try {
        const response = await fetch('http://localhost:5555/api/ac-list', {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        let action = { type: GET_LIST, listData: await response.json() }
        props.dispatch(action)
      } catch (error) {
        console.log('error', error)
      }
    }
    if (!(props.visibilityFilter === prevVisibilityFilter)) fetchData()
    prevVisibilityFilterRef.current = props.visibilityFilter
  }, [prevVisibilityFilter, props])

  return (
    <>
      <div className="container">
        <AcListHeader />
        <div className="my-2 py-2" style={{ borderTop: '1px solid #ccc' }}>
          {props.listData.map(v => (
            <AcItem key={v.AC_sid} {...v} />
          ))}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  listData: state.listData,
  visibilityFilter: state.visibilityFilter,
})
export default connect(mapStateToProps)(AcList)
