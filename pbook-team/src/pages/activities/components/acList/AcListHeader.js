import React from 'react'
import {
  SET_VISIBILITY_FILTER,
  VisibilityFilterType,
  setAcType,
} from '../../AcActions'
import { connect } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Route, Link, Switch, Redirect } from 'react-router-dom'

function AcListHeader(props) {
  // const [acStatus, setAcStatus] = useState(1)
  // function selectHandler(evt) {
  //   setAcStatus(evt.target.value)
  // }

  function acTypeHandler(acType) {
    props.dispatch(setAcType(acType))
  }

  function selectHandler(e) {
    let action = { type: SET_VISIBILITY_FILTER, visibilityFilter: '' }
    switch (e.target.value) {
      case '1':
        action.visibilityFilter = VisibilityFilterType.SHOW_ACTIVE
        break
      case '0':
        action.visibilityFilter = VisibilityFilterType.SHOW_COMING_SOON
        break
      case '3':
        action.visibilityFilter = VisibilityFilterType.SHOW_ALL
        break
      case '2':
        action.visibilityFilter = VisibilityFilterType.SHOW_COMPLETED
        break
      default:
        action.visibilityFilter = ''
    }
    props.dispatch(action)
  }

  return (
    <>
      <div className="p-2">
        <header className="cTitle">
          <h1>品書活動</h1>
        </header>
        <div className="tagContainer d-flex">
          <ul className="nav">
            <li className="nav-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                to={'/activities/discount'}
                className="nav-link active"
                onClick={() => acTypeHandler('discount')}
              >
                優惠活動
              </Link>
            </li>
            <li className="nav-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                to={'/activities/offline'}
                className="nav-link"
                onClick={() => acTypeHandler('offline')}
              >
                線下活動
              </Link>
            </li>
          </ul>
          <div className="filter d-flex align-content-center">
            <p>活動狀態</p>
            <select
              name="status"
              value={props.visibilityFilters}
              onChange={selectHandler}
            >
              <option value="1">進行中</option>
              <option value="0">尚未開始</option>
              <option value="3">顯示全部</option>
              <option value="2">已結束</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({ visibilityFilter: state.visibilityFilter })
export default connect(mapStateToProps)(AcListHeader)
