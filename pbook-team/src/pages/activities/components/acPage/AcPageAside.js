/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './acPageAside.scss'
import { withRouter } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FacebookIcon from '@material-ui/icons/Facebook'
import { FacebookProvider, ShareButton } from 'react-facebook'
import AcSign from '../acSign/AcSign'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageAside = props => {
  const [open, setOpen] = React.useState(false)
  function handleClickOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }
  return (
    <>
      <aside className="col-md-3 acPageAside">
        <span className="share d-flex mt-3 justify-content-around align-items-center">
          <button title="收藏活動">
            <FavoriteBorderIcon />
          </button>
          <button title="聯絡主辦方">
            <MailOutlineIcon />
          </button>
          <FacebookProvider appId="468465107359578">
            <ShareButton href="http://www.facebook.com">
              <div title="分享到臉書">
                <FacebookIcon />
              </div>
            </ShareButton>
          </FacebookProvider>
        </span>
        {(function() {
          if (props.quota && !(props.quota === -1))
            return (
              <>
                <div className="sign-info mt-4 pt-3 mb-2 d-flex justify-content-center">
                  <span>總名額：{props.quota}</span>
                  <span>剩餘名額：{props.quota - props.registered}</span>
                  <button
                    className="sign-btn my-2 p-2"
                    onClick={handleClickOpen}
                  >
                    {' '}
                    我要報名
                  </button>
                  <AcSign open={open} handleClose={handleClose} />
                </div>
              </>
            )
        })()}
      </aside>
    </>
  )
}
export default withRouter(AcPageAside)
