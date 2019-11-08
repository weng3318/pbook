import React, { useEffect } from 'react'
import AcItem from './AcItem'
import AcListHeader from './AcListHeader'
import './acList.scss'
import { connect } from 'react-redux'
import { acFetch } from '../../AcActions'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcList = props => {
  useEffect(() => {
    props.dispatch(acFetch('discount'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container acList">
        <AcListHeader />
        <div className="my-2 py-2" style={{ borderTop: '1px solid #ccc' }}>
          {props.acData.discount &&
            props.acData.discount.items
              .filter(v => {
                return (
                  +v.status === +props.visibilityFilter.value ||
                  +props.visibilityFilter.value === 3
                )
              })
              .map(v => <AcItem key={v.sid} {...v} acType={props.acType} />)}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter,
  acType: state.acType,
  acData: state.acData,
})
export default connect(mapStateToProps)(AcList)
