import React, { useEffect } from 'react'
import AcItemOffline from './AcItemOffline'
import AcItemDiscount from './AcItemDiscount'
import AcListHeader from './AcListHeader'
import './acList.scss'
import { connect } from 'react-redux'
import { acFetch } from '../../AcActions'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcList = props => {
  useEffect(() => {
    props.dispatch(acFetch(props.acType))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container acList">
        <AcListHeader />
        <div className="my-2 py-2" style={{ borderTop: '1px solid #ccc' }}>
          {props.acType === 'offline' &&
            props.acData.offline.items
              .filter(v => {
                return (
                  +v.status === +props.visibilityFilter.value ||
                  +props.visibilityFilter.value === 3
                )
              })
              .map(v => (
                <AcItemOffline key={v.sid} {...v} acType={props.acType} />
              ))}

          {props.acType === 'discount' &&
            props.acData.discount.items
              .filter(v => {
                return (
                  +v.status === +props.visibilityFilter.value ||
                  +props.visibilityFilter.value === 3
                )
              })
              .map(v => (
                <AcItemDiscount key={v.sid} {...v} acType={props.acType} />
              ))}
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
